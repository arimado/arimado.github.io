var chartOffsetWidth = -20;
var scatterOffsetHeight = -70;
var brushOffsetTranslate = -50;

d3.json("https://www.reddit.com/r/worldnews.json", function(err, posts) {
// d3.json("../posts.json", function(err, posts) {
    var currentPosts = posts.data.children;
    J.setProp('posts', timesEachBy1000(posts.data.children));
    J.setProp('next', posts.data.after);
    init();
})


var showPosts = function () {
    if (J.getProp('filter') === 'posts') return;
    J.setProp('filter', 'posts');
    setFilter();
    $('.postsContainer').scrollTop(0)
}

var showSources = function () {
    if (J.getProp('filter') === 'sources') return;
    J.setProp('filter', 'sources');
    setFilter();
    $('.postsContainer').scrollTop(0)
}


var timesEachBy1000 = function (data) {
    data.forEach(function(d) { d.data.created *= 1000 })
    return data;
}

var getHeight = function (offset) {
    offset = offset || 0;
    return $('.chart').height() + offset;
}

var getWidth = function (offset) {
    var offset = offset || 0;
    return $('.chart').width() + offset;
}

var setFilter = function () {
    var filter = J.getProp('filter');
    if ( filter === 'posts' ) {
        $('.post').css('display', 'block');
        $('.postSource').css('display', 'none');
        $('#postsFilter').css('background', 'rgb(244, 242, 246)');
        $('#sourcesFilter').css('background', 'white')
    }
    if ( filter === 'sources' ) {
        $('.post').css('display', 'none');
        $('.postSource').css('display', 'block');
        $('#sourcesFilter').css('background', 'rgb(244, 242, 246)')
        $('#postsFilter').css('background', 'white');

    }
}

var init = function (posts) {

    var data = J.getProp('posts');

    // data.forEach(function(d) {
    //     d.data.created *= 1000;
    // })

    var display = d3.select("#display");

    // DOM RENDERS -------------------------------------------------------------

    // POSTS

    var postsElement = display.append("div")
                              .classed("posts", true);

        postsElement.append("div")
                    .classed("dashboard", true)

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

        showPosts();

        posts.highlight(hovered);
        posts.update();


        var isScrolling = false;

        if (hovered.length > 0 && !isScrolling) {
            isScrolling = true;
            $('.postsContainer').scrollTop(0)
            $('.postsContainer').animate({
                scrollTop: $("#" + hovered[0].data.id).offset().top - $('.dashboard').height()
            }, 200, function () {
                isScrolling = false;
            });
        }
    })

    posts.on("sourceHover", function (hovered) {
        scatter.highlight(hovered);
    })


    posts.on('hover', function(hovered) {
        scatter.highlight(hovered);
        // scatter.update();
        // why dont you need to update the chart with new data?
        // this is because all update does is upate the DOM
        // the highliight function does the same
        // its not the same as the react virstual dom diffing
    })

    // JQUERY stuff ------------------------------------------------------------

    $('.dashboard').html($('#dashboard_content').html())
    var dashHeight = $('.dashboard').height();
    var postHeight = $('.posts').height();
    $('.posts').height(postHeight - dashHeight);


    // DOM EVENTS --------------------------------------------------------------


    var fetchPosts = function () {

        if (J.getProp('isFetching')) return;

        J.setProp('isFetching', true);
        J.setProp('fetchCount', J.getProp('fetchLimit'));

        $('#fetch a').text('fetching...')

        var fetchLoop = function () {
            if(J.getProp('fetchCount') > 0) {
                setTimeout(function() {
                    var fetchCount = J.getProp('fetchCount');
                    var next = J.getProp('next');
                    d3.json("https://www.reddit.com/r/worldnews.json?" + "count=100&after=" + next, function(err, recievedPosts) {
                        // d3.json("../posts.json", function(err, posts) {
                        var oldPosts = J.getProp('posts');
                        var newPosts = oldPosts.concat(timesEachBy1000(recievedPosts.data.children))

                        J.setProp('posts', newPosts);
                        J.setProp('next', recievedPosts.data.after);

                        data = J.getProp('posts');

                        scatter
                            .data(data)
                            .width(getWidth(chartOffsetWidth))
                            .height(getHeight(scatterOffsetHeight))
                            (scatterGroup);

                        brush
                            .data(data)
                            .width(getWidth(chartOffsetWidth))
                            (brushGroup);

                        posts.data(data);
                        posts(postsElement);

                        J.setProp('fetchCount', fetchCount -= 1);
                        showPosts();
                        fetchLoop();
                    })
                }, 1000)
            } else {
                $('#fetch a').text('fetch more');
                J.setProp('isFetching');
            }
        }

        fetchLoop();

    }

    fetchPosts();

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

        // resize posts

        // var dashHeight = $('.dashboard').height();
        // var postHeight = $('.posts').height();
        // $('.posts').height(postHeight - dashHeight);



    })

    $('#fetch').on('click', function () {
        fetchPosts();
    })

    $('#exitIntro').on('click', function() {
        $('#info').fadeOut();
    })

    $('#refresh').on('click', function() {
        $('#info').fadeIn();
    })


    $('#postsFilter').on('click', function() {
        showPosts();
    })

    $('#sourcesFilter').on('click', function() {
        showSources();
    })


}
