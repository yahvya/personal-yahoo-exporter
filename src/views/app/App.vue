<script>
    import "./App.css";
    import InfoMessage from "@/components/info-message/InfoMessage.vue";
    import FormInput from "@/components/form-input/FormInput.vue";

    export default{
        components: {
            InfoMessage: InfoMessage,
            FormInput: FormInput
        },
        datas: {
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
            type="text"
            required
            placeholder="Entrez votre email yahoo"
        />

        <FormInput
            type="password"
            required
            placeholder="Entrez votre mot de passe yahoo"
        />

        <FormInput
            type="password"
            required
            placeholder="Entrez l'email de la personne"
        />

        <p 
            class="section"
        >Informations de sauvegarde</p>

        <FormInput
            type="text"
            required
            placeholder="Entrez le chemin de sauvegarde"
        />

        <FormInput
            type="text"
            required
            placeholder="Entrez le nom du dossier de sauvegarde"
        />
        
        <p 
            class="section"
        >Mode de sauvegarde</p>

        <div class="flex-row align-center small-gap">
            
        </div>
    </form>
</template>
