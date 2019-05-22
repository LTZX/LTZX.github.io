var color = d3.scaleOrdinal().range(["#b52b2b", "#63a375","#87bcde","#d57a66"])
var composeCount = 1;
var currentID = 'tab1';
var width, height;

var force = d3.forceSimulation()
    .force("charge", d3.forceManyBody())
    .force("link", d3.forceLink().id(function(d) { return d.index }))
    .force("center", d3.forceCenter(width / 2, height / 2))

var controlWidth = 320;
var historyWidth = 150;
var svgWidth, svgHeight;

var hisBut = 1, controlBut = 1;

$("#controlBut").click(function() {
    event.preventDefault();
    console.log(width + " " + height)
    controlBut = 1 - controlBut;
    width = svgWidth[controlBut]
    if(controlBut == 1) {
        $('#svg'+currentID).width(width)
        force.force("center", d3.forceCenter(width / 2, height / 2))
        force.alpha(1).restart();
    } else {
        setTimeout(function(){
            $('#svg'+currentID).width(width)
            force.force("center", d3.forceCenter(width / 2, height / 2))
            force.alpha(1).restart();
        },300);
    }
})
$("#hisBut").click(function() {
    console.log(width + " " + height)

    hisBut = 1 - hisBut;
    height = svgHeight[hisBut]

    if(hisBut == 1) {
        $('#svg'+currentID).height(height)
        force.force("center", d3.forceCenter(width / 2, height / 2))
        force.alpha(1).restart();
    } else {
        setTimeout(function(){
            $('#svg'+currentID).height(height)
            force.force("center", d3.forceCenter(width / 2, height / 2))
            force.alpha(1).restart();
        },300);
    }
})

function drawOverview(id) {

    force = d3.forceSimulation()
       .force("charge", d3.forceManyBody())
       .force("link", d3.forceLink().id(function(d) { return d.index }))
       .force("center", d3.forceCenter(width / 2, height / 2))

    var svg = d3.select("#"+id).append("svg")
        .attr("id", "svg" + id)
        .attr("width", width)
        .attr("height", height);

    d3.json("FB_overview.json", function (error, json) {
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
            .attr('class', 'node')
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
