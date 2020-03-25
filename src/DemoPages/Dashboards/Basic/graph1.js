import $ from "jquery";
// import * as d3 from './../../../assets/js/d3.v3.min.js';
import * as d3 from './d3.v3.min.js';
import _ from "underscore";

var graph1 = (chartMode) => {

    /// Data is generated here...
    var seriesNames = ["Income", "Outcome"],
    numSamples = 30, //X-axis are days
    numSeries = seriesNames.length,
    data = seriesNames.map(function (name) {
        var color = name == "Income" ? "blue" : "red"
        var ret = {
            name: name,
            values: bumpLayer(numSamples, 100, color),
        };
        return ret;
    }),
    ///Till here
    stack = d3.layout.stack().values(function (d) { 
        // console.log(d)
        return d.values; 
    });

    stack(data);

    // var chartMode = "stacked",
    var numEnabledSeries = numSeries;
    // console.log(numEnabledSeries);
    var lastHoveredBarIndex;
    var containerWidth = document.querySelector(".js-stacked-chart-container").clientWidth;
    var containerHeight = 500;
    // var containerWidth = window.innerWidth - 350;
    var margin = {top: 50, right: 50, bottom: 20, left: 50};
    var width = containerWidth - margin.left - margin.right;
    var height = containerHeight - margin.top - margin.bottom;
    var widthPerStack = width / numSamples;
    var animationDuration = 400;
    var delayBetweenBarAnimation = 10;
    var numYAxisTicks = 8;
    var maxStackY = d3.max(data, function (series) { 
        return d3.max(series.values, 
            function (d) { 
                return d.y0 + d.y; 
            }); 
        });
    var paddingBetweenLegendSeries = 5;
    var legendSeriesBoxX = 0;
    var legendSeriesBoxY = 0;
    var legendSeriesBoxWidth = 15;
    var legendSeriesBoxHeight = 15;
    var legendSeriesHeight = legendSeriesBoxHeight + paddingBetweenLegendSeries;
    var legendSeriesLabelX = -5;
    var legendSeriesLabelY = legendSeriesBoxHeight / 2;
    var legendMargin = 20;
    var legendX = containerWidth - legendSeriesBoxWidth - legendMargin - 50;
    var legendY = legendMargin;
    var tooltipTemplate = _.template(document.querySelector(".js-tooltip-table-content").innerHTML);
    var overlayTopPadding = 20;
    var tooltipBottomMargin = 12;

    var binsScale = d3.scale.ordinal()
    .domain(d3.range(numSamples))
    .rangeBands([0, width], 0.1, 0.05);

    var xScale = d3.scale.linear()
    .domain([0, numSamples])
    .range([0, width]);

    var yScale = d3.scale.linear()
    .domain([0, maxStackY])
    .range([height, 0]);

    var heightScale = d3.scale.linear()
    .domain([0, maxStackY])
    .range([0, height]);

    var xAxis = d3.svg.axis()
    .scale(xScale) //binsScale)
    .ticks(numSamples)
    .orient("bottom");

    var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left");

    var enabledSeries = function () { return _.reject(data, function (series) { return series.disabled; }); };

    var seriesClass = function (seriesName) { return "series-" + seriesName.toLowerCase(); };

    var layerClass = function (d) { return "layer " + seriesClass(d.name); };

    var legendSeriesClass = function (d) { return "clickable " + seriesClass(d); };

    var barDelay = function (d, i) { return i * delayBetweenBarAnimation; };

    var joinKey = function (d) { return d.name; };

    var stackedBarX = function (d) { return binsScale(d.x); };

    var stackedBarY = function (d) { return yScale(d.y0 + d.y); };

    var stackedBarBaseY = function (d) { return yScale(d.y0); };

    var stackedBarWidth = binsScale.rangeBand();

    var groupedBarX = function (d, i, j) { return binsScale(d.x) + j * groupedBarWidth(); };

    var groupedBarY = function (d) { return yScale(d.y); };

    var groupedBarBaseY = height;

    var groupedBarWidth = function () { return binsScale.rangeBand() / numEnabledSeries; };

    var barHeight = function (d) { return heightScale(d.y); };

    var transitionStackedBars = function (selection) {
    selection.transition()
        .duration(animationDuration)
        .delay(barDelay)
        .attr("y", stackedBarY)
        .attr("height", barHeight);
    };

    var svg = d3.select(".js-stacked-chart")
    .attr("width", containerWidth)
    .attr("height", function(){
        // console.log(containerHeight);
        return containerHeight;
    });

    var mainArea = svg.append("g")
    .attr("class", "main-area")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    mainArea.append("g")
    .attr("class", "grid-lines")
    .selectAll(".grid-line").data(yScale.ticks(numYAxisTicks))
        .enter().append("line")
            .attr("class", "grid-line")
            .attr("x1", 0)
            .attr("x2", width)
            .attr("y1", yScale)
            .attr("y2", yScale);

    var layersArea = mainArea.append("g")
    .attr("class", "layers");

    var layers = layersArea.selectAll(".layer").data(data)
    .enter().append("g")
        .attr("class", layerClass);

    layers.selectAll("rect").data(function (d) {
        return d.values; 
    })
    .enter().append("rect")
        .attr("x", stackedBarX)
        .attr("y", height)
        .attr("width", stackedBarWidth)
        .attr("height", 0)
        .call(transitionStackedBars)
        .attr('fill', function (d) {
            return d.color;
        });

    mainArea.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

    mainArea.append("g")
    .attr("class", "y axis")
    .call(yAxis);

    svg.append("rect")
    .attr("class", "overlay")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", width)
    .attr("height", height)
    .on("mousemove", showTooltip)
    .on("mouseout", hideTooltip)
    .style("opacity", 0.0);

    var legendSeries = svg.append("g")
    .attr("class", "legend")
    .attr("transform", "translate(" + legendX + "," + legendY + ")")
    .selectAll("g").data(seriesNames.reverse())
        .enter().append("g")
            .attr("class", legendSeriesClass)
            .attr("transform", function (d, i) { return "translate(0," + (i * legendSeriesHeight) + ")"; })
            .on("click", toggleSeries);

    legendSeries.append("rect")
    .attr("class", "series-box")
    .attr("x", legendSeriesBoxX+15)
    .attr("y", legendSeriesBoxY)
    .attr("width", legendSeriesBoxWidth)
    .attr("height", legendSeriesBoxHeight)
    .attr('fill', function (d) {
        // console.log(d);
        if(d == "Income"){
            return 'blue'
        }
        else{
            return 'red'
        }
    });

    legendSeries.append("text")
    .attr("class", "series-label")
    .attr("x", legendSeriesLabelX)
    .attr("y", legendSeriesLabelY)
    .text(String);


    d3.selectAll(".js-stacked-chart-container input").on("change", changeChartMode);

    /**
    * Toggles a certain series.
    * @param {String} seriesName The name of the series to be toggled
    */
    function toggleSeries (seriesName) {
    var series,
        isDisabling,
        newData;

    series = _.findWhere(data, { name: seriesName });
    isDisabling = !series.disabled;

    if (isDisabling === true && numEnabledSeries === 1) {
        return;
    }

    d3.select(this).classed("disabled", isDisabling);

    series.disabled = isDisabling;
    newData = stack(enabledSeries());
    numEnabledSeries = newData.length;
    layers = layers.data(newData, joinKey);

    if (isDisabling === true) {
        removeSeries();
    }
    else {
        addSeries();
    }
    }

    /**
    * Removes a certain series.
    */
    function removeSeries () {
    var layerToBeRemoved;

    layerToBeRemoved = layers.exit();
    if (chartMode === "stacked") {
        removeStackedSeries(layerToBeRemoved);
    }
    else {
        removeGroupedSeries(layerToBeRemoved);
    }
    }

    /**
    * Smoothly transitions and then removes a certain series when the chart is in `stacked` mode.
    * @param {d3.selection} layerToBeRemoved The layer that contains the series' bars
    */
    function removeStackedSeries (layerToBeRemoved) {
    layerToBeRemoved.selectAll("rect").transition()
        .duration(animationDuration)
        .delay(barDelay)
        .attr("y", stackedBarBaseY)
        .attr("height", 0)
        .call(endAll, function () {
            layerToBeRemoved.remove();
        })
        .attr('fill', function (d) {
            return d.color;
        });

    transitionStackedBars(layers.selectAll("rect"));
    }

    /**
    * Smoothly transitions and then removes a certain series when the chart is in `grouped` mode.
    * @param {d3.selection} layerToBeRemoved The layer that contains the series' bars
    */
    function removeGroupedSeries (layerToBeRemoved) {
    layerToBeRemoved.selectAll("rect").transition()
        .duration(animationDuration)
        .delay(barDelay)
        .attr("y", groupedBarBaseY)
        .attr("height", 0)
        .call(endAll, function () {
            layerToBeRemoved.remove();

            layers.selectAll("rect").transition()
                .duration(animationDuration)
                .delay(barDelay)
                .attr("x", groupedBarX)
                .attr("width", groupedBarWidth);
        })
        .attr('fill', function (d) {
            return d.color;
        });
    }

    /**
    * Adds a certain series.
    */
    function addSeries () {
    var newLayer;

    newLayer = layers.enter().append("g")
        .attr("class", layerClass);

    if (chartMode === "stacked") {
        addStackedSeries(newLayer);
    }
    else {
        addGroupedSeries(newLayer);
    }
    }

    /**
    * Smoothly transitions and adds a certain series when the chart is in `stacked` mode.
    * @param {d3.selection} newLayer The new layer to be added
    */
    function addStackedSeries (newLayer) {
    newLayer.selectAll("rect").data(function (d) { return d.values; })
        .enter().append("rect")
            .attr("x", stackedBarX)
            .attr("y", stackedBarBaseY)
            .attr("width", stackedBarWidth)
            .attr("height", 0)
            .attr('fill', function (d) {
                return d.color;
            });

    transitionStackedBars(layers.selectAll("rect"));
    }

    /**
    * Smoothly transitions and adds a certain series when the chart is in `grouped` mode.
    * @param {d3.selection} newLayer The new layer to be added
    */
    function addGroupedSeries (newLayer) {
    var newBars;

    layers.selectAll("rect").transition()
        .duration(animationDuration)
        .delay(barDelay)
        .attr("x", groupedBarX)
        .attr("width", groupedBarWidth)
        .call(endAll, function () {
            newBars = newLayer.selectAll("rect").data(function (d) { return d.values; })
                .enter().append("rect")
                    .attr("y", groupedBarBaseY)
                    .attr("width", groupedBarWidth)
                    .attr("height", 0);

            layers.selectAll("rect").attr("x", groupedBarX)
            .attr('fill', function (d) {
                return d.color;
            });

            newBars.transition()
                .duration(animationDuration)
                .delay(barDelay)
                .attr("y", groupedBarY)
                .attr("height", barHeight);
        })
        .attr('fill', function (d) {
            // console.log(d);
            if (d.color == "blue"){
                return 'blue';
            }
            else{
                return 'red';
            }
        });
    }

    /**
    * Changes the chart to the selected mode: `stacked` or `grouped`.
    * In `stacked` mode, the bars of each bin are stacked together.
    * In `grouped` mode, the bars of each bin are placed side by side.
    */
    function changeChartMode() {
    chartMode = this.value;
    if (chartMode === "stacked") {
        stackBars();
    }
    else {
        groupBars();
    }
    }

    /**
    * Smoothly transitions the chart to `stacked` mode.
    * In this mode, the bars of each bin are stacked together.
    */
    function stackBars() {
    layers.selectAll("rect").transition()
        .duration(animationDuration)
        .delay(barDelay)
        .attr("y", stackedBarY)
        .attr('fill', function (d) {
            return d.color;
        })
        .transition()
            .duration(animationDuration)
            .attr("x", stackedBarX)
            .attr("width", stackedBarWidth);
    }

    /**
    * Smoothly transitions the chart to `grouped` mode.
    * In this mode, the bars of each bin are placed side by side.
    */
    function groupBars() {
    layers.selectAll("rect").transition()
        .duration(animationDuration)
        .delay(barDelay)
        .attr("x", groupedBarX)
        .attr("width", groupedBarWidth)
        .attr('fill', function (d) {
            return d.color;
        })
        .transition()
            .duration(animationDuration)
            .attr("y", groupedBarY);
    }

    /**
    * Shows the tooltip.
    */
   
   svg.append("text")
   .attr("id", "tooltip1");
   svg.append("text")
   .attr("id", "tooltip2");
//    svg.append("text")
//    .attr("id", "tooltip3");
//    svg.append("text")
//    .attr("id", "tooltip4");

    function showTooltip() {

    var hoveredBarIndex,
        tooltip;

    hoveredBarIndex = (d3.mouse(this)[0] / widthPerStack) | 0;
    if (hoveredBarIndex === lastHoveredBarIndex) {
        return;
    }
    lastHoveredBarIndex = hoveredBarIndex;

    layers.selectAll("rect").classed("highlighted", function (d, i) { return (i === hoveredBarIndex); });
    var coordinates= d3.mouse(this);
    var x = coordinates[0];
    var y = coordinates[1];

    tooltip = $(".js-tooltip");
    var tool = tooltipContent();
    // svg.append("rect")
    // .attr("id", "tooltip")
    // .attr("x", x)
    // .attr("y", y)
    // .attr("width", 100)
    // .attr("height", 50)
    // .style("opacity", 1.0)
    // .attr('fill', 'white')
    // .fadeIn()
    // .transition()
    // .duration(3000)
    // .style("opacity", 0)
    // .remove()
    d3.select('#tooltip1')
    .attr("x", x)
    .attr("y", y)
    .attr('font-family', 'sans-serif')
    .style('font-size', '26px')
    .attr('fill', '#00ff00')
    .text(function() {
        if (tool[0] != null){
            return tool[0].name + ": " + tool[0].value; 
        }
    });
    d3.select('#tooltip2')
    .attr("x", x)
    .attr("y", y+30)
    .attr('font-family', 'sans-serif')
    .style('font-size', '2em')
    .attr('fill', '#00ff00')
    .text(function() {
        if (tool[1] != null){
            return tool[1].name + ": " + tool[1].value; 
        }
    });
    // d3.select('#tooltip3')
    // .attr("x", x)
    // .attr("y", y+30)
    // .attr('font-family', 'sans-serif')
    // .attr('font-size', '36px')
    // .attr('fill', '#00ff00')
    // .text(function() {
    //     return tool[1].name; 
    // });
    // d3.select('#tooltip4')
    // .attr("x", x)
    // .attr("y", y+45)
    // .attr('font-family', 'sans-serif')
    // .style('font-size', '26px')
    // .attr('fill', 'black')
    // .text(function() {
    //     return tool[1].value; 
    // });
    // tooltip.find(".js-tooltip-table").html();
    // tooltip.find("#td1").html(tool[0].name);
    // tooltip.find("#td2").html(tool[0].value);
    // tooltip.find("#td3").html(tool[1].name);
    // tooltip.find("#td4").html(tool[1].value);
    // tooltip.find(".js-tooltip-table");
    // tooltip.css({
    //     top:  margin.top  + highestBinBarHeight() - tooltip.outerHeight() - tooltipBottomMargin,
    //     left: margin.left + (hoveredBarIndex * widthPerStack) + (widthPerStack / 2) - (tooltip.outerWidth() / 2),
    // }).fadeIn();
    }

    function tooltipContent () {
    var bars;

    bars = [];
    layers.each(function (d) {
        if (d.values[lastHoveredBarIndex] != null){
            bars.unshift({ name: d.name, value: d.values[lastHoveredBarIndex].y.toFixed(4) });
        }
    });
    return bars;
    // return tooltipTemplate({ bars: bars });
    }

    /**
    * Hides the tooltip.
    */
    function hideTooltip () {
        d3.selectAll("#tooltip1").text("");
        d3.selectAll("#tooltip2").text("");
        d3.selectAll("#tooltip3").text("");
        d3.selectAll("#tooltip4").text("");
    // $(".js-tooltip").stop().hide();

    // layers.selectAll("rect")
    //     .filter(function (d, i) { return (i === lastHoveredBarIndex); })
    //     .classed("highlighted", false)
    //     .attr('fill', function (d) {
    //         return d.color;
    //     });

    // lastHoveredBarIndex = undefined;
    }

    /**
    * Calculates the height of the highest (not tallest) bar within a certain bin.
    * @return {Number} The height, in pixels, of the highest bar within a certain bin
    */
    function highestBinBarHeight() {
    var bars,
        highestGroupBar;

    if (chartMode === "stacked") {
        highestGroupBar = _.last(layers.data()).values[lastHoveredBarIndex];
        return yScale(highestGroupBar.y0 + highestGroupBar.y);
    }
    else {
        bars = _.map(layers.data(), function (series) { return series.values[lastHoveredBarIndex]; });
        highestGroupBar = _.max(bars, function (bar) { return bar.y; });
        return yScale(highestGroupBar.y);
    }
    }

    /**
    * Calls a function at the end of **all** transitions.
    * @param {d3.transition} transition A D3 transition
    * @param {Function}      callback   The function to be called at the end of **all** transitions
    */
    function endAll (transition, callback) {
    var n;

    if (transition.empty()) {
        callback();
    }
    else {
        n = transition.size();
        transition.each("end", function () {
            n--;
            if (n === 0) {
                callback();
            }
        });
    }
    }

    // Inspired by Lee Byron's test data generator.
    function bumpLayer(n, o, color) {

    function bump(a) {
        var x = 1 / (.1 + Math.random()),
            y = 2 * Math.random() - .5,
            z = 10 / (.1 + Math.random());
        for (var i = 0; i < n; i++) {
            var w = (i / n - y) * z;
            a[i] += x * Math.exp(-w * w);
        }
    }

    var a = [], i;
    for (i = 0; i < n; ++i) a[i] = o + o * Math.random();
    for (i = 0; i < 5; ++i) bump(a);
    return a.map(function (d, i) { return {color: color,x: i, y: Math.max(0, d)}; });
    }

}
export default graph1;