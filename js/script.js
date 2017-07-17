$(function() {
    $('.sidebar-toggler').click(function (){
        $('.collapsible-sidebar').toggleClass('collapsible-sidebar--closed');
    })
});

function ajaxCall(url, type, data, callback){
    $.ajax({
        type: type,
        url: url,
        data: data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data) {
            if(typeof callback === "function"){
                callback(data);
            }
        },
        error: function(data) {
            console.log('error', data);
        }
    });
}

function initLegend(array){

}