import { AttachmentConfig, MailConfig } from "../configs/MailConfig.ts";
import { ClassicFile } from "../file/ClassicFile.ts";
import { ExportPolicy } from "./ExportPolicy.ts";

/**
 * @brief Politique de sauvegarde d'un fichier par mail
 */
export class FilesListPolicy extends ExportPolicy{
    /**
     * @brief Compteur
     */
    protected mailCounter:number = 0;

    public async export(mailConfig: MailConfig): Promise<void> {
        return new Promise((resolve,reject) => {
            this.mailCounter++;

            // création du dossier du mail
            const newDirPath = `${this.yahooExporter.getBaseDirectoryManager().getAbsolutePath()}/${this.mailCounter}/`;
            const mailContentFileManager = new ClassicFile(`${newDirPath}mail.txt`);
            
            if(!mailContentFileManager.createDirectory()){
                reject("Echec de création du dossier du mail");
                return;
            }

            // création du contenu du mail
            const saveContent = [
                `Sujet: ${mailConfig.subject}`,
                `Date: ${mailConfig.sendDate}`,
                "Message:",
                mailConfig.message,
                "Fichiers joints:"
            ];

            if(mailConfig.attachments.length > 0){
                // gestion des fichiers joints
                const attachementsDirManager = new ClassicFile(`${newDirPath}fichiers-joints/`);

                if(!attachementsDirManager.createDirectory()){
                    reject("Echec de création du dossier des fichiers joints");
                    return;
                }

                mailConfig.attachments.forEach((config:AttachmentConfig) => {
                    /**
                     * @todo supprimer le test
                     */
                    config.filename = "test";
                    
                    saveContent.push(`\t- Nom du fichier: ${config.filename} - Type : ${config.type}`);
                });
            }
            else
                saveContent.push("Aucun fichier joint dans ce mail");

            // sauvegarde du fichier du mail
            if(!mailContentFileManager.save(saveContent)){
                reject("Echec de sauvegarde du fichier du mail");
                return;
            }

            resolve();
        });
    }
}
