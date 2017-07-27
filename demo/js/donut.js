function generateDonutChart(parameters){
    var element = parameters.element,
        svg = d3.select(element),
        data = parameters.data,
        width = svg.attr('width') !== undefined ? svg.attr('width') : parameters.width,
        height = svg.attr('height') !== undefined ? svg.attr('height') : parameters.height,
        innerWidth = width - parameters.margin.left - parameters.margin.right,
        innerHeight = height - parameters.margin.top - parameters.margin.bottom,
        radius = Math.min(width, height) / 2,
        innerRadius = Math.min(innerWidth, innerHeight) / 2,
        tooltipElement = parameters.tooltipElement;
    
    var arc = d3.svg.arc()
        .outerRadius(radius)
        .innerRadius(innerRadius);
    
    var pie = d3.layout.pie()
        .sort(null)
        .value(function (d){ return d.value});
    
    svg.attr('width',  Math.min(width, height))
        .attr('height',  Math.min(width, height));
    
    svg.selectAll('g').remove();
    
    var chart = svg.append('g')
        .attr('width',Math.min(innerWidth, innerHeight))
        .attr('height',Math.min(innerWidth, innerHeight))
        .attr('transform', 'translate('+ (width / 2)+','+(height / 2)+')');
    
    
    var tooltip = d3.select(tooltipElement);
    
    var arces = chart.selectAll('.arc')
        .data(pie(data))
        .enter()
        .append('g')
        .attr('class', 'arc');
    
    arces.append('path')
        .attr('class', function(d,i){
            return 'chart_' + i;
        })
        .on('mouseover', function (d,i) {
            tooltip.style('opacity', 1);
        })
        .on('mousemove', function (d,i) {
            tooltip
                .html('<strong class="tooltip-title">'+data[i].name+'</strong>' + d.value)
                .style("left", Math.max(0, d3.event.pageX + 15) + "px")
                .style("top", (d3.event.pageY - 15) + "px");
        })
        .on('mouseout', function (d,i) {
            tooltip.style('opacity', 0);
        })
        .transition()
        .delay(function(d, i) { return i * 80; })
        .duration(100)
        .attrTween('d', function(d) {
            var i = d3.interpolate(d.startAngle + 0.1, d.endAngle);
            return function (t) {
                d.endAngle = i(t);
                return arc(d);
            };
        });
    
    arces.append('text')
        .attr('transform', function(d){
            return 'translate(0,0)';
        })
        .attr('dy','.35em')
        .text(function(d){
            return d.name;
        });
    
}