import React, {Component} from "react";
import * as d3 from "d3";
import PropTypes from "prop-types";

import "./lineChart.css";

export default class LineChart extends Component {
  static propTypes = {
    dataset: PropTypes.object,
  };

  componentDidMount() {
    this.draw(this.props.dataset);

    d3.select(window).on("resize.updatesvg", () => this.draw(this.props.dataset));
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.dataset !== nextProps.dataset) {
      this.draw(nextProps.dataset);
    }
  }

  componentWillUnmount() {
    this.clearChart();
    d3.select(window).on("resize.updatesvg", null);
  }

  render() {
    return <div className="line-chart" />;
  }

  clearChart() {
    d3.select(".line-chart > svg").remove();
  }

  draw(dataset) {
    const {data} = dataset;

    this.clearChart();

    const margin = {top: 20, right: 30, bottom: 30, left: 40};
    const width = window.innerWidth * 0.9;
    const height = window.innerHeight * 0.6;
    const svg = d3
      .select(".line-chart")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const x = d3
      .scaleTime()
      .domain(d3.extent(data, d => new Date(d[0])))
      .range([margin.left, width - margin.right]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d[1])])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const xAxis = g =>
      g.attr("transform", `translate(0,${height - margin.bottom})`).call(
        d3
          .axisBottom(x)
          .ticks(width / 80)
          .tickSizeOuter(0)
      );

    const yAxis = g =>
      g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y))
        .call(g => g.select(".domain").remove())
        .call(g =>
          g
            .select(".tick:last-of-type text")
            .clone()
            .attr("x", 3)
            .attr("text-anchor", "start")
            .attr("font-weight", "bold")
            .text("$ Close")
        );

    const line = d3
      .line()
      .defined(d => !isNaN(d[1]))
      .x(d => x(new Date(d[0])))
      .y(d => y(d[1]));

    svg.append("g").call(xAxis);
    svg.append("g").call(yAxis);
    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", line);
  }
}
