import fs from "node:fs";
import path from "node:path";

/**
 * @brief Fichier exportable
 */
export abstract class ExportableFile{
    /**
     * @brief Chemin absolu du fichier
     */
    protected absolutePath:string;

    /**
     * 
     * @param path Chemin absolu du fichier
     */
    constructor(absolutePath:string){
        this.absolutePath = path.normalize(absolutePath);
    }

    /**
     * @brief Crée le dossier spécifié s'il n'existe pas déjà
     * @param checkDirExists si true et que le dossier existe déjà alors true, sinon si false et que le dossier existe alors false
     * @returns succès de création
     */
    public createDirectory(checkDirExists:boolean = true):boolean{
        try{
            const dirPath = this.getDirPath();
            const exist = fs.existsSync(dirPath);

            if(checkDirExists && exist)
                return true;

            if(exist)
                return false;

            fs.mkdirSync(dirPath);

            return true;
        }
        catch(_){
            return false;
        }
    }

    /**
     * @brief Supprime le dossier
     * @returns si suppression réussi
     */
    public deleteDirectory():boolean{
        try{
            fs.rmSync(this.getDirPath(),{recursive: true,force: true});
            return true;
        }
        catch(_){
            return false;
        }
    }

    /**
     * @returns Le chemin du dossier
     */
    public getDirPath():string{
        return path.extname(this.absolutePath).length === 0 ? this.absolutePath : path.dirname(this.absolutePath); 
    }

    /**
     * @returns Le chemin absolu
     */
    public getAbsolutePath():string{
        return this.absolutePath;
    }
}
