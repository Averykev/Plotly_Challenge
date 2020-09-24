//building out the demographic table with a function
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


//option changed function to run whenever the dropdown selection is changed
function optionChanged(id) {

    demographic(id)
    buildPlots(id)
}


//function to fill out the charts and plots...filters on whatever id is chosen in the dropdown
function buildPlots(id) {

    d3.json("samples.json").then((data) => {

        var samples = data.samples.filter(person => person.id.toString()===id)[0]

        var metadata = data.metadata.filter(person => person.id.toString()===id)[0]

        var washFrequency = metadata.wfreq

        var sampleValues = samples.sample_values

        var sampleTen = samples.sample_values.slice(0,10).reverse()

        var otuIds = samples.otu_ids

        var otuTen = samples.otu_ids.slice(0,10).reverse()

        otuTen = otuTen.map(otu => "OTU " + otu)

        var otuLabels = samples.otu_labels

        var otuLabelTen = samples.otu_labels.slice(0,10).reverse()

        //building out the horizontal bar chart
        var trace1 = {
            x: sampleTen,
            y: otuTen,
            text: otuLabelTen,
            type: "bar",
            orientation: "h"
        }

        var barLayout = {
            title: "Top Ten OTU's For Test Subject #" + id
        }

        var barChart = [trace1]

        Plotly.newPlot("bar",barChart, barLayout)

        //building out the bubble chart
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

        var bubbleLayout = {
            xaxis: {title: "OTU ID"},
            yaxis: {title: "Sample Value Frequency"},
            title: "OTU Sample Values For Test Subject #" + id
        }

        var bubbleChart = [trace2]

        Plotly.newPlot("bubble", bubbleChart, bubbleLayout)

        //building out the gauge chart 
        var trace3 = {

            value: washFrequency,
            title:'<b>Belly Button Washing Frequency</b> <br> Scrubs per Week',
            type: "indicator",
            mode: "gauge+number",
            
            gauge: {
                axis: {range: [0,9]},
                bar: {color: "#1b0c41", thickness: 0.275},
                steps: [
                    {range: [0,1], color: "#fcffa4"},
                    {range: [1,2], color: "#f7d13d"},
                    {range: [2,3], color: "#fb9b06"},
                    {range: [3,4], color: "#ed6925"},
                    {range: [4,5], color: "#cf4446"},
                    {range: [5,6], color: "#a52c60"},
                    {range: [6,7], color: "#781c6d"},
                    {range: [7,8], color: "#4a0c6b"},
                    {range: [8,9], color: "#1b0c41"}
                ]
            }
        }

        var gaugeChart = [trace3]

        Plotly.newPlot("gauge", gaugeChart)
    })
}


//initial page load function that runs when the page is opened.  It defaults to the first name in the data.
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