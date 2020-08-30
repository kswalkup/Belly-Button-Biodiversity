//assign variable for local json file
const localJson = "samples.json";
/**samples.json arranged as follows:
 * names
 * metadata
 * samples
  -otu_ids
  -sample_values
  -otu_labels
 
 use "sample_values" as the values for the bar chart
 use "otu_ids" as t labels for the bar chart
 use out_labels as the hovertext for the char
*/
d3.json(localJson).then(function(jsonData) {
  console.log(jsonData);
    const metadata = jsonData.metadata;
    const names = jsonData.names;
//sample_values
    const sortedBySampValues = jsonData.samples[0].sample_values.sort((a, b) => b.sample_values - a.sample_values);
    slicedSampData = sortedBySampValues.slice(0, 10);
    console.log(slicedSampData)
    const reversedSampData = slicedSampData.reverse();
//otu_ids
    const sortByOtuId = jsonData.samples[0].otu_ids.sort((a,b) => b.otu_ids - a.otu_ids );
    slicedOtuData = sortByOtuId.slice(0, 10);
    console.log(slicedOtuData)
    const reversedOtuData = slicedOtuData.reverse();
    const finalOtuId = reversedOtuData.map(d => "OTU" +d);
//otu_labes
    const labels = jsonData.samples[0].otu_labels.slice(0,10);
//bar chart
    const trace1 = {
        x: reversedSampData,
        y: finalOtuId,
        text: labels,
        type: "bar",
        orientation: "h"
    };
    const data1 = [trace1]
    const layout1 = {
        title: "Top 10 OTUs",
        margin: {
          l: 100,
          r: 100,
          t: 100,
          b: 100
        }
      };
  Plotly.newPlot("bar", data1, layout1);
//bubble chart
    const trace2 = {
      x: jsonData.samples[0].otu_ids,
      y: jsonData.samples[0].sample_values,
      mode: "markers",
      marker: {
        size: jsonData.samples[0].sample_values,
        color: jsonData.samples[0].otu_ids
      },
      text:  jsonData.samples[0].otu_labels
    };
    const layout2 = {
      xaxis:{title: "OTU ID"},
      height: 600,
      width: 1000
    };
    const data2 = [trace2];
  Plotly.newPlot("bubble", data2, layout2);
//demographic
  


});
