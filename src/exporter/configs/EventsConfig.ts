/**
 * @brief Configuration d'un évènement
 */
export interface EventConfig{
    name: string;
}

/**
 * @brief Configuration des événèments
 */
export interface EventsConfig{
    [key:string]:EventConfig;
}

/**
 * @brief Etat d'un évènement
 */
export enum EventState{
    FAILURE,
    SUCCESS,
    INFO
}

/**
 * @brief Configuration des évènements d'export
 */
export const eventsConfig: EventsConfig = {
    launchExport: {
        "name": "launchExport"
    },
    exportResult: {
        "name": "exportResult"
    }
};
