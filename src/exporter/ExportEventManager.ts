import { ipcMain } from "electron";
import {EventConfig, eventsConfig} from "./EventsConfig";

/**
 * @brief Gestionnaire d'évènements d'export
 */
export default class ExportEventManager{
    static setupEvents():void{
        for(const configKey in eventsConfig){
            const {name}: EventConfig = eventsConfig[configKey];

            ipcMain.on(name,(event,formDatas) => {
                
            });
        }
    }
}
