//Değişkenler
var mihenk = {};
var dset = [];
var xdata;
var ydata;
var ranges;
var grafik;
var margin = { top: 10, right: 90, bottom: 90, left: 90 },
    width = 700.51 + margin.left + margin.right,
    height = 500.51 - margin.top - margin.bottom;
var format = d3.format(".2f");//Virgülden sonra iki basamak

//Grafikler
mihenk.barchart = function(veri) {
    xdata = veri.xdata;
    ydata = veri.ydata;
    convert(xdata, ydata);
    ranges = veri.ranges;
    grafik = veri.opt;
    if (dset !== undefined) {
        barchart();
    }
};

mihenk.barhorizontal = function(veri) {
    xdata = veri.xdata;
    ydata = veri.ydata;
    convert(xdata, ydata);
    ranges = veri.ranges;
    grafik = veri.opt;
    if (dset !== undefined) {
        //console.log("vetical")
        barhorizontal();
    }
};

mihenk.box = function(veri) {
    dset = veri.dset;
    ranges = veri.ranges;
    grafik = veri.opt;
    boxchart();
}

//BarChart
function barchart() {
    //
    var xmin, xmax, ymin, ymax;
    xmin = dset[0].x;
    xmax = dset[0].x;
    ymin = dset[0].y;
    ymax = dset[0].y;

    for (t = 0; t < dset.length; t++) {
        if (dset[t].x < xmin) {
            xmin = dset[t].x;
        }
        if (dset[t].y < ymin) {
            ymin = dset[t].y;
        }
        if (dset[t].x > xmax) {
            xmax = dset[t].x;
        }
        if (dset[t].y > ymax) {
            ymax = dset[t].y;
        }
    }
    //console.log(xmin, xmax, '|', ymin, ymax);
    ranges[0].x_range = [xmin - 1, xmax + 1];
    ranges[0].y_range = [ymin - 1, ymax + 1];
    //
    var x = d3.scale.linear()
        .domain(ranges[0]["x_range"])
        .range([0, width]);

    var x1 = d3.scale.ordinal()
        .domain(ranges[0]["x_range"])
        .rangeRoundBands([0, width], .1);

    var y = d3.scale.linear()
        .domain(ranges[0]["y_range"])
        .range([0, height]);

    var z = d3.scale.category10();

    //y ekseni için scale
    var y2 = d3.scale.linear()
        .domain(ranges[0]["y_range"])
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .innerTickSize(-height)
        .outerTickSize(0)
        //.tickFormat(function(d,i){return ranges[0]["x.labels"][i]})
        .tickPadding(10);

    var yAxis = d3.svg.axis()
        .scale(y2)
        .orient("left")
        .innerTickSize(-width)
        .outerTickSize(0)
        //.tickFormat(function(d,i){return ranges[0]["y.labels"][i]})
        .tickPadding(10);

    var zoom = d3.behavior.zoom()
        .x(x)
        .y(y2)
        .scaleExtent([1, 5])
        .on("zoom", zoomed);

    d3.select("#graph").select("svg").remove();//Önceki var olan grafiği siliyor
    var svg = d3.select("#" + grafik.div_id).append("svg")
        .attr("viewBox", "0 0 " + (width + margin.right + margin.left) + " " + (height + margin.top + margin.bottom))
        .append("svg:g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .call(zoom)

    svg.append("g")
        .attr("class", "y axis")
        //.tickFormat(ranges[0]["y.labels"])
        .call(yAxis)
        .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", -80)
        .attr("dy", ".71em")
        .attr("x", -height / 3)
        .style("text-anchor", "end")
        .text(grafik.ylab);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .attr("class", "label")
        .attr("x", width / 2 + 10)//xAxias deki label değerinin yeri için buraya bak
        .attr("y", 60)
        .style("text-anchor", "end")
        .text(grafik.xlab);//Json üzerinden bu değeri değiştir

    var svg2 = svg.append("svg").attr("height", height).attr("width", width);

    var g = svg.append("g").attr("width", width).attr("height", height);

    var bar = svg2.selectAll("rect")
        .data(dset)
        .enter()
        .append("rect")
        .style("fill", function(d, i) {
            if (grafik.color !== "") {
                return grafik.color;
            } else {
                return z(i);
            }
        })
        .attr("id", "bar")
        .attr("opacity", "0.7")
        .attr("y", height)
        .on("mousemove", over)
        .on("mouseout", out);

    bar.transition()
        .duration(500)
        .attr("width",/*(width-margin.left)/dset.length(width / dset.length) / 2*/x1.rangeBand() / dset.length)
        .attr("height", function(d, i) { return y(d.y); })
        .attr("x", function(d, i) { return x(d.x) - (x1.rangeBand() / dset.length) / 2; })
        .attr("y", function(d, i) { return height - y(d.y); })
    /*Çıktı için gerekli düzenlemeler*/
    d3.selectAll(".tick")
        .attr("font", "15px sans-serif")
        .attr("fill", "#333")
        //.attr("stroke", "#333")
        .attr("shape-rendering", "crispEdges")
        .attr("opacity", 0.1);

    d3.selectAll(".axis.text")
        .attr("text-anchor", "end")
        .attr("font", "12px Arial")

    d3.selectAll("text")
        .attr("fill", "#777");

    d3.selectAll(".tick line")
        //.style("stroke-dasharray", ("5, 5"))
        .attr("stroke", "#333")
        .attr("opacity", "0.1")

    d3.select(".x.axis path")
        .attr("fill", "none")
        .attr("stroke", "#6B6B6B")
        .attr("shape-rendering", "crispEdges")

    d3.select(".y.axis path")
        .attr("fill", "none")
        .attr("stroke", "#6B6B6B")
        .attr("shape-rendering", "crispEdges")
    /*--------------------------------*/
    //tooltip
    var div = d3.select("#graph").append("div")
        .attr("class", "chart tooltip")
        .style("opacity", 0);
    div.append('div')
        .attr('class', 'labell');
    div.append('div')
        .attr('class', 'count');
    div.append('div')
        .attr('class', 'percent');
    // hover fonksiyonları
    function over(d, i, j) {
        d3.select(this)
            //.attr("stroke", "#C1C1C1");
            .attr("stroke", z(i));

        div.transition()
            .duration(500)
            .style("opacity", 1);
        div.select('.labell').html("Value :" + d.y)                // Object.keys(dset[0]) bu değerler sabit mi ? 
        //div.select('.count').html(Object.keys(dset[0])[5]+":"+dset[i]["density"]); //
        div.select('.percent').html("mpg :" + format(d.x));//
        var mouseCoords = d3.mouse(
            d3.select("#graph").node().parentElement);
        div.transition()
            .duration(500)
            .style("opacity", 0.9)
            .style("display", "block")
            .style("left", mouseCoords[0] - 40 + "px")
            .style("top", mouseCoords[1] - 50 + "px");
    }
    function out(d, i, j) {
        d3.select(this)
            .transition(500)
            .attr({
                stroke: ""
            })
        div.transition()
            .duration(500)
            .style("opacity", 0);
    }
    function zoomed() {
        svg.select(".x.axis").call(xAxis);
        svg.select(".y.axis").call(yAxis);
        bar.attr("transform", "translate(" + d3.event.translate[0] + ",0)scale(" + d3.event.scale + ",1)");
        bar.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
    }


}

//Bar Horizontal
function barhorizontal() {
    //
    var xmin, xmax, ymin, ymax;
    xmin = dset[0].x;
    xmax = dset[0].x;
    ymin = dset[0].y;
    ymax = dset[0].y;

    for (t = 0; t < dset.length; t++) {
        if (dset[t].x < xmin) {
            xmin = dset[t].x;
        }
        if (dset[t].y < ymin) {
            ymin = dset[t].y;
        }
        if (dset[t].x > xmax) {
            xmax = dset[t].x;
        }
        if (dset[t].y > ymax) {
            ymax = dset[t].y;
        }
    }
    //console.log(xmin, xmax, '|', ymin, ymax);
    ranges[0].x_range = [xmin - 1, xmax + 1];
    ranges[0].y_range = [ymin - 1, ymax + 1];
    //
    var x = d3.scale.linear()
        .domain(ranges[0]["x_range"])
        .range([0, width]);

    var x1 = d3.scale.ordinal()
        .domain(ranges[0]["x_range"])
        .rangeRoundBands([0, width], .1);

    var x2 = d3.scale.ordinal()
        .domain(ranges[0]["x_range"])
        .rangeRoundBands([0, width]);

    var y = d3.scale.linear()
        .domain(ranges[0]["y_range"])
        .range([0, height]);

    var z = d3.scale.category10();

    //y ekseni için scale
    var y2 = d3.scale.linear()
        .domain(ranges[0]["y_range"])
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .innerTickSize(-height)
        .outerTickSize(0)
        //.tickFormat(function(d,i){return ranges[0]["x.labels"][i]})
        .tickPadding(10);

    var yAxis = d3.svg.axis()
        .scale(y2)
        .orient("left")
        .innerTickSize(-width)
        .outerTickSize(0)
        //.tickFormat(function(d,i){return ranges[0]["y.labels"][i]})
        .tickPadding(10);

    var zoom = d3.behavior.zoom()
        .x(x)
        .y(y2)
        .scaleExtent([1, 5])
        .on("zoom", zoomed);

    d3.select("#graph2").select("svg").remove();//Önceki var olan grafiği siliyor
    var svg = d3.select("#" + grafik.div_id).append("svg")
        .attr("viewBox", "0 0 " + (width + margin.right + margin.left) + " " + (height + margin.top + margin.bottom))
        .append("svg:g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .call(zoom)

    svg.append("g")
        .attr("class", "y axis")
        //.tickFormat(ranges[0]["y.labels"])
        .call(yAxis)
        .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", -80)
        .attr("dy", ".71em")
        .attr("x", -height / 3)
        .style("text-anchor", "end")
        .text(grafik.ylab);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .attr("class", "label")
        .attr("x", width / 2 + 10)//xAxias deki label değerinin yeri için buraya bak
        .attr("y", 60)
        .style("text-anchor", "end")
        .text(grafik.xlab);//Json üzerinden bu değeri değiştir

    var svg2 = svg.append("svg").attr("height", height).attr("width", width);

    var g = svg.append("g").attr("width", width).attr("height", height);

    var bar = svg2.selectAll("rect")
        .data(dset)
        .enter()
        .append("rect")
        .style("fill", function(d, i) {
            if (grafik.color !== "") {
                return grafik.color;
            } else {
                return z(i);
            }
        })
        .attr("id", "bar")
        .attr("opacity", "0.7")
        .attr("width", 0)
        .on("mousemove", over)
        .on("mouseout", out);

    bar.transition()
        .duration(500)
        .attr("height",/*(width-margin.left)/dset.length(width / dset.length) / 2*/x1.rangeBand() / dset.length / 2)
        .attr("width", function(d, i) { return x(d.x); })
        .attr("x", function(d, i) { return x2(d.x); })
        .attr("y", function(d, i) { return height - y(d.y) - height / dset.length / 4; });
    /*Çıktı için gerekli düzenlemeler*/
    d3.selectAll(".tick")
        .attr("font", "15px sans-serif")
        .attr("fill", "#333")
        //.attr("stroke", "#333")
        .attr("shape-rendering", "crispEdges")
        .attr("opacity", 0.1);

    d3.selectAll(".axis.text")
        .attr("text-anchor", "end")
        .attr("font", "12px Arial")

    d3.selectAll("text")
        .attr("fill", "#777");

    d3.selectAll(".tick line")
        //.style("stroke-dasharray", ("5, 5"))
        .attr("stroke", "#333")
        .attr("opacity", "0.1")

    d3.select(".x.axis path")
        .attr("fill", "none")
        .attr("stroke", "#6B6B6B")
        .attr("shape-rendering", "crispEdges")

    d3.select(".y.axis path")
        .attr("fill", "none")
        .attr("stroke", "#6B6B6B")
        .attr("shape-rendering", "crispEdges")
    d3.selectAll(".domain")
        .attr("fill", "none")
        .attr("stroke", "#6B6B6B")
        .attr("shape-rendering", "crispEdges")
    /*--------------------------------*/
    //tooltip
    var div = d3.select("#graph").append("div")
        .attr("class", "chart tooltip")
        .style("opacity", 0);
    div.append('div')
        .attr('class', 'labell');
    div.append('div')
        .attr('class', 'count');
    div.append('div')
        .attr('class', 'percent');
    // hover fonksiyonları
    function over(d, i, j) {
        d3.select(this)
            //.attr("stroke", "#C1C1C1");
            .attr("stroke", z(i));

        div.transition()
            .duration(500)
            .style("opacity", 1);
        div.select('.labell').html("Value :" + d.y)                // Object.keys(dset[0]) bu değerler sabit mi ? 
        //div.select('.count').html(Object.keys(dset[0])[5]+":"+dset[i]["density"]); //
        div.select('.percent').html("mpg :" + format(d.x));//
        var mouseCoords = d3.mouse(
            d3.select("#graph").node().parentElement);
        div.transition()
            .duration(500)
            .style("opacity", 0.9)
            .style("display", "block")
            .style("left", mouseCoords[0] - 40 + "px")
            .style("top", mouseCoords[1] - 50 + "px");
    }
    function out(d, i, j) {
        d3.select(this)
            .transition(500)
            .attr({
                stroke: ""
            })
        div.transition()
            .duration(500)
            .style("opacity", 0);
    }
    function zoomed() {
        svg.select(".x.axis").call(xAxis);
        svg.select(".y.axis").call(yAxis);
        bar.attr("transform", "translate(" + d3.event.translate[0] + ",0)scale(" + d3.event.scale + ",1)");
        bar.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
    }


}

//Box plot
function boxchart() {
    /*var dset = [
        {
            "ymin": 10.4,
            "lower": 14.5,
            "middle": 15.5,
            "upper": 18.4,
            "ymax": 21.5,
            "x": 3
        },
        {
            "ymin": 17.8,
            "lower": 21,
            "middle": 22.8,
            "upper": 28.075,
            "ymax": 33.9,
            "x": 4
        },
        {
            "ymin": 15,
            "lower": 15.8,
            "middle": 19.7,
            "upper": 26,
            "ymax": 30.4,
            "x": 5
        },
        {
            "ymin": 10.4,
            "lower": 14.5,
            "middle": 15.5,
            "upper": 18.4,
            "ymax": 21.5,
            "x": 6
        },
        {
            "ymin": 17.8,
            "lower": 21,
            "middle": 22.8,
            "upper": 28.075,
            "ymax": 33.9,
            "x": 7
        },
        {
            "ymin": 15,
            "lower": 15.8,
            "middle": 19.7,
            "upper": 26,
            "ymax": 30.4,
            "x": 8
        },

        {
            "ymin": 10.4,
            "lower": 14.5,
            "middle": 15.5,
            "upper": 18.4,
            "ymax": 21.5,
            "x": 9
        },
        {
            "ymin": 17.8,
            "lower": 21,
            "middle": 22.8,
            "upper": 28.075,
            "ymax": 33.9,
            "x": 10
        },
        {
            "ymin": 15,
            "lower": 15.8,
            "middle": 19.7,
            "upper": 26,
            "ymax": 30.4,
            "x": 11
        },
        {
            "ymin": 10.4,
            "lower": 14.5,
            "middle": 15.5,
            "upper": 18.4,
            "ymax": 21.5,
            "x": 12
        },
        {
            "ymin": 17.8,
            "lower": 21,
            "middle": 22.8,
            "upper": 28.075,
            "ymax": 33.9,
            "x": 13
        },
        {
            "ymin": 15,
            "lower": 15.8,
            "middle": 19.7,
            "upper": 26,
            "ymax": 30.4,
            "x": 14
        }
    ];
    var ranges = [
        {
            "x.range": [2.4, 14.6],
            "x.labels": ["3", "4", "5"],
            "x.major": [0.1875, 0.5, 0.8125],
            "x.minor": {},
            "x.major_source": [1, 2, 3],
            "x.minor_source": {},
            "y.range": [9.225, 35.075],
            "y.labels": ["10", "15", "20", "25", "30", "35"],
            "y.major": [0.03, 0.2234, 0.4168, 0.6103, 0.8037, 0.9971],
            "y.minor": [0.03, 0.1267, 0.2234, 0.3201, 0.4168, 0.5135, 0.6103, 0.707, 0.8037, 0.9004, 0.9971],
            "y.major_source": [10, 15, 20, 25, 30, 35],
            "y.minor_source": [10, 12.5, 15, 17.5, 20, 22.5, 25, 27.5, 30, 32.5, 35]
        }
    ];*/
    var margin = { top: 10, right: 90, bottom: 90, left: 90 },
        width = 700.51 + margin.left + margin.right,
        height = 500.51 - margin.top - margin.bottom;
    var c1, c2, c3, c4, c5;

    var format = d3.format(".2f");

    var x1 = d3.scale.ordinal()
        .domain(ranges[0]["x.range"])
        .rangeRoundBands([0, width], .1);

    var x = d3.scale.linear()
        .domain(ranges[0]["x.range"])
        .range([0, width]);


    var y = d3.scale.linear()
        .domain(ranges[0]["y.range"])
        .range([0, height]);

    var z = d3.scale.category20();

    //y ekseni için scale
    var y2 = d3.scale.linear()
        .domain(ranges[0]["y.range"])
        .range([height, 0]);


    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .innerTickSize(-height)
        .outerTickSize(0)
        //.tickFormat(function(d,i){return ranges[0]["x.labels"][i]})
        .tickPadding(10);

    var yAxis = d3.svg.axis()
        .scale(y2)
        .orient("left")
        .innerTickSize(-width)
        .outerTickSize(0)
        //.tickFormat(function(d,i){return ranges[0]["y.labels"][i]})
        .tickPadding(10);

    var zoom = d3.behavior.zoom()
    				.x(x)
    				.y(y2)
    				.scaleExtent([1, 5])
    				.on("zoom", zoomed);

    d3.select("#graph3").select("svg").remove();
    var svg = d3.select("#graph3").append("svg")
        //.attr("width", width + margin.left + margin.right)
        //.attr("height", height + margin.top + margin.bottom)
        .attr("viewBox", "0 0 " + (width + margin.right + margin.left) + " " + (height + margin.top + margin.bottom))
        .append("svg:g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        //.call(d3.behavior.zoom().x(x).y(y2).scaleExtent([1, 10]).on("zoom", zoomed));
        .call(zoom)

    svg.append("g")
        .attr("class", "y axis")
        //.tickFormat(ranges[0]["y.labels"])
        .call(yAxis)
        .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", -80)
        .attr("dy", ".71em")
        .attr("x", -height / 3)
        .style("text-anchor", "end")
        .text("Value");

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .attr("class", "label")
        .attr("x", width / 2 + 10)//xAxias deki label değerinin yeri için buraya bak
        .attr("y", 60)
        .style("text-anchor", "end")
        .text("mpg");//Json üzerinden bu değeri değiştir 

    var y3 = d3.scale.linear()
        .domain(ranges[0]["y.range"])
        .range([height, 0]);

    var svg2 = svg.append("svg").attr("height", height).attr("width", width);

    //Dikey çizgiler
    for (var i = 0; i < dset.length; i++) {
        var line = svg2.append("line")
            .attr("stroke", z(i))
            .attr("id", "boxline")
            .attr("opacity", 0.5)
            .attr("x1", x(dset[i].x))
            .attr("x2", x(dset[i].x))
            .attr("y1", height - y(dset[i].ymin))
            .attr("y2", height - y(dset[i].ymax))
    }

    //Yatay Çizgiler

    for (var i = 0; i < dset.length; i++) {
        var line = svg2.append("line")
            .attr("stroke", z(i))
            .attr("id", "boxline")
            .attr("opacity", 0.5)
            .attr("x1", x(dset[i].x) - (x1.rangeBand() / dset.length) / 2)
            .attr("x2", x(dset[i].x) + x1.rangeBand() / dset.length / 2)
            .attr("y1", height - y(dset[i].middle))
            .attr("y2", height - y(dset[i].middle))
    }



    var bar = svg2.selectAll("rect")
        .data(dset)
        .enter()
        .append("rect")
        .style("fill", function(d, i) { return z(i); })
        .attr("id", "bar")
        //.attr("stroke","#333")
        .attr("opacity", "0.7")
        .attr("width",/*(width-margin.left)/dset.length--x.rangeBand()/dset.length*/x1.rangeBand() / dset.length)
        .attr("height", function(d, i) { return y(d.upper) - y(d.lower); })
        .attr("x", function(d, i) { return x(d.x) - (x1.rangeBand() / dset.length) / 2; })
        .attr("y", function(d, i) { return height - y(d.upper); })
        .on("mousemove", over)
        .on("mouseout", out);

    /*Çıktı için gerekli düzenlemeler*/
    d3.selectAll(".tick")
        .attr("font", "15px sans-serif")
        .attr("fill", "#333")
        //.attr("stroke", "#333")
        .attr("shape-rendering", "crispEdges")
        .attr("opacity", 0.1);

    d3.selectAll(".axis.text")
        .attr("text-anchor", "end")
        .attr("font", "12px Arial")

    d3.selectAll("text")
        .attr("fill", "#777");

    d3.selectAll(".tick line")
        //.style("stroke-dasharray", ("5, 5"))
        .attr("stroke", "#333")
        .attr("opacity", "0.1")

    d3.select(".x.axis path")
        .attr("fill", "none")
        .attr("stroke", "#6B6B6B")
        .attr("shape-rendering", "crispEdges")

    d3.select(".y.axis path")
        .attr("fill", "none")
        .attr("stroke", "#6B6B6B")
        .attr("shape-rendering", "crispEdges")
    d3.selectAll(".domain")
        .attr("fill", "none")
        .attr("stroke", "#6B6B6B")
        .attr("shape-rendering", "crispEdges")
    /*--------------------------------*/
    //tooltip
    var div = d3.select("#graph3").append("div")
        .attr("class", "chart tooltip2")
        .style("opacity", 0);
    div.append('div')
        .attr('class', 'labell labell');
    div.append('div')
        .attr('class', 'labelll labell');
    div.append('div')
        .attr('class', 'labellll labell');
    div.append('div')
        .attr('class', 'count labell');
    div.append('div')
        .attr('class', 'percent labell');
    // hover fonksiyonları
    function over(d, i, j) {
        d3.select(this)
            //.transition(100)
            .attr("stroke", z(i))
        //.attr("stroke-width",0.5);

        div.transition()
            .duration(500)
            .style("opacity", 1);
        div.select('.labell').html("Max :" + d.ymax);
        div.select('.labelll').html("Q3 :" + d.upper);
        div.select('.labellll').html("Median :" + d.middle);
        div.select('.count').html("Q1 :" + d.lower);
        div.select('.percent').html("Min :" + d.ymin);
        var mouseCoords = d3.mouse(
            d3.select("#graph3").node().parentElement);
        div.transition()
            .duration(500)
            .style("opacity", 0.9)
            .style("display", "block")
            .style("left", mouseCoords[0] - 40 + "px")
            .style("top", mouseCoords[1] - 80 + "px");
    }


    function out(d, i, j) {
        d3.select(this)
            .transition(500)
            .attr({
                stroke: "none"
            })
        //.attr("stroke","#333");

        div.transition()
            .duration(500)
            .style("opacity", 0);

        svg2.selectAll(".test").attr("opacity", 0).style("display", "none");
        svg2.selectAll(".circles").attr("opacity", 0).style("display", "none");

    }

    function zoomed() {
        svg.select(".x.axis").call(xAxis);
        svg.select(".y.axis").call(yAxis);

        bar.attr("transform", "translate(" + d3.event.translate[0] + ",0)scale(" + d3.event.scale + ",1)");
        bar.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
        d3.selectAll("#boxline").attr("transform", "translate(" + d3.event.translate[0] + ",0)scale(" + d3.event.scale + ",1)");
        d3.selectAll("#boxline").attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
    }
}

//Verilerin uygun formata getirilmesi
function convert(xdata, ydata) {
    dset = [];
    if (xdata.length === ydata.length) {
        for (i in xdata) {
            dset.push({ "x": xdata[i], "y": ydata[i] });
        }
    }
    //console.log("convert", dset);
}