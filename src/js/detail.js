// var savedPage;
function cleanForDetail() {
    // savedPage = $('#' + currentID)[0].outerHTML;
    // console.log(savedPage)
    // $('#' + currentID).empty();
    var oldID = currentID.slice();
    newTab();
    parent[currentID] = oldID;
    detailData[currentID] = {};
    Object.assign(detailData[currentID], selData[oldID]["items"])

    $('#' + currentID)
    .append('<button type="button" class="btn btn-primary back" id="back' + currentID + '">Back To Overview</button>');
    $('#' + currentID)
    .append('<div class="alert alert-info alert-dismissible" style="margin:20px;">' +
        '<button class="close" type="button" data-dismiss="alert">×</button>' +
        '<strong>Zoom In!</strong> To see more details of the network.' +
    '</div>')

    drawDetail();
}

function submit(){
    cleanForDetail();
}

$(document).on('click', '.back', function(){
    $('.multi-link').removeClass('active show');
    $('.multi-pane').removeClass('active show');
    $('#'+parent[currentID]).addClass('active show');
    $('#a'+parent[currentID]).addClass('active show');
    currentID = parent[currentID]
})
