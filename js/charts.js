
$(function() {
    $('#chart-type-select').load('./templates/chart-type-picker.html');
    
    $('#media-type-over-time').load('./templates/media-type-volume.html');
    
    $('#media-type-compare').load('./templates/media-type-compare.html');
    
    $('#media-type-sentiment').load('./templates/media-type-sentiment-stacked-bar.html', function() {
        var dataset = [{
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
            }]
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
            }]
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
            }]
        }
    
        ];
    
        initStackedBarChart('#horizontal-stacked-bar', ['Negative', 'Neutral', 'Positive'], dataset);
    });
    
    $('#media-type-website-top-outlets').html(getTopOutlets('chart_0'));
    $('#media-type-magazine-top-outlets').html(getTopOutlets('chart_1'));
    $('#media-type-newspaper-top-outlets').html(getTopOutlets('chart_2'));
    $('#media-type-blog-top-outlets').html(getTopOutlets('chart_3'));
    
    $('#media-type-aggregated-volume').load('./templates/media-type-aggregated-volume.html');
    
    initResponsiveHorizontalBarChart('#test', [
            {
                "metric": "Sales",
                "Category": "Furniture",
                "Sub-Category": "Bookcases",
                "Name": "Tom Stivers",
                "total": 1889.8,
                "Type": "Customer"
            },
            {
                "metric": "Sales",
                "Category": "Furniture",
                "Sub-Category": "Bookcases",
                "Name": "Keith Herrera",
                "total": 2020.161,
                "Type": "Customer"
            },
            {
                "metric": "Sales",
                "Category": "Furniture",
                "Sub-Category": "Bookcases",
                "Name": "Jack O'Briant",
                "total": 2122.545,
                "Type": "Customer"
            },
            {
                "metric": "Sales",
                "Category": "Furniture",
                "Sub-Category": "Bookcases",
                "Name": "Nora Paige",
                "total": 2154.9,
                "Type": "Customer"
            },
            {
                "metric": "Sales",
                "Category": "Furniture",
                "Sub-Category": "Bookcases",
                "Name": "Anna Gayman",
                "total": 2396.2656,
                "Type": "Customer"
            },
            {
                "metric": "Sales",
                "Category": "Furniture",
                "Sub-Category": "Bookcases",
                "Name": "Tracy Blumstein",
                "total": 3083.43,
                "Type": "Customer"
            },
            {
                "metric": "Sales",
                "Category": "Furniture",
                "Sub-Category": "Bookcases",
                "Name": "Maribeth Schnelling",
                "total": 3406.664,
                "Type": "Customer"
            },
            {
                "metric": "Sales",
                "Category": "Furniture",
                "Sub-Category": "Bookcases",
                "Name": "Greg Tran",
                "total": 4007.84,
                "Type": "Customer"
            },
            {
                "metric": "Sales",
                "Category": "Furniture",
                "Sub-Category": "Bookcases",
                "Name": "Quincy Jones",
                "total": 4404.9,
                "Type": "Customer"
            },
            {
                "metric": "Sales",
                "Category": "Furniture",
                "Sub-Category": "Bookcases",
                "Name": "Peter Fuller",
                "total": 6232.624,
                "Type": "Customer"
            }
        ])
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



function  initStackedBarChart(element, series, dataset) {
    
    var margins = {
            top: 8,
            left: 80,
            right: 24,
            bottom: 56,
            barTop: 12
        },
        legendPanel = {
            width: 0
        },
        width = $(element).width() - margins.left - margins.right - legendPanel.width,
        height = $(element).height() - margins.top - margins.bottom,
        dataset = dataset.map(function (d) {
            return d.data.map(function (o, i) {
                // Structure it so that your numeric
                // axis (the stacked amount) is y
                return {
                    y: o.count,
                    x: o.name
                };
            });
        }),
        stack = d3.layout.stack();
    stack(dataset);
    
    var dataset = dataset.map(function (group) {
            return group.map(function (d) {
                // Invert the x and y values, and y0 becomes x0
                return {
                    x: d.y,
                    y: d.x,
                    x0: d.y0
                };
            });
        }),
        svg = d3.select(element)
            .append('svg')
            .attr('width', width + margins.left + margins.right + legendPanel.width)
            .attr('height', (height) + margins.top + margins.bottom)
            .append('g')
            .attr('transform', 'translate(' + margins.left + ',' + margins.top + ')'),
        xMax = d3.max(dataset, function (group) {
            return d3.max(group, function (d) {
                return d.x + d.x0;
            });
        }),
        xScale = d3.scale.linear()
            .domain([0, xMax])
            .range([0, width]),
        names = dataset[0].map(function (d) {
            return d.y;
        }),
        _ = console.log(names),
        yScale = d3.scale.ordinal()
            .domain(names)
            .rangeRoundBands([0, height], .1),
        xAxis = d3.svg.axis()
            .scale(xScale)
            .orient('bottom'),
        yAxis = d3.svg.axis()
            .scale(yScale)
            .orient('left'),
        colours = d3.scale.category10(),
        groups = svg.selectAll('g')
            .data(dataset)
            .enter()
            .append('g')
            .attr('class', function (d, i) {
                return 'chart_sentiment_' + i;
            }),
        rects = groups.selectAll('rect')
            .data(function (d) {
                return d;
            })
            .enter()
            .append('rect')
            .attr('class', 'chart_i')
            .attr('x', function (d) {
                return xScale(d.x0);
            })
            .attr('y', function (d, i) {
                return yScale(d.y) + margins.barTop;
            })
            .attr('height', function (d) {
                return yScale.rangeBand();
            })
            .attr('width', function (d) {
                return xScale(d.x);
            })
            .on('mouseover', function (d) {
                var xPos = parseFloat(d3.select(this).attr('x')) / 2 + width / 2;
                var yPos = parseFloat(d3.select(this).attr('y')) + yScale.rangeBand() / 2;
                
                d3.select('#tooltip')
                    .style('left', xPos + 'px')
                    .style('top', yPos + 'px')
                    .select('#value')
                    .text(d.x);
                
                d3.select('#tooltip').classed('hidden', false);
            })
            .on('mouseout', function () {
                d3.select('#tooltip').classed('hidden', true);
            });
    
    /* xAxis */
    svg.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis);
    
    /* xAxis */
    svg.append('g')
        .attr('class', 'axis')
        .call(yAxis);
    
    
}

function initResponsiveHorizontalBarChart(element, dataset) {
    
    console.log(dataset);
    var margin = {top: 20, right: 20, bottom: 50, left: 100},
        width = parseInt(d3.select(element).style("width")) - margin.left - margin.right,
        height = parseInt(d3.select(element).style("height")) - margin.top - margin.bottom;
    
    var yScale = d3.scale.ordinal()
        .rangeRoundBands([height, 0], 0.1);
    
    var xScale = d3.scale.linear()
        .range([0, width]);
    
    var dollarFormatter = d3.format(",.0f")
    
    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left");
    
    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom")
        .tickFormat(function(d) { return "$" + dollarFormatter(d);});
    
    var svg = d3.select(element)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
            return "<div><span>Name:</span> <span style='color:white'>" + d.Name + "</span></div>" +
                "<div><span>Sub-Category:</span> <span style='color:white'>" + d["Sub-Category"] + "</span></div>" +
                "<div><span>Total Sales:</span> <span style='color:white'>" + "$"+ dollarFormatter(d.total) + "</span></div>";
        })
    
    svg.call(tip);
    
        // Filter to select a subset
        var subset = dataset.filter(function(el){
            return  (el["metric"] === "Sales")
                && (el["Sub-Category"] === "Bookcases")
                && (el["Type"] === "Customer");
        });
        
        // Sort the data so bar chart is sorted in decreasing order
        subset = subset.sort(function(a, b) { return a["total"] - b["total"]; });
        console.log(JSON.stringify(subset, null, 2));
        
        yScale.domain(subset.map(function(d) { return d["Name"]; }));
        xScale.domain([0, d3.max(subset, function(d) { return d["total"]; })]);
        
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);
        
        svg.append("g")
            .attr("class", "x axis")
            .call(xAxis)
            .attr("transform", "translate(0," + height + ")")
            .append("text")
            .attr("class", "label")
            .attr("transform", "translate(" + width / 2 + "," + margin.bottom / 1.5 + ")")
            .style("text-anchor", "middle")
            .text("Sales");
        
        svg.selectAll(".bar")
            .data(subset)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("width", function(d) { return xScale(d["total"]); })
            .attr("y", function(d) { return yScale(d["Name"]); })
            .attr("height", yScale.rangeBand())
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide);
    // Define responsive behavior
    function resize() {
        var width = parseInt(d3.select(element).style("width")) - margin.left - margin.right,
            height = parseInt(d3.select(element).style("height")) - margin.top - margin.bottom;
        
        // Update the range of the scale with new width/height
        xScale.range([0, width]);
        yScale.rangeRoundBands([height, 0], 0.1);
        
        // Update the axis and text with the new scale
        svg.select(".x.axis")
            .call(xAxis)
            .attr("transform", "translate(0," + height + ")")
            .select(".label")
            .attr("transform", "translate(" + width / 2 + "," + margin.bottom / 1.5 + ")");
        
        svg.select(".y.axis")
            .call(yAxis);
        
        // Update the tick marks
        xAxis.ticks(Math.max(width/75, 2), " $");
        
        // Force D3 to recalculate and update the line
        svg.selectAll(".bar")
            .attr("width", function(d) { return xScale(d["total"]); })
            .attr("y", function(d) { return yScale(d["Name"]); })
            .attr("height", yScale.rangeBand());
    };

    // Call the resize function whenever a resize event occurs
    d3.select(window).on('resize', resize);

    // Call the resize function
    resize();

    // Define the format function
    function format(d) {
        d.total = +d.total;
        return d;
    }
}