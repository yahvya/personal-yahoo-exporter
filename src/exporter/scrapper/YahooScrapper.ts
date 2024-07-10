import { YahooAccountConfig, YahooSelectors } from "./YahooScrapperConfig.ts";
import { MailConfig } from "../configs/MailConfig.ts";
import { ExportEventManager } from "../manager/ExportEventManager.ts";

/**
 * @brief Fonction de traitement de mail
 */
export type MailTreatmentFunc = (config:MailConfig) => Promise<any>;

/**
 * @brief Exécuteur yahoo 
 * @attention usage unique
 */
export class YahooScrapper{
    /**
     * @brief Temps d'attente sûr
     */
    static SURE_WAITING_TIME:number = 5000;

    /**
     * @brief Page d'exécution
     */
    protected page?:any;

    /**
     * @brief Configuration des sélecteurs yahoo
     */
    protected selectorsConfig:YahooSelectors;

    /**
     * @brief Configuration de compte
     */
    protected accountConfig:YahooAccountConfig;

    /**
     * @brief Navigateur
     */
    protected browser?:any;

    /**
     * 
     * @param selectorsConfig Configuration des sélecteurs yahoo
     * @param accountConfig Configuration de compte
     */
    constructor(selectorsConfig:YahooSelectors,accountConfig:YahooAccountConfig){
        this.selectorsConfig = selectorsConfig;
        this.accountConfig = accountConfig;
    }

    /**
     * @brief Initialise l'exécuteur
     */
    public async init():Promise<void>{
        return new Promise(async (resolve,reject) => {
            try{
                const puppeteer = ExportEventManager.appRequire!("puppeteer");

                this.browser = await puppeteer.launch({
                    headless: false,
                    defaultViewport: null,
                    protocolTimeout: 86400000
                });    
                
                this.page = await this.browser?.newPage();
        
                await this.page?.setDefaultNavigationTimeout(0); 
                await this.page?.goto("https://yahoo.fr");
                await this.page?.waitForNavigation();
    
                resolve();
            }
            catch(_){
                reject("Une erreur inattendue s'est produite");
            }
        });
    }

    /**
     * @brief Lance l'extraction
     * @param toDoWithEachMail fonction de traitement sur chaque mail
     * @returns Promesse de succes
     */
    public async launch(toDoWithEachMail:MailTreatmentFunc):Promise<void>{
        return new Promise(async (resolve,reject) => {
            try{
                // accès à la page de connexion
                
                await this.checkForSelectorOrAsk(this.selectorsConfig.loginAccessButtonSelector);
                await this.page?.click(this.selectorsConfig.loginAccessButtonSelector);

                // écriture de l'email

                await this.checkForSelectorOrAsk(this.selectorsConfig.emailInputSelector);
                await this.page?.type(this.selectorsConfig.emailInputSelector,this.accountConfig.email);

                await this.checkForSelectorOrAsk(this.selectorsConfig.emailNextButtonSelector);
                await this.page?.click(this.selectorsConfig.emailNextButtonSelector);

                // écriture de mot de passe et connexion

                await this.checkForSelectorOrAsk(this.selectorsConfig.passwordInputSelector);
                await this.page?.type(this.selectorsConfig.passwordInputSelector,this.accountConfig.password);

                await this.page?.click(this.selectorsConfig.signingButtonSelector);

                // accès à la page des mails
                await this.checkForSelectorOrAsk(this.selectorsConfig.mailAccessIconSelector);
                await this.page?.click(this.selectorsConfig.mailAccessIconSelector);

                // recherche des mails;
                
                await this.checkForSelectorOrAsk(this.selectorsConfig.searchbarSelector);
                await this.page?.type(this.selectorsConfig.searchbarSelector,this.accountConfig.conversationEmail);

                await this.page?.click(this.selectorsConfig.searchValidationButtonSelector);
                await this.page?.waitForNavigation();

                // boucle de lecture
                await this
                    .extractMails(toDoWithEachMail)
                    .catch(error => reject(error));

                await this.browser?.close();
                    
                resolve();
            }
            catch(_){
                reject("Une erreur inattendue s'est produite");
            }
        });     
    }

    /**
     * @brief Vérifie et attend la présence d'un sélecteur
     * @param selector le sélecteur
     * @returns Promesse de réussite
     */
    public async checkForSelectorOrAsk(selector:string):Promise<void>{
        return new Promise(async (resolve,reject) => {
            try{
                this.proceedSelectorWaiting(resolve,selector);
            }
            catch(_){
                reject("Une erreur technique s'est produite lors de l'attente");
            }
        });
    }

    /**
     * @brief Gère l'attente récursivement
     * @param resolver resolver initial
     * @param selector sélecteur
     */
    protected async proceedSelectorWaiting(resolver:(value: void | PromiseLike<void>) => void,selector:string):Promise<void>{
        this.page?.waitForSelector(selector,{timeout: YahooScrapper.SURE_WAITING_TIME})
                .then(() => resolver())
                // re tentative
                .catch(() => this.proceedSelectorWaiting(resolver,selector));
    }

    /**
     * @brief Extrait les mails
     * @param toDoWithEachMail fonction de traitement sur chaque mail
     * @returns Promose de succès
     */
    protected async extractMails(toDoWithEachMail:MailTreatmentFunc):Promise<void>{
        return new Promise(async (resolve,reject) => {
            try{
                while(true){
                    // récupération du nombre de mails dans la page courrante
                    const countOfMailInPage:number = await this.getCountOfMailsOnPage();
                    
                    // lecture des mails

                    for(let mailIndex = 0;mailIndex < countOfMailInPage; mailIndex++){
                        // click sur le mail courant
                        
                        await this.page?.waitForSelector(this.selectorsConfig.mailRowSelector);
                        await this.page?.evaluate(
                            YahooScrapper.mailClickHandler,
                            this.selectorsConfig.mailRowSelector,mailIndex
                        );
                        await this.page?.waitForNavigation();

                        // récupération des informations du mail
                        const config:MailConfig|null = await this.page?.evaluate(
                            YahooScrapper.mailConfigGetterHandler,
                            this.selectorsConfig.aMailSubjectSelector,this.selectorsConfig.aMailSendDateSelector,this.selectorsConfig.aMailContentSelector
                        )!;

                        if(config === null){
                            reject("Echec de lecture d'un mail");
                            return;
                        }

                        // traitement du mail
                        await toDoWithEachMail(config)
                            .catch((error) => reject(error));

                        await this.page?.goBack();
                        await this.checkForSelectorOrAsk(this.selectorsConfig.searchbarSelector);
                    }

                    // vérification de présence d'une page suivante
                    const haveGoneOnNextPage = await this.page?.evaluate(
                        YahooScrapper.nextPageHandler,
                        this.selectorsConfig.nextMailPageSelector
                    );

                    if(haveGoneOnNextPage)
                        await this.checkForSelectorOrAsk(this.selectorsConfig.searchbarSelector);
                    else
                        break;
                }

                resolve();
            }
            catch(_){
                reject("Echec de lecture des mails");
            }
        });
    }

    /**
     * @brief Fourni le nombre de mail présent dans la page courrante
     * @returns Promesse du nombre de mail
     */
    protected async getCountOfMailsOnPage():Promise<number>{
        return new Promise<number>(async(resolve,reject) => {
            const countOfMails:number|void = await this.page?.$$eval(this.selectorsConfig.mailRowSelector,(elements:any) => elements.length)
                .catch((_:string) => reject("Echec de récupération du nombre de mails"));

            if(typeof countOfMails === "number")
                resolve(countOfMails);
            else
                reject("Echec de récupération du nombre de mails")
        });
    }

    /**
     * @brief Gestion du click sur une ligne de mail dans le contexte web
     * @param mailRowSelector sélecteur de ligne
     * @param mailIndex index de mail courant
     */
    protected static mailClickHandler(mailRowSelector:string,mailIndex:number):void{
        const mailRow = document.querySelectorAll(mailRowSelector)[mailIndex];
        
        mailRow.querySelectorAll("span").forEach(el => el.click());
    }

    /**
     * @brief Gestion de l'extraction de la configuration de mail dans le contexte web
     * @param aMailSubjectSelector sélecteur de sujet
     * @param aMailSendDateSelector sélecteur de date
     * @param aMailContentSelector sélecteur de contenu (à multiple lignes)
     * @returns la configuration ou null en cas d'erreur
     */
    protected static mailConfigGetterHandler(aMailSubjectSelector:string,aMailSendDateSelector:string,aMailContentSelector:string):MailConfig|null{
        try{
            return {
                subject: document.querySelector(aMailSubjectSelector)?.textContent ?? "Sujet non trouvé",
                sendDate: document.querySelector(aMailSendDateSelector)?.textContent ?? "Date d'envoi non trouvé",
                message: Array.from(document.querySelectorAll(aMailContentSelector))
                    .map(element => element.textContent)
                    .join("\n"),
                attachments: []
            };
        }
        catch(_){
            return null;
        }
    }

    /**
     * @brief Tente d'envoyer sur la page suivante de mail
     * @param nextMailPageSelector sélécteur du lien de page suivante
     * @returns True si la page suivante a été envoyé sinon false si pas de base suivante
     */
    protected static nextPageHandler(nextMailPageSelector:string):boolean{
        const nextElement:HTMLElement = document.querySelector(nextMailPageSelector)!;

        if(nextElement){
            nextElement?.click();
            return true;
        }

        return false;
    }
}
