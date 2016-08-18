if(!d3.chart) d3.chart = {};


d3.chart.scatter = function () {

    var rootElement,
        data,
        height = 400,
        width = 930,
        dispatch = d3.dispatch(chart, "hover"),
        cx = 10;

    var colorScale = d3.scale.category20();

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

        var createdScale = d3.time
                .scale()
                .domain([minCreated, maxCreated])
                .range([cx + 30, width]);

        var commentScale = d3.scale
                .linear()
                .domain(d3.extent(data, function(d) {return d.data.num_comments}))
                .range([3, 20])

        var scoreScale = d3.scale
                .linear()
                .domain([0, maxScore])
                .range([height, cx])


        // RENDER ELEMENTS  --------

        // X Axis render

        var getRelativeTime = function (dateObj) {
            return moment(dateObj, 'hour').fromNow()
        }

        var xAxis = d3.svg
                .axis()
                .scale(createdScale)
                .ticks(5)
                .tickFormat(getRelativeTime)

        var xGroup = rootElement
                .select('.xAxis')
                .classed('axis', true)
                .attr("transform", "translate(" + [0,height] + ")")
                .transition()

        xAxis(xGroup); // same as chaining .call(xAxis) to xGroup

        // Y Axis render

        var yAxis = d3.svg
                .axis()
                .scale(scoreScale)
                .ticks(3)
                .orient('left')

        var yGroup = rootElement
                .select('.yAxis')
                .classed('axis', true)
                .classed("yaxis", true)
                .attr("transform", "translate(" + [cx + 30,0] + ")")
                .transition()

        yAxis(yGroup);


        // Circle render

        var circles = rootElement.selectAll("circle")
                                 .data(data, function(d){ return d.data.id })

        circles.enter()
               .append('circle');

        circles
            .transition()
            .attr({
                cx: function(d, i) { return createdScale(d.data.created) },
                cy: function(d, i) { return scoreScale(d.data.score) },
                r: function(d, i) { return commentScale(d.data.num_comments) }
            })

        addCircleStyles(circles)

        circles.exit().remove()

        // Circle events

        circles.on('mouseover', function(d) {
            var node = this; // 'this' -> a reference to the DOM Node
             addHoverCircleStyles(d3.select(node).transition(), d)
            dispatch.hover([d]);
        })

        circles.on('mouseout', function(d) {
            var node = this; // 'this' -> a reference to the DOM Node
            addCircleStyles(d3.select(node).transition(), d)
            dispatch.hover([]);
        })
    }

    // Data init

    chart.data = function (value) {
        if(!arguments.length) return data;
        data = value;
        return chart;
    }

    // External event handlers

    chart.highlight = function ( highlighted ) {

        var circles = rootElement.selectAll('circle')

        circles
            .interrupt()
            .transition()
            .style("fill", "white")
            .style("stroke", function(d, i) { return colorScale(d.data.domain) })
            .style("stroke-width", "2")

        removeSelectedElements(rootElement, '.circleHighlight')

        if (highlighted.length < 1) return; // IF HIGHLIGHTS THEN CONTINUE

        var selectedCircle = circles
                 .data(highlighted, function(d) { return d.data.id });

        selectedCircle
            .interrupt()
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
