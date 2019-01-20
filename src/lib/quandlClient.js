import PapaParse from "papaparse";

export class QuandlClient {
  constructor() {
    this.apiKey = process.env.REACT_APP_QUANDL_API_KEY;

    if (!this.apiKey) {
      throw new Error(
        "Please set `REACT_APP_QUANDL_API_KEY` env variable with your Quandl API Key then run the application again"
      );
    }
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
}
