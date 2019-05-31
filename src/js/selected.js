function drawSelected() {
    $("#" + currentID).append(
        "<div class='sel' id='sel" + currentID + "'>"+
            "<div class='selheader' id='selheader" + currentID + "'>"+
                '<button type="button" class="btn btn-light btn-sm selclear disabled" id="selclear'+ currentID + '"> Clear </button>' +
                '<button type="button" class="btn btn-light btn-sm selclose" id="selclose'+ currentID + '"> X </button>' +
            "</div>"+
            "<div class='selbody' id='selbody" + currentID + "'>"+
                "<h6 id='selnothing' style='opacity: 0.5; margin-top:10px;'> Nothing Selected </h6>" +
            "</div>"+
        "</div>"+
        '<button type="button" class="btn btn-primary btn-lg selbut" id="selbut' + currentID + '">Selected Items</button>'
    )
    $("#sel" + currentID).draggable({containment: "parent",  axis: 'x' });
    $("#selbut" + currentID).draggable({containment: "parent", axis: 'x', cancel:false});

    // $("#sel" + currentID).resizable();
    // var offset = $("#" + currentID).offset();
    // var left = offset.left + $("#"+currentID).width() - 50 - ;

    // $("#sel" + currentID).position({
    //     my: "right top",
    //     at: "right-80 top-90",
    //     of: "#" + currentID,
    //     within: "#" + currentID
    // });

    $("#selbut" + currentID).position({
        my: "left top",
        at: "left top",
        of: "#sel" + currentID,
        within: "#" + currentID
    });

    selData[currentID] = {"close": false, "count": 0, "items": {} };
}

$(document).on('click', '.selbut', function(){
    $("#sel" + currentID).position({
        my: "left top",
        at: "left top",
        of: "#selbut" + currentID,
        within: "#" + currentID
    });
    $("#selbut"+currentID).css("visibility", "hidden");
    $("#sel"+currentID).css("visibility", "visible");
    selData[currentID]["close"] = false;
})

$(document).on('click', '.selclear', function(){
    selData[currentID]['count'] = 0;
    selData[currentID]['items'] = {};
    d3.select('#sel' + currentID).selectAll('.selectedBox').remove();
    $('#selnothing').append("<h6 id='selnothing' style='opacity: 0.5; margin-top:10px;'> Nothing Selected </h6>")
});

$(document).on('click', '.selclose', function(){
    $("#selbut" + currentID).position({
        my: "left top",
        at: "left top",
        of: "#sel" + currentID,
        within: "#" + currentID
    });
    $("#sel"+currentID).css("visibility", "hidden");
    $("#selbut"+currentID).css("visibility", "visible");
    selData[currentID]["close"] = true;
});

function addItem(key) {
    console.log(infoDict[key]);
    selData[currentID]['count']++;
    if(selData[currentID]['count'] != 0) {
        $('#selnothing').remove();
    }
    if(!(key in selData[currentID]["items"])) {
        selData[currentID]["items"][key] = infoDict[key];
        $('#selbody' + currentID).append( '<div class="selectedBox" id="sb#' + key +
            '" style="background-color: ' + hexToRGB(color(infoDict[key]['level']), 0.4) + '">' +
                '<button type="button" class="btn btn-light btn-xs sbclose" id="sbclose#' + key + '"> X </button>' +
                '<div class="sbinfo">' +
                    '<h6> name: ' + key + ' </h6>' +
                    '<h6> count: ' + infoDict[key]['count'] + ' </h6>' +
                    '<h6> level: ' + infoDict[key]['level'] + ' </h6>' +
                '</div>' +
            '</div>'
        )
    }
}
