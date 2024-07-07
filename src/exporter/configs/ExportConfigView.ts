/**
 * @brief Configuration de moyen d'export
 */
export interface ExportType{
    label: string;
    value: string;
}

/**
* @brief Configuration des possibilités d'export
 */
export const ExportConfig: Array<ExportType> = [
    {
        label: "Document word",
        value: "word-document"
    },
    {
        label: "Suite de fichiers",
        value: "files-list"
    },
]; 
