function drawSelected() {
    $("#" + currentID).append(
        "<div class='sel' id='sel" + currentID + "'>"+
            "<div class='selheader' id='selheader" + currentID + "'>"+
                '<button type="button" class="btn btn-light btn-sm selclear" id="selclear'+ currentID + '"> Clear </button>' +
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

function setbackNodes() {
    d3.selectAll(".node" + currentID)
    .attr("r", 10)
    .style("opacity", 1);
}

function updateNodes() {
    d3.selectAll(".node" + currentID)
    .attr("r", 10)
    .style('stroke', "none")
    .style("opacity", 0.5);
    for(var key in selData[currentID]["items"]){
        d3.selectAll("." + currentID + "-" + key)
        .attr("r", 10)
        .style('stroke', "none")
        .style("opacity", 1);
    }
}

function addItem(key, html) {
    if(selData[currentID]['count'] == 0) {
        $('#selnothing').remove();
        $('#sel' + currentID).append('<button id="submit'+ currentID +
        '" type="button" class="submit btn btn-sm btn-light btn-lg btn-block">Submit</button>')
    }
    selData[currentID]['count']++;
    if(!(key in selData[currentID]["items"])) {
        selData[currentID]["items"][key] = infoDict[key];
        if(selData[currentID]['close'] == true) {
            $("#sel" + currentID).position({
                my: "left top",
                at: "left top",
                of: "#selbut" + currentID,
                within: "#" + currentID
            });
            $("#selbut"+currentID).css("visibility", "hidden");
            $("#sel"+currentID).css("visibility", "visible");
            selData[currentID]["close"] = false;
        }
        if(html){
            $('#selbody' + currentID).prepend( '<div class="selectedBox" id="sb-' + key +
                '" style="background-color: ' + hexToRGB(color(infoDict[key]['level']), 0.4) + '">' +
                    '<button type="button" class="btn btn-light btn-xs sbclose" id="sbclose-' + key + '"> X </button>' +
                    '<div class="sbinfo">' +
                        '<h6> name: ' + key + ' </h6>' +
                        '<h6> count: ' + infoDict[key]['count'] + ' </h6>' +
                        '<h6> level: ' + infoDict[key]['level'] + ' </h6>' +
                    '</div>' +
                '</div>'
            )
        }
        updateNodes();
    }
}

function removeItem(key, decrease) {
    delete selData[currentID]["items"][key];
    $("#sb-" + key).remove();
    if(decrease)
        selData[currentID]['count']--;
    if(selData[currentID]['count'] == 0 && decrease) {
        setbackNodes();
        $('#selbody' + currentID).append("<h6 id='selnothing' style='opacity: 0.5; margin-top:10px;'> Nothing Selected </h6>")
        $('#submit' + currentID).remove();
    } else {
        updateNodes();
    }
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
    if(selData[currentID]['count'] != 0){
        selData[currentID]['count'] = 0;
        selData[currentID]['items'] = {};
        d3.select('#sel' + currentID).selectAll('.selectedBox').remove();
        $('#selbody' + currentID).append("<h6 id='selnothing' style='opacity: 0.5; margin-top:10px;'> Nothing Selected </h6>")
        setbackNodes();
        $('#submit' + currentID).remove();
    }
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

$(document).on('click', '.sbclose', function(){
    var key = $(this).attr('id')
    key = key.substr(key.indexOf('-')+1)
    removeItem(key, true);
});

$(document).on('click', '.submit', function(){
    submit();
});
