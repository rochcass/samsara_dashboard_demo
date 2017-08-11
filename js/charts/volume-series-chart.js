
function initChart(){
    
    var container= undefined,
        graphContainer= undefined,
        svg= undefined,
        tooltip = undefined,
        chartBarType = false,
        margin = { top: 30, right: 50, bottom: 50, left: 50 },
        duration = 500,
        durationIncrease = 100,
        width = undefined,
        height = undefined,
        innerWidth = undefined,
        innerHeight = undefined,
        x0 = undefined,
        x1 = undefined,
        y0 = undefined,
        labelTitles= false,
        xAxisLabels= undefined,
        showLegend= false,
        showTitle= false,
        title= 'Area Graph',
        data= [],
        labels= [],
        legends= [],
        datasets= [];
    
    function chart() {
        svg = d3.select(svg);
        tooltip = d3.select(tooltip);
        graphContainer = d3.select(container);
    
        //Set Media Type Series
        $(data[0].media).each(function(i) {
            legends.push(data[0].media[i].type);
            datasets.push({ id: data[0].media[i].type, values : []});
        });
    
        //Set Values
        var formatTime = d3.timeFormat("%b %d");
        for(var i=0; i <= data.length - 1; i++){
        
            var dt = formatTime(new Date(data[i].date));
            labels.push(dt);
        
            $(data[i].media).each(function(index) {
                datasets[index].values.push({close: this.count, date: dt});
            });
        }
    
        destroyGraph();
        getDimentions();
        getScaleDomains();
        getScaleRanges();
        renderPlot();
        !chartBarType ? drawGraph() : drawBarGraph();
        d3.select(window).on('resize', resizeAreaGraph);
        graphContainer.on('resize', resizeAreaGraph);
        
    }


    function resizeAreaGraph() {
        destroyGraph();
        getDimentions();
        getScaleRanges();
        renderPlot();
        !chartBarType ? drawGraph() : drawBarGraph();
    }
    
    function renderPlot() {
        
        xAxisLabels = d3.scaleTime()
            .rangeRound([0, innerWidth], 0)
            .domain(d3.extent(data, function (d) {
                return d.date;
            }));
        
        x = d3.axisBottom(x0).ticks(4); //data.length);
        
        y = d3.axisLeft(y0).ticks(4);
        
        svg.attr('width', width).attr('height', height);
        
        if(showTitle) {
            svg.append("text")
                .attr("x", (width / 2))
                .attr("y", (margin.top / 2))
                .attr("text-anchor", "middle")
                .text(title);
        }
        
        var inner = svg.selectAll('g.inner').data([null]);
        inner.exit().remove();
        inner.enter().append('g')
            .attr('class', 'inner')
            .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');
        
        var horizontalLineGroup = svg.selectAll('g.inner').selectAll('.line-group').data([null]);
        horizontalLineGroup.exit().remove();
        horizontalLineGroup.enter().append('g')
            .attr('class', 'line-group');
        
        var horizontalLine = svg.selectAll('g.line-group').selectAll('.grid-line').data(y0.ticks(4));
        horizontalLine.exit().remove();
        horizontalLine.enter().append('line')
            .attr('class', 'grid-line')
            .attr('x1', 0)
            .attr('x2', innerWidth)
            .attr('y1', function (d) {
                return y0(d) + 1;
            }).attr('y2', function (d) {
            return y0(d);
        });
        
        
        var xLabel = 'Names';
        
        var yLabel = 'Count';
        
        var xAxis = svg.selectAll('g.inner').selectAll('g.x.axis').data([null]);
        xAxis.exit().remove();
        var x0AxisLabels = xAxis.enter().append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0, ' + innerHeight + ')')
            .call(x);
        
        var yAxis = svg.selectAll('g.inner').selectAll('g.y.axis').data([null]);
        yAxis.exit().remove();
        var y0AxisLabels = yAxis.enter().append('g')
            .attr('class', 'y axis')
            .call(y);
        
        
        if (labelTitles) {
            x0AxisLabels.append('text')
                .attr('x', (innerWidth / 2))
                .attr('y', 35)
                .attr('dy', '.71em')
                .style('text-anchor', 'middle')
                .text(xLabel);
            
            y0AxisLabels.append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", -40)
                .attr("x", -(innerHeight / 2))
                .attr("dy", ".71em")
                .style("text-anchor", "middle")
                .text(yLabel);
        }
    }
    
    function drawGraph(){
        
        // define the line
        var line = d3.line()
            .curve(d3.curveCatmullRom)
            .x(function(d) { return x0(d.date); })
            .y(function(d) { return y0(d.close); });
        
        var area = d3.area()
            .curve(d3.curveCatmullRom)
            .x(function(d) { return x0(d.date); })
            .y0(innerHeight)
            .y1(function(d) { return y0(d.close); });
        
        var line2 = d3.line().x(function (d, i) {
            return x0(labels[i]);
        }).y(function (d) {
            return y0(d);
        }).curve(d3.curveCatmullRom);
        
        var area2 = d3.area().x(function (d, i) {
            return x0(labels[i]);
        }).y0(innerHeight).y1(function (d) {
            return y0(d);
        }).curve(d3.curveCatmullRom);
        
        
        for(var i = 0; i <= datasets.length - 1; i++){
            var pathLine = svg.selectAll('g.inner').selectAll('.chart_line_' + i).data([null]);
            pathLine.exit().remove();
            pathLine.enter().append('path')
                .attr('class', 'path-line chart_line_' + i)
                .attr('d', function () {
                    return line(createZeroDataArray(datasets[i].values));
                })
                .transition()
                .duration(duration)
                .delay(durationIncrease * i)
                .ease(d3.easePoly.exponent(2)).attr('d', function () {
                return line(datasets[i].values);
            });
            
            var pathArea = svg.selectAll('g.inner').selectAll('chart_fill_trans_' + i).data([null]);
            pathArea.exit().remove();
            pathArea.enter().append('path')
                .attr('class', 'path-area chart_fill_trans_' + i)
                .attr('d', function () {
                    return area(createZeroDataArray(datasets[i].values));
                })
                .transition()
                .duration(duration)
                .delay(durationIncrease * i)
                .ease(d3.easePoly.exponent(2))
                .attr('d', area(datasets[i].values));
            
            
            var dots = svg.selectAll('g.inner').selectAll(".chart_dot_" +i)
                .data(datasets[i].values)
                .enter().append("circle") // Uses the enter().append() method
                .attr("class", "dot chart_dot_" +i) // Assign a class for styling
                .attr("cx", function(d, i) { return x0(d.date); })
                .attr("cy", innerHeight)
                .attr("r", 3)
                .transition()
                .duration(duration)
                .delay(durationIncrease * i)
                .ease(d3.easePoly.exponent(2))
                .attr("cy", function(d) { return y0(d.close); });
        }
        
        var barSize = Math.round(innerWidth / (datasets[0].values.length - 1));
        var windowWidth = window.innerWidth;
        
        
        var tooltipLine = svg.selectAll('g.inner')
            .append('rect')
            .attr('class', 'tooltip-line line')
            .attr('x', 1)
            .attr('y', 0)
            .attr('width', 1)
            .attr('height', innerHeight)
            .style('opacity', 0);
        
        svg.selectAll('g.inner').selectAll('grid-tooltip')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'grid-tooltip chartTransparentFill')
            .attr('tooltip-index', i)
            .on('mouseover', function (d, i) {
                tooltip.style('opacity', 1);
                tooltipLine.style('opacity', 1);
            })
            .on('mousemove', function (d, i) {
                
                console.log(tooltip.node().clientWidth);
                var offset = $(container).offset();
                var tooltipLeft = Math.max(0, (d3.event.pageX - offset.left) + 15) + tooltip.node().clientWidth > windowWidth;
                var left =  tooltipLeft ?
                    Math.max(0, d3.event.pageX - offset.left - tooltip.node().clientWidth - 15) : Math.max(0, (d3.event.pageX - offset.left)+ 15);
                
                tooltipLine.attr('x', Math.max(0, d3.event.pageX - margin.left - offset.left));
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
                return i === 0 ||  i === datasets[0].values.length - 1 ? (barSize / 2) - 1 : barSize - 1;
            })
            .attr('height', function (d) {
                return innerHeight - 1;
            });
    
    }
    
    function drawBarGraph(){
    
        var tmp = d3.scaleBand()
            .rangeRound([0, innerWidth])
            .domain(data.map(function(d) { return d.date; }));
    
        var windowWidth = window.innerWidth;
        
        var barsContainer = svg.selectAll('g.inner')
            .append("g")
            .attr('class','bar-graph')
            .attr('width', innerWidth)
            .attr('height', innerHeight)
            .attr('transform', 'translate(0, 0)')
            .selectAll("g")
            .data(data)
            .enter().append("g").attr('class','section')
            .attr("transform", function(d) { return "translate(" + tmp(d.date) + ",0)"; });
        
        var bars = barsContainer.selectAll(".horizontal_bar")
            .data(function(d) { return d.media.map(function(media) { return {key: media.type, value: media.count}; }); });
        
        bars
            .enter().append("rect")
            .on('mouseover', function (d, i) {
                tooltip.style('opacity', 1);
            })
            .on('mousemove', function (d, i) {
    
                var offset = $(container).offset();
                var tooltipLeft = Math.max(0, (d3.event.pageX - offset.left) + 15) + tooltip.node().clientWidth > windowWidth;
                var left =  tooltipLeft ?
                    Math.max(0, d3.event.pageX - offset.left - tooltip.node().clientWidth - 15) : Math.max(0, (d3.event.pageX - offset.left)+ 15);
    
                tooltip
                    .html(getTooltip(data[i]))
                    .attr('class', 'tooltip ' + (tooltipLeft ? 'left' : 'right'))
                    .style('opacity', 1)
                    .style("left", left + "px")
                    .style("top", (d3.event.pageY - ((offset.top + 100) / 2)  ) + "px");
                
            })
            .on('mouseout', function (d, i) {
                tooltip.style('opacity', 0);
            })
            .attr("class", function(d, i) { return 'horizontal_bar chart_'+i; })
            .attr("x", function(d) { return x1(d.key); })
            .attr("y", innerHeight )
            .attr("width", x1.bandwidth())
            //.attr("height", function(d) { return height - y0(d.value); });

            .attr('height', 0)
            .transition()
            .duration(750)
            .attr('height', function (d) {
                return innerHeight - y0(d.value);
            })
            .attr('y', function (d) {
                return y0(d.value);
            });
    
   /*     var legend = svg.selectAll('g.inner').append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("text-anchor", "end")
            .selectAll("g")
            .data(legends.slice())
            .enter().append("g")
            .attr("class", function(d, i) { return 'chart_'+i; })
            .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
    
        legend.append("rect")
            .attr("x", innerWidth - 19)
            .attr("width", 19)
            .attr("height", 19);
        //.attr("fill", z);
    
        legend.append("text")
            .attr("x", innerWidth - 24)
            .attr("y", 9.5)
            .attr("dy", "0.32em")
            .text(function(d) { return d; });*/
    }
    
    function getTooltip(d){
        var html = '<div class="tooltip-line"><span class="tooltip-title">' + moment(d.date).format('ddd DD MMM YYYY') + ': </span></div>';
        
        $(d.media).each(function(index) {
            html += '<div class="tooltip-line"><div class="tooltip-item"><div class="tooltip-bullet chart_'+index+'"></div><div class="item-name light-gray"><span>'+this.type+'</span></div></div><div class="value light-gray">'+this.count+'</div></div>';
        });
        return html;
    }
    
    function destroyGraph() {
        svg.selectAll('*').remove();
    }
    
    function getDimentions() {
        width = graphContainer.node().clientWidth;
        height = graphContainer.node().clientHeight;
        innerWidth = width - margin.left - margin.right;
        innerHeight = height - margin.top - margin.bottom;
    }
    
    function getScaleRanges() {
    
        if(chartBarType)
            x0.range([0, innerWidth]);
        else
            x0.range([0, innerWidth]).paddingInner(1);
        
        x1.rangeRound([0, x0.bandwidth()])
            .padding(0.05);
    
        y0.rangeRound([innerHeight, 0]);
    }
    
    function getScaleDomains() {
        
        var min = d3.min(datasets, function(c) { return d3.min(c.values, function(d) { return d.close; }); });
        var max = d3.max(datasets, function(c) { return d3.max(c.values, function(d) { return d.close; }); });
        
        x0 = d3.scaleBand()
            .domain(labels);
    
    
        x1 = d3.scaleBand()
            .domain(legends).rangeRound([0, x0.bandwidth()]);
        
        y0 = d3.scaleLinear()
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
    
    chart.width = function(value) {
        if (!arguments.length) return width;
        width = value;
        return chart;
    };
    
    chart.height = function(value) {
        if (!arguments.length) return height;
        height = value;
        return chart;
    };
    
    chart.margin = function(value) {
        if (!arguments.length) return margin;
        margin = value;
        return chart;
    };
    
    chart.container = function(value) {
        if (!arguments.length) return container;
        container = value;
        return chart;
    };
    
    chart.graphContainer = function(value) {
        if (!arguments.length) return graphContainer;
        graphContainer = value;
        return chart;
    };
    
    chart.svg = function(value) {
        if (!arguments.length) return svg;
        svg = value;
        return chart;
    };
    
    chart.tooltip = function(value) {
        if (!arguments.length) return tooltip;
        tooltip = value;
        return chart;
    };
    
    chart.showTitle = function(value) {
        if (!arguments.length) return showTitle;
        showTitle = value;
        return chart;
    };
    
    chart.title = function(value) {
        if (!arguments.length) return title;
        title = value;
        return chart;
    };
    
    chart.labelTitles = function(value) {
        if (!arguments.length) return labelTitles;
        labelTitles = value;
        return chart;
    };
    
    chart.data = function(value) {
        if (!arguments.length) return data;
        data = value;
        if (typeof updateData === 'function') updateData();
        return chart;
    };
    
    chart.chartBarType = function(value) {
        if (!arguments.length) return chartBarType;
        chartBarType = value;
       // prepareRedraw();
        return chart;
    };
    
    return chart;

}