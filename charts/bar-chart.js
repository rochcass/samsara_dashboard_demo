(function ( $ ) {
    
    //Create a jquery prototype
    jQuery.fn.barChart = function ( options ) {
        
        //default options
        $.fn.barChart.defaults = {
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
            series: ['Negative','Neutral','Positive'],
            dataset: [{
                data: [{
                    name: 'Website',
                    count: 123
                }, {
                    name: 'Magazine',
                    count: 134
                }, {
                    name: 'Newspaper',
                    count: 245
                }, {
                    name: 'Blogs',
                    count: 145
                }],
                name: 'Negative'
            }, {
                data: [{
                    name: 'Website',
                    count: 40
                }, {
                    name: 'Magazine',
                    count: 34
                }, {
                    name: 'Newspaper',
                    count: 45
                }, {
                    name: 'Blogs',
                    count: 65
                }],
                name: 'Neutral'
            },{
                data: [{
                    name: 'Website',
                    count: 423
                }, {
                    name: 'Magazine',
                    count: 334
                }, {
                    name: 'Newspaper',
                    count: 445
                }, {
                    name: 'Blogs',
                    count: 345
                }],
                name: 'Positive'
            }],
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
        settings.chartWrapper.append(settings.chart);
    
        settings.width = settings.width === 0 ? settings.chartWrapper.width() : settings.width;
        settings.height = settings.height === 0 ? settings.chartWrapper.height() : settings.height;
    
        settings.innerWidth = settings.width - settings.margins.left - settings.margins.right - settings.legend.width;
        settings.innerHeight = settings.height - settings.margins.top - settings.margins.bottom;
    
    
    
    } //End of function prototype
    
}( jQuery ));
