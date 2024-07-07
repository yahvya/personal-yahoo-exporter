/**
 * @brief Configuration de mail
 */
export interface MailConfig{
    /**
     * @brief Sujet du mail
     */
    subject:string;

    /**
     * @brief Date d'envoi
     */
    sendDate:string;

    /**
     * @brief Contenu du message
     */
    message:string;

    /**
     * @brief Fichiers joints
     */
    joinedFiles:Array<JoinedFiles>;
}

/**
 * @brief Description des fichiers joints
 */
export interface JoinedFiles{
    
}
