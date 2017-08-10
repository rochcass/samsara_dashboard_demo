var area_chart_settings = {
    container: undefined,
    graphContainer: undefined,
    svg: undefined,
    tooltip : undefined,
    margin : { top: 50, right: 50, bottom: 50, left: 50 },
    duration : 500,
    durationIncrease : 100,
    width : undefined,
    height : undefined,
    innerWidth : undefined,
    innerHeight : undefined,
    xScale : undefined,
    yScale : undefined,
    labelTitles: false,
    xAxisLabels: undefined,
    showLegend: false,
    showTitle: false,
    title: 'Area Graph',
    data: [],
    labels: [],
    legends: [],
    datasets: []
    
};

function setAreaChartSettings(args){
    console.log('args', args);
    area_chart_settings.container = args.container;
    area_chart_settings.graphContainer = d3.select(args.container);
    area_chart_settings.svg = d3.select(args.element);
    area_chart_settings.tooltip = d3.select(args.tooltipElement);
    area_chart_settings.labelTitles = args.labelTitles;
    
    var parseTime = d3.timeParse("%Y-%m-%d");
    
    if(args.data)
        area_chart_settings.data = args.data;
    
    
    if(args.showTitle) {
        area_chart_settings.showTitle = args.showTitle;
        area_chart_settings.title = args.title;
    }

    //Set Media Type Series
    $(area_chart_settings.data[0].media).each(function(i) {
        area_chart_settings.legends.push(area_chart_settings.data[0].media[i].type);
        area_chart_settings.datasets.push({ id: area_chart_settings.data[0].media[i].type, values : []});
    });

    //Set Values
    var formatTime = d3.timeFormat("%b %d");
    for(var i=area_chart_settings.data.length - 1; i >= 0; i--){
    
        var dt = formatTime(new Date(area_chart_settings.data[i].date));
        area_chart_settings.labels.push(dt);
        
        $(area_chart_settings.data[i].media).each(function(index) {
            area_chart_settings.datasets[index].values.push({close: this.count, date: dt});
        });
    }
    
    getDimentions();
    getScaleDomains();
    getScaleRanges();
    renderPlot();
    drawGraph();
    d3.select(window).on('resize', resizeAreaGraph);
    area_chart_settings.graphContainer.on('resize', resizeAreaGraph);
    
}

function resizeAreaGraph() {
    destroyGraph();
    getDimentions();
    getScaleRanges();
    renderPlot();
    drawGraph();
}

function renderPlot() {
    
    area_chart_settings.xAxisLabels = d3.scaleTime()
        .rangeRound([0, area_chart_settings.innerWidth], 0)
        .domain(d3.extent(area_chart_settings.data, function (d) {
            return d.date;
        }));
    
    x = d3.axisBottom(area_chart_settings.xScale).ticks(4); //area_chart_settings.data.length);
    
    y = d3.axisLeft(area_chart_settings.yScale).ticks(4);
    
    area_chart_settings.svg.attr('width', area_chart_settings.width).attr('height', area_chart_settings.height);
    
    if(area_chart_settings.showTitle) {
        area_chart_settings.svg.append("text")
            .attr("x", (area_chart_settings.width / 2))
            .attr("y", (area_chart_settings.margin.top / 2))
            .attr("text-anchor", "middle")
            .text(area_chart_settings.title);
    }
    
    var inner = area_chart_settings.svg.selectAll('g.inner').data([null]);
    inner.exit().remove();
    inner.enter().append('g')
        .attr('class', 'inner')
        .attr('transform', 'translate(' + area_chart_settings.margin.top + ', ' + area_chart_settings.margin.right + ')');
    
    var horizontalLineGroup = area_chart_settings.svg.selectAll('g.inner').selectAll('.line-group').data([null]);
    horizontalLineGroup.exit().remove();
    horizontalLineGroup.enter().append('g')
        .attr('class', 'line-group');
    
    var horizontalLine = area_chart_settings.svg.selectAll('g.line-group').selectAll('.grid-line').data(area_chart_settings.yScale.ticks(4));
    horizontalLine.exit().remove();
    horizontalLine.enter().append('line')
        .attr('class', 'grid-line')
        .attr('x1', 0)
        .attr('x2', area_chart_settings.innerWidth)
        .attr('y1', function (d) {
            return area_chart_settings.yScale(d) + 1;
        }).attr('y2', function (d) {
        return area_chart_settings.yScale(d);
    });
    
    
    var xLabel = 'Names';
    
    var yLabel = 'Count';
    
    var xAxis = area_chart_settings.svg.selectAll('g.inner').selectAll('g.x.axis').data([null]);
    xAxis.exit().remove();
    var xAxisLabels = xAxis.enter().append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0, ' + area_chart_settings.innerHeight + ')')
        .call(x);
    
    var yAxis = area_chart_settings.svg.selectAll('g.inner').selectAll('g.y.axis').data([null]);
    yAxis.exit().remove();
    var yAxisLabels = yAxis.enter().append('g')
        .attr('class', 'y axis')
        .call(y);
    
    
    if (area_chart_settings.labelTitles) {
        xAxisLabels.append('text')
            .attr('x', (area_chart_settings.innerWidth / 2))
            .attr('y', 35)
            .attr('dy', '.71em')
            .style('text-anchor', 'middle')
            .text(xLabel);
    
        yAxisLabels.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -40)
        .attr("x", -(area_chart_settings.innerHeight / 2))
        .attr("dy", ".71em")
        .style("text-anchor", "middle")
        .text(yLabel);
    }
}

function drawGraph(){
    
    // define the line
    var line = d3.line()
        .curve(d3.curveCatmullRom)
        .x(function(d) { return area_chart_settings.xScale(d.date); })
        .y(function(d) { return area_chart_settings.yScale(d.close); });
    
    var area = d3.area()
        .curve(d3.curveCatmullRom)
        .x(function(d) { return area_chart_settings.xScale(d.date); })
        .y0(area_chart_settings.innerHeight)
        .y1(function(d) { return area_chart_settings.yScale(d.close); });
    
    var line2 = d3.line().x(function (d, i) {
        return area_chart_settings.xScale(area_chart_settings.labels[i]);
    }).y(function (d) {
        return area_chart_settings.yScale(d);
    }).curve(d3.curveCatmullRom);
    
    var area2 = d3.area().x(function (d, i) {
        return area_chart_settings.xScale(area_chart_settings.labels[i]);
    }).y0(area_chart_settings.innerHeight).y1(function (d) {
        return area_chart_settings.yScale(d);
    }).curve(d3.curveCatmullRom);
    
    for(var i = 0; i <= area_chart_settings.datasets.length - 1; i++){
        var pathLine = area_chart_settings.svg.selectAll('g.inner').selectAll('.chart_line_' + i).data([null]);
        pathLine.exit().remove();
        pathLine.enter().append('path')
            .attr('class', 'path-line chart_line_' + i)
            .attr('d', function () {
                return line(createZeroDataArray(area_chart_settings.datasets[i].values));
            })
            .transition()
            .duration(area_chart_settings.duration)
            .delay(area_chart_settings.durationIncrease * i)
            .ease(d3.easePoly.exponent(2)).attr('d', function () {
            return line(area_chart_settings.datasets[i].values);
        });
        
        var pathArea = area_chart_settings.svg.selectAll('g.inner').selectAll('chart_fill_trans_' + i).data([null]);
        pathArea.exit().remove();
        pathArea.enter().append('path')
            .attr('class', 'path-area chart_fill_trans_' + i)
            .attr('d', function () {
                return area(createZeroDataArray(area_chart_settings.datasets[i].values));
            })
            .transition()
            .duration(area_chart_settings.duration)
            .delay(area_chart_settings.durationIncrease * i)
            .ease(d3.easePoly.exponent(2))
            .attr('d', area(area_chart_settings.datasets[i].values));
        
        
        var dots = area_chart_settings.svg.selectAll('g.inner').selectAll(".chart_dot_" +i)
            .data(area_chart_settings.datasets[i].values)
            .enter().append("circle") // Uses the enter().append() method
            .attr("class", "dot chart_dot_" +i) // Assign a class for styling
            .attr("cx", function(d, i) { return area_chart_settings.xScale(d.date); })
            .attr("cy", area_chart_settings.innerHeight)
            .attr("r", 3)
            .transition()
            .duration(area_chart_settings.duration)
            .delay(area_chart_settings.durationIncrease * i)
            .ease(d3.easePoly.exponent(2))
            .attr("cy", function(d) { return area_chart_settings.yScale(d.close); });
    }
    
    var tooltip = d3.select('.tooltip');
    var barSize = Math.round(area_chart_settings.innerWidth / (area_chart_settings.datasets[0].values.length - 1));
    var windowWidth = window.innerWidth;
    
    
    var tooltipLine = area_chart_settings.svg.selectAll('g.inner')
        .append('rect')
        .attr('class', 'tooltip-line line')
        .attr('x', 1)
        .attr('y', 0)
        .attr('width', 1)
        .attr('height', area_chart_settings.innerHeight)
        .style('opacity', 0);
    
    area_chart_settings.svg.selectAll('g.inner').selectAll('grid-tooltip')
        .data(area_chart_settings.data)
        .enter()
        .append('rect')
        .attr('class', 'grid-tooltip chartTransparentFill')
        .attr('tooltip-index', i)
        .on('mouseover', function (d, i) {
            tooltip.style('opacity', 1);
            tooltipLine.style('opacity', 1);
        })
        .on('mousemove', function (d, i) {
            
            var offset = $(area_chart_settings.container).offset();
            var tooltipLeft = Math.max(0, (d3.event.pageX - offset.left) + 15) + tooltip.node().clientWidth > windowWidth;
            var left =  tooltipLeft ?
                Math.max(0, d3.event.pageX - offset.left - tooltip.node().clientWidth - 15) : Math.max(0, (d3.event.pageX - offset.left)+ 15);
    
            tooltipLine.attr('x', Math.max(0, d3.event.pageX - area_chart_settings.margin.left - offset.left));
            tooltip
                .html(getTooltip(d))
                .attr('class', 'tooltip ' + (tooltipLeft ? 'left' : 'right'))
                .style('opacity', 1)
                .style("left", left + "px")
                .style("top", (d3.event.pageY - ((offset.top + 100) / 2)  ) + "px");
        })
        .on('mouseout', function (d, i) {
            tooltip.style('opacity', 0);
            tooltipLine.style('opacity', 0);
        })
        .attr('x', function (d,i) {
            return i === 0 ? 0 : (barSize * i) - (barSize / 2);
        })
        .attr('y', function (d) {
            return 0;
        })
        
        .attr('width', function (d, i) {
            return i === 0 ||  i === area_chart_settings.datasets[0].values.length - 1 ? (barSize / 2) - 1 : barSize - 1;
        })
        .attr('height', function (d) {
            return area_chart_settings.innerHeight - 1;
        });
    
    
}

function getTooltip(d){
    var html = '<div class="tooltip-line"><span class="tooltip-title">' + moment(d.date).format('ddd DD MMM YYYY') + ': </span></div>';
    
    $(d.media).each(function(index) {
        html += '<div class="tooltip-line"><div class="tooltip-item"><div class="tooltip-bullet blogs"></div><div class="item-name light-gray"><span>'+this.type+'</span></div></div><div class="value light-gray">'+this.count+'</div></div>';
    });
    return html;
}

function destroyGraph() {
    area_chart_settings.svg.selectAll('*').remove();
}

function getDimentions() {
    area_chart_settings.width = area_chart_settings.graphContainer.node().clientWidth;
    area_chart_settings.height = area_chart_settings.graphContainer.node().clientHeight;
    area_chart_settings.innerWidth = area_chart_settings.width - area_chart_settings.margin.left - area_chart_settings.margin.right;
    area_chart_settings.innerHeight = area_chart_settings.height - area_chart_settings.margin.top - area_chart_settings.margin.bottom;
}

function getScaleRanges() {
    area_chart_settings.xScale.range([0, area_chart_settings.innerWidth]).paddingInner(1);
    area_chart_settings.yScale.range([area_chart_settings.innerHeight, 0]).nice();
}

function getScaleDomains() {
    
    var min = d3.min(area_chart_settings.datasets, function(c) { return d3.min(c.values, function(d) { return d.close; }); });
    var max = d3.max(area_chart_settings.datasets, function(c) { return d3.max(c.values, function(d) { return d.close; }); });
    
    console.log(area_chart_settings.labels);
    area_chart_settings.xScale = d3.scaleBand().domain(area_chart_settings.labels);
    area_chart_settings.yScale = d3.scaleLinear()
        .domain([min, max]);
}

function createZeroDataArray(arr) {
    var newArr = [];
    arr.forEach(function (item, index) {
        return newArr[index] = {
            date  : item.date,
            close : 0
        };
    });
    return newArr;
}