import React, {Component} from "react";
import {Dimmer, Loader} from "semantic-ui-react";
import {QuandlClient} from "./lib/quandlClient";
import CompanySelect from "./containers/companySelect";
import ChartSelect from "./containers/chartSelect";
import PeriodSelect from "./containers/periodSelect";

import "semantic-ui-css/semantic.min.css";
import "./index.css";

export const quandlClient = new QuandlClient();

class App extends Component {
  state = {
    companiesList: [],
    isLoading: true,
  };

  componentWillMount() {
    this.getCompanies();
  }

  render() {
    return (
      <div className="application">
        <header>
          <CompanySelect companiesList={this.state.companiesList} />
          <ChartSelect />
          <PeriodSelect />
        </header>
        <div>{this.renderLoader()}</div>
      </div>
    );
  }

  renderLoader() {
    if (this.state.isLoading) {
      return (
        <Dimmer active inverted>
          <Loader inverted content="Loading" />
        </Dimmer>
      );
    }
  }

  getCompanies() {
    quandlClient.getCompanies().then(result => {
      /*
        The result is from local WIKI_metadata.csv file
        First item in array is fields name and we remove it
        company[0] is code
        company[1] is full name
        company[2] is description
      */
      const companiesList = result.slice(1).map(company => ({
        key: company[0],
        name: company[0],
        title: company[1],
      }));

      this.setState({companiesList, isLoading: false});
    });
  }
}

export default App;
