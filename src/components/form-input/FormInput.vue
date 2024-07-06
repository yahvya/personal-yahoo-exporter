<script>
    import "./FormInput.css";

    export default{
    }
</script>

<template>
    <input 
        class="form-input upper-bg"
        :type="type"
        :required="isRequired"
        :placeholder="placeholder"
    />
</template>
