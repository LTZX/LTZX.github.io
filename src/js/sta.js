var staId = ["tabItem1", "tabItem2"];
var staData = {'tabItem1': {
    'data': ['Gender', 'Birth Year', 'Marriage', 'Grade', 'Score Level'],
    'graph': ['Bar Chart', 'Pie Chart', 'Line Chart'],
}, 'tabItem2': {
    'data': [],
    'graph': [],
}}

// ===== init =====
for(var i in staId) {
    var id = staId[i];
    $("#" + id).children().last()
    .append("<div class='staheader' id='staheader-'" + id + ">" +
        '<select class="selectpicker selectData" id="selectData-' + id + '" data-width="48%">' +
        '</select>' +
        '<select class="selectpicker selectGraph" id="selectGraph-' + id + '" data-width="48%">' +
        '</select>' +
    "</div>" +
    "<div class='stabody' id='stabody-'" + id + ">" +
    "</div>")
    console.log(id)

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
}
