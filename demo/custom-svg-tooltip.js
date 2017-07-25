
$(function () {
    
    var SVGmouseTip = d3.select("g.tooltip.mouse");
    
    d3.select("svg").select("g")
        .selectAll("circle")
        .on("mouseover", function () {
            SVGmouseTip.style("opacity", "1");
        })
        .on("mousemove", function () {
            
            
            /***** For an SVG tooltip *****/
            
            var mouseCoords = d3.mouse(
                SVGmouseTip.node().parentElement);
            //the d3.mouse() function calculates the mouse
            //position relative to an SVG Element, in that
            //element's coordinate system
            //(after transform or viewBox attributes).
            
            //Because we're using the coordinates to position
            //the SVG tooltip, we want the coordinates to be
            //with respect to that element's parent.
            //SVGmouseTip.node() accesses the (first and only)
            //selected element from the saved d3 selection object.
            
            SVGmouseTip
                .attr("transform", "translate("
                    + (mouseCoords[0]-10) + ","
                    + (mouseCoords[1] - 10) + ")");
        })
        .on("mouseout", function () {
            return SVGmouseTip.style("opacity", "0");
        });


});