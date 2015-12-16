jQuery(document).ready(function ($) {
    $('.skill-bar-inner').css('width', '0');

    $(window).on('load', function () {
        $('.skill-bar-inner').each(function () {
            var itemWidth = $(this).data('level');

            $(this).animate({width: itemWidth}, 800);
        });
    });

    /* jQuery RSS - https://github.com/sdepold/jquery-rss */
    $("#rss-feeds").rss(

        //RSS feeds link
        "https://adarshkonchady.wordpress.com/feed/",

        {
            // how many entries do you want?
            // default: 4
            // valid values: any integer
            limit: 5,

            // the effect, which is used to let the entries appear
            // default: 'show'
            // valid values: 'show', 'slide', 'slideFast', 'slideSynced', 'slideFastSynced'
            effect: 'slideFastSynced',

            // outer template for the html transformation
            // default: "<ul>{entries}</ul>"
            // valid values: any string
            layoutTemplate: "<div class='item'>{entries}</div>",

            // inner template for each entry
            // default: '<li><a href="{url}">[{author}@{date}] {title}</a><br/>{shortBodyPlain}</li>'
            // valid values: any string
            entryTemplate: '<h3 class="title"><a href="{url}" target="_blank">{title}</a></h3><div><p>{shortBodyPlain}</p><a class="more-link" href="{url}" target="_blank"><i class="fa fa-external-link"></i>Read more</a></div>'

        }
    );


});