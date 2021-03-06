!function() {
  var l1 = {
    version: "3.4.1"
  };
l1.line_graph = function(url, w, h) {

var margin = {top: 20, right: 60, bottom: 60, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var parseDate = d3.time.format("%Y-%m-%d").parse,
    bisectDate = d3.bisector(function(d) { return d.published; }).left,
    formatValue = d3.format(",.2f"),
    formatCurrency = function(d) { return formatValue(d); };

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0])

    //.domain([0,100]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .ticks(7);

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(4);

var line = d3.svg.line()
    .x(function(d) { return x(d.published); })
    .y(function(d) { return y(d.count); });

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var area = d3.svg.area()
    .x(function(d) { return x(d.published); })
    .y0(height)
    .y1(function(d) { return y(d.count); })
    
   

  d3.json(url, function(data) {

// BUT WHEN I PARSE THE ARRAY THE SAME WAY I WOULD HAVE WITH THE EXTERNAL TSV
// USING THE CODE BELOW, I'M GETTING UNDESIRABLE RESULTS WHERE THE CODE BELOW IS
// LOOPING BY THE NUMBER OF ELEMENTS IN THE ARRAY (10) AND APPENDING THE CHART
// ELEMENTS 10 TIMES...
  var total = 0;  
  data.forEach(function(d) {
    d.published = parseDate(d.published);
    d.count = +d.count;
    total += d.count;
  });
        

  console.log("total:"+ total);
  data.sort(function(a, b) {
    return a.published - b.published;
  });

  x.domain([data[0].published, data[data.length - 1].published]);
  y.domain(d3.extent(data, function(d) { return d.count; }));

  var bottomAxis = height + 30;
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + bottomAxis + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      
      //.text("Count");   



 var path = svg.append("path")  
     .datum(data) 
      .attr("class", "area")
      .attr("d", area);

var totalLength = path.node().getTotalLength();
        path
            .attr("stroke-dasharray", totalLength+","+totalLength)
            .attr("stroke-dashoffset", totalLength)
            .transition()
            .duration(3000)
            .ease("linear-in-out")
            .attr("stroke-dashoffset", 0);


  var focus = svg.append("g")
      .attr("class", "focus")
      .style("display", "none");

  focus.append("circle")
      .attr("r", 15);

  focus.append("text")
      .attr("x", 0)
      .style("text-anchor", "middle")
      .attr("fill", "#fff")
      .attr("font-size", "16px")
      .attr("dy", ".35em");

  var headline = svg.append('text')
    .text('Online media intensity')
    .attr('x', 50)
    .attr('y', 120)
    .attr("class", "headline")



  svg.append("rect")
      .attr("class", "overlay")
      .attr("width", width)
      .attr("height", height)
      .on("mouseover", function() { focus.style("display", null); })
      .on("mouseout", function() { focus.style("display", "none"); })
      .on("mousemove", mousemove);

  function mousemove() {
    var x0 = x.invert(d3.mouse(this)[0]),
        i = bisectDate(data, x0, 1),
        d0 = data[i - 1],
        d1 = data[i],
        d = x0 - d0.published > d1.published - x0 ? d1 : d0;
    focus.attr("transform", "translate(" + x(d.published) + "," + y(d.count) + ")");
    focus.select("text").text(d.count);
  }
  });

}


    this.l1 = l1;
 

}();