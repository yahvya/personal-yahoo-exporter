import { MailConfig } from "../configs/MailConfig.ts";
import { ExportPolicy } from "./ExportPolicy.ts";

/**
 * @brief Politique de sauvegarde dans un document word
 */
export class WordDocumentPolicy extends ExportPolicy{
    public async export(mailConfig: MailConfig): Promise<void> {
        return new Promise((resolve,reject) => {
            
        });
    }
}
