<script>
    import "./App.css";
    import InfoMessage from "@/components/info-message/InfoMessage.vue";
    import FormInput from "@/components/form-input/FormInput.vue";
    import Button from "@/components/button/Button.vue";
    import Loader from "@/components/loader/Loader.vue";
    import ExportConfig from "@/exporter/ExportConfig.ts";
    import {eventsConfig} from "@/exporter/EventsConfig.ts";

    export default{
        components: {
            InfoMessage: InfoMessage,
            FormInput: FormInput,
            Button: Button,
            Loader: Loader
        },
        data(){
            return {
                exportConfig: ExportConfig,
                isValidating: false,
                form: {
                    userEmail: "test@yahoo.fr",
                    userPassword: "test-password",
                    conversationEmail: "test2@yahoo.fr",
                    savePath: "C://path",
                    saveDirname: "savedir",
                    exportMode: "files-list",
                    controlChoice: "yes"
                }
            }
        },
        setup(){
            window.ipcRenderer.on(eventsConfig.exportResult.name,() => {

            });
        },
        methods: {
            submitForm(){
                if(this.isValidating)
                    return;
                
                this.isValidating = true;
                window.ipcRenderer.send(eventsConfig.launchExport.name,{...this.form});
            }
        }
    }
</script>

<template>
    <Loader
        v-if="isValidating"
    />

    <p class="text-upper special-font text-center xx-large-fsize page-title">Exporteur de mail yahoo</p>

    <InfoMessage 
        isCentered
    >Veuillez fournir les informations demandées et patienter le temps de la récupération.</InfoMessage>

    <form
        @submit.prevent="submitForm"
        action="#"
        class="app-form"
    >
        <p 
            class="section"
        >Informations yahoo</p>

        <FormInput
            required
            type="text"
            placeholder="Entrez votre email yahoo"
            v-model="form.userEmail"
        />

        <FormInput
            required
            type="password"
            placeholder="Entrez votre mot de passe yahoo"
            v-model="form.userPassword"
        />

        <FormInput
            required
            type="email"
            placeholder="Entrez l'email de la personne"
            v-model="form.conversationEmail"
        />

        <p 
            class="section"
        >Informations de sauvegarde</p>

        <FormInput
            required
            type="text"
            placeholder="Entrez le chemin de sauvegarde"
            v-model="form.savePath"
        />

        <FormInput
            required
            type="text"
            placeholder="Entrez le nom du dossier de sauvegarde"
            v-model="form.saveDirname"
        />
        
        <p 
            class="section"
        >Mode de sauvegarde</p>

        <div class="flex-row align-center small-gap">
            <div
                v-for="config in exportConfig"
                class="choice flex-row align-center small-gap"
            >
                <label
                    :for="'method-' + config.value"
                >{{ config.label }}</label>
                <FormInput
                    required
                    type="radio"
                    name="export-mode"
                    :value="config.value"
                    :id="'method-' + config.value"
                    v-model="form.exportMode"
                />
            </div>
        </div>

        <p
            class="section"
        >Voir ce qui se passe</p>

        <div class="flex-row align-center small-gap">
            <div
                class="choice flex-row align-center small-gap"
            >
                <label
                    for="yes-choice"
                >Oui</label>
                <FormInput
                    required
                    type="radio"
                    name="control-choice"
                    value="yes"
                    id="yes-choice"
                    v-model="form.controlChoice"
                />
            </div>

            <div
                class="choice flex-row align-center small-gap"
            >
                <label
                    for="no-choice"
                >Non</label>
                <FormInput
                    required
                    type="radio"
                    name="control-choice"
                    value="no"
                    id="no-choice"
                    v-model="form.controlChoice"
                />
            </div>
        </div>
        
        <Button>Démarrer la récupération</Button>
    </form>
</template>
