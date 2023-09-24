<template>
    <div class="uk-modal-dialog uk-modal-body">
        <h2 class="">Add Data Set to Map</h2>
        <div class="uk-form uk-margin">
            <b>Map Name</b> (the map will be created, if it does not already exist)
            <input type="text" class="uk-width-1-1 uk-input">
        </div>
        <div class="uk-form uk-margin">
            <b>Data Set</b> (name or permalink)
            <input type="text" class="uk-width-1-1 uk-input">
        </div>
        <div class="uk-align-right">
            <a class="uk-button uk-button-primary  uk-modal-close" type="a">CREATE</a>
            <a class="uk-button uk-button-danger  uk-modal-close" type="a">CANCEL</a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AddDataSetToMapModal',
    setup() {
        
    },
}
</script>