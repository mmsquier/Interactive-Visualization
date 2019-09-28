function buildMetadata(sample) {
  // @TODO: Complete the following function that builds the metadata panel

  var selectdata = d3.select("#sample-metadata");
  d3.json("/metadata/" + sample).then(function(responce) {
    let data = responce;
    // selectdata.html(" ");
    selectdata.selectAll("ul").remove();
    let ul = selectdata.append("ul");

    Object.entries(data).forEach(([key, value]) => {
      var cell = ul.append("li");
      cell.text(`${key}: ${value}`);
    });

    selectdata.on("#sample-metadata", function() {
      var newentry = d3.event.target.value;
      console.log(newentry);
    });
  });
}

function buildCharts(sample) {
  // @TODO: Use `d3.json` to fetch the sample data for the plots
  let charts = `/samples/${sample}`;
  d3.json(charts).then(function(responce) {
    let data = responce;
    console.log(data);

    const datavalues = data.sample_values.slice(0, 10);
    const datalabels = data.otu_labels.slice(0, 10);
    const dataids = data.otu_ids.slice(0, 10);

    var traceb = {
      x: data.otu_ids,
      y: data.sample_values,
      text: data.otu_labels,
      mode: "markers",
      markers: {
        size: data.sample_values,
        color: data.otu_ids,
        colorscale: "Jet"
      }
    };
    var bdata = [traceb];
    var bubblelayout = {
      showlegend: true,
      autosize: true,
      height: 700,
      width: 1200,
      labels: data.otu_labels,
      margin: {
        l: 50,
        r: 100,
        b: 100,
        t: 100,
        pad: 4
      }
    };
    Plotly.newPlot("bubble", bdata, bubblelayout);

    // @TODO: Build a Pie Chart
    var trace1 = {
      values: datavalues,
      labels: dataids,
      type: "pie"
    };
    var piedata = [trace1];
    var pielayout = {
      height: 600,
      width: 600,
      hoverinfo: datalabels,
      textinfo: "none"
    };

    Plotly.newPlot("pie", piedata, pielayout);

    // Gauge
    // let gaugedata = [
    //   {
    //     domain: { data.WFREQ},
    //     value: 270,
    //     title: "Belly Button Washing Frequency",
    //     type: "indicator",
    //     mode: "gauge+number"
    //   }
    // ];
    // let gaugelayout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
    // Plotly.newPlot(gd, gaugedata, gaugelayout);
  });
}

function init() {
  // Grab a reference to the dropdown select element
  let selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then(sampleNames => {
    sampleNames.forEach(sample => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
