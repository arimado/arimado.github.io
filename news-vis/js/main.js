
var chartOffsetWidth = -20;
var scatterOffsetHeight = -70;
var brushOffsetTranslate = -50;

d3.json("https://www.reddit.com/r/worldnews.json", function(err, posts) {
// d3.json("../posts.json", function(err, posts) {
    init(posts)
})

var getHeight = function (offset) {
    var offset = offset || 0;
    return $('.chart').height() + offset;
}

var getWidth = function (offset) {
    var offset = offset || 0;
    return $('.chart').width() + offset;
}

var init = function (posts) {

    var data = posts.data.children;

    data.forEach(function(d) {
        d.data.created *= 1000;
    })

    var display = d3.select("#display");

    // DOM RENDERS -------------------------------------------------------------

    // POSTS
    //
    var postsElement = display
                       .append("div")
                       .classed("posts", true);

    var posts = d3.chart.posts();
    posts.data(data);
    posts(postsElement);

    // SVG RENDERS -------------------------------------------------------------

    var svg = d3.select("svg");
        svg.classed('chart', true);
    // SCATTER

    var scatterGroup = svg.append("g");
    var scatter = d3.chart.scatter();

    scatter
      .data(data)
      .width(getWidth(chartOffsetWidth))
      .height(getHeight(scatterOffsetHeight))
      (scatterGroup);

    // BRUSH

    var brushGroup = svg.append("g")
                        .attr("transform", "translate(10, " + getHeight(brushOffsetTranslate) + ")");

    var brush = d3.chart.brush();

    brush
        .data(data)
        .width(getWidth(chartOffsetWidth))
        (brushGroup);

    // D3 EVENTS ---------------------------------------------------------------

    brush.on("filter", function(filtered) {

        // console.log('sup', filtered);
        scatter.data(filtered);
        scatter.update();
        posts.data(filtered);
        posts.update();
        $('.postsContainer').scrollTop(0)
    });

    scatter.on("hover", function(hovered) {

        posts.highlight(hovered);
        posts.update();


        var isScrolling = false;

        if (hovered.length > 0 && !isScrolling) {
            isScrolling = true;
            $('.postsContainer').scrollTop(0)
            $('.postsContainer').animate({
                scrollTop: $("#" + hovered[0].data.id).offset().top
            }, 200, function () {
                isScrolling = false;
            });
        }
    })


    posts.on('hover', function(hovered) {
        // console.log('hovered: ', hovered);
        scatter.highlight(hovered);
        scatter.update();
    })

    // DOM EVENTS --------------------------------------------------------------

    $(window).resize(function(e) {

        var chartTargetWidth = getWidth(chartOffsetWidth);

        // resize scatter

        var scatterTargetHeight = getHeight(scatterOffsetHeight);
        scatter.width( chartTargetWidth );
        scatter.height( scatterTargetHeight );
        scatter.update();

        // resize brush

        // .attr("transform", "translate(0, 430)");

        var brushYTranslate = getHeight(brushOffsetTranslate);

        brush.width( chartTargetWidth );

        brushGroup.transition()
                  .attr("transform", "translate(10, " + brushYTranslate + ")");

        brush.update();


    })

}
