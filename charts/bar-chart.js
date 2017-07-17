(function ( $ ) {
    
    //Create a jquery prototype
    jQuery.fn.barChart = function ( options ) {
        
        //default options
        $.fn.calendar.defaults = {
            chartWrapper:  this,
            chartHorizontal: false,
            chart: this,
            margins: {
                top: 22,
                left: 80,
                right: 24,
                bottom: 56,
                barTop: 17
            },
            width: 0,
            height: 0,
            series: ['a','b','c'],
            data: [],
            colors: [],
            legend: {
                display: true,
                width: 120,
                height: '100%',
                horizontal: false
            }
        }
        
        var settings = $.extend({}, $.fn.barChart.defaults, options );
        
        //Create HTML for Calendar
        settings.chartWrapper.addClass(settings.chartHorizontal ? 'horizontal-bar-chart-wrapper': 'bar-chart-wrapper');
        
        settings.chart = $('<div class="'+(settings.chartHorizontal ? 'horizontal-bar-chart': 'bar-chart')+'"></div>');
        chart.chartWrapper.append(settings.chart);
    
        settings.width = settings.width === 0 ? settings.chartWrapper.width() - settings.margins.left - settings.margins.right - settings.legend.width : settings.width;
        settings.height = settings.height === 0 ? settings.chartWrapper.height() - settings.margins.top - settings.margins.bottom : settings.height;
        
        
        
    } //End of function prototype
    
}( jQuery ));
