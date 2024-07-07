import { ExportConfig, ExportPoliciesTypes, ExportType } from "../configs/ExportConfig.ts";
import {yahooDefaultConfig,YahooExportConfig} from "../configs/YahooConfig.ts";
import { ClassicFile } from "../file/ClassicFile.ts";
import open from "open";

/**
 * @brief Gestion de l'export yahoo
 */
export class YahooExporter{
    /**
     * @brief Configuration d'export
     */
    protected exportConfig: YahooExportConfig;

    /**
     * @brief Gestionnaire du dossier racine
     */
    protected baseDirectoryManager:ClassicFile;

    /**
     * @brief Mode d'export
     */
    protected exportMode?:ExportType<ExportPoliciesTypes>;

    /**
     * @param exportConfig Configuration d'export
     */
    constructor(exportConfig: YahooExportConfig){
        // construction des chemins
        if(!(exportConfig.savePath.endsWith("/") || exportConfig.savePath.endsWith("\\")) )
            exportConfig.savePath += "/";

        this.exportConfig = exportConfig;
        
        const baseDirPath = `${exportConfig.savePath}${YahooExporter.formatDirname(exportConfig.saveDirname)}/`;
        this.baseDirectoryManager = new ClassicFile(baseDirPath);

        // recherche de la politique d'export (dépendance circulaire avec exportpolicy évité)
        const exportModeConfig:ExportType<ExportPoliciesTypes>|undefined = ExportConfig.find((config:ExportType<ExportPoliciesTypes>) => config.value === this.exportConfig.exportMode);

        this.exportMode = exportModeConfig;
    }

    /**
     * 
     * @param exportConfig 
     * @returns si l'export réussit
     */
    public async export():Promise<void>{
        return new Promise((resolve,reject) => {
            try{
                if(this.exportMode === undefined)
                    throw new Error();

                // création du dossier racine des résultats, dossier des fichiers joints et des fichiers d'export
                if(!this.baseDirectoryManager.createDirectory()){
                    reject("Echec de création du dossier résultat");
                    return;
                }

                /**
                 * @todo Rajouter un fichier de description de la sauvegarde
                 */

                this.launchExport(resolve,reject);
            }
            catch(_){
                this.baseDirectoryManager.deleteDirectory();
                reject("Une erreur s'est produite lors de l'exportation");
            }
        });
    }

    /**
     * @returns Gestionnaire du dossier racine
     */
    public getBaseDirectoryManager():ClassicFile{
        return this.baseDirectoryManager;
    }

    /** 
     * @returns Le mode d'export
     */
    public getExportMode():ExportType<ExportPoliciesTypes>|undefined{
        return this.exportMode;
    }

    /**
     * @returns La configuration d'export
     */
    public getExportConfig():YahooExportConfig{
        return this.exportConfig;
    }

    /**
     * @brief Lance l'exportation
     * @param resolve résolveur de promesse 
     * @param reject rejet de promesse
     */
    protected async launchExport(resolve:(value: void | PromiseLike<void>) => void,reject: (reason?: any) => void):Promise<void>{
        const exportPolicy = new this.exportMode!.policy(this);

        /**
         * @todo supprimer le test
         */
        await exportPolicy
            .export({
                subject: "Sujet de test",
                message: "Contenu du mail de test",
                attachments: [],
                sendDate: "07-07-2024"
            })
            .catch((error:string) => {
                reject(error);
            });

        await exportPolicy
            .export({
                subject: "Sujet de test 2",
                message: "Contenu du mail de test 2",
                attachments: [],
                sendDate: "09-07-2024"
            })
            .catch((error:string) => {
                reject(error);
            });

        // finalisation
        await exportPolicy
            .finalize()
            .catch((error:string) => {
                reject(error);
            });

        resolve();

        // ouverture du dossier
        open(this.baseDirectoryManager.getAbsolutePath());
    }

    /**
     * @brief le nom du dossier 
     * @param dirname nom du dossier
     * @returns nom formatté
     */
    public static formatDirname(dirname:string):string{
        const replaceMap:Record<string,string> = {
            " ": "-"
        };

        for(const toReplace in replaceMap)
            dirname = dirname.replaceAll(toReplace,replaceMap[toReplace]);

        return dirname.toLowerCase();
    }
}
