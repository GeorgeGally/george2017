!function() {
  var bubble1 = {
    version: "3.4.1"
  };
bubble1.bubble_chart = function(_id, url,color) {

d3.json(url, function(data) {
var dataset = data.data;
var margin = {top: 0, right: 0, bottom: 0, left: 0},
    width = 1120 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

var n = 50,
    m = 15,
    padding = 8,
    radius = d3.scale.sqrt().range([40, 85]);

var minDataPoint = d3.min(dataset, function(d) { return d['count'];});
var maxDataPoint = d3.max(dataset, function(d) { return d['count'];});
var radiusScale = d3.scale.linear().domain([minDataPoint,maxDataPoint]).range([40,200]);

// console.log(dataset[0][0]);
// console.log("min: "+ minDataPoint);
// console.log("max: "+ maxDataPoint);

var newScaledData = [];
for (var i = 0; i < dataset.length; i++) {
newScaledData[i] = radiusScale(dataset[i].count);
}

console.log(newScaledData);



graph = {"nodes" : []};
var i = 0;
data.data.forEach(function (d, i) {
  if (d.word.toLowerCase() !="pistorius" && d.word.toLowerCase() !="#oscartrial" && d.word.toLowerCase() !="oscar" 
    && d.word.toLowerCase() !="#oscarpistorius" && d.word.toLowerCase() !="trial"
    && d.word.toLowerCase() !="court"
    && d.word.toLowerCase() !="@oscartrial199"
    && d.word.toLowerCase() !="south"
    && d.word.toLowerCase() !="trial"
    ) {
      graph.nodes.push({ "name": d.word, "radius": newScaledData[i], "color": color[i] });
      // graph.links.push({ "source": d.source,
      //                    "target": d.target,
      //                    "value": +d.value });
  }
     i++;
     });


console.log(graph.nodes);

var force = d3.layout.force()
    .nodes(graph.nodes)
    .size([width, height])
    .gravity(.04)
    .charge(0)
    .on("tick", tick)
    .start();

var svg = d3.select(_id).append("svg")
    .attr("width", width + margin.left + margin.right+"px")
    .attr("height", height + margin.top + margin.bottom+"px")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


var bubble = svg.selectAll(".bubble")
      .data(graph.nodes)
      .enter().append("g")
      .attr("class", "bubble")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
      .call(force.drag);

bubble.append("circle")
      .style("fill", function(d) { return d.color; })
      .attr("r", function(d) { return d.radius-2; })
      //.attr("r", function(d) { return radiusScale(d['count']); })
      .attr("line-height", function(d) { return d.radius*2; });
      
bubble.append("text")
      .attr("text-anchor", "middle")
      .text(function(d) { return d.name; })
      .style("font-size", "22px") // initial guess
      .style("font-family", "Helvetica, arial, sans-serif")
      //.style("text-transform", "uppercase")
      .style("font-size", function(d) { 
        var size =  (2 * d.radius - 8) / this.getComputedTextLength() * 20;
        //console.log("size "+ size);
        return Math.min(size, 20) + "px"
       // return size + "px"

       // return + "px"; 
      })
      .attr("dy", function(d) { return 5;})
      .style("fill", "#fff")
      .style("padding-top", "15px");
function tick(e) {
  bubble
      .each(cluster(10 * e.alpha * e.alpha))
      .each(collide(.6))
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
}

  var headline = svg.append('text')
    .text('Most Popular Words')
    .attr('x', 20)
    .attr('y', 80)
    .style("font-family", "'Oswald', arial, sans-serif")
    //.attr("class", "headline")
    .style("font-size", "52px")
    .style("fill", "#ffffff")
    //.style("text-shadow", "2px 2px #213E4C")

  var headline = svg.append('text')
    .text('for today March 8')
    .attr('x', 20)
    .attr('y', 110)
    .attr("fill", "#BDCCD4")
    .style("font-family", "'Oswald', arial, sans-serif")
    .attr("class", "headline")
    .style("font-size", "22px")
    //.style("text-shadow", "2px 2px #213E4C")


// Move d to be adjacent to the cluster node.
function cluster(alpha) {
  var max = {};

  // Find the largest node for each cluster.
  graph.nodes.forEach(function(d) {
    if (!(d.color in max) || (d.radius > max[d.color].radius)) {
      max[d.color] = d;
    }
  });

  return function(d) {
    var node = max[d.color],
        l,
        r,
        x,
        y,
        i = -1;

    if (node == d) return;

    x = d.x - node.x;
    y = d.y - node.y;
    l = Math.sqrt(x * x + y * y);
    r = d.radius + node.radius;
    if (l != r) {
      l = (l - r) / l * alpha;
      d.x -= x *= l;
      d.y -= y *= l;
      node.x += x;
      node.y += y;
    }
  };
}

// Resolves collisions between d and all other circles.
function collide(alpha) {
  var quadtree = d3.geom.quadtree(graph.nodes);
  return function(d) {
    var r = d.radius + radius.domain()[1] + padding,
        nx1 = d.x - r,
        nx2 = d.x + r,
        ny1 = d.y - r,
        ny2 = d.y + r;
    quadtree.visit(function(quad, x1, y1, x2, y2) {
      if (quad.point && (quad.point !== d)) {
        var x = d.x - quad.point.x,
            y = d.y - quad.point.y,
            l = Math.sqrt(x * x + y * y),
            r = d.radius + quad.point.radius + (d.color !== quad.point.color) * padding;
        if (l < r) {
          l = (l - r) / l * alpha;
          d.x -= x *= l;
          d.y -= y *= l;
          quad.point.x += x;
          quad.point.y += y;
        }
      }
      return x1 > nx2
          || x2 < nx1
          || y1 > ny2
          || y2 < ny1;
    });
  };
}

})


}



    this.bubble1 = bubble1;



}();


