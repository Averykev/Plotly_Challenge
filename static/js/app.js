//building out the demographic table
function demographic(id){

    d3.json("samples.json").then((data) => {
        
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
    buildPlots(id)
}


// fill out the plots and graphs

function buildPlots(id) {

    d3.json("samples.json").then((data) => {

        var samples = data.samples.filter(person => person.id.toString()===id)[0]

        //console.log(samples)

        var sampleValues = samples.sample_values

        //console.log(sampleValues)




    })
}













//initial data function
function init() {

    var dropdownChoices = d3.select("#selDataset");

    d3.json("samples.json").then((data) => {

        data.names.forEach((name) => {
            dropdownChoices.append("option").text(name);
        })

        demographic(data.names[0])
    })
}

init();