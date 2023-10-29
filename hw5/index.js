// Import Vue
const { getCurrentInstance, createApp, reactive } = Vue;

// Citation: https://stackoverflow.com/questions/105034/how-do-i-create-a-guid-uuid
function uuidV4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

function resetFileUploads() {
  document.getElementById("file_upload_1").value = null;
}

// When a user selects a file to upload, the file is immediately read,
// and this dict is populated with the GeoJSON from the file.
var upload = {};

// Data Model
const model = {
  add_dataset_modal: {
    name: "",
  },

  add_dataset_to_map_modal: {
    name: "",
    dataset: "",
  },

  rename_dataset_modal: {
    old_name: "",
    new_name: "",
  },

  upload_dataset_modal: {
    name: "",
    uuid: "",
    file: "",
    geoJsonData: null,
  },

  dataToBeUploadedTemp: [],

  permalink_dataset_modal: {
    text: "",
    href: "",
  },

  permalink_map_modal: {
    text: "",
    href: "",
  },

  delete_dataset_modal: {
    name: "",
    uuid: "",
  },

  unlink_dataset_modal: {
    name: "",
    dataset: "",
  },

  datasets: {
    "2fc96bb8-d532-43a8-8b2d-3e6ac0fb66ba" : {
      uuid: "2fc96bb8-d532-43a8-8b2d-3e6ac0fb66ba",
      name: "Gangadaran's Hike Up Old Rag Mountain",
    },
    "d586ffc7-6f0d-4d6c-8163-86b16d31fe0b" : {
      uuid: "d586ffc7-6f0d-4d6c-8163-86b16d31fe0b",
      name: "Mariela's Hike Up Old Rag Mountain",
    },
    "0fd1c9c2-ece2-4abf-9dc7-b1ef5ff2ad52" : {
      uuid: "0fd1c9c2-ece2-4abf-9dc7-b1ef5ff2ad52",
      name: "Mackenzie's Hike Up Old Rag Mountain",
    },
    "5395f7fe-4e60-4096-84aa-c27d07d7002b" : {
      uuid: "5395f7fe-4e60-4096-84aa-c27d07d7002b",
      name: "Gangadaran's Hike Up Outlook Mountain",
    },
    "1aa5b13d-21c4-482e-b2de-69a9e832457c" : {
      uuid: "1aa5b13d-21c4-482e-b2de-69a9e832457c",
      name: "Mariela's Hike Up Outlook Mountain",
    },
    "2ca4ed6f-c189-4c0a-bbca-39c71ac33944" : {
      uuid: "2ca4ed6f-c189-4c0a-bbca-39c71ac33944",
      name: "Mackenzie's Hike Up Outlook Mountain",
    },
    "8dbd57eb-59c3-4da1-874b-0c53a0bf8b77" : {
      uuid: "8dbd57eb-59c3-4da1-874b-0c53a0bf8b77",
      name: "Gangadaran's Hike Up Spruce Mountain",
    },
    "a65da525-c9be-499b-9dbd-6e42b62e2575" : {
      uuid: "a65da525-c9be-499b-9dbd-6e42b62e2575",
      name: "Mariela's Hike Up Spruce Mountain",
    },
    "d35a8af6-46ce-4b1e-9883-c2bc8b2eea77" : {
      uuid: "d35a8af6-46ce-4b1e-9883-c2bc8b2eea77",
      name: "Mackenzie's Hike Up Spruce Mountain",
    },
  },

  maps: {
    "Gangadaran's Adventures":
    {
      name: "Gangadaran's Adventures",
      datasetList : {
        "2fc96bb8-d532-43a8-8b2d-3e6ac0fb66ba" : "#FF69B4",
        "8dbd57eb-59c3-4da1-874b-0c53a0bf8b77" : "#FF69B4",
        "5395f7fe-4e60-4096-84aa-c27d07d7002b" : "#FF69B4",
      },
    },
    "Team Trip to West Virginia":
    {
      name: "Team Trip to West Virginia",
      datasetList: {
        "8dbd57eb-59c3-4da1-874b-0c53a0bf8b77" : "#FF69B4",
        "d35a8af6-46ce-4b1e-9883-c2bc8b2eea77" : "#FF69B4",
        "a65da525-c9be-499b-9dbd-6e42b62e2575" : "#FF69B4",
      },
    },
  },

  current_map: {
    uuid: "",
    name: "",
    dataset: "",
    color: "",
  },

  currentMapData: {},
};

// Deeply Reactive Data Model,
// so that changes to nested data structures
// also cause automatic updates to the view.
const remodel = reactive(model);

window.appData = {
  map: remodel.currentMapData,
};

const VueApp = {
  data() {
    return remodel;
  },
  methods: {},
};

VueApp.methods.datasetFileChanged = function (event) {
  for (let file of event.target.files) {
    function parse(data) {
      const geoJSON = JSON.parse(data);
      const signature = md5(data);
      const upload = {
        name: file.name.replace(".json", ""),
        file: file,
        geoJsonData: geoJSON,
        signature: signature
      };
      remodel.dataToBeUploadedTemp.push(upload);
      console.log(upload);
    }

    const reader = new FileReader();
    reader.onload = (e) => parse(e.target.result);

    reader.readAsText(file);
  }
};

VueApp.methods.openCreateDataSet = function (name) {
  console.log("Open Create DataSet");
  resetFileUploads();
};

VueApp.methods.openRenameDataSet = function (name) {
  console.log("Open Rename DataSet");
  remodel.rename_dataset_modal.old_name = name;
};

VueApp.methods.openUploadDataSet = function (name, uuid) {
  console.log("Open Upload DataSet");
  remodel.upload_dataset_modal.name = name;
  remodel.upload_dataset_modal.uuid = uuid;
  resetFileUploads();
};

VueApp.methods.openPermalinkDataSet = function (name) {
  console.log("Open Permalink DataSet");
  remodel.permalink_dataset_modal.text = name;
  remodel.permalink_dataset_modal.href = name; // TODO
};

VueApp.methods.openDeleteDataSet = function (name, uuid) {
  console.log("Open Delete DataSet");
  remodel.delete_dataset_modal.name = name;
  remodel.delete_dataset_modal.uuid = uuid;
};

VueApp.methods.openCreateMap = function (name) {
  console.log("Open Create Map");
  remodel.add_dataset_to_map_modal.name = "";
  remodel.add_dataset_to_map_modal.dataset = "";
  remodel.add_dataset_to_map_modal.color = "#FF69B4";
};

VueApp.methods.openUnlinkMap = function (name, dataset) {
  console.log("Open Unlink Map");
  remodel.unlink_dataset_modal.name = name;
  remodel.unlink_dataset_modal.dataset = dataset;
};

VueApp.methods.openMap = function (mapName) {
  for (mapDataName in remodel.currentMapData) {
    delete remodel.currentMapData[mapDataName];
  }
  console.log("Clearing old map data... opening map...");

  remodel.current_map.name = mapName;
  const dataSetInfo = [];
  for (uuid in remodel.maps[mapName].datasetList) {
    const dataSetDetails = remodel.datasets[uuid];
    dataSetDetails.color = remodel.maps[mapName].datasetList[uuid];
    dataSetInfo.push(dataSetDetails);
  }
  remodel.currentMapData[mapName] = dataSetInfo;
  console.log(remodel.currentMapData);

  // Cause the "Map" tab to become visible in the switcher bar,
  // which is located at the top of the page.
  document.getElementById("map-switcher-tab").classList.remove("uk-invisible");
};

VueApp.methods.createDataSet = function (event) {
  try {
    console.log("Create DataSet");
    
    if (remodel.dataToBeUploadedTemp == []) {
      UIkit.modal.alert("ERROR: You must upload at least one file!");
      return;
    }

    for (let upload of remodel.dataToBeUploadedTemp) {

      // In the future, consider refactoring these checks out of the enclosing loop,
      // so that the checks are performed atomically. Currently, if an error is
      // detected midway through uploading multiple data sets, then the initial
      // data sets that were non-erronous will be uploaded. An error will be reported.
      // Then, any subsequent non-erronous uploads will be ignored.
      // Really, the upload should be all or nothing.
      // Be care though!
      // The Equivalent Data Set check checks against the known data sets.
      // If you simply move this loop, then there is a subtle bug,
      // such that equivalent data sets can be uploaded when using
      // the multiple upload functionality.
      for (dataset in remodel.datasets) {
        if (remodel.datasets[dataset].name == upload.name){
          UIkit.modal.alert(`ERROR: Duplicate dataset: ${upload.name}`);
          return;
        }
        if (remodel.datasets[dataset].signature == upload.signature){
          UIkit.modal.alert(`ERROR: Equivalent datasets: ${remodel.datasets[dataset].name} and ${upload.name}`);
          return;
        }
      }

      const uuid = uuidV4();
      const row = { uuid: uuid, name: upload.name, signature: upload.signature, color: "#FF69B4"};
      remodel.datasets[uuid] = row;
      console.log(row);

      geoJsonDataObject[uuid] = upload.geoJsonData;
    }
    
    UIkit.notification({message: 'Successfully created dataset!', status: 'success'});
    
  } finally {
    remodel.add_dataset_modal.name = "";
    remodel.add_dataset_modal.file = "";
    remodel.dataToBeUploadedTemp = [];
  }
};

VueApp.methods.renameDataSet = function (event) {
  console.log("Rename DataSet");
  console.log(event);

  const duplicateNewNameUuid = VueApp.methods.findDatasetUuidFromName(remodel.rename_dataset_modal.new_name);
  if (remodel.datasets[duplicateNewNameUuid] !== undefined) {
    UIkit.modal.alert(`ERROR: Duplicate dataset: ${remodel.rename_dataset_modal.new_name}`);
    return;
  }

  for (dataset in remodel.datasets) {
    if (remodel.datasets[dataset].name == remodel.rename_dataset_modal.old_name.trim()) {
      remodel.datasets[dataset].name = remodel.rename_dataset_modal.new_name.trim();
      break;
    }
  }
};

VueApp.methods.copyDataSetPermalink = function (event) {
  console.log("Pemalink DataSet");
};

VueApp.methods.deleteDataSet = function (event) {
  console.log("Delete DataSet");
  const uuid = remodel.delete_dataset_modal.uuid
  delete remodel.datasets[uuid];

  for (mapKey in remodel.maps) {
    const map = remodel.maps[mapKey];

    if (map.datasetList.hasOwnProperty(uuid)) {
      delete map.datasetList[uuid];
    }
  }

  console.log(remodel.datasets)
};

VueApp.methods.createMap = function (event) {
  console.log("Create Map");
  try {
    const name = remodel.add_dataset_to_map_modal.name.trim();
    const dataset = remodel.add_dataset_to_map_modal.dataset.trim();
    const color = remodel.add_dataset_to_map_modal.color;

    if (name == "") {
        UIkit.modal.alert("ERROR: You must specify a map name!");
        return;
    }

    if (dataset == "") {
        UIkit.modal.alert("ERROR: You must specify a dataset!");
        return;
    }

    const datasetUuidFromName = VueApp.methods.findDatasetUuidFromName(dataset);
    // Check if dataset exists in datasets...
    if (datasetUuidFromName == undefined) {
      UIkit.modal.alert(`ERROR: No such dataset: ${dataset}`);
      return;
    }

    // Check if map name exists already...
    if (remodel.maps[name] !== undefined) {
      //Check if map already has dataset
      const map = remodel.maps[name];
      for (datasetUuid in map.datasetList) {
        if (datasetUuidFromName == datasetUuid) {
          UIkit.modal.alert(`ERROR: duplicate dataset for map: ${name}`);
          return;
        }
      }
      //add the dataset uuid to the map
      remodel.maps[name].datasetList[datasetUuidFromName] = color;
    } else {
      const newMap = {
        name: name.trim(),
        datasetList: {},
      };
      newMap.datasetList[datasetUuidFromName] = color;
      remodel.maps[name] = newMap;
    }

    remodel.datasets[datasetUuidFromName].color = color;

    UIkit.notification({message: 'Dataset added to map!', status: 'success'});

  } finally {
    console.log("HITS THE FINALLY")
    remodel.add_dataset_to_map_modal.name = "";
    remodel.add_dataset_to_map_modal.dataset = "";
    remodel.add_dataset_to_map_modal.color = "#FF69B4";
  }
};

VueApp.methods.findDatasetUuidFromName = function(name) {
  for (dataset in remodel.datasets) {
    if (remodel.datasets[dataset].name == name) {
      return dataset;
    }
  }
};

VueApp.methods.changeMapColor = function (mapName, uuid, color) {
  remodel.maps[mapName]["datasetList"][uuid] = color;
};

VueApp.methods.copyMapPermalink = function (event) {
  console.log("Pemalink Map");
};

VueApp.methods.unlinkDataSet = function (event) {
  console.log("Unlink Data Set");
  const name = remodel.unlink_dataset_modal.name;
  const dataset = remodel.unlink_dataset_modal.dataset;
  const uuidFromDatasetName = VueApp.methods.findDatasetUuidFromName(dataset);
  delete remodel.maps[name]["datasetList"][uuidFromDatasetName];

};

VueApp.methods.screenshot = function (event) {
  console.log("Take Screenshot");

  // Citation: https://stackoverflow.com/questions/3916191/download-data-url-file
  function download(dataurl, filename) {
    const link = document.createElement("a");
    link.href = dataurl;
    link.download = filename;
    link.click();
  }
  download("data:text/html,HelloWorld!", "screenshot.png");
};

// Go for launch!
const app = createApp(VueApp);
app.mount("#app");
