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

  datasets: {},

  current_map: {
    name: ""
  },

  currentMapData: {},
};

// Deeply Reactive Data Model,
// so that changes to nested data structures
// also cause automatic updates to the view.
const remodel = reactive(model);

window.appData = {
  remodel: remodel
};

const VueApp = {
  data() {
    return remodel;
  },
  methods: {},
};

VueApp.methods.datasetFileChanged = function (event) {
  remodel.dataToBeUploadedTemp = []
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

VueApp.methods.openDeleteDataSet = function (name, uuid) {
  console.log("Open Delete DataSet");
  remodel.delete_dataset_modal.name = name;
  remodel.delete_dataset_modal.uuid = uuid;
};

VueApp.methods.openMap = async function (mapName) {

  console.log("Open Map");
  await updateMap(remodel);

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

VueApp.methods.findDatasetUuidFromName = function(name) {
  for (dataset in remodel.datasets) {
    if (remodel.datasets[dataset].name == name) {
      return dataset;
    }
  }
};

VueApp.methods.copyMapPermalink = function (event) {
  console.log("Pemalink Map");
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
