// Import Vue
const { createApp, reactive } = Vue;

// Citation: https://stackoverflow.com/questions/105034/how-do-i-create-a-guid-uuid
function uuidV4 ()
{
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

// Data Model
const model = {
    
    add_dataset_modal: 
    {
        name: "",
        file: "",
    },
    
    add_dataset_to_map_modal:
    {
        name: "",
        dataset: "",
        color: "#FF69B4"
    },
    
    rename_dataset_modal:
    {
        old_name: "",
        new_name: ""
    },
    
    upload_dataset_modal:
    {
        file: ""
    },
    
    permalink_dataset_modal:
    {
        text: "",
        href: ""
    },
    
    permalink_map_modal:
    {
        text: "",
        href: ""        
    },
    
    delete_dataset_modal:
    {
        name: ""
    },
    
    unlink_dataset_modal:
    {
        name: "",
        dataset: ""
    },
    
    datasets: 
    [
        { 
            uuid: "83c31fc6-4165-4734-982f-e90b9df85f07",
            name: "Gangadaran's Hike Up Old Rag Mountain",
            points: 14514
        },
        
        { 
            uuid: "d586ffc7-6f0d-4d6c-8163-86b16d31fe0b",
            name: "Mariela's Hike Up Old Rag Mountain",
            points: 49052
        },
        
        { 
            uuid: "0fd1c9c2-ece2-4abf-9dc7-b1ef5ff2ad52",
            name: "Mackenzie's Hike Up Old Rag Mountain",
            points: 45675
        },
        
        { 
            uuid: "18736b59-3b49-422f-9bfc-130b68910c23",
            name: "Gangadaran's Hike Up Outlook Mountain",
            points: 3704
        },
        
        { 
            uuid: "1aa5b13d-21c4-482e-b2de-69a9e832457c",
            name: "Mariela's Hike Up Outlook Mountain",
            points: 6554
        },
        
        { 
            uuid: "2ca4ed6f-c189-4c0a-bbca-39c71ac33944",
            name: "Mackenzie's Hike Up Outlook Mountain",
            points: 68014
        },
        
        { 
            uuid: "b5cc142a-6d0f-4b12-b562-d9375dd22178",
            name: "Gangadaran's Hike Up Spruce Mountain",
            points: 36242
        },
        
        { 
            uuid: "a65da525-c9be-499b-9dbd-6e42b62e2575",
            name: "Mariela's Hike Up Spruce Mountain",
            points: 15040
        },
        
        { 
            uuid: "d35a8af6-46ce-4b1e-9883-c2bc8b2eea77",
            name: "Mackenzie's Hike Up Spruce Mountain",
            points: 22829
        }
    ],
    
    maps: 
    [
        {
            uuid: "ed035453-8318-4bbf-9697-445c72d351f8",
            name: "Gangadaran's Adventures",
            dataset: "Gangadaran's Hike Up Old Rag Mountain",
            color: "#FF69B4"
        },

        {
            uuid: "2fc96bb8-d532-43a8-8b2d-3e6ac0fb66ba",
            name: "Gangadaran's Adventures",
            dataset: "Gangadaran's Hike Up Spruce Mountain",
            color: "#FF69B4"
        },

        {
            uuid: "570460dc-d3ec-42af-869b-a1302bef73b3",
            name: "Gangadaran's Adventures",
            dataset: "Gangadaran's Hike Up Outlook Mountain",
            color: "#FF69B4"
        },
        
        {
            uuid: "bda88500-9df2-4e29-bc97-f374e215d632",
            name: "Team Trip to West Virginia",
            dataset: "Gangadaran's Hike Up Spruce Mountain",
            color: "#FF69B4"
        },

        {
            uuid: "8dbd57eb-59c3-4da1-874b-0c53a0bf8b77",
            name: "Team Trip to West Virginia",
            dataset: "Mariela's Hike Up Spruce Mountain",
            color: "#FF69B4"
        },

        {
            uuid: "5395f7fe-4e60-4096-84aa-c27d07d7002b",
            name: "Team Trip to West Virginia",
            dataset: "Mackenzie's Hike Up Spruce Mountain",
            color: "#FF69B4"
        },        
        
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

VueApp.methods.openRenameDataSet = function (dataset)
{
    console.log("Open Rename DataSet");
    const name = event.target.parentElement.dataset.name;
    remodel.rename_dataset_modal.old_name = name;
    remodel.rename_dataset_modal.new_name = "";
}

VueApp.methods.openUploadDataSet = function (event)
{
    console.log("Open Upload DataSet");
    const name = event.target.parentElement.dataset.name;
    remodel.upload_dataset_modal.name = name;
}

VueApp.methods.openPermalinkDataSet = function (event)
{
    console.log("Open Permalink DataSet");
    const name = event.target.parentElement.dataset.name;
    remodel.permalink_dataset_modal.text = name;
    remodel.permalink_dataset_modal.href = name; // TODO
}

VueApp.methods.openDeleteDataSet = function (event)
{
    console.log("Open Delete DataSet");
    const name = event.target.parentElement.dataset.name;
    remodel.delete_dataset_modal.name = name;
    console.log(remodel);
    console.log(event.target.parentElement);
    console.log(`X = ${name}`);
}

VueApp.methods.openUnlinkMap = function (event)
{
    console.log("Open Unlink Map");
    const name = event.target.parentElement.dataset.name;
    const dataset = event.target.parentElement.dataset.dataset;
    remodel.unlink_dataset_modal.name = name;
    remodel.unlink_dataset_modal.dataset = dataset;
}

VueApp.methods.openMap = function (event)
{
    console.log("Open Map");
    const name = event.target.parentElement.dataset.name.trim();
    console.log(name);
    for (let row of remodel.maps)
    {
        if (row.name == name)
        {
            remodel.current_map.uuid = row.uuid;
            remodel.current_map.name = row.name;
            remodel.permalink_map_modal.text = row.name; // TODO
            remodel.permalink_map_modal.href = row.uuid; // TODO
            break;
        }
    }
    
    // Cause the "Map" tab to become visible in the switcher bar,
    // which is located at the top of the page.
    document.getElementById("map-switcher-tab").classList.remove("uk-invisible");
}

VueApp.methods.createDataSet = function (event)
{
    try
    {
        console.log("Create DataSet");
        const name = remodel.add_dataset_modal.name.trim();
        
        if ("" == name)
        {
            UIkit.modal.alert('ERROR: You must specify a name!');
            return;
        }
        
        const file = remodel.add_dataset_modal.file;
        const uuid = uuidV4();
        const points = 1001;
        const row = { uuid: uuid, name: name, points: points };
        remodel.datasets.push(row);
        console.log(row);
    }
    finally
    {
        remodel.add_dataset_modal.name = "";
        remodel.add_dataset_modal.file = "";
    }
}

VueApp.methods.renameDataSet = function (event)
{
    console.log("Rename DataSet");
    console.log(event);
    const name = remodel.rename_dataset_modal.old_name.trim();
    
    for (let row of remodel.datasets)
    {
        if (row.name == name)
        {
            row.name = remodel.rename_dataset_modal.new_name.trim();
            break;
        }
    }
}

VueApp.methods.uploadDataSet = function (event)
{
    console.log("Upload DataSet");
}

VueApp.methods.copyDataSetPermalink = function (event)
{
    console.log("Pemalink DataSet");
}

VueApp.methods.deleteDataSet = function (event)
{
    console.log("Delete DataSet");
    const name = remodel.delete_dataset_modal.name.trim();
    remodel.datasets = remodel.datasets.filter(x => x.name != name);
}

VueApp.methods.createMap = function (event)
{
    console.log("Create Map2");
    const name = remodel.add_dataset_to_map_modal.name;
    console.log(name);
    const uuid = uuidV4();
    const dataset = remodel.add_dataset_to_map_modal.dataset;
    const color = remodel.add_dataset_to_map_modal.color;
    const row = { uuid: uuid, name: name, dataset: dataset, color: color }
    remodel.maps.push(row);
    console.log(row);
}

VueApp.methods.copyMapPermalink = function (event)
{
    console.log("Pemalink Map");
}

VueApp.methods.unlinkDataSet = function (event)
{
    console.log("Unlink Data Set");
    const name = remodel.unlink_dataset_modal.name;
    const dataset = remodel.unlink_dataset_modal.dataset;
    remodel.maps = remodel.maps.filter(x => x.name != name || x.dataset != dataset);
}

VueApp.methods.screenshot = function (event)
{
    console.log("Take Screenshot");

    // Citation: https://stackoverflow.com/questions/3916191/download-data-url-file
    function download(dataurl, filename) {
      const link = document.createElement("a");
      link.href = dataurl;
      link.download = filename;
      link.click();
    }
    download("data:text/html,HelloWorld!", "screenshot.png");
}

// Go for launch!
const app = createApp(VueApp);
app.mount('#app');
