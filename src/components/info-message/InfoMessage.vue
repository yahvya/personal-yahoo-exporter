<script>
    export default{
        props: {
            isCentered: Boolean
        }
    }
</script>

<template>
    <p 
        :class="{centered: isCentered}"
        class="info-message upper-bg"
    ><slot></slot></p>
</template>

<style src="./InfoMessage.css" scoped>

</style>
