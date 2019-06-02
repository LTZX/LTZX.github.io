function drawBar(tabId) {

    // d3.select('#stasvg-'+tabId).remove();
    var ele = $("#" + tabId).children().last().children().last();
    ele.empty();

    // set the dimensions and margins of the graph
    var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = ele.width() - margin.left - margin.right,
        height = ele.height() - margin.top - margin.bottom;

    ele.append('<svg id="stasvg'+tabId+'"></svg>');

    // set the ranges
    var x = d3.scaleBand()
              .range([0, width])
              .padding(0.1);
    var y = d3.scaleLinear()
              .range([height, 0]);

    // append the svg object to the body of the page
    // append a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select('#stasvg'+tabId)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

      // Scale the range of the data in the domains
      x.domain(inputData.map(function(d) { return d.x; }));
      y.domain([0, d3.max(inputData, function(d) { return d.y; })]);

      // append the rectangles for the bar chart
      svg.selectAll(".bar")
          .data(inputData)
        .enter().append("rect")
          .attr("class", "bar")
          .attr("fill", "steelblue")
          .attr("x", function(d) { return x(d.x) + 5; })
          .attr("width", x.bandwidth() - 10)
          .attr("y", function(d) { return y(d.y); })
          .attr("height", function(d) { return height - y(d.y); });

      // add the x Axis
      svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));

      // add the y Axis
      svg.append("g")
          .call(d3.axisLeft(y).ticks(5));

}
