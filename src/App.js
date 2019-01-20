import React, {Component} from "react";
import {Dimmer, Loader} from "semantic-ui-react";
import {QuandlClient} from "./lib/quandlClient";
import CompanySelect from "./containers/companySelect";
import ChartSelect from "./containers/chartSelect";
import PeriodSelect from "./containers/periodSelect";
import LineChart from "./components/lineChart";
import AreaChart from "./components/areaChart";

import "semantic-ui-css/semantic.min.css";
import "./index.css";

const chartTypes = [
  {key: "close", value: "close", text: "Close price"},
  {key: "volume", value: "volume", text: "Volume"},
];

export const quandlClient = new QuandlClient(process.env.REACT_APP_QUANDL_API_KEY);

class App extends Component {
  state = {
    companiesList: [],
    companyCode: "AAPL",
    chartType: chartTypes[1].value,
    datesRange: "",
    data: null,
    isLoading: true,
  };

  componentWillMount() {
    this.getCompanies();
    this.getChartData();
  }

  render() {
    return (
      <div className="application">
        <header>
          <CompanySelect companiesList={this.state.companiesList} onChange={this.handleSelectCode} />
          <ChartSelect value={this.state.chartType} options={chartTypes} onChange={this.handleChangeChartType} />
          <PeriodSelect value={this.state.datesRange} onChange={this.handleChangeRange} />
        </header>
        <div>{this.renderLoader()}</div>
        <div className="chart-container">{this.renderChart()}</div>
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

  renderChart() {
    if (!this.state.data) return;

    switch (this.state.chartType) {
      case "close":
        return <LineChart dataset={this.state.data} />;
      case "volume":
        return <AreaChart dataset={this.state.data} />;
      default:
        return;
    }
  }

  handleSelectCode = companyCode => this.setState({companyCode}, this.getChartData);

  handleChangeChartType = chartType => this.setState({chartType});

  handleChangeRange = datesRange =>
    this.setState({datesRange}, () => {
      setTimeout(this.getChartData, 1000);
    });

  getCompanies = () => {
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
  };

  getChartData = () => {
    if (this.state.companyCode) {
      this.setState({isLoading: true}, () => {
        const [startDate, endDate] = this.state.datesRange.split(" - ");
        quandlClient.getAdjCloseTimeseries(this.state.companyCode, startDate, endDate).then(data => {
          this.setState({isLoading: false, data});
        });
      });
    }
  };
}

export default App;
