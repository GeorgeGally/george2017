!function() {
  var m = {
    version: "3.4.1"
  };

m.MovementGraph = function() {

  var colours = ["#6E2721","#C4372C","#E45E20","#E9A309","#EEB400","#FAD000","#B5C4E4","#91A5D5","#5879C1","#3F68B8"];
  colours.reverse();

  var w = 960,  
      h = 300; 
  var margin = 40;
  var scale = d3.scale.linear();

  var locations_url = "../twitterzeitgeist/locations/individual/";

  function addGraph(locations_url) {

    d3.select("svg")
       .remove();
    var svg = d3.select("#graph1").append("svg")
      .attr("width", w)
      .attr("height", h);

    var line = d3.svg.line()
      .x(function(d) { return x(d.published); })
      .y(function(d) { return y(d.count); });

      
      d3.json(locations_url, function(data2) {
  
        data = data2;
        //console.log(data);
        //name = data['name'];
        data = data['data'];

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

        // console.log("min: "+ minDist);
        // console.log("max: "+ maxDist);

        var dot = svg.append("g")
                     .attr("class", "dots")
                     .selectAll(".dot")
                     //.data(interpolateData(2004))
                     .data(data)
                     .enter()
                     .append("g");


        dot.append("circle")             
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

        $('#headline').html(name);

      });


    }


    /* dropdown stuff */

    var url = "../twitterzeitgeist/locations/all_people"
    d3.json(url, function(data) {
    //console.log(data);
    var dropDown = d3.select("#peeps").append("select")
            .attr("name", "people-list").attr("class", "people-list1").on("change", alertChange);

    var options = dropDown.selectAll("option")
          .data(data)
          .enter()
          .append("option");
    options.text(function (d) { return d['Location']['name']; })
           .attr("value", function (d) { return d['Location']['registration_id']; });

    function alertChange() {
              //the name isn't important, but has to match the name
              //you added to the menu's "change" event listener.
              var selectedValue = d3.event.target.value;
        var selectedValue = d3.event.target.value;  
             //get the name of the selected option from the change event object
        console.log(selectedValue);
        addGraph(locations_url+selectedValue);
    }


    addGraph(locations_url+3);
    $('.people-list1').val(3);
   
   //});



})


}



    this.m = m;



}();





