<template>
    <div class="uk-modal-body">
        <h2 class="">Permanently Delete Data Set</h2>
        <div class="uk-form uk-margin">
            <b>Data Set</b>
            <input type="text" class="uk-width-1-1 uk-input" placeholder="TODO: autofill with name"  readonly disabled>
        </div>
        <div class="uk-align-right">
            <a class="uk-button uk-button-primary  uk-modal-close" type="a">DELETE</a>
            <a class="uk-button uk-button-danger  uk-modal-close" type="a">CANCEL</a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DeleteDataSetModal',
    setup() {
        
    },
}
</script>