!function() {
  var b1 = {
    version: "3.4.1"
  };
b1.bar_graph = function(url) {

d3.csv(url, function(data) {
var colors = ["#2EC9FF", "#F2DC00"];
//var data = d3.csv.parse(d3.select('#csv').text());
var valueLabelWidth = 40; // space reserved for value labels (right)
var barHeight = 25; // height of one bar
var barLabelWidth = 100; // space reserved for bar labels
var barLabelPadding = 10; // padding between bar and bar labels (left)
var gridLabelHeight = 18; // space reserved for gridline labels
var gridChartOffset = 6; // space between start of grid and first bar
var maxBarWidth = 400; // width of the bar with the max value
 
// accessor functions 
var barLabel = function(d) { return d['Name']; };
var barValue = function(d) { return parseFloat(d['Population (mill)']); };
 
// scales
var yScale = d3.scale.ordinal().domain(d3.range(0, data.length)).rangeBands([0, data.length * barHeight]);
var y = function(d, i) { return yScale(i); };
var yText = function(d, i) { return y(d, i) + yScale.rangeBand() / 2; };
var x = d3.scale.linear().domain([0, d3.max(data, barValue)]).range([0, maxBarWidth]);
// svg container element
var chart = d3.select('#horiz_bar').append("svg")
  .attr('width', maxBarWidth + barLabelWidth + valueLabelWidth)
  .attr('height', 600);
// grid line labels
var gridContainer = chart.append('g')
  .attr('transform', 'translate(' + barLabelWidth + ',' + 320 + ')'); 
  
  gridContainer.selectAll("text").data(x.ticks(10)).enter().append("text")
  .attr("x", x)
  .attr("dy", -3);

gridContainer.selectAll("line").data(x.ticks(10)).enter().append("line")
  .attr("x1", x)
  .attr("x2", x)
  .attr("y1", 0)
  .attr("y2", yScale.rangeExtent()[1] + gridChartOffset)
  .style("stroke", "none");
// bar labels
var labelsContainer = chart.append('g')
  .attr('transform', 'translate(' + (barLabelWidth - barLabelPadding) + ',' + (gridLabelHeight + gridChartOffset) + ')'); 

labelsContainer.selectAll('text').data(data).enter().append('text')
  .attr('y', yText)
  .attr('stroke', 'none')
  .attr('fill', 'black')
  .attr("dy", ".15em") // vertical-align: middle
  .attr('text-anchor', 'end')
  .text(barLabel);
// bars
var barsContainer = chart.append('g')
  .attr('transform', 'translate(' + barLabelWidth + ',' + (gridLabelHeight + gridChartOffset) + ')'); 

var rect = barsContainer.selectAll("rect").data(data).enter().append("rect")
  .attr('y', y)
  .attr('height', yScale.rangeBand()-8)
  .attr('width', 0)
  .attr('stroke', 'none')
  .attr('fill', function(d,i){ return colors[0]});

rect
.transition()
            .duration(2000)
            .ease('out')
            .attr('width', function(d) { return x(barValue(d)); });


})


}



    this.b1 = b1;



}();





