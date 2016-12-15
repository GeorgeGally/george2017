!function() {
  var doughnut1 = {
    version: "3.4.1"
  };
doughnut1.doughnut = function(_id, url) {



var colors = ["#6E2721","#C4372C","#E45E20","#E9A309","#EEB400","#FAD000","#B5C4E4","#91A5D5","#5879C1","#3F68B8"];


d3.json(url, function(data) {


var pos = 0;
var neg = 0;
var very_pos = 0;
var very_neg = 0;
var neutral = 0;
// for (var i = 0; i < data.length; i++) {
//   if (data[i].sentiment < 0 && data[i].sentiment >=-3) {
//     neg += data[i].count;
//   } else if (data[i].sentiment < -3) {
//     very_neg += data[i].count;
//   } else if (data[i].sentiment == 1) {
//     neutral += data[i].count;
//   } else if (data[i].sentiment > 1 && data[i].sentiment <=-3) {
//     pos += data[i].count;
//   } else if (data[i].sentiment > 3) {
//     very_pos += data[i].count;
//   } 
// };


var margin = {top: 20, right: 20, bottom: 20, left: 20};
	width = 600 - margin.left - margin.right;
	height = width - margin.top - margin.bottom;

var chart = d3.select(_id)
				.append('svg')
			    .attr("width", width + margin.left + margin.right)
			    .attr("height", height + margin.top + margin.bottom)
			   .append("g")
    			.attr("transform", "translate(" + ((width/2)+margin.left) + "," + ((height/2)+margin.top) + ")");


var radius = Math.min(width, height) / 2;

// var color = d3.scale.ordinal()
// 	.range(["#3399FF", "#5DAEF8", "#86C3FA", "#ADD6FB", "#D6EBFD","#3399FF", "#5DAEF8", "#86C3FA", "#ADD6FB", "#D6EBFD"]);

var arc = d3.svg.arc()
    .outerRadius(radius)
    .innerRadius(radius - 60);

var pie = d3.layout.pie()
    .sort(null)
    .startAngle(1.1*Math.PI)
    .endAngle(3.1*Math.PI)
    .value(function(d) { return d.count; });


  var headline = chart.append('text')
    .text('Sentiment')
    .attr('x', 50)
    .attr('y', 120)
    .attr("class", "headline")



var g = chart.selectAll(".arc")
  .data(pie(data))
.enter().append("g")
  .attr("class", "arc");

g.append("path")
  .style("fill", function(d, i) { return colors[i]; })
  .transition().delay(function(d, i) { return i * 5; }).duration(1800)
  //.ease("in")
  .attrTween('d', function(d) {
       var i = d3.interpolate(d.startAngle, d.endAngle);
       return function(t) {
           d.endAngle = i(t);
         return arc(d);
       }
  });

})

} //


    this.doughnut1 = doughnut1;



}();
