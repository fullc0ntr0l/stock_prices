import React, {Component} from "react";
import * as d3 from "d3";
import PropTypes from "prop-types";

import "./areaChart.css";

export default class AreaChart extends Component {
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
    return <div className="area-chart" />;
  }

  clearChart() {
    d3.select(".area-chart > svg").remove();
  }

  draw(dataset) {
    const {data} = dataset;

    this.clearChart();

    const margin = {top: 20, right: 30, bottom: 30, left: 40};
    const width = window.innerWidth * 0.9;
    const height = window.innerHeight * 0.6;

    const x = d3
      .scaleTime()
      .domain(d3.extent(data, d => new Date(d[0])))
      .range([0, width]);
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d[1])])
      .range([height, 0]);

    const area = d3
      .area()
      .x(d => x(new Date(d[0])))
      .y0(height)
      .y1(d => y(d[1]));

    const valueline = d3
      .line()
      .x(d => new Date(d[0]))
      .y(d => d[1]);

    const svg = d3
      .select(".area-chart")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    svg
      .append("path")
      .data([data])
      .attr("class", "area")
      .attr("d", area);

    svg
      .append("path")
      .data([data])
      .attr("class", "line")
      .attr("d", valueline);

    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    svg.append("g").call(d3.axisLeft(y));
  }
}
