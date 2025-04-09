# Yahoo exporter

> Software to export Yahoo Mail conversation

## Important informations

- **Licence** : Licence MIT
> You are free to use the framework in commercial and non-commercial projects. However, creating and selling a modified version of the framework itself or his documentation - as a competing product - is not permitted.
- **Creation date** : 06.07.2024

## Team

- Bathily Yahaya : Developer

## GitHub Structure

### Branch

- master (complete versions) - PROTECTED BY PULL REQUEST
- dev (developed features) - PROTECTED BY PULL REQUEST
- autotests (developed automatic tests) - PROTECTED BY PULL REQUEST
- design (available design elements) - PROTECTED BY PULL REQUEST
- documentation (developed documentation) - PROTECTED BY PULL REQUEST
- features/<branch_name>/<feature_name>

### Folder structure

- dev (application code)
- autotests (automatic tests)
- design (design elements)
- documentation (documentation elements)
- versions (application versions)
- devtools (custom development tools)
- .github/workflows (github action configs)

### GitHub Flow

- main : the main branch merge elements from (dev, autotests, design, documentation)
- (dev, autotests, design, documentation) : these branches merge elements from feature branches
- features/<branch_name>/<feature_name> : features branches are created from the <branch_name> branch

### Commit norm

Each commit line is prefixed by :

- ADD : for new code
- FIX : for changes due to a problem
- MODIFY : for changes
- DELETE : for deletion

## Prerequisites

- Git
- Make
- Docker
- Typescript

## Technologies

- GitHub : Code version manager
- Make : Quick commands for utilities
- Docker
- ElectronJS
- VueJS
- Puppeteer
- Docx

## Quick launch process

### For the project

- Launch the makefile command "project-print-init"

## Util links 

- [GitHub Project](https://github.com/users/yahvya/projects/18)

## Features

- Export of conversations as a list of files  
  - This method exports emails by creating a folder per email  
  - This folder contains the content of the email  
  - **In the next version, attachment handling will add the files into the email folder**
- Export of conversations as Word documents  
  - This method exports emails into a single Word document  
  - A new document is created if the internal character limit of the software is reached  
  - **In the next version, attachment handling will add the files into a folder**