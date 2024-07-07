import { MailConfig } from "../configs/MailConfig.ts";
import { YahooExporter } from "../manager/YahooExporter.ts";

/**
 * @brief Police d'export
 */
export abstract class ExportPolicy{
    /**
     * @brief Instance d'exportation
     */
    protected yahooExporter:YahooExporter;

    /**
     * @param yahooExporter Instance d'exportation
     */
    constructor(yahooExporter:YahooExporter){
        this.yahooExporter = yahooExporter;
    }

    /**
     * @brief Exporte le mail
     * @param mailConfig Configuration de mail
     * @returns Promosse de réussite ou echec
     */
    public abstract export(mailConfig:MailConfig):Promise<void>;
}
