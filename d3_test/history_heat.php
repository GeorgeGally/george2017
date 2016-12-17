<!DOCTYPE html>
<head>
<meta charset="utf-8">

<label><input type="checkbox"> Sort values</label>
<script type="text/javascript" src="d3.js"></script>
<script type="text/javascript" src="js/jquery-1.10.1.min.js"></script>
<link rel="stylesheet" type="text/css" href="css/style.css">
<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
?>

<script>
/*document.domain = "radarboy.com";*/
var colours = ["#6E2721","#C4372C","#E45E20","#E9A309","#EEB400","#FAD000","#B5C4E4","#91A5D5","#5879C1","#3F68B8"];
var gender_colours = ["#27AAE1", "#EC008C"];
var page = 30;
colours.reverse();


var box_width = 50;
var w = 960,  
    h = 520; 

var rows = Math.round(h-box_width/box_width);
var cols = Math.round(w-box_width/box_width);

var margin = 40;
var scale = d3.scale.linear();
var radius = 8;

var history_url = "http://radarboy.com/twitterzeitgeist/locations/history/";

var svg = d3.select("body").append("svg")
    .attr("width", w)
    .attr("height", h);

var root = d3.select(svg)

var tooltip = d3.select("body").append("div")   
    .attr("class", "tooltip")               
    .style("opacity", 0);

function previous(func, seed) {
  return function(d, i) {
    return i > 0 ? func(data[i-1], i-1) : (seed || 0);
  }
}


function addGraph(history_url) {

  var line = d3.svg.line()
    .x(function(d) { return x(d.published); })
    .y(function(d) { return y(d.count); });
    d3.json(history_url).header("X-Requested-With", "XMLHttpRequest").get(function(error, data2) {
  //d3.json(history_url, function(error, data2) {


    if (error) {  
          //If error is not null, something went wrong.
          console.log("!!DATA LOAD ERROR: " + error);  //Log the error.
          $('#subheadline').html("DATA LOAD ERROR.");
      } else {      //If no error, the file loaded correctly. Yay!
          //console.log(data);   //Log the data.
    }
  
    data = data2;


  var minXDataPoint = d3.min(data, function(d) { return d['Location']['lat'];});
  var maxXDataPoint = d3.max(data, function(d) { return d['Location']['lat'];});
  var minYDataPoint = d3.min(data, function(d) { return d['Location']['lng'];});
  var maxYDataPoint = d3.max(data, function(d) { return d['Location']['lng'];});

  var minDist = d3.min(data, function(d) { return d['Location']['dist'];});
  var maxDist = d3.max(data, function(d) { return d['Location']['dist'];});

var xScale = d3.scale.linear()
        .domain([minXDataPoint, maxXDataPoint])
        .rangeRound([ 0, cols-1]);

var yScale = d3.scale.linear()
        .domain([minYDataPoint, maxYDataPoint])
        .rangeRound([ 0, rows-1]);

var distScale = d3.scale.linear()
        .domain([minDist, maxDist])
        .range([1, 80]);

var colourScale = d3.scale.linear()
        .domain([minDist, maxDist])
        .range([0, 9]);

var dot = svg
        .selectAll("rect")
        .data(data, function(d) { return "delegate-" + d['Location']['registration_id']; })
         .data(data)

dot.enter()
  .append("svg:rect")
  .attr("class", "dots")
  .style("opacity", .1) 
  //.attr("id", function(d, i) { return "delegate-" + d['Location']['registration_id']})
        .attr("class", function(d){ return d['Registration']['gender'] == "female" ? "female" : "male" })
        .style("opacity",0.01) 
      //.attr("r", radius) 
      .attr("width", box_width)
      .attr("height", box_width)
      .attr("x", function(d, i) { return i>0 ? box_width * xScale(data[i-1]['Location']['lat']): 0 })
      .attr("y", function(d, i) { return i>0 ? box_width * yScale(data[i-1]['Location']['lng']): 0 })      
      .on("mouseover", function(d, i) {  
        tooltip.html(d['Registration']['name']) 
              .style("left", (d3.event.pageX) + "px")     
              .style("top", (d3.event.pageY - 28) + "px");        
        tooltip.transition()        
              .duration(300)      
              .style("opacity", .9);      
              

  })                  
  .on("mouseout", function(d) {       
              tooltip.transition()        
                  .duration(500)      
                  .style("opacity", 0);   
  });
//.style("fill", function(d){ return colours[Math.round(colourScale(d['Location']['dist']))]})

var format = d3.time.format("%H:%M %p")

dot.transition() 
      .attr("x", function(d) { return box_width * xScale(d['Location']['lat'])})
      .attr("y", function(d) { return box_width * yScale(d['Location']['lng'])})
      .style("opacity", .01) 
      //.delay(function(d, i) { return 10*i})
      .duration(800)
      // .each("end",function() { // as seen above
      //     d3.select(this).transition().duration(50)   



var time = format(new Date(data[0]['Location']['created']));

$('#subheadline').html(time);

// setInterval(function(){
//   time = format(new Date(data[0]['Location']['created'])+1);
//   $('#subheadline').html(time);
// },100);


 });


}


/* dropdown stuff */

var url = "http://radarboy.com/twitterzeitgeist/locations/all_people";
//d3.json(url).header("Access-Control-Allow-Origin", "*").get(function(error, data) {
d3.json(url, function(data) {
//console.log(data);
var dropDown = d3.select("#peeps").append("select")
                    .attr("name", "people-list").on("change", alertChange);
var options = dropDown.selectAll("option")
      .data(data)
      .enter()
      .append("option");

options.text(function (d) { return d['Location']['name'] + "-- " + d['Location']['registration_id']; })
       .attr("value", function (d) { return d['Location']['registration_id']; });




function alertChange() {
          //the name isn't important, but has to match the name
          //you added to the menu's "change" event listener.
    var selectedValue = d3.event.target.value;
         //get the name of the selected option from the change event object
    console.log("================"+selectedValue);
    //dot.attr("class","active");
    d3.selectAll("circle")
    .classed( "active", false )
    .classed( "unselected", false )
    .attr('class', 'unselected')

    var person = "#delegate-"+selectedValue;
     d3.select(person).attr('class', 'active');
//    console.log("================"+person);
 //addGraph(locations_url+selectedValue);

}

 addGraph(history_url+page);

setInterval(function() {
  page+=100;
  addGraph(history_url+page+"/"+15000);
}, 2000);




 });



</script>
</head>
<body>
<div id="peeps"></div>
<h2 id="subheadline">Loading...</h2>
<h1 id="headline">Delegate Movement</h1>
</body>