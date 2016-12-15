 !function() {
  var bar_vert = {
    version: "3.4.1"
  };
bar_vert.barVert = function(_id, url) {

  d3.json(url, function(data) {

    var tip = d3.tip()
      .attr('class', 'd3-tip')
      .html(function(d) { return '<span>' + d.count + '</span>' + ' ' })
      .offset([-12, 0])

    var w = 800,
        h = 300,
        padt = 20, padr = 20, padb = 60, padl = 30,
        x  = d3.scale.ordinal().rangeRoundBands([0, w - padl - padr], 0.1),
        y  = d3.scale.linear().range([h, 0]),
        yAxis = d3.svg.axis().scale(y).orient('left').tickSize(-w + padl + padr),
        xAxis = d3.svg.axis().scale(x).orient('bottom')

    vis = d3.select(_id)
      .append('svg')
      .attr('width', w)
      .attr('height', h + padt + padb)
    .append('g')
      .attr('transform', 'translate(' + padl + ',' + padt + ')')

    var max = d3.max(data, function(d) { return d.count })
    x.domain(d3.range(data.length))
    y.domain([0, max])

    vis.call(tip)
    vis.append("g")
      .attr("class", "y axis")
      .call(yAxis)


    vis.append("g")
      .attr("class", "x axis")
      .attr('transform', 'translate(0,' + h + ')')
      .call(xAxis)
      .selectAll('.x.axis g')
        .style('display', function (d, i) { return i % 3 != 0  ? 'none' : 'block' })

    var bars = vis.selectAll('g.bar')
      .data(data)
    .enter().append('g')
      .attr('class', 'bar')
      .attr('transform', function (d, i) { return "translate(" + x(i) + ", 0)" })

    bars.append('rect')
      .attr('width', function() { return x.rangeBand() })
      .attr('height', 0)
      .attr('y', h) 
      .transition().delay(function (d,i){ return i * 20;})
      .attr('height', function(d) { return h - y(d.count) })
      .attr('y', function(d) { return y(d.count) }) 
      
  
    bars.selectAll('rect')
    .on('mouseover', function(d) {
        tip.attr('class', 'd3-tip animate').show(d)
      })  

  })
  }


      this.bar_vert = bar_vert;



}();
