var video = document.getElementsByTagName('iframe');
var allowedSrcValues = ['about:blank', 'https://www.udemy.com'];

$('iframe').each(function(frame) {
    var href = window.location.href;
    var regex = /lecture\/(\d+)/;
    var lectureId = href.match(regex)[1];

    var iframeSrc = $(this).attr('src');
    if (!iframeSrc) {
        return;
    }
    var isExternalUrl = true;

    for(var i=0;i<allowedSrcValues.length;i++) {
        if(iframeSrc.indexOf(allowedSrcValues[i]) >= 0) {
            isExternalUrl = false;
        }
        else {
            continue;
        }
    }

    if (isExternalUrl) {
        return;
    }

    var domDiv = $(this).contents().find('div[data-lecture-id]')[0];
    var domValue = $(domDiv).attr('data-lecture-id');

    if(domValue === lectureId) {
        var link = $(this).contents().find('body div div.asset-container>div video').attr('src');

        if (link !== void 0) {
            var a = document.createElement('a');
            a.href = link;
            a.download = 'link';
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
        }
        return false;
    }
});