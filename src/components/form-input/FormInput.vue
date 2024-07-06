<script>
    import "./FormInput.css";

    export default{
        props: ["modelValue"]
    }
</script>

<template>
    <input 
        class="form-input upper-bg"
        :type="type"
        :required="isRequired"
        :placeholder="placeholder"
        :value="modelValue" 
        @input="$emit('update:modelValue', $event.target.value)"
    />
</template>
