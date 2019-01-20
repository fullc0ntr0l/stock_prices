import React, {Component} from "react";
import PropTypes from "prop-types";
import {Select} from "semantic-ui-react";

export default class ChartSelect extends Component {
  static propTypes = {
    value: PropTypes.string,
    options: PropTypes.array,
  };

  render() {
    return (
      <Select
        placeholder="Chart type"
        options={this.props.options}
        onChange={this.handleChange}
        value={this.props.value}
      />
    );
  }

  handleChange = (_, {value}) => {
    if (this.props.onChange) this.props.onChange(value);
  };
}
