!function() {
  var Stream = {
    version: "3.4.1"
  };
Stream.streamGraph = function(url, color) {




var datearray = [];
var colorrange = [];



if (color == "blue") {
  colorrange = ["#045A8D", "#2B8CBE", "#74A9CF", "#A6BDDB", "#D0D1E6", "#F1EEF6"];
}
else if (color == "pink") {
  colorrange = ["#980043", "#DD1C77", "#DF65B0", "#C994C7", "#D4B9DA", "#F1EEF6"];
}
else if (color == "orange") {
  colorrange = ["#B30000", "#E34A33", "#FC8D59", "#FDBB84", "#FDD49E", "#FEF0D9"];
}

colorrange = ["#E4EDED","#6E2721","#C4372C","#E45E20","#E9A309","#EEB400","#FAD000","#B5C4E4","#91A5D5","#5879C1","#3F68B8"];



strokecolor = colorrange[0];

var format = d3.time.format("%m/%d/%y");

var margin = {top: 20, right: 40, bottom: 30, left: 30};
var width = document.body.clientWidth - margin.left - margin.right;
var height = 400 - margin.top - margin.bottom;

var tooltip = d3.select("#stream_graph")
    .append("div")
    .attr("class", "remove")
    .attr("class", "d3-tip")
    .style("position", "absolute")
    .style("z-index", "20")
    .style("visibility", "hidden")
    

var tip =  d3.select(".d3-tip")
    .style("top", "20px")
    .style("left", "55px");



var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height-10, 0]);

var z = d3.scale.ordinal()
    .range(colorrange);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .ticks(d3.time.weeks);

var yAxis = d3.svg.axis()
    .scale(y)
    .ticks(0);

var yAxisr = d3.svg.axis()
    .scale(y);

var stack = d3.layout.stack()
    //.offset("silhouette")
    .values(function(d) { return d.values; })
    .x(function(d) { return d.date; })
    .y(function(d) { return d.value; });

var nest = d3.nest()
    .key(function(d) { return d.key; });

var area = d3.svg.area()
    .interpolate("cardinal")
    .x(function(d) { return x(d.date); })
    .y0(function(d) { return y(d.y0); })
    .y1(function(d) { return y(d.y0 + d.y); });

var svg = d3.select(".chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var graph = d3.csv(url, function(data) {
  data.forEach(function(d) {
    d.date = format.parse(d.date);
    d.value = +d.value;
  });

  var layers = stack(nest.entries(data));

  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain([0, d3.max(data, function(d) { return d.y0 + d.y; })]);

  svg.selectAll(".layer")
      .data(layers)
    .enter().append("path")
      .attr("class", "layer")
      .attr("d", function(d) { return area(d.values); })
      .style("fill", function(d, i) { return colorrange[i+3]; });


  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + width + ", 0)")
      .call(yAxis.orient("right"));

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis.orient("left"));

  var layer = svg.selectAll(".layer")
    .attr("opacity", 1)
    .on("mouseover", function(d, i) {
      svg.selectAll(".layer").transition()
      .duration(400)
      .attr("opacity", function(d, j) {
        return j != i ? 0.05 : 1;
    })})

    .on("mousemove", function(d, i) {
      mouse = d3.mouse(this);
      mousex = mouse[0];
      mousey = mouse[1]
      var invertedx = x.invert(mousex);
      invertedx = invertedx.getMonth() + invertedx.getDate();
      var selected = (d.values);
      for (var k = 0; k < selected.length; k++) {
        datearray[k] = selected[k].date
        datearray[k] = datearray[k].getMonth() + datearray[k].getDate();
      }

      mousedate = datearray.indexOf(invertedx);
      pro = d.values[mousedate].value;

      d3.select(this)
      .classed("hover", true)
      .attr("stroke", "#fff")
      .attr("stroke-width", "0px"), 
      tooltip.html( "<p style='padding: 15px; text-align: left; margin:0 0 -12px 0; font-size: 20px !important;'>" + d.key + "</p><h3 style='padding: 0 15px 0 15px; text-align: left; margin:0;font-size: 40px'>" + Math.round(pro*5000) + "</h3>" )
      
    })
   
       //tooltip.html( "<p style='padding: 15px !important;; margin:0 0 5px 0; font-size: 20px !important;'>" + d.key + "</p><h3 style='margin:0;font-size: 40px'>" + Math.round(pro*5000) + "</h3>" )

      //tip.attr('class', 'd3-tip')
      // .attr("x", function() {         
      //       mousex = d3.mouse(this);
      //       mousex = mousex[0] + 5;
      //       console.log(mousex);
      //       return mousex;

      //  })

      ;
  })
      


  // var vertical = d3.select(".chart")
  //       .append("div")
  //       .attr("class", "remove")
  //       .style("position", "absolute")
  //       .style("z-index", "19")
  //       .style("width", "1px")
  //       .style("height", "380px")
  //       .style("top", "10px")
  //       .style("bottom", "30px")
  //       .style("left", "0px")
        //.style("background", "#fff");



  // d3.select(".chart")
  //     .on("mousemove", function(){  
  //        mouse = d3.mouse(this);
  //        mousex = mouse[0] -90;
  //        mousey = mouse[1] -140;
         // vertical.style("left", mousex + "px" )
        // tip.style("top", mousey + "px" )
   //    })
      // .on("mouseover", function(){  
      //    mouse = d3.mouse(this);
      //    mousex = mouse[0] -110;
      //    mousey = mouse[1] - 140;
      //    vertical.style("left", mousex + "px")
      //    //tip.style("left", mousex+20 + "px")
      //  });

d3.select(".chart")
      .on("mousemove", function(){  
         mouse = d3.mouse(this);
         //console.log(mousex);
         mousex = mouse[0] -120;
         tip.style("left", mousex + "px");
         mousey = mouse[1] - 100;
         tip.style("top", mousey + "px" )
        // .transition();
       })
      .on("mouseover", function(){  
         // mouse = d3.mouse(this);
         // mousex = mouse[0] - 110;
         // mousey = mouse[1] - 55;
         // tip.style("left", mousex + "px")
         // tip.style("top", mousey + "px" )
         tip.style("visibility", "visible")
         tip.attr('class', 'd3-tip animate')
         //.transition();
       })
       .on("mouseout", function(d, i) {
     svg.selectAll(".layer")
     .transition()
      .duration(150)
      .attr("opacity", "1");
      
      //    tooltip.attr("opacity", "0")
      // .classed("hover", false)
      // .classed("visibility", false)
      // .attr("visibility", "hidden")
      // tip.style("visibility", false)




});

tooltip.on("mouseout", function(d, i) {
	   tooltip.attr("opacity", "0")
      .classed("hover", false)
      .classed("visibility", false)
      tip.attr('class', 'animate')
      .attr("visibility", "hidden")
      tip.style("visibility", false)
});

//        svg.on("mouseout", function(d, i) {
//      //svg.selectAll(".layer")
//      // .transition()
//       //.duration(150)
//       //.attr("opacity", "1");
//       //alert("out");
   
//       .attr("opacity", "0")
//       .classed("hover", false)
//       .classed("visibility", false)
//       .attr("visibility", "hidden")




// });

}



    this.Stream = Stream;



}();
