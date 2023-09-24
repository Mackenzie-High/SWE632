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
            name: "Mackenzie's Trip",
            points: 1000
        }
    ],
    
    maps: 
    [
        {
            name: "Mackenzie's Map",
            dataset: "Mackenzie's Trip",
            color: "#FF69B4"
        }
    ]
}

// Deeply Reactive Data Model,
// so that changes to nested data structures
// also cause automatic updates to the view.
const remodel = reactive(model);

const VueApp = {
    data() { return remodel; },
    methods: { }
};

VueApp.methods.addItem = function ()
{

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

VueApp.methods.renameDataSet = async function (event)
{
    console.log("Rename DataSet");
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

VueApp.methods.viewMap = async function (event)
{
    console.log("View Map");
    
}

VueApp.methods.copyMapPermalink = async function (event)
{
    console.log("Pemalink Map");
}

VueApp.methods.unlinkDataSet = async function (event)
{
    console.log("Unlink Data Set");
}

VueApp.methods.screenshot = async function (event)
{
    console.log("Take Screenshot");
}

// Go for launch!
const app = createApp(VueApp);
app.mount('#app');
