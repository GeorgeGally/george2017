!function() {
  var m2 = {
    version: "3.4.1"
  };

m2.MovementBarGraph = function() {

  var colours = ["#6E2721","#C4372C","#E45E20","#E9A309","#EEB400","#FAD000","#B5C4E4","#91A5D5","#5879C1","#3F68B8"];
  colours.reverse();

  var w = 960,
      h = 300;
  var margin = 40;
  var scale = d3.scale.linear();

  //var locations_url = "../twitterzeitgeist/locations/individual/";
  var locations_url = "../socialzeitgeist/locations/individual/";


  function addGraph2(locations_url) {

    d3.select("#graph2 svg").remove();

    var svg2 = d3.select("#graph2").append("svg")
    .attr("width", w)
    .attr("height", h);

      d3.json(locations_url, function(data2) {

        data = data2;
        //console.log(data);
        data = data['data'];

        var minXDataPoint = d3.min(data, function(d) { return d['Location']['lat'];});
        var maxXDataPoint = d3.max(data, function(d) { return d['Location']['lat'];});
        var minYDataPoint = d3.min(data, function(d) { return d['Location']['lng'];});
        var maxYDataPoint = d3.max(data, function(d) { return d['Location']['lng'];});
        var minDist = d3.min(data, function(d) { return d['Location']['dist'];});
        var maxDist = d3.max(data, function(d) { return d['Location']['dist'];});

        var xScale = d3.scale.linear()
                .domain([0, w])
                .range([ 0 + margin, w-margin]);

        var yScale = d3.scale.linear()
                .domain([minYDataPoint, maxYDataPoint])
                .range([0+margin, h-margin]);

        var distScale = d3.scale.linear()
                .domain([minDist, maxDist])
                .range([1, h]);

        var colourScale = d3.scale.linear()
                .domain([minDist, maxDist])
                .range([0, 9]);

        // console.log("min: "+ minDist);
        // console.log("max: "+ maxDist);


        var dot = svg2.append("g")
                     .attr("class", "dots")
                     .selectAll(".dot")
                     //.data(interpolateData(2004))
                     .data(data)
                     .enter()
                     .append("g");

        dot.append("rect")
              .attr("width", function(d,i) { return 5})
              .attr("height", 0)
              .attr("x", function(d, i) { return 6*i})
              .attr("y", h)
              .style("fill", function(d){ return colours[Math.round(colourScale(d['Location']['dist']))]})
              .style("opacity",0.9)
            .transition()
              .attr("height", function(d) { return distScale(d['Location']['dist'])})
              .attr("y", function(d) { return h-distScale(d['Location']['dist'])})
              .delay(function(d, i) { return 10*i})
              .duration(300);

        $('#headline2').html(name);

      });


    }


  /* dropdown stuff */

//  var url = "http://test.radarboy.com/~silver_beast/twitterzeitgeist/locations/all_people"
  var url = "../twitterzeitgeist/locations/all_people"
  d3.json(url, function(data) {
  //console.log(data);
  var dropDown2 = d3.select("#peeps2").append("select")
                      .attr("name", "people-list").attr("class", "people-list2").on("change", alertChange);
  var options = dropDown2.selectAll("option")
        .data(data)
        .enter()
        .append("option");
  options.text(function (d) { return d['Location']['name']; })
         .attr("value", function (d) { return d['Location']['registration_id']; });


function alertChange() {
         $('#headline2').html("Loading...");
          var selectedValue = d3.event.target.value;
    var selectedValue = d3.event.target.value;
         //get the name of the selected option from the change event object
    console.log(selectedValue);
    addGraph2(locations_url+selectedValue);

}

 addGraph2(locations_url+1865);
 $('.people-list2').val(1865);


 //});


})


}


this.m2 = m2;



}();
