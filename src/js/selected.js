var selected = [];
function drawSelected() {
    $("#" + currentID).append(
        "<div class='sel' id='sel" + currentID + "'>"+
            "<div class='selheader' id='selheader" + currentID + "'>"+
                '<button type="button" class="btn btn-light btn-sm selclear disabled" id="selclear'+ currentID + '"> < </button>' +
                '<button type="button" class="btn btn-light btn-sm selclose" id="selclose'+ currentID + '"> X </button>' +
            "</div>"+
        "</div>"+
        '<button type="button" class="btn btn-primary btn-lg selbut" id="selbut' + currentID + '">Selected Items</button>'
    )
    $("#sel" + currentID).draggable({containment: "parent"});
    $("#selbut" + currentID).draggable({containment: "parent", cancel:false});

    $("#sel" + currentID).position({
        my: "right top",
        at: "right-50 top-50",
        of: "#" + currentID
    });

    $("#selbut" + currentID).position({
        my: "left top",
        at: "left top",
        of: "#sel" + currentID
    });


    // $.getJSON( "src/data/ins.json", function( data ) {
    //     items = []
    //     $.each( data, function( i , row ) {
    //         if(row["count"] == 1) {
    //             items.push( "<li value=" + i + " class='list-group-item disabled' style='background-color:" + hexToRGB(color(row["level"]), 0.4) + " '>" + row["name"] + " (" + row["count"] + ")" + "</li>" );
    //         } else {
    //             items.push( "<li value=" + i + " class='list-group-item' style='background-color:" + hexToRGB(color(row["level"]), 0.4) + " '>" + row["name"] + " (" + row["count"] + ")" + "</li>" );
    //         }
    //     });
    //     $( "<ul/>", {
    //         "class": "list-group",
    //         "id": "list" + currentID,
    //         html: items.join( "" )
    //     }).appendTo( "#ins" + currentID );
    // });

    selData[currentID] = {"close": false, "count": 0};
}

$(document).on('click', '.selbut', function(){
    $("#sel" + currentID).position({
        my: "left top",
        at: "left top",
        of: "#selbut" + currentID
    });
    $("#selbut"+currentID).css("visibility", "hidden");
    $("#sel"+currentID).css("visibility", "visible");
    selDict[currentID]["close"] = false;
})

$(document).on('click', '.selclear', function(){

});

$(document).on('click', '.selclose', function(){
    $("#sel"+currentID).css("visibility", "hidden");
    $("#selbut"+currentID).css("visibility", "visible");
    selDict[currentID]["close"] = true;
    $("#selbut" + currentID).position({
        my: "left top",
        at: "left top",
        of: "#sel" + currentID
    });
});
