import React, {Component} from "react";
import PropTypes from "prop-types";
import {DatesRangeInput} from "semantic-ui-calendar-react";

export default class PeriodSelect extends Component {
  static propTypes = {
    onChange: PropTypes.func,
  };

  state = {
    datesRange: "",
  };

  render() {
    return (
      <DatesRangeInput
        dateFormat="DD.MM.YY"
        placeholder="From - To"
        popupPosition="bottom right"
        closable
        clearable
        value={this.state.datesRange}
        iconPosition="left"
        autoComplete="off"
        onChange={this.handleChange}
      />
    );
  }

  handleChange = (_, {value}) => {
    this.setState({datesRange: value});

    if (this.props.onChange) this.props.onChange(value);
  };
}
