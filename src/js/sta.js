var staId = ["tabItem1", "tabItem2"];
var staData = {'tabItem1': {
    'data': ['Gender', 'Birth Year', 'Marriage', 'Grade', 'Score Level'],
    'graph': ['Bar Chart', 'Pie Chart', 'Line Chart'],
}, 'tabItem2': {
    'data': [],
    'graph': [],
}}
var curSelected = { 'tabItem1':
    ["Gender", "Bar Chart"],
    'tabItem2':
    ["", ""]
}

function drawGraph(tabId) {
    if(curSelected[tabId][0] != "" && curSelected[tabId][1] != "") {
        d3.json("src/data/sta.json", function(data){
            console.log(data)
            switch (curSelected[tabId][1]) {
                case "Bar Chart":
                    drawBar(data['data'], tabId)
                    break;
                default:
                    break;
            }
        })
    }
}

// ===== init =====
for(var i in staId) {
    var id = staId[i];
    $("#" + id).children().last()
    .append("<div class='staheader' id='staheader-" + id + "'>" +
        '<select class="selectpicker selectData" id="selectData-' + id + '" data-width="48%">' +
        '</select>' +
        '<select class="selectpicker selectGraph" id="selectGraph-' + id + '" data-width="48%">' +
        '</select>' +
    "</div>" +
    "<div class='stabody' id='stabody-" + id + "'>" +
    "</div>")

    var data = $();
    for(var i in staData[id]['data']) {
        var each = staData[id]['data'][i];
        data = data.add('<option>'+each+'</option>');
    }
    $('#selectData-'+id).append(data)

    var graph = $();
    for(var i in staData[id]['graph']) {
        var each = staData[id]['graph'][i];
        graph = graph.add('<option>'+each+'</option>');
    }
    $('#selectGraph-'+id).append(graph)
    drawGraph(id);
}


$('.selectpicker').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
    var tabID = $(this).attr('id');
    tabID = tabID.substr(tabID.indexOf('-')+1);
    var selectID = tabID.substr(0, tabID.indexOf('-'));

    if(selectID == 'selectData') {
        curSelected[0] = staData[tabID]['data'][clickedIndex];
    } else {
        curSelected[1] = staData[tabID]['graph'][clickedIndex];
    }
});
