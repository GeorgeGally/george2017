
!function() {
  var fatbar1 = {
    version: "3.4.1"
  };
fatbar1.fat_bars = function(_id, url) {


var margin = {top: 20, right: 20, bottom: 60, left: 90},
    padding = {top: 60, right: 60, bottom: 60, left: 60},
    outerWidth = 960,
    outerHeight = 500,
    innerWidth = outerWidth - margin.left - margin.right,
    innerHeight = outerHeight - margin.top - margin.bottom,
    width = innerWidth - padding.left - padding.right,
    height = innerHeight - padding.top - padding.bottom;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .0, 0);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .ticks(2)
    .tickPadding(10)
    .tickSize(0);

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(2)
    .tickPadding(10)
    .tickSize(0);

var svg = d3.select(_id).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


var colors = ["#6E2721","#C4372C","#E45E20","#E9A309","#EEB400","#FAD000","#B5C4E4","#91A5D5","#5879C1","#3F68B8"];



d3.json(url, function(data) {


var minDataPoint = d3.min(data, function(d) { return d['count'];});
var maxDataPoint = d3.max(data, function(d) { return d['count'];});
var heightScale = d3.scale.linear().domain([minDataPoint,maxDataPoint]).range([20,150]);

console.log(data[0][0]);
console.log("min: "+ minDataPoint);
console.log("max: "+ maxDataPoint);

// there's a better way of doing this - just couldn't work it out
var newScaledData = [];
for (var i = 0; i < data.length; i++) {
  //data[i].count = heightScale(data[i].count);
}

console.log(newScaledData);
  
  var total = 0;
  data.forEach(function(d) {
    d.count = +d.count;
    total += d.count;
  });

  x.domain(data.map(function(d) { return d.gender; }));
  y.domain([0, total]);
  var extra = height + 10;
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + extra + ")")
      .call(xAxis)
      .append("text")
      .attr("y", 32)
      .attr("x", width - 25)
      .attr("dy", ".99em")
      .style("text-anchor", "middle")
      //.text("Gender");

  svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(-40,0)")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 12)
      .attr("dy", ".99em")
      .style("text-anchor", "end")
      //.text("Tweets");

  var bar = svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("fill", function(d, i) { return colors[2*i+1]; })
      .attr("x", function(d) { return x(d.gender); })
      .attr("width", x.rangeBand()-5) 
      .attr("y", height )
      .attr("height", 0);
      


bar.transition()
      .attr("height", function(d, i) { return height - y(d.count)+5; })
      .attr("y", function(d) { return y(d.count) - 5; })
      .duration(1000);

  //d3.select("input").on("change", change);

  // var sortTimeout = setTimeout(function() {
  //   d3.select("input").property("checked", true).each(change);
  // }, 2000);

  function change() {
    clearTimeout(sortTimeout);

    // Copy-on-write since tweens are evaluated after a delay.
    var x0 = x.domain(data.sort(this.checked
        ? function(a, b) { return b.count - a.count; }
        : function(a, b) { return d3.ascending(a.gender, b.gender); })
        .map(function(d) { return d.gender; }))
        .copy();

    var transition = svg.transition().duration(750),
        delay = function(d, i) { return i * 50; };

    transition.selectAll(".bar")
        .delay(delay)
        .attr("x", function(d) { return x0(d.gender); });

    transition.select(".x.axis")
        .call(xAxis)
      .selectAll("g")
        .delay(delay);
  }
});

}

    this.fatbar1 = fatbar1;



}();
