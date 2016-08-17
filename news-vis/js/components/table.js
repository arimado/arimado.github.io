if(!d3.chart) d3.chart = {};

d3.chart.posts = function() {

    var rootElement,
        data,
        width,
        dispatch = d3.dispatch(chart, "hover", "sourceHover"),
        deleteSources;

    var colorScale = d3.scale.category20();


    var chart = function (element) {
        rootElement = element;

        if ($('.postsContainer').length < 1) {
            rootElement.append("div")
                       .classed("postsContainer", true);

            rootElement.append("div")
                       .classed("sourcesContainer", true);
        }

        chart.update();

        // console.log('table initialised')

    }

    chart.update = function () {

        // get all unique values in an array


        // console.log('update data: ', data);
        var postsContainer = rootElement.select("div.postsContainer");
        var posts = postsContainer
                    .selectAll("div.post")
                    .data(data, function (d) { return d.data.id })

        // console.log(posts);

        // RENDER POSTS ----------------------------

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
                .style('background', function (d) {
                    return colorScale(d.data.domain)
                })

        sourceContainer
            .append('span')
            .text(function (d) { return d.data.domain })


        // RENDER SOURCES ------------------------------------

        // var uniqueScores =  _.chain(data).uniqBy(function(d) {
        //     return d.data.domain;
        // })
        //
        // var sourceCounts = uniqueScores.value().map(function(d) {
        //     return {
        //         domain: d.data.domain,
        //         count: _.countBy(data, function(dC) {
        //             return dC.data.domain === d.data.domain
        //         }).true
        //     }
        // })

        $('.postSource').remove()

        var sources = rootElement
                .select("div.postsContainer")
                .selectAll(".postSource")
                .data(data, function (d) { return d.data.domain })

        var sourcesContainer = sources.enter();

        var sourceContainer = sourcesContainer
                .append('div')
                .classed('postSource', true)
                .attr({ id: function(d) {  return 'source_' + d.data.id }});

        var sourceContent = sourceContainer
                .append('div')
                .classed('title', true)

        sourceContent
                .append('i')
                .classed('fa', true)
                .classed('fa-circle', true)
                .style('color', function (d) { return colorScale(d.data.domain) } )

        sourceContent
                .append('a')
                .attr({ href: '#'})
                .text(function (d) { return d.data.domain })

        var sourceFreqContainer = sourceContent
                .append('div')
                .classed('sources', true)

        sourceFreqContainer.each(function(d) {

            var node = this;


            var stories = data.filter(function(dCheck) {
                return dCheck.data.domain === d.data.domain
            })

            stories.forEach(function(story) {
                d3.select(node).append('i')
                               .classed('fa', true)
                               .classed('fa-circle-o', true)
                               .classed('sourceCircle', true)
                               .style('color', function (d) { return colorScale(d.data.domain) } )
            })
        })

        var sourceStatsContainer = sourceContent
                .append('div')
                .classed('sourceStats', true)

        var sourceScore = sourceStatsContainer
                .append('div')
                .classed('sourceScore', true)

        sourceScore.each(function(d){
            var node = this;
            var stories = data.filter(function(dCheck) {
                return dCheck.data.domain === d.data.domain
            })
            var totalScore = stories.reduce(function(prev, next) {
                return prev + next.data.score
            }, 0)
            stories.forEach(function(story) {
                d3.select(node).html('<i class="fa fa-thumbs-up"></i> <span>' + totalScore + '</span>')
            })
        })

        var sourceComments = sourceStatsContainer
                .append('div')
                .classed('sourceComments', true)
                .text('sourceComments')

        sourceComments.each(function(d){
            var node = this;
            var stories = data.filter(function(dCheck) {
                return dCheck.data.domain === d.data.domain
            })
            var totalComments = stories.reduce(function(prev, next) {
                return prev + next.data.num_comments
            }, 0)
            stories.forEach(function(story) {

                var currentNode = d3.select(node);

                // currentNode.append('i')
                //            .classed('fa', true)
                //            .classed('fa-commenting', true);


                currentNode.html('<i class="fa fa-commenting"></i> <span>' + totalComments + '</span>')
            })
        })





        // USES DATA WITH D3 API

        // var sourceFreqContainer = sourceContent.selectAll('.sourceContainer')
        //                                        .data(data, function (d) { return d.data.id})
        //
        // console.log()
        //
        // var sourceFreq = sourceFreqContainer.enter();
        //
        // sourceFreq.append('p')
        //           .text(function(d) {return d.data.id})






        // EVENTS --------------------------------------------------------------

        posts.on('mouseover', function(d) {
            // console.log('mouseover')
            var node = this; // 'this' -> a reference to the DOM Node
            d3.select(node)
              .style('background-color', '#ccc');
            dispatch.hover([d]);
        })

        posts.on('mouseout', function(d) {
            // console.log('mouseout')
            var node = this; // 'this' -> a reference to the DOM Node
            d3.select(node)
              .style('background-color', 'white');
            dispatch.hover([]);
        })

        sources.on('mouseover', function (d) {
            var node = this;
            var matchedSources = _.filter(data, function(i) { return i.data.domain === d.data.domain });
            dispatch.sourceHover(matchedSources);
        })

        sources.on('mouseout', function (d) {
            var node = this;
            dispatch.sourceHover([]);
        })

    }

    chart.data = function ( value ) {
        data = value;
        return chart;
    }

    chart.highlight = function ( highlighted ) {

        var posts = rootElement.selectAll('.post')

        posts.style("background-color", "white");

        posts.data(highlighted, function(d) { return d.data.id })
            .transition()
            .style("background-color", "orange");

    }

    return d3.rebind(chart, dispatch, "on");
}
