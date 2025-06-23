<template>
    <div class="mb-6">
        <label>{{ name }}</label>
        <input :type="type" v-model="model" :class="{'!ring-red-500' : message}"/>
        <small class="" v-if="message" >{{ message }}</small>

    </div>
</template>
<script>
export default {
    props:{
        name:{
            type: String,
            required: true
        },
        type: {
            type:String,
            default: "text"
        },
        message: String,
    },
    setup(){
        const model = defineModel({
            type: null,
            required: true
        })

        return model
    }

}
</script>
