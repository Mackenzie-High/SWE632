<template>
    <div class="uk-modal-body">
        <h2 class="">Upload Data Set</h2>
        <div class="uk-form uk-margin">
            <b>Data File</b>
            <input type="file" class="uk-width-1-1 uk-input" readonly>
        </div>
        <div class="uk-align-right">
            <a class="uk-button uk-button-primary  uk-modal-close" type="a">UPLOAD</a>
            <a class="uk-button uk-button-danger  uk-modal-close" type="a">CANCEL</a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'UploadDataSetModal',
    setup() {
        
    },
}
</script>