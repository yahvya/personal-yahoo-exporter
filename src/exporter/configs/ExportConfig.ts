import { FilesListPolicy } from "../export-policies/FilesListPolicy.ts";
import { WordDocumentPolicy } from "../export-policies/WordDocumentPolicy.ts";

/**
 * @brief Configuration de moyen d'export
 */
export interface ExportType<PolicyType>{
    label: string;
    value: string;
    policy: PolicyType;
}

/**
 * @brief Types de polices possibles
 */
export type ExportPoliciesTypes = 
    typeof WordDocumentPolicy | 
    typeof FilesListPolicy;

/**
* @brief Configuration des possibilités d'export
 */
export const ExportConfig: Array<ExportType<ExportPoliciesTypes>> = [
    {
        label: "Document word",
        value: "word-document",
        policy: WordDocumentPolicy
    },
    {
        label: "Suite de fichiers",
        value: "files-list",
        policy: WordDocumentPolicy
    },
]; 
