/**
 * @brief Descripteur des sélecteurs
 */
export interface YahooSelectors{
    /**
     * @brief Boutton d'accès à la page de connexion à partir de l'accueil
     */
    loginAccessButtonSelector:string;

    /**
     * @brief Champs de saisi de l'email
     */
    emailInputSelector:string;
    
    /**
     * @brief Boutton de continuation d'action après champs de saisi d'email
     */
    emailNextButtonSelector:string;

    /**
     * @brief Champs de saisi du mot de passe
     */
    passwordInputSelector:string;

    /**
     * @brief Boutton de connexion
     */
    signingButtonSelector:string;

    /**
     * @brief Icône d'accès aux mails
     */
    mailAccessIconSelector:string;

    /**
     * @brief Barre de recherche (input) de la page principale des mails
     */
    searchbarSelector:string;

    /**
     * @brief Boutton de validation de recherche de la page des mails
     */
    searchValidationButtonSelector:string;

    /**
     * @brief Sélecteur d'une ligne de résultat de mail
     */
    mailRowSelector:string;

    /**
     * @brief Sujet d'un mail ouvert
     */
    aMailSubjectSelector:string;

    /**
     * @brief Date d'envoi d'un mail ouvert
     */
    aMailSendDateSelector:string;
    
    /**
     * @brief Contenu d'un mail ouvert
     */
    aMailContentSelector:string;

    /**
     * @brief Lien menant à la page de groupe de mail suivant 
     */
    nextMailPageSelector:string;
}

/**
 * @brief Descripteur de compte yahoo
 */
export interface YahooAccountConfig{
    /**
     * @brief Email utilisateur
     */
    email:string;
    /**
     * @brief Mot de passe utilisateur
     */
    password:string;
    /**
     * @brief Email de la personne avec qui converse
     */
    conversationEmail:string;
}
