(function(){
    var templates = document.querySelectorAll('script[type="text/handlebars"]');

    Handlebars.templates = Handlebars.templates || {};

    Array.prototype.slice.call(templates).forEach(function(script) {
        Handlebars.templates[script.id] = Handlebars.compile(script.innerHTML);
    });

    var next;
    var typeVar;
    var input;


    var get_data = function (){
        $("#resultDa").empty();
        $("#moreIt").remove();

        createButttonMore();


        typeVar = $("select").val();
        console.log(typeVar);
        var artist = $("input").val();
        console.log(artist);
        $.get("https://api.spotify.com/v1/search", {type:typeVar, q:artist},renderResults);

    };//);

    $("button").click(function() {
        get_data();
    });

    $("input").keyup(function (event){
        if (event.keyCode === 13){
            get_data();
        }
    });

    var createButttonMore = function(){
        input = $('<input id="moreIt" type="button" value="More" />');
        input.appendTo($("body"));
        input.click(function(){
            $.get(next,renderResults);
        });
    };

    function renderResults(result){

        console.log(result);
        var items = (typeVar === "album" ? result.albums.items : result.artists.items);
        if (items >= 0) {
            $("body").append('<h2>No results found for </h2>' + ' <br> <p>Please make sure your words are spelled correctly, or use fewer or different keyword.</p>');
        }

        next = (typeVar === "album" ? result.albums.next : result.artists.next);
        if (next === null){
            $("#moreIt").hide();
        }
        console.log(next);
        $("#resultDa").append(Handlebars.templates.spotify(items));

    }
})();
