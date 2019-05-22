$('#content-his').append(

    '<ul class="nav nav-tabs" id="multi-tabs">'+
        '<li class="nav-item multi-item" id="litab1">'+
            '<a class="nav-link multi-link active" data-toggle="tab" id="atab1" href="#tab1">'+
                '<button class="close" value=1>×</button>Tab 1'+
            '</a>'+
        '</li>'+
        '<button class="btn btn-light btn-sm" id="new-tab"> + </button>'+
    '</ul>'+
    '<div class="tab-content" id="multi-tabs-content">'+
        '<div class="tab-pane multi-pane active" id="tab1">'+
            '<p> Tab 1 </p>'+
        '</div>'+
    '</div>'
)

$('#history').append('<h3 style="text-align:center; opacity:0.5;""> No History</h3>')
width = $('#'+currentID).width() ;
height = $('#'+currentID).height() * 0.9 ;
console.log(width + " " + height)
svgWidth = {1: width, 0: width+controlWidth}
svgHeight = {1: height, 0: height+historyWidth}
drawOverview('tab1')

$('#new-tab').click(function (e) {
    composeCount = composeCount + 1; //increment compose count
    var count = composeCount;
    var tabId = "tab" + count; //this is id on tab content div where the
    $('.multi-link').removeClass("active show")
    $('.multi-pane').removeClass("active show")

    $('#new-tab').before(
        '<li class="nav-item multi-item" id="litab'+ count + '">'+
            '<a class="nav-link multi-link active show" data-toggle="tab" id="atab' + count +
            '" href="#' + tabId + '">'+
                '<button value="' + count + '" class="close" >×</button>Tab ' + count + '</a></li>');
    $('#multi-tabs-content').append('<div class="tab-pane multi-pane active show" id="' + tabId + '"> <p>Tab ' + count + '</p> </div>');
    drawOverview(tabId);
    currentID = tabId;
})

$(document).on('click', '.multi-link', function(){
    currentID = $(this)[0].id.substring(1);
    $('#svg'+currentID).width(width)
    $('#svg'+currentID).height(height)
    force.force("center", d3.forceCenter(width / 2, height / 2))
    force.alpha(1).restart();
    console.log(currentID)
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
