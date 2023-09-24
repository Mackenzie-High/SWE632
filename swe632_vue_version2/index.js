// Import Vue
const { createApp, reactive } = Vue;

// Data Model
const model = {
    
    add_dataset_modal: 
    {
        name: "foo",
        file: "data.json",
    },
    
    add_dataset_to_map_modal:
    {
        name: "",
        dataset: "",
        color: "#FF69B4"
    },
    
    rename_dataset_modal:
    {
        old_name: "Old DataSet Name",
        new_name: "New DataSet Name"
    },
    
    upload_dataset_modal:
    {
        file: "TODO"
    },
    
    permalink_dataset_modal:
    {
        text: "TODO abc 123",
        href: "example.com"
    },
    
    permalink_map_modal:
    {
        text: "TODO xyz 123",
        href: "cnn.com"        
    },
    
    delete_dataset_modal:
    {
        name: "Name Confirmation"
    },
    
    unlink_dataset_modal:
    {
        name: "Name Confirmation",
        dataset: "DataSet"
    },
    
    datasets: 
    [
        { 
            uuid: "280c3928-5b10-11ee-ba97-3b233bbe5933",
            name: "Mackenzie's Trip",
            points: 1000
        }
    ],
    
    maps: 
    [
        {
            uuid: "280c3928-5b10-11ee-ba97-3b233bbe5933",
            name: "Mackenzie's Map",
            dataset: "Mackenzie's Trip",
            color: "#FF69B4"
        }
    ],
    
    current_map: 
    {
        uuid: "",
        name: ""
    }
}

// Deeply Reactive Data Model,
// so that changes to nested data structures
// also cause automatic updates to the view.
const remodel = reactive(model);

const VueApp = {
    data() { return remodel; },
    methods: { }
};

VueApp.methods.datasetFileChanged = function (event)
{
    const file = event.target.value;
    console.log(file);
    remodel.add_dataset_modal.file = file;
}

VueApp.methods.createDataSet = async function (event)
{
    console.log("Create DataSet");
    const name = remodel.add_dataset_modal.name;
    const file = remodel.add_dataset_modal.file;
    const row = { name: name, points: 1000 };
    remodel.datasets.push(row);
    console.log(row);
}

VueApp.methods.openRenameDataSet = async function (dataset)
{
    console.log("Open Rename DataSet");
    const name = event.target.parentElement.dataset.name;
    remodel.rename_dataset_modal.old_name = name;
    remodel.rename_dataset_modal.new_name = "";
}

VueApp.methods.openUploadDataSet = async function (event)
{
    console.log("Open Upload DataSet");
    const name = event.target.parentElement.dataset.name;
    remodel.upload_dataset_modal.name = name;
}

VueApp.methods.openPermalinkDataSet = async function (event)
{
    console.log("Open Permalink DataSet");
    const name = event.target.parentElement.dataset.name;
    remodel.permalink_dataset_modal.text = name;
    remodel.permalink_dataset_modal.href = name; // TODO
}

VueApp.methods.openDeleteDataSet = async function (event)
{
    console.log("Open Delete DataSet");
    const name = event.target.parentElement.dataset.name;
    remodel.delete_dataset_modal.name = name;
}

VueApp.methods.openUnlinkMap = async function (event)
{
    console.log("Open Unlink Map");
    const name = event.target.parentElement.dataset.name;
    const dataset = event.target.parentElement.dataset.dataset;
    remodel.unlink_dataset_modal.name = name;
    remodel.unlink_dataset_modal.dataset = dataset;
}

VueApp.methods.openMap = async function (event)
{
    console.log("Open  Map");
    const name = event.target.parentElement.dataset.name;
    
    document.getElementById("map-switcher-tab").classList.remove("uk-invisible");
        
    for (let row of remodel.maps)
    {
        if (row.name == name)
        {
            remodel.current_map.uuid = row.uuid;
            remodel.current_map.name = row.name;
            permalink_map_modal.text = row.name; // TODO
            permalink_map_modal.href = row.uuid; // TODO
            break;
        }
    }
}

VueApp.methods.renameDataSet = async function (event)
{
    console.log("Rename DataSet");
    console.log(event);
    const name = remodel.rename_dataset_modal.old_name;
    
    for (let row of remodel.datasets)
    {
        if (row.name == name)
        {
            row.name = remodel.rename_dataset_modal.new_name;
            break;
        }
    }
}

VueApp.methods.uploadDataSet = async function (event)
{
    console.log("Upload DataSet");
}

VueApp.methods.copyDataSetPermalink = async function (event)
{
    console.log("Pemalink DataSet");
}

VueApp.methods.deleteDataSet = async function (event)
{
    console.log("Delete DataSet");
    const name = remodel.delete_dataset_modal.name;
    remodel.datasets = remodel.datasets.filter(x => x.name != name);
}

VueApp.methods.createMap = async function (event)
{
    console.log("Create Map2");
    const name = remodel.add_dataset_to_map_modal.name;
    console.log(name);
    const dataset = remodel.add_dataset_to_map_modal.dataset;
    const color = remodel.add_dataset_to_map_modal.color;
    const row = { name: name, dataset: dataset, color: color }
    remodel.maps.push(row);
    console.log(row);
}

VueApp.methods.copyMapPermalink = async function (event)
{
    console.log("Pemalink Map");
}

VueApp.methods.unlinkDataSet = async function (event)
{
    console.log("Unlink Data Set");
    const name = remodel.unlink_dataset_modal.name;
    remodel.maps = remodel.maps.filter(x => x.name != name);
}

VueApp.methods.screenshot = async function (event)
{
    console.log("Take Screenshot");
}

// Go for launch!
const app = createApp(VueApp);
app.mount('#app');
