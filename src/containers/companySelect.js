import React, {Component} from "react";
import lodash from "lodash";
import PropTypes from "prop-types";
import {Search} from "semantic-ui-react";

export default class CompanySelect extends Component {
  static propTypes = {
    companiesList: PropTypes.array,
    onChange: PropTypes.func,
  };

  state = {
    isLoading: false,
    value: "",
    results: [],
  };

  render() {
    return (
      <Search
        placeholder="Company stock symbol"
        loading={this.state.isLoading}
        results={this.state.results}
        onResultSelect={this.handleResultSelect}
        onSearchChange={this.handleSearchChange}
        value={this.state.value}
      />
    );
  }

  resetState = () => this.setState({isLoading: false, results: [], value: ""});

  handleResultSelect = (_, {result}) => {
    this.setState({value: result.name});

    if (this.props.onChange) this.props.onChange(result.name);
  };

  handleSearchChange = (_, {value}) => {
    this.setState({value, isLoading: true}, () => {
      if (this.state.value.length < 1) return this.resetState();
      if (this.state.value.length < 2) return;

      const re = new RegExp(lodash.escapeRegExp(this.state.value), "i");
      const isMatch = result => re.test(result.name);

      this.setState({
        isLoading: false,
        results: lodash.filter(this.props.companiesList, isMatch),
      });
    });
  };
}
