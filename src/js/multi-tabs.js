$('#new-tab').click(function (e) {
    composeCount = composeCount + 1; //increment compose count
    var count = composeCount;
    currentID = "tab" + count; //this is id on tab content div where the
    $('.multi-link').removeClass("active show")
    $('.multi-pane').removeClass("active show")

    $('#new-tab').before(
        '<li class="nav-item multi-item" id="litab'+ count + '">'+
            '<a class="nav-link multi-link active show" data-toggle="tab" id="atab' + count +
            '" href="#' + currentID + '">'+
                '<button value="' + count + '" class="close" >×</button>Tab ' + count + '</a></li>');
    $('#multi-tabs-content').append('<div class="tab-pane multi-pane active show" id="' + currentID + '">  </div>');
    drawOnetab();
})

$(document).on('click', '.multi-link', function(){
    currentID = $(this)[0].id.substring(1);
    $('#svg'+currentID).width(width)
    $('#svg'+currentID).height(height)
    forceDict[currentID].force("center", d3.forceCenter(width / 2, height / 2))
    forceDict[currentID].alpha(1).restart();
})

$(document).on('click', '.close', function(){
     var id = parseInt($(this).val());
     var index = $('#litab'+id).index(".multi-item");
     if($('#atab'+id).hasClass("active")) {
         $('#litab'+id).remove();
         $('#tab'+id).remove();
         var numOfTab = $('.multi-link').length;
         if(index == numOfTab) {
             $('.multi-link').last().addClass('active show');
             $('.multi-pane').last().addClass('active show');
         } else {
             $('.multi-link').eq(index).addClass('active show');
             $('.multi-pane').eq(index).addClass('active show');
         }
     } else {
         $('#litab'+id).remove();
         $('#tab'+id).remove();
     }
});
