function separate(nStr) {
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ' ' + '$2');
    }
    return x1 + x2;
}

$(".separate").each(function() {
    var text = separate($(this).text());
    $(this).text(text);
});

$(".games-type__choice").click(function() {
    if (!$(this).is("[active]")) {
        $(".games-type__choice").removeAttr("active");
        $(this).attr("active", "");
        
        $(".games-col").css("display", "none");
        $(".games-col").fadeIn(300);

        if ($(this).hasClass("games-type__choice--account")) {
            $(".game-panel").removeClass("game-panel--active");
            $(".game-panel--account").addClass("game-panel--active");
        } 
        
        if ($(this).hasClass("games-type__choice--key")) {
            $(".game-panel").removeClass("game-panel--active");
            $(".game-panel--key").addClass("game-panel--active");
        }
    }
});

$(".footer__to-top").click(function() {
    $("html, body").animate({ scrollTop: 0 }, 600);
});