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
    attachments:Array<AttachmentConfig>;
}

/**
 * @brief Description des fichiers joints
 */
export interface AttachmentConfig{
    /**
     * @brief Type d'élément
     */
    type:string;

    /**
     * @brief Nom du fichier dans le dossier des fichiers joints 
     */
    filename?:string;
}
