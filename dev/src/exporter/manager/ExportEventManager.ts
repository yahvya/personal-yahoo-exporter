import { ipcMain, WebContents } from "electron"
import {eventsConfig, EventState} from "../configs/EventsConfig.ts";
import { YahooExporter } from "./YahooExporter.ts";
import { YahooExportConfig } from "../configs/YahooConfig.ts";

/**
 * @brief Gestionnaire d'évènements d'export
 */
export class ExportEventManager{
    /**
     * @broef Utilitaire de require
     */
    public static appRequire?:NodeRequire;

    /**
     * @brief Données du formulaire
     */
    protected formDatas: YahooExportConfig;

    /**
     * @brief Envoyeur d'évènement
     */
    protected sender: WebContents;

    /**
     * @param sender envoyeur
     * @param formDatas Données du formulaire
     */
    constructor(sender: WebContents,formDatas:YahooExportConfig){
        this.formDatas = formDatas;
        this.sender = sender;
    }

    /**
     * @brief Lance le processus d'exportation
     */
    protected async export():Promise<void>{
        try{
            new YahooExporter(this.formDatas)
                .export()
                .then(() => this.sendSuccess())
                .catch((errorMessage:string) => this.sendFailure(errorMessage));
        }
        catch(_){
            this.sendFailure("Une erreur s'est produite lors de l'export des données");
        }
    }

    /**
     * @brief Envoi un message d'erreur
     */
    protected sendSuccess():void{
        this.sender.send(eventsConfig.exportResult.name,EventState.SUCCESS);
    }

    /**
     * @brief Envoi un message d'erreur
     * @param errorMessage message d'erreur
     */
    protected sendFailure(errorMessage:string):void{
        this.sender.send(eventsConfig.exportResult.name,EventState.FAILURE,errorMessage);
    }

    /**
     * @brief Setup la réception d'évènements
     * @param appRequire utilitaire de require
     */
    public static setupEvents(appRequire:NodeRequire):void{
        ExportEventManager.appRequire = appRequire;
        ipcMain.on(eventsConfig.launchExport.name,(event,formData) => new ExportEventManager(event.sender,formData).export());
    }
}
