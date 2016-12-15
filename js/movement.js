!function() {
  var motion = {
    version: "0.0.1"
  };

motion.bar_graph = function(url, w, h) {



d3.select("svg")
       .remove();
  var svg = d3.select("body").append("svg")
    .attr("width", w)
    .attr("height", h);

  var line = d3.svg.line()
    .x(function(d) { return x(d.published); })
    .y(function(d) { return y(d.count); });

  d3.json(url, function(data2) {
  data = data2;
  console.log(data);
  name = data['name'];
  //console.log(name);
  data = data['data'];

//   data.forEach(function(d) {
//    // d.count = +d.count;
//    console.log(d);
//   });
  var minXDataPoint = d3.min(data, function(d) { return d['Location']['lat'];});
  var maxXDataPoint = d3.max(data, function(d) { return d['Location']['lat'];});
  var minYDataPoint = d3.min(data, function(d) { return d['Location']['lng'];});
  var maxYDataPoint = d3.max(data, function(d) { return d['Location']['lng'];});

  var minDist = d3.min(data, function(d) { return d['Location']['dist'];});
  var maxDist = d3.max(data, function(d) { return d['Location']['dist'];});

var xScale = d3.scale.linear()
        .domain([minXDataPoint, maxXDataPoint])
        .range([ 0 + margin, w-margin]);

var yScale = d3.scale.linear()
        .domain([minYDataPoint, maxYDataPoint])
        .range([0+margin, h-margin]);

var distScale = d3.scale.linear()
        .domain([minDist, maxDist])
        .range([1, 80]);

var colourScale = d3.scale.linear()
        .domain([minDist, maxDist])
        .range([0, 8]);

function previous(func, seed) {
  return function(d, i) {
    return i > 0 ? func(data[i-1], i-1) : (seed || 0);
  }
}

console.log("min: "+ minDist);
console.log("max: "+ maxDist);


var dot = svg.append("g")
             .attr("class", "dots")
             .selectAll(".dot")
             //.data(interpolateData(2004))
             .data(data)
             .enter()
             .append("g");


 dot.append("circle")             
      //.attr("width", function(d,i) { return 5})
      .attr("r", 0)
      .attr("cx", function(d, i) { return i>0 ? xScale(data[i-1]['Location']['lat']): 0 })
      .attr("cy", function(d, i) { return i>0 ? h-yScale(data[i-1]['Location']['lng']): 0 })
      .style("fill", function(d){ return colours[Math.round(colourScale(d['Location']['dist']))]})
      .style("opacity",0.8) 
    .transition()
      .attr("r", function(d) { return distScale(d['Location']['dist'])})
      .attr("cx", function(d) { return xScale(d['Location']['lat'])})
      .attr("cy", function(d) { return h-yScale(d['Location']['lng'])})
      .delay(function(d, i) { return 50*i})
      .duration(800);


  // lines.enter()
  // .append('line')
  // .attr( {
  //   'stroke-width': 2,
  //   stroke: '#000',
  //   x1: previous(x), 
  //   y1: previous(y),
  //   x2: x,
  //   y2: y
 // });

$('#headline').html(name);

 });


}



    this.motion = motion;



}();





