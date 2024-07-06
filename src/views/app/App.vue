<script>
    import "./App.css";
    import InfoMessage from "@/components/info-message/InfoMessage.vue";
    import FormInput from "@/components/form-input/FormInput.vue";
    import Button from "@/components/button/Button.vue";
    import ExportConfig from "@/exporter/ExportConfig.ts";

    export default{
        components: {
            InfoMessage: InfoMessage,
            FormInput: FormInput,
            Button: Button
        },
        data(){
            return {
                exportConfig: ExportConfig
            }
        }
    }
</script>

<template>
    <p class="text-upper special-font text-center xx-large-fsize page-title">Exporteur de mail yahoo</p>

    <InfoMessage 
        isCentered
    >Veuillez fournir les informations demandées et patienter le temps de la récupération.</InfoMessage>

    <form
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
            name="user-email"
        />

        <FormInput
            required
            type="password"
            placeholder="Entrez votre mot de passe yahoo"
            name="user-password"
        />

        <FormInput
            required
            type="email"
            placeholder="Entrez l'email de la personne"
            name="conversation-email"
        />

        <p 
            class="section"
        >Informations de sauvegarde</p>

        <FormInput
            required
            type="text"
            placeholder="Entrez le chemin de sauvegarde"
            name="save-path"
        />

        <FormInput
            required
            type="text"
            placeholder="Entrez le nom du dossier de sauvegarde"
            name="save-dirname"
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
                    name="save-mode"
                    :value="config.value"
                    :id="'method-' + config.value"
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
                />
            </div>
        </div>
        
        <Button>Démarrer la récupération</Button>
    </form>
</template>
