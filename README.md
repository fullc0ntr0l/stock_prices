# EOD Price/Volume page

Show EOD stock prices using [quandl API](https://www.quandl.com/)

## Install

```bash
  git clone git@github.com:fullc0ntr0l/stock_prices.git
  cd stock_prices
  nvm use
  yarn install
```

You need to setup `quandl` api key before running the application:

```bash

  echo "<Your API key>" > .env
```

Run the application

```bash
  yarn start
```

Now you can view the page at [http://localhost:3000/](http://localhost:3000/)
