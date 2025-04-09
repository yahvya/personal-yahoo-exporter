import { AttachmentConfig, MailConfig } from "../configs/MailConfig.ts";
import { ClassicFile } from "../file/ClassicFile.ts";
import { WordFile } from "../file/WordFile.ts";
import { YahooExporter } from "../manager/YahooExporter.ts";
import { ExportPolicy } from "./ExportPolicy.ts";
import { Document, Header,Paragraph,SectionType } from "docx";

/**
 * @brief Politique de sauvegarde dans un document word
 */
export class WordDocumentPolicy extends ExportPolicy{
    /**
     * @brief Limite de caractères par document (approximatif)
     */
    static CHAR_LIMIT:number = 1000000;

    /**
     * @brief Compteur de document
     */
    protected documentCounter:number = 0;

    /**
     * @brief Compteur de caractère actuel dans le document
     */
    protected currentCharCounter:number = 0;

    /**
     * @brief Contenu du futur document
     */
    protected bodyContent:Array<any> = [];

    constructor(yahooExporter:YahooExporter){
        super(yahooExporter);
    }

    public async export(mailConfig: MailConfig): Promise<void> {
        return new Promise(async (resolve,reject) => {
            // ajout du nombre de caractères approximatif ajouté
            this.currentCharCounter += 
                mailConfig.subject.length +
                mailConfig.message.length + 
                mailConfig.sendDate.length;

            // ajout du mail dans le document courant
            const section = {
                properties: {
                    type: SectionType.NEXT_PAGE,
                },
                headers: {
                    default: new Header({
                        children: [new Paragraph(`Mail du ${mailConfig.sendDate}`)],
                    }),
                },
                children: [
                    new Paragraph(`Sujet: ${mailConfig.subject}`),
                    new Paragraph("Message"),
                    new Paragraph(mailConfig.message),
                ],
            };
            
            // gestion des fichiers joints
            if(mailConfig.attachments.length > 0){
                section.children.push(new Paragraph("Fichiers joints"));
                
                const attachementsDirManager = new ClassicFile(`${this.yahooExporter.getBaseDirectoryManager().getAbsolutePath()}fichiers-joints/`);

                if(!attachementsDirManager.createDirectory()){
                    reject("Echec de création du dossier des fichiers joints");
                    return;
                }

                mailConfig.attachments.forEach((config:AttachmentConfig) => {
                    /**
                     * @todo supprimer le test
                     */
                    config.filename = "test";
                    
                    section.children.push(new Paragraph(`\t- Nom du fichier: ${config.filename} - Type : ${config.type}`));
                });
            }  
            
            this.bodyContent.push(section);

            // enregistrement en cas de limite atteinte
            if(this.currentCharCounter >= WordDocumentPolicy.CHAR_LIMIT){
                await this
                    .saveCurrentDocument()
                    .catch(error => reject(error));
            }

            resolve();
        });
    }

    /**
     * @brief Sauvegarde le document courant
     * @returns Promosse de réussite
     */
    public async saveCurrentDocument():Promise<void>{
        return new Promise(async (resolve,reject) => {
            this.documentCounter++;
            this.currentCharCounter = 0;

            // création du dcoument
            const document:Document = new Document({
                creator: this.yahooExporter.getExportConfig().userEmail,
                description: `Relevé de mail numéro ${this.documentCounter}`,
                title: `Relevé de mail numéro ${this.documentCounter}`,
                sections: this.bodyContent,
                styles: {
                    paragraphStyles: [
                        {
                            id: "Normal",
                            name: "Normal",
                            run: {
                                font: "Arial",
                                size: 24
                            },
                            paragraph: {},
                        },
                    ],
                }
            });

            // création du gestionnaire et du dossier si inexistant
            const wordFile = new WordFile(`${this.yahooExporter.getBaseDirectoryManager().getAbsolutePath()}/documents/${this.documentCounter}.docx`);

            if(!wordFile.createDirectory()){
                reject("Echec de création du dossier de sauvegarde des documents");
                return;
            }

            await wordFile
                .save(document)
                .catch((error) => reject(error));

            this.bodyContent = [];

            resolve();
        });
    }

    public async finalize(): Promise<void> {
        return new Promise(async (resolve,reject) => {
            // sauvegarde de la dernière partie du document
            if(this.currentCharCounter > 0){
                await this
                    .saveCurrentDocument()
                    .catch(error => reject(error));
            }

            resolve();
        });
    }
}
