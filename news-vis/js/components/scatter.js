if(!d3.chart) d3.chart = {};


d3.chart.scatter = function () {

    var rootElement,
        data,
        height = 400,
        width = 930,
        dispatch = d3.dispatch(chart, "hover"),
        cx = 10;

    var colorScale = d3.scale.category20c();

    var chart = function (element) {
        rootElement = element;

        rootElement.append("g")
                   .classed('xAxis', true);

        rootElement.append("g")
                   .classed('yAxis', true);

        chart.update();

    }

    // HELPERS ------------

    var addCircleStyles = function( d3obj, data) {
        return d3obj.style("fill", "white")
                    .style("stroke", function(d, i) { return colorScale(d.data.domain) })
                    .style("stroke-width", "2")
    }

    var addHoverCircleStyles = function ( d3obj, data ) {
        return d3obj.style("fill", colorScale(data.data.domain) )
                    .style("stroke", "none")
                    .style("stroke-width", "2");
    }

    var overlayHighlight = function(rootEl, data) {
        rootEl.insert('ellipse', ":first-child")
                   .classed('circleHighlight', true)
                   .style("stroke", "white")
                   .style("fill", "white")
                   .transition()
                   .attr({
                       cx: data.getAttribute('cx'),
                       cy: data.getAttribute('cy'),
                       rx: data.getAttribute('r') / 2 * 4,
                       ry: data.getAttribute('r') / 2 * 4,
                       r: data.getAttribute('r') * 2 + 20,
                   })
                   .style("stroke", "orange")
                   .style("stroke-width", "2");
    }


    var removeSelectedElements = function ( rootEl, selector ) {
        var highlights = rootEl.selectAll(selector);
        if (highlights[0].length > 0) {
            highlights.remove();
        }
        return highlights;
    }


    chart.update = function () {

        // Initialise Scale  --------

        var maxCreated = d3.max(data, function(d) { return d.data.created });
        var minCreated = d3.min(data, function(d) { return d.data.created });
        var maxScore = d3.max(data, function(d) { return d.data.score });

        var createdScale = d3.time.scale()
                                  .domain([minCreated, maxCreated])
                                  .range([cx, width]);

        var commentScale = d3.scale.linear()
                                   .domain(d3.extent(data, function(d) {return d.data.num_comments}))
                                   .range([3, 20])

        var yScale = d3.scale.linear()
                             .domain([0, maxScore])
                             .range([height, cx])
        // HELPERS

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
                r: function(d, i) { return commentScale(d.data.num_comments) }
            })

        addCircleStyles(circles)

            // .style('opacity', function(d) {return commentScale(d.data.num_comments)})
        xAxis(xGroup);

        circles.exit().remove()

        // Event handlers for circles --------

        circles.on('mouseover', function(d) {
            var node = this; // 'this' -> a reference to the DOM Node
             addHoverCircleStyles(d3.select(node).transition(), d)
            dispatch.hover([d]);
        })

        circles.on('mouseout', function(d) {
            var node = this; // 'this' -> a reference to the DOM Node
            d3.select(node).transition()
                .style("fill", "white")
                .style("stroke", function(d, i) { return colorScale(d.data.domain) })
                .style("stroke-width", "2")
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

        circles
            .interrupt()
            .transition()
            .style("fill", "white")
            .style("stroke", function(d, i) { return colorScale(d.data.domain) })
            .style("stroke-width", "2")


        removeSelectedElements(rootElement, '.circleHighlight')

        if (highlighted.length < 1) return;


        var selectedCircle = circles
                 .data(highlighted, function(d) { return d.data.id });

        // console.log(selectedCircle[0][0]);

        // console.log(highlighted);

        selectedCircle.interrupt()
                      .transition()
                      .style("fill", function(d) { return colorScale(d.data.domain)})
                      .style("stroke", "none")
                      .style("stroke-width", "2");


        var selectedCircleNode = selectedCircle[0][0]


        selectedCircle[0].forEach(function(node_data, i) {
            overlayHighlight(rootElement, node_data)
        })



        var selectedData = highlighted[0].data;



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
