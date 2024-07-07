import { ExportableFile } from "./ExportableFile.ts";
import fs from "node:fs";

/**
 * @brief Gestion de fichier classique
 */
export class ClassicFile extends ExportableFile{
    public save(fileLines:Array<string>):boolean{
        try{
            fs.writeFileSync(this.absolutePath,fileLines.join("\n\n"),{
                flag: "w+",
                encoding: "utf8"
            });
    
            return true;
        }
        catch(_){
            return false;
        }
    }
}
