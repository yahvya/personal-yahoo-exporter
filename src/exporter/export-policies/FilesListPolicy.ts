import { MailConfig } from "../configs/MailConfig.ts";
import { ExportPolicy } from "./ExportPolicy.ts";

/**
 * @brief Politique de sauvegarde d'un fichier par mail
 */
export class FilesListPolicy extends ExportPolicy{
    public async export(mailConfig: MailConfig): Promise<void> {
        return new Promise((resolve,reject) => {
            
        });
    }
}
