
$(function() {
    $('#chart-type-select').load('./templates/chart-type-picker.html');
    
    $('#media-type-over-time').load('./templates/media-type-volume.html');
    
    $('#media-type-compare').load('./templates/media-type-compare.html');
    
    $('#media-type-sentiment').load('./charts/horizontal-stacked-bar.html');
    
   // $('#media-type-top-outlets').load('./templates/media-type-top-outlets.html');
    
    $('#media-type-website-top-outlets').html(getTopOutlets('chart_0'));
    $('#media-type-magazine-top-outlets').html(getTopOutlets('chart_1'));
    $('#media-type-newspaper-top-outlets').html(getTopOutlets('chart_2'));
    $('#media-type-blog-top-outlets').html(getTopOutlets('chart_3'));
    
    $('#media-type-aggregated-volume').load('./templates/media-type-aggregated-volume.html');
});

function loadTagCloud() {
    $('#chart-wrapper').load('./charts/tag-cloud.html');
}

function getTopOutlets(cssClass) {
    var html = '<div class="list-view"><div class="list-item-container"><a class="list-item with-bar" href="/projects/9d591e68-289b-4e45-87a6-ff6cfc64a7f5/articles?dateType=month&amp;outlet=msn+peru"><span class="item-index"><!-- react-text: 1278 -->1<!-- /react-text --><!-- react-text: 1279 -->.<!-- /react-text --></span><div class="item-content"><strong class="item-title">msn peru</strong></div><div class="item-value">124</div></a><div class="item-bar"><div class="bar '+cssClass+'" style="width: 100%;"></div></div></div><div class="list-item-container"><a class="list-item with-bar" href="/projects/9d591e68-289b-4e45-87a6-ff6cfc64a7f5/articles?dateType=month&amp;outlet=nasdaq.com"><span class="item-index"><!-- react-text: 1288 -->2<!-- /react-text --><!-- react-text: 1289 -->.<!-- /react-text --></span><div class="item-content"><strong class="item-title">nasdaq.com</strong></div><div class="item-value">64</div></a><div class="item-bar"><div class="bar '+cssClass+'" style="width: 51.6129%;"></div></div></div><div class="list-item-container"><a class="list-item with-bar" href="/projects/9d591e68-289b-4e45-87a6-ff6cfc64a7f5/articles?dateType=month&amp;outlet=4-traders"><span class="item-index"><!-- react-text: 1298 -->3<!-- /react-text --><!-- react-text: 1299 -->.<!-- /react-text --></span><div class="item-content"><strong class="item-title">4-traders</strong></div><div class="item-value">60</div></a><div class="item-bar"><div class="bar '+cssClass+'" style="width: 48.3871%;"></div></div></div><div class="list-item-container"><a class="list-item with-bar" href="/projects/9d591e68-289b-4e45-87a6-ff6cfc64a7f5/articles?dateType=month&amp;outlet=finance.yahoo.com"><span class="item-index"><!-- react-text: 1308 -->4<!-- /react-text --><!-- react-text: 1309 -->.<!-- /react-text --></span><div class="item-content"><strong class="item-title">finance.yahoo.com</strong></div><div class="item-value">55</div></a><div class="item-bar"><div class="bar '+cssClass+'" style="width: 44.3548%;"></div></div></div><div class="list-item-container"><a class="list-item with-bar" href="/projects/9d591e68-289b-4e45-87a6-ff6cfc64a7f5/articles?dateType=month&amp;outlet=NewsDog"><span class="item-index"><!-- react-text: 1318 -->5<!-- /react-text --><!-- react-text: 1319 -->.<!-- /react-text --></span><div class="item-content"><strong class="item-title">NewsDog</strong></div><div class="item-value">51</div></a><div class="item-bar"><div class="bar '+cssClass+'" style="width: 41.129%;"></div></div></div></div>';
return html;
}


function getColorFromArr(index, transparency){
    var colors = [
        ['marine', '41, 133, 163'],
        ['pink','255, 99, 132'],
        ['orange', '236, 145, 72'],
        ['yellow', '255, 205, 86'],
        ['green', '75, 192, 192'],
        ['purple', '153, 102, 255'],
        ['grey', '201, 203, 207'],
        ['blue', '54, 162, 235'],
        ['red','239, 118, 122']
    ];
    return 'rgba('+colors[index][1]+ (transparency !== undefined ? ',' + transparency : '') + ')';
}

function getColorFromArrPlus(index,transparency){
    var colors = [
        ['marine', '41, 133, 163'],
        ['teal', '93, 194, 207'],
        ['pink','255, 99, 132'],
        ['orange', '236, 145, 72'],
        ['yellow', '255, 205, 86'],
        ['green', '75, 192, 192'],
        ['purple', '153, 102, 255'],
        ['grey', '201, 203, 207'],
        ['blue', '54, 162, 235'],
        ['red','239, 118, 122']
        ];
    return 'rgba('+colors[index][1]+ (transparency !== undefined ? ',' + transparency : '') + ')';
}