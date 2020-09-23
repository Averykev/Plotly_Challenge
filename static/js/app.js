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

        //horizontal bar chart

        var samples = data.samples.filter(person => person.id.toString()===id)[0]

        //console.log(samples)

        var sampleValues = samples.sample_values.slice(0,10).reverse()

        //console.log(sampleValues)

        var otuIds = samples.otu_ids.slice(0,10).reverse()

        otuIds = otuIds.map(otu => "OTU " + otu)

        //console.log(otuIds)

        var otuLabels = samples.otu_labels.slice(0,10).reverse()

        //console.log(otuLabels)

        var trace1 = {
            x: sampleValues,
            y: otuIds,
            type: "bar",
            orientation: "h"
        }

        var data = [trace1]

        Plotly.newPlot("bar",data)

    })


    d3.json("samples.json").then((data) => {

        //bubble chart

        var samples = data.samples.filter(person => person.id.toString()===id)[0]

        //console.log(samples)

        var otuIds = samples.otu_ids

        //console.log(otuIds)

        var sampleValues = samples.sample_values

        //console.log(sampleValues)

        var otuLabels = samples.otu_labels

        //console.log(otuLabels)

        var trace2 = {
            x: otuIds,
            y: sampleValues,
            type: "bubble",
            mode: "markers",
            text: otuLabels,
            marker: {
                color: otuIds,
                size: sampleValues 
            }
        }

        var data = [trace2]

        Plotly.newPlot("bubble", data)

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
        buildPlots(data.names[0])
    })
}

init();