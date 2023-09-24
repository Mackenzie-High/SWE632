<template>
    <tr>
        <td>{{ dataSet.name }} (Key: {{setKey}}) </td>
        <td>{{ dataSet.dataPoints}}</td>
        <td>
            <a uk-icon="pencil" class="rename"     uk-tooltip="RENAME" uk-toggle="target: #edit-data-set-modal"></a>
            <a uk-icon="upload" class="upload"     uk-tooltip="UPLOAD" uk-toggle="target: #upload-data-set-modal"></a>
            <a uk-icon="link"   class="permalink"  uk-tooltip="PERMALINK" uk-toggle="target: #link-data-set-modal"></a>
            <a uk-icon="trash"  class="red delete" uk-tooltip="DELETE" uk-toggle="target: #delete-data-set-modal"></a>
        </td>
    </tr>
    <div id="edit-data-set-modal" uk-modal>
        <div class="uk-modal-dialog"><EditDataSetModal :dataSetKey="setKey" :originalName="dataSet.name" @updated-name="updateName"/></div>
    </div>

    <div id="upload-data-set-modal" uk-modal>
        <div class="uk-modal-dialog"><UploadDataSetModal /></div>
    </div>

    <div id="link-data-set-modal" uk-modal>
        <div class="uk-modal-dialog"><LinkDataSetModal /></div>
    </div>
    
    <div id="delete-data-set-modal" uk-modal>
        <div class="uk-modal-dialog"><DeleteDataSetModal /></div>
    </div>
</template>

<script>
import EditDataSetModal from '../modals/EditDataSetModal.vue';
import UploadDataSetModal from '../modals/UploadDataSetModal.vue';
import LinkDataSetModal from '../modals/LinkDataSetModal.vue';
import DeleteDataSetModal from '../modals/DeleteDataSetModal.vue';

export default {
    props: {
        setKey: String,
        dataSet: Object,
    },
    emits: ['updated-name'],
    components: {
        EditDataSetModal,
        UploadDataSetModal,
        LinkDataSetModal,
        DeleteDataSetModal
    },
    data() {
        return {
            dataSetKey: this.setKey,
            originalName: this.dataSet.name,
            
        }
    },
    methods: {
        updateName(dataSetKey, originalName, newDataSetName) {
            this.$emit('updated-name', dataSetKey, originalName, newDataSetName);
        }
    }
}
</script>
