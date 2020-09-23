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


//fill out the plots and graphs
function buildPlots(id) {

    d3.json("samples.json").then((data) => {

        var samples = data.samples.filter(person => person.id.toString()===id)[0]

        var sampleValues = samples.sample_values

        var sampleTen = samples.sample_values.slice(0,10).reverse()

        var otuIds = samples.otu_ids

        var otuTen = samples.otu_ids.slice(0,10).reverse()

        otuTen = otuTen.map(otu => "OTU " + otu)

        var otuLabels = samples.otu_labels

        var otuLabelTen = samples.otu_labels.slice(0,10).reverse()

        var trace1 = {
            x: sampleTen,
            y: otuTen,
            text: otuLabelTen,
            type: "bar",
            orientation: "h"
        }

        var barChart = [trace1]

        Plotly.newPlot("bar",barChart)

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

        var bubbleChart = [trace2]

        Plotly.newPlot("bubble", bubbleChart)
    })
}


//initial data function for page open
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