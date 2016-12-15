!function() {
  var g1 = {
    version: "3.4.1"
  };
g1.globe = function(_id) {



var width = 960,
    height = 500;

var projection = d3.geo.orthographic()
    .scale(148)
    .clipAngle(90);

var canvas = d3.select(_id).append("canvas")
    .attr("width", width)
    .attr("height", height);

var c = canvas.node().getContext("2d");

var path = d3.geo.path()
    .projection(projection)
    .context(c);

var title = d3.select("h1");

queue()
    .defer(d3.json, "data/world-110m.json")
    .defer(d3.tsv, "data/world-country-names.tsv")
    .await(ready);

function ready(error, world, names) {
  var globe = {type: "Sphere"},
      land = topojson.feature(world, world.objects.land),
      countries = topojson.feature(world, world.objects.countries).features,
      borders = topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }),
      i = -1,
      n = countries.length;

  countries = countries.filter(function(d) {
    return names.some(function(n) {
      if (d.id == n.id) return d.name = n.name;
    });
  }).sort(function(a, b) {
    return a.name.localeCompare(b.name);
  });

    var headline = canvas.append('text')
    .text('Online media intensity')
    .attr('x', 50)
    .attr('y', 120)
    .attr("class", "headline");

  (function transition() {
    d3.transition()
        .duration(1250)
        .each("start", function() {
          title.text(countries[i = (i + 1) % n].name);
          // title.attr("x", 100);
          // title.attr("dy", 500);
        })
        .tween("rotate", function() {
          var p = d3.geo.centroid(countries[i]),
              r = d3.interpolate(projection.rotate(), [-p[0], -p[1]]);
          return function(t) {
            projection.rotate(r(t));
            c.clearRect(0, 0, width, height);
            c.fillStyle = "#00ADEE", c.beginPath(), path(globe), c.fill(); // sea
            c.fillStyle = "#8BC53F", c.beginPath(), path(land), c.fill(); // land

            c.fillStyle = "#EAA523", c.beginPath(), path(countries[i]), c.fill(); //highlight
           // c.strokeStyle = "#ddd", c.lineWidth = .5, c.beginPath(), path(borders), c.stroke();
            
          };
        })
      .transition()
        .each("end", transition);
  })();
}
}


    this.g1 = g1;



}();