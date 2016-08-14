if(!d3.chart) d3.chart = {};

d3.chart.posts = function() {

    var rootElement,
        data,
        width,
        dispatch = d3.dispatch(chart, "hover");

    var chart = function (element) {
        rootElement = element;
        element.append("div").classed("postsContainer", true);
        chart.update();
    }

    chart.update = function () {
        // console.log('update data: ', data);
        var postsContainer = rootElement.select("div.postsContainer");
        var posts = postsContainer
                    .selectAll("div.post")
                    .data(data, function (d) { return d.data.id })
        // console.log(posts);

        // RENDER POSTS -------

        posts.exit().remove();

        var postsContainer = posts.enter();

        var postContainer = postsContainer
            .append('div')
            .classed('post', true)
            .attr({ id: function(d) {  return d.data.id}})

        postContainer
            .append('div')
            .classed('title', true)
            .append('a')
                .attr({ href: function(d) {  return d.data.url}})
                .text(function (d) { return d.data.title })

        var statsContainer = postContainer
            .append('div')
                .classed('stats', true);

        var scoreContainer = statsContainer
            .append('div')
                .classed('score', true)
                .classed('tag', true)

        scoreContainer
            .append('i')
            .classed('fa', true)
            .classed('fa-thumbs-up', true);

        scoreContainer
            .append('span')
            .text(function (d) { return d.data.score });

        var commentsContainer = statsContainer
            .append('div')
                .classed('comments', true)
                .classed('tag', true)

        commentsContainer
            .append('i')
            .classed('fa', true)
            .classed('fa-commenting', true);

        commentsContainer
            .append('span')
            .text(function (d) { return d.data.num_comments })

        var sourceContainer = postContainer
            .append('div')
                .classed('source', true)
                .classed('tag', true)


        // sourceContainer
        //     .append('i')
        //     .classed('fa', true)
        //     .classed('fa-thumbs-up', true)

        sourceContainer
            .append('span')
            .text(function (d) { return d.data.domain })




        // EVENTS

        posts.on('mouseover', function(d) {
            var node = this; // 'this' -> a reference to the DOM Node


            d3.select(node)
            //   .transition()
              .style('background-color', '#ccc');
            dispatch.hover([d]);
        })

        posts.on('mouseout', function(d) {
            var node = this; // 'this' -> a reference to the DOM Node
            d3.select(node)
            //   .transition()
              .style('background-color', 'white');
            dispatch.hover([]);

        })

    }

    chart.data = function ( value ) {
        data = value;
        return chart;
    }

    chart.highlight = function ( highlighted ) {

        var posts = rootElement.selectAll('.post')

        posts
            //  .transition()
             .style("background-color", "white");

        posts.data(highlighted, function(d) { return d.data.id })
            //
            .transition()
             .style("background-color", "orange");

    }

    return d3.rebind(chart, dispatch, "on");
}
