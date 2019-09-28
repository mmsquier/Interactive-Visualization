
  function buildGauge(sample) {
  let charts = `/samples/${sample}`;
  d3.json(charts).then(function(responce) {
    // Gauge
    let gaugedata = [
      {
        domain: { data.WFREQ},
        value: 270,
        title: "Belly Button Washing Frequency",
        type: "indicator",
        mode: "gauge+number"
      }
    ];
    let gaugelayout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
    Plotly.newPlot(gd, gaugedata, gaugelayout)};
}
