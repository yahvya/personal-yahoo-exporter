/**
 * @brief Configuration yahoo
 */
export interface YahooConfig{
    url: string;
}

/**
 * @brief Configuration d'export de yahoo
 */
export interface YahooExportConfig{
    /**
     * @brief Email utilisateur yahoo
     */
    userEmail: string;
    /**
     * @brief Mot de passe utilisateur yahoo
     */
    userPassword: string;
    /**
     * @brief Email de la personne conversé
     */
    conversationEmail: string;
    /**
     * @brief Chemin du dossier racine de sauvegarde
     */
    savePath: string;
    /**
     * @brief Nom du dossier à créer contenant les données de sauvegarde
     */
    saveDirname: string;
    /**
     * @brief Mode d'exportation
     */
    exportMode: string;
    /**
     * @brief Mode de contrôle
     */
    controlChoice: string;
}

/**
 * @brief Configuration par défaut de yahoo
 */
export const yahooDefaultConfig:YahooConfig = {
    url: "https://fr.yahoo.com/"
};

