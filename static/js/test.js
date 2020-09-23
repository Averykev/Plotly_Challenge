function buildPlots(id) {

    d3.json("samples.json").then((data) => {

        var samples = data.samples.filter(person => person.id.toString()===id)[0]

        var sampleValues = samples.sample_values

        var sampleTen = sampleValues.sample_values.slice(0,10).reverse()

        var otuIds = samples.otu_ids

        var otuTen = otuIds.otu_ids.slice(0,10).reverse()

        otuTen = otuTen.map(otu => "OTU " + otu)

        var otuLabels = samples.otu_labels

        var otuLabelTen = otuLabels.otu_labels.slice(0,10).reverse()

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