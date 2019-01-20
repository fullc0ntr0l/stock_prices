import React, {Component} from "react";
import PropTypes from "prop-types";
import {DatesRangeInput} from "semantic-ui-calendar-react";

export default class PeriodSelect extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
  };

  state = {
    datesRange: "",
  };

  render() {
    return (
      <DatesRangeInput
        dateFormat="YYYY-MM-DD"
        placeholder="From - To"
        popupPosition="bottom right"
        closable
        clearable
        value={this.props.value}
        iconPosition="left"
        autoComplete="off"
        onChange={this.handleChange}
      />
    );
  }

  handleChange = (_, {value}) => {
    if (this.props.onChange) this.props.onChange(value);
  };
}
