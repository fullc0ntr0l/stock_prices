import React, {Component} from "react";
import {Select} from "semantic-ui-react";

const cartTypes = [{key: "bar", value: "bar", text: "Bar chart"}, {key: "line", value: "line", text: "Line chart"}];

export default class ChartSelect extends Component {
  state = {
    value: null,
  };

  render() {
    return <Select placeholder="Chart type" options={cartTypes} onChange={this.handleChange} />;
  }

  handleChange = event => {
    this.setState({value: event.target.value});

    if (this.props.onChange) this.props.onChange(event.target.value);
  };
}
