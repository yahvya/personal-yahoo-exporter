# Exporteur de conversation yahoo

> Mini logiciel d'export de conversations YahooMail

## Fonctionnalités

- Export de conversations sous la forme d'une liste de fichiers
  - Cette méthode exporte les mails en créant un dossier par mail
  - Ce dossier comporte le contenu du mail
  - **Dans la prochaine version la gestion des fichiers joints ajoutera les fichiers dans le dossier du mail**
- Export de conversations sous la forme de documents words
  - Cette méthode exporte les mails dans un seul document word
  - Un nouveau document est créé si la limite de caractères interne au logiciel est atteinte
  - **Dans la prochaine version la gestion des fichiers joints ajoutera les fichiers dans un dossier**

## Technologies

- VueJs + ElectronJs (typescript)
- Puppeteer (gestion du scrapping)
- Docx (création de documents word)
