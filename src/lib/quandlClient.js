import PapaParse from "papaparse";

export class QuandlClient {
  constructor(apiKey) {
    if (!apiKey) {
      throw new Error(
        "Please set `REACT_APP_QUANDL_API_KEY` env variable with your Quandl API Key then run the application again"
      );
    }

    this.apiKey = apiKey;
    this.eodEndpoint = "https://www.quandl.com/api/v3/datasets/WIKI";
  }

  async getCompanies() {
    const result = await this.fetchCsv("/WIKI_metadata.csv");

    return result.data;
  }

  async fetchCsv(url) {
    return new Promise((complete, error) => {
      PapaParse.parse(url, {
        download: true,
        complete,
        error,
      });
    });
  }

  async getAdjCloseTimeseries(code, startDate, endDate) {
    const url = this.buildUrl({
      code,
      // columnIndex 11 will fetch data for `Adj Close` column only
      params: {columnIndex: 11, startDate, endDate},
    });

    const result = await fetch(url);
    const data = await result.json();

    return data.dataset;
  }

  buildUrl({code, params: {columnIndex, startDate, endDate}}) {
    if (!code) throw new Error("Invald `code` parameter");

    let url = `${this.eodEndpoint}/${code}.json?api_key=${this.apiKey}`;

    if (columnIndex) url += `&column_index=${columnIndex}`;
    if (startDate) url += `&start_date=${startDate}`;
    if (endDate) url += `&end_date=${endDate}`;

    return url;
  }
}
