function drawScatterPlot(tabId) {
    // d3.select('#stasvg-'+tabId).remove();
    var ele = $("#" + tabId).children().last().children().last();
    ele.empty();

    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 30, left: 40},
        width = ele.width() - margin.left - margin.right,
        height = ele.height() - margin.top - margin.bottom;

    ele.append('<svg id="stasvg'+tabId+'"></svg>');
    // set the dimensions and margins of the graph
    var svg = d3.select('#stasvg'+tabId)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

    //Read the data
    // d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/iris.csv", function(data) {

      // Add X axis
      // Scale the range of the data in the domains
      // set the ranges
      var x = d3.scaleBand()
                .range([0, width])
                .padding(0.1);
      var y = d3.scaleLinear()
                .range([height, 0]);

      x.domain(inputData.map(function(d) { return d.x; }));
      y.domain([ d3.min(inputData, function(d) { return d.y; }) - 5, d3.max(inputData, function(d) { return d.y; }) + 5]);

      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
      svg.append("g")
        .call(d3.axisLeft(y));

      // Color scale: give me a specie name, I return a color
      var color = d3.scaleOrdinal(d3.schemeCategory10);

      // Add dots
      svg.append('g')
        .selectAll("dot")
        .data(inputData)
        .enter()
        .append("circle")
          .attr("cx", function (d) { return x(d.x) + 15; } )
          .attr("cy", function (d) { return y(d.y); } )
          .attr("r", 5)
          .style("opacity", 0.5)
          .style("fill", function (d) { return color(d.group) } )
}
