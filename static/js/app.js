
//building out the demographic table
function demographic(id){

    d3.json("samples.json").then(function(data){
        
        var demoInfo = d3.select("#sample-metadata")

        var selection = data.metadata.filter(person => person.id.toString()===id)[0]

        demoInfo.html("")

        Object.entries(selection).forEach(([key, value]) => {
            demoInfo.append("h4").text(key +": " + value)
        })
    });
}


//option changed function
function optionChanged(id) {

    demographic(id)
}


//initial data function
function init() {

    var dropdown = d3.select("#selDataset");

    d3.json("samples.json").then((data) => {

        data.names.forEach(function(name){
            dropdown.append("option").text(name).property("value");
        })

        demographic(data.names[0])
    })
}

init();