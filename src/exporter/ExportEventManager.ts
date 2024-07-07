import { ipcMain, WebContents } from "electron"
import {eventsConfig} from "./EventsConfig.ts";
import {yahooConfig} from "./YahooConfig.ts";

/**
 * @brief Gestionnaire d'évènements d'export
 */
export default class ExportEventManager{
    protected formDatas: [string:string];
    protected sender: WebContents;

    /**
     * @param sender envoyeur
     * @param formDatas Données du formulaire
     */
    constructor(sender: WebContents,formDatas:[string:string]){
        this.formDatas = formDatas;
        this.sender = sender;
    }

    /**
     * @brief Lance le processus d'exportation
     */
    protected async export():Promise<void>{
        // this.sender.send(eventsConfig.exportResult.name);
    }

    /**
     * @brief Setup la réception d'évènements
     */
    static setupEvents():void{
        ipcMain.on(eventsConfig.launchExport.name,(event,formData) => new ExportEventManager(event.sender,formData).export());
    }
}
