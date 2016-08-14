if(!d3.chart) d3.chart = {};

d3.chart.scatter = function () {

    var rootElement,
        data,
        height = 400,
        width = 930,
        dispatch = d3.dispatch(chart, "hover"),
        cx = 10;

    var chart = function (element) {
        rootElement = element;

        rootElement = element;

        rootElement.append("g")
                   .classed('xAxis', true);

        rootElement.append("g")
                   .classed('yAxis', true);

        chart.update();

    }

    chart.update = function () {

        // Initialise Scale  --------

        var maxCreated = d3.max(data, function(d) { return d.data.created });
        var minCreated = d3.min(data, function(d) { return d.data.created });
        var maxScore = d3.max(data, function(d) { return d.data.score });

        var createdScale = d3.time.scale()
                                  .domain([minCreated, maxCreated])
                                  .range([cx, width]);

        var yScale = d3.scale.linear()
                             .domain([0, maxScore])
                             .range([height, cx])

        // RENDER ELEMENTS  --------

        var xAxis = d3.svg.axis()
                          .scale(createdScale)
                          .ticks(3)
                          .tickFormat(d3.time.format("%x %H:%M"))

        var xGroup = rootElement.select('.xAxis')
                                .classed('axis', true)
                                .attr("transform", "translate(" + [0,height] + ")")
                                .transition()

        var circles = rootElement.selectAll("circle")
                                 .data(data, function(d){ return d.data.id })

        circles.enter()
               .append('circle');

        circles
            .transition()
            .attr({
                cx: function(d, i) { return createdScale(d.data.created) },
                cy: function(d, i) { return yScale(d.data.score) },
                r: 4
            })
        xAxis(xGroup);

        circles.exit().remove()

        // Event handlers for circles --------

        circles.on('mouseover', function(d) {
            var node = this; // 'this' -> a reference to the DOM Node
            d3.select(node)
              .transition()
              .style('fill', 'red');
            dispatch.hover([d]);
        })
        circles.on('mouseout', function(d) {
            var node = this; // 'this' -> a reference to the DOM Node
            d3.select(node)
              .transition()
              .style('fill', 'black');
            dispatch.hover([]);
        })
    }

    chart.data = function (value) {
        if(!arguments.length) return data;
        data = value;
        return chart;
    }

    chart.highlight = function ( highlighted ) {

        var circles = rootElement.selectAll('circle')

        circles.style("fill", "black");

        var selected = circles
                       .data(highlighted,
                       function(d) { return d.data.id })

        selected.style("fill", "red");
    }

    chart.width = function ( value ) {
        if ( arguments.length < 1 ) return width;
        width = value;
        return chart;
    }

    chart.height = function ( value ) {
        if ( arguments.length < 1 ) return height;
        height = value;
        return chart;
    }

    return d3.rebind(chart, dispatch, "on");
}
