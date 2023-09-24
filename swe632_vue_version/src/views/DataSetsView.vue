<template>
  <a class="uk-button uk-button-default" uk-toggle="target: #create-data-set-modal"><span uk-icon="plus" uk-tooltip="ADD DATA SET"></span></a>
  <div id="create-data-set-modal" uk-modal>
    <div class="uk-modal-dialog"><CreateDataSetModal /></div>
  </div>

  <table class="uk-table uk-table-striped uk-table-hover">
      <thead>
          <tr>
              <th>Data Set Name</th>
              <th>Data Points</th>
              <th>Actions</th>
          </tr>
      </thead>
      <tbody>
          <data-set
              v-for="(dataSet, key) in dataSets" 
              :key="key"
              :setKey="key"
              :dataSet="dataSet"
              @updated-name="updateDataSetName">
          </data-set>
      </tbody>
  </table>
</template>


<script>
import CreateDataSetModal from '../modals/CreateDataSetModal.vue';

export default {
  components: {
        CreateDataSetModal,
  },
  data() {
    let sampleDataSets = new Map();
      sampleDataSets.set("abc", {name:  "Gangadaran's Hike Up Old Rag Mountain", mapName: "Gangadaran's Adventures", color: "#FF69C4", dataPoints: 14514});
      sampleDataSets.set("abcd", {name:  "Mariela's Hike Up Old Rag Mountain", dataPoints: 49052});
      sampleDataSets.set("adf", {name:  "Mackenzie's Hike Up Old Rag Mountain", dataPoints: 45765});
      sampleDataSets.set("dfasdf", {name:  "Gangadaran's Hike Up Outlook Mountain", mapName: "Gangadaran's Adventures", color: "#FF69C4", dataPoints: 3704});
      sampleDataSets.set("gfg", {name:  "Mariela's Hike Up Outlook Mountain", mapName: "", color: "", dataPoints: 6554});
      sampleDataSets.set("ewrwr", {name:  "Mackenzie's Hike Up Outlook Mountain", mapName: "", color: "", dataPoints: 68014});
      sampleDataSets.set("dfdf", {name:  "Gangadaran's Hike Up Spruce Mountain", mapName: "Team Trip to West Virginia", color: "#FF69C4", dataPoints: 36242});
      sampleDataSets.set("gfgf", {name:  "Mariela's Hike Up Spruce Mountain", mapName: "Team Trip to West Virginia", color: "#FF69C4", dataPoints:  15040});
      sampleDataSets.set("gfgf", {name:  "Mackenzie's Hike Up Spruce Mountain", mapName: "Gangadaran's Adventures", color: "#FF69C4", dataPoints: 22829});
    return {
        sampleDataSets
    }
  },
  computed: {
    dataSets() {
      const dataSetsObject = {};
      this.sampleDataSets.forEach((value, key) => {
        dataSetsObject[key] = value;
      });
      return dataSetsObject;
    },
  },
  methods: {
    updateDataSetName(key, originalName, newDataSetName) {
      console.log("CBC: key is " + key);
      console.log("CBC: the orignal name is " + originalName);
      console.log("CBC: the newDataSetName name is " + newDataSetName);
      
      this.sampleDataSets.get(key).name = newDataSetName;
    }
  }
};
</script>
