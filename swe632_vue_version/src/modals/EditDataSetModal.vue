<template>
    <div class="uk-modal-body">
        <h2>Rename Data Set ({{dataSetKey}})</h2>
        <div class="uk-form uk-margin">
            <b>Old Data Set Name</b>
            <input type="text" class="uk-width-1-1 uk-input" :value="originalName" readonly disabled>
        </div>
        <div class="uk-form uk-margin">
            <b>New Data Set Name</b>
            <input v-model="newDataSetName" type="text" class="uk-width-1-1 uk-input">
        </div>
        <div class="uk-align-right">
            <a class="uk-button uk-button-primary uk-modal-close" @click="renameDataSet" type="a">RENAME</a>
            <a class="uk-button uk-button-danger  uk-modal-close" type="a">CANCEL</a>
        </div>
    </div>
</template>

<script>

export default {
    name: 'EditDataSetModal',
    props: {
        dataSetKey: String,
        originalName: String,
    },
    emits: ['updated-name'],
    data() {
        return {
            newDataSetName: '',
        }
    },
    methods: {
        renameDataSet() {
            this.$emit('updated-name', this.dataSetKey, this.originalName, this.newDataSetName);
        }
    }
}
</script>