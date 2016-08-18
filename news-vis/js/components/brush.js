if(!d3.chart) d3.chart = {};

d3.chart.brush = function () {

    var rootElement,
        data,
        width = 800,
        height = 30,
        dispatch = d3.dispatch(chart, "filter");

    var chart = function ( container ) {
        rootElement = container;

        chart.update();
    }

    chart.update = function () {

        var extent = d3.extent( data, function(d) {
            return d.data.created
        })

        var xScale = d3.time.scale()
                            .domain(extent)
                            .range([30, width])

        var brush = d3.svg.brush()
        brush.x(xScale)

        brush(rootElement);

        rootElement.classed('brush', true);

        rootElement.selectAll("rect").attr("height", height)
        rootElement.selectAll(".background")
          .style({fill: "white", visibility: "visible"})
        rootElement.selectAll(".extent")
          .style({fill: "#78C5C5", visibility: "visible"})
        rootElement.selectAll(".resize rect")
          .style({fill: "#276C86", visibility: "visible"})

        var rects = rootElement.selectAll('rect.events')
                               .data(data)
        rects.enter()
             .append('rect')
             .classed('events', true)

        rects.attr({
                x: function (d) { return xScale(d.data.created);},
                y: 0,
                width: 1,
                height: height
              })
              .style({'pointer-events': 'none',
                      'fill': 'grey'});

        brush.on("brushend", function() {

            var range = brush.extent(),
                rangeMin = range[0],
                rangeMax = range[1]

            var filtered = data.filter(function(d) {
                var isLargerThanMin = d.data.created > rangeMin;
                var isSmallerThanMax = d.data.created < rangeMax;
                return (isLargerThanMin && isSmallerThanMax)
            })

            dispatch.filter(filtered);

        });

    }

    chart.data = function ( value ) {
        if (!arguments.length) return data;
        data = value;
        return chart;
    }

    chart.width = function ( value ) {
        if (!arguments.length) return width;
        width = value;
        return chart;
    }

    return d3.rebind(chart, dispatch, "on");
}
