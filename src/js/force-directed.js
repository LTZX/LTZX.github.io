$("#controlBut").click(function() {
    event.preventDefault();

    controlBut = 1 - controlBut;
    width = svgWidth[controlBut]
    if(controlBut == 1) {
        $('#svg'+currentID).width(width)
        forceDict[currentID].force("center", d3.forceCenter(width / 2, height / 2))
        forceDict[currentID].alpha(1).restart();
    } else {
        setTimeout(function(){
            $('#svg'+currentID).width(width)
            forceDict[currentID].force("center", d3.forceCenter(width / 2, height / 2))
            forceDict[currentID].alpha(1).restart();
        },300);
    }
})
$("#hisBut").click(function() {
    hisBut = 1 - hisBut;
    height = svgHeight[hisBut]
    if(hisBut == 1) {
        $('#svg'+currentID).height(height)
        forceDict[currentID].force("center", d3.forceCenter(width / 2, height / 2))
        forceDict[currentID].alpha(1).restart();
    } else {
        setTimeout(function(){
            $('#svg'+currentID).height(height)
            forceDict[currentID].force("center", d3.forceCenter(width / 2, height / 2))
            forceDict[currentID].alpha(1).restart();
        },300);
    }
})


function drawOverview() {

    var force = d3.forceSimulation()
       .force("charge", d3.forceManyBody())
       .force("link", d3.forceLink().id(function(d) { return d.index }))
       .force("center", d3.forceCenter(width / 2, height / 2))

    forceDict[currentID] = force;

    var svg = d3.select("#" + currentID).append("svg")
        .attr("class", "svg")
        .attr("id", "svg" + currentID)
        .attr("width", width)
        .attr("height", height)
        .append("g")

    d3.json("src/data/FB_overview.json", function (error, json) {
        if (error) throw error;
        force
            .nodes(json.nodes)
            .force("link").links(json.links)

        var link = svg.selectAll(".link")
            .data(json.links)
            .enter()
            .append("line")
            .attr("class", "link");

        var node = svg.selectAll(".node")
            .data(json.nodes)
            .enter().append("g")
            .attr("class", "node")
            .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended))

        node.append('circle')
            .attr('class', function (d) { return 'node node' + currentID + " " + currentID + d.name; })
            .attr('r', 10)
            .attr('fill', function (d) { return color(d.level); });

        // node.append("text")
        //     .attr("dx", -18)
        //     .attr("dy", 8)
        //     .style("font-family", "overwatch")
        //     .style("font-size", "18px")
        //
        //     .text(function (d) {
        //         return d.name
        //     });

        force.on("tick", function () {
            link.attr("x1", function (d) {
                    return d.source.x;
                })
                .attr("y1", function (d) {
                    return d.source.y;
                })
                .attr("x2", function (d) {
                    return d.target.x;
                })
                .attr("y2", function (d) {
                    return d.target.y;
                });
            node.attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            });
        });
    });



    function dragstarted(d) {
        if (!d3.event.active) force.alphaTarget(0.5).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    function dragended(d) {
        if (!d3.event.active) force.alphaTarget(0.5);
        d.fx = null;
        d.fy = null;
    }

}
var items = [];
function drawInstruction() {
    $("#" + currentID).append("<!-- Draggable DIV -->"+
        "<div class='ins' id='ins" + currentID + "'>"+
            "<div class='insheader' id='insheader" + currentID + "'>"+
                '<button type="button" class="btn btn-light btn-sm insback" id="insback'+ currentID + '"> < </button>' +
                '<button type="button" class="btn btn-light btn-sm insclose" id="insclose'+ currentID + '"> X </button>' +
            "</div>"+
        "</div>"+
        '<button type="button" class="btn btn-primary btn-lg insbut" id="insbut' + currentID + '">Node Detail</button>'
    )
    $("#ins" + currentID).draggable({containment: "parent"});
    $("#ins" + currentID).position({
        my: "left top",
        at: "left+50 top+50",
        of: "#" + currentID
    });

    $("#insbut" + currentID).position({
        my: "left top",
        at: "left+50 top",
        of: "#" + currentID
    });


    $.getJSON( "src/data/ins.json", function( data ) {
        items = []
        $.each( data, function( i , row ) {
            if(row["count"] == 1) {
                items.push( "<li value=" + i + " class='list-group-item disabled' style='background-color:" + hexToRGB(color(row["level"]), 0.4) + " '>" + row["name"] + " (" + row["count"] + ")" + "</li>" );
            } else {
                items.push( "<li value=" + i + " class='list-group-item' style='background-color:" + hexToRGB(color(row["level"]), 0.4) + " '>" + row["name"] + " (" + row["count"] + ")" + "</li>" );
            }
        });
        $( "<ul/>", {
            "class": "list-group",
            "id": "list" + currentID,
            html: items.join( "" )
        }).appendTo( "#ins" + currentID );
    });

    instDict[currentID] = {"close": false, "clicked": false};
}

$(document).on('click', '.insbut', function(){
    $("#insbut"+currentID).css("visibility", "hidden");
    $("#ins"+currentID).css("visibility", "visible");
    if(instDict[currentID]["clicked"]) {
        $("#insback"+currentID).css("visibility", "visible");
    }
    instDict[currentID]["close"] = false;
})

$(document).on('click', '.insback', function(){
    instDict[currentID]["clicked"] = false;
    $("#insback"+currentID).css("visibility", "hidden");

    $("#list"+currentID).remove();

    $( "<ul/>", {
        "class": "list-group",
        "id": "list" + currentID,
        html: items.join( "" )
    }).appendTo( "#ins" + currentID );
});

$(document).on('click', '.insclose', function(){
    $("#ins"+currentID).css("visibility", "hidden");
    $("#insback"+currentID).css("visibility", "hidden");
    $("#insbut"+currentID).css("visibility", "visible");
    instDict[currentID]["close"] = true;
});

$(document).on('click', '.list-group-item', function(){
    if(!$(this).hasClass("disabled") && !instDict[currentID]["clicked"]){
        var current = instData[$(this).attr('value')]
        var detail = current["data"];
        $("#list"+currentID).remove();
        var tmp = []
        $.each( detail, function( i, row ) {
            tmp.push( "<li class='list-group-item' style='background-color:" + hexToRGB(color(current["level"]), 0.4) + " '>" + row + "</li>" );
        });
        $( "<ul/>", {
            "class": "list-group",
            "id": "list" + currentID,
            html: tmp.join( "" )
        }).appendTo( "#ins" + currentID );
        $("#insback"+currentID).css("visibility", "visible");
        instDict[currentID]["clicked"] = true;
    } else {
        var current = $(this).text()
        d3.selectAll(".node" + currentID).style("opacity", 0.2);
        d3.select("." + currentID + current).style("opacity", 1);
    }

});

function drawOnetab() {
    drawOverview();
    drawInstruction();
}

drawOnetab()
