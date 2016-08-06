function home() {
    scrollTo('home');
}

function about() {
    scrollTo('about');
}

function product() {
    scrollTo('product');
}

function contact() {
    scrollTo('contact');
}

function scrollTo(elementId) {
    $('html, body').animate({
        scrollTop: $('#' + elementId).offset().top
    }, 500);
}

$(document).ready((function() {
    const ANCHOR_PREFIX = "#section_";
    if (window.location.hash.indexOf(ANCHOR_PREFIX) == -1) {
        return;
    }
    var sectionParameter = window.location.hash.split(ANCHOR_PREFIX)[1];
    scrollTo(sectionParameter);
}));
