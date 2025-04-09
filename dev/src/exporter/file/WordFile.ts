import { ExportableFile } from "./ExportableFile.ts";
import {Packer} from "docx";
import fs from "node:fs";
import { Buffer } from "node:buffer";

/**
 * @brief Gestion de fichier word
 */
export class WordFile extends ExportableFile{
    /**
     * @brief Enregistre le document word
     * @param document Le document à sauvegarder
     * @returns promesse de success
     */
    public async save(document:Document):Promise<void>{
        return new Promise((resolve,reject) => {
            try{
                Packer.toBuffer(document)
                    .then((buffer:Buffer) => {
                        fs.writeFileSync(this.absolutePath, buffer);
                        resolve();
                    })
                    .catch((_:any) => reject("Une erreur s'est produite lors de la sauvegarde du document"));
            }
            catch(_){
                reject("Une erreur s'est produite lors de la sauvegarde du document");
            }
        });
    }
}
