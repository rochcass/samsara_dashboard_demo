function generateBarChart(parameters) {
    console.log(parameters);
    var element = parameters.element,
        svg = d3.select(element),
        data = parameters.data,
        data2 = parameters.data2,
        horizontal = parameters.horizontal,
        margin = {
            top: parameters.margin.top,
            left: parameters.margin.left,
            right: parameters.margin.right,
            bottom: parameters.margin.bottom
        },
        width =  parameters.width,
        height = parameters.height,
        innerWidth = width - parameters.margin.left - parameters.margin.right,
        innerHeight = height - parameters.margin.top - parameters.margin.bottom,
        barHeight = parameters.barHeight !== undefined ? parameters.barHeight : 0,
        labelTitles = parameters.labelTitles !== undefined ? parameters.labelTitles : false,
        tooltipElement = parameters.tooltipElement,
        updateLayout = parameters.updateLayout;
    
    var chart, x, y, xAxis, yAxis, tooltip;
    
    tooltip = d3.select(tooltipElement);
    
    if(!updateLayout) {
        //Add Size to Chart
        svg.attr('width', width)
            .attr('height', height);
    }
    
    svg.selectAll('g').remove();
    
    chart = svg.append('g')
        .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');
    
    updateBarLayout(data, updateLayout);
    
    function updateBarLayout(data, updateLayout)
    {
    
        var labels = d3.scaleBand()
            .rangeRound([horizontal ? innerHeight : 0, horizontal ? 0 : innerWidth], 0.1).padding(0.1)
            .domain(data.map(function (d) {
                return d.name;
            })); // Create Labels
    
        var series = d3.scaleLinear()
            .rangeRound([horizontal ? 0 : innerHeight, horizontal ? innerWidth : 0])
            .domain([0, d3.max(data, function (d) {
                return d.value;
            })]); // Create Scales
    
        x = horizontal ? series : labels;
    
        y = horizontal ? labels : series;
    
        chart.selectAll('.horizontal-bar').remove();
        chart.selectAll('.vertical-bar').remove();
    
        xAxis = d3.axisBottom(x);
    
        yAxis = d3.axisLeft(y).ticks(5);
        
        drawBarChart(data);
    }
    
    function drawBarChart(data){
    
        chart.selectAll(".y.axis").remove();
        chart.selectAll(".x.axis").remove();
    
        var xLabel = horizontal ? 'Count' : 'Names';
        var xAxisLabels = chart.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + innerHeight + ')')
            .call(xAxis);
    
        var yLabel = horizontal ? 'Names' : 'Count';
        var yAxisLabels = chart.append('g')
            .attr('class', 'y axis')
            .call(yAxis);
        
        if(labelTitles) {
            xAxisLabels.append('text')
                .attr('x', (innerWidth / 2))
                .attr('y', 25)
                .attr('dy', '.71em')
                .style('text-anchor', 'middle')
                .text(xLabel);
    
            yAxisLabels.append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", -45)
                .attr("x", -(innerHeight / 2))
                .attr("dy", ".71em")
                .style("text-anchor", "middle")
                .text(yLabel);
        }
    
        var barSize = barHeight > 0 ? barHeight : (horizontal ? y.bandwidth() : x.bandwidth());
        var barPadding = barHeight > 0 ? Math.ceil(((horizontal ? y.bandwidth() : x.bandwidth()) - barHeight) / 2) : 1;
        var bars = chart.selectAll(horizontal ? '.horizontal-bar' : '.vertical-bar')
            .data(data);
        
        bars
            .enter().append('rect')
            .on('mouseover', function (d, i) {
                tooltip.style('opacity', 1);
            })
            .on('mousemove', function (d, i) {
                tooltip
                    .html('<strong>' + data[i].name + ': </strong>' + d.value)
                    .style("left", Math.max(0, d3.event.pageX + 15) + "px")
                    .style("top", (d3.event.pageY - 15) + "px");
            })
            .on('mouseout', function (d, i) {
                tooltip.style('opacity', 0);
            })
            .attr('class', function (d, i) {
                return (horizontal ? 'horizontal-bar ' : 'vertical-bar ') + 'chart_' + i;
            })
            .attr('x', function (d) {
                return horizontal ? 1 : x(d.name) + barPadding;
            })
            .attr('y', function (d) {
                return horizontal ? (y(d.name) + barPadding) : innerHeight - 1 ;
            })
        
            .attr('width', function (d) {
                return horizontal ? 0 : barSize - 1;
            })
            .attr('height', function (d) {
                return horizontal ? barSize - 1 : 0;
            })
            .transition()
            .duration(750)
            .attr(horizontal ? 'width' : 'height', function (d) {
                return horizontal ? x(d.value) + barPadding : innerHeight - y(d.value);
            })
            .attr('y', function (d) {
                return horizontal ? (y(d.name) + barPadding)  : y(d.value) - 1;
            });
    
        
    }
    
}