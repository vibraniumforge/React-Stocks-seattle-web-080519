import React, { Component } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "../components/SearchBar";

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stocks: [],
      displayStocks: [],
      myPortfolio: [],
      radioBtn: "",
      filterValue: ""
    };
  }

  componentDidMount() {
    fetch("http://localhost:3000/stocks")
      .then(res => res.json())
      .then(res => this.setState({ stocks: res, displayStocks: res }))
      .catch(err => console.log(err));
  }

  handleOnClick = stock => {
    if (this.state.myPortfolio.includes(stock)) {
      const myPortfolio = [...this.state.myPortfolio];
      const myNewPortfolio = myPortfolio.filter(stockIterator => {
        return stockIterator.id !== stock.id;
      });
      this.setState({ myPortfolio: myNewPortfolio });
    } else {
      this.setState(prevState => ({
        myPortfolio: [...prevState.myPortfolio, stock]
      }));
    }
  };

  handleRadioClick = e => {
    const sortBy = e.target.value;
    let returnedStocks = [];
    if (sortBy === "Alphabetically") {
      // stocks.sort(function(a, b) {
      //   if (a.name > b.name) {
      //     return 1;
      //   } else if (b.name > a.name) {
      //     return -1;
      //   } else {
      //     return 0;
      //   }
      // });
      // returnedStocks = stocksAr.sort((a, b) => a.ticker > b.ticker);
      returnedStocks = this.state.displayStocks.sort((a, b) =>
        a.ticker > b.ticker ? 1 : -1
      );
    } else {
      returnedStocks = this.state.displayStocks.sort(
        (a, b) => a.price - b.price
      );
    }
    this.setState({ radioBtn: e.target.value, displayStocks: returnedStocks });
  };

  handleFilterClick = e => {
    const value = e.target.value;
    const stocks = [...this.state.stocks];
    let filteredStocks;
    if (value !== "All") {
      filteredStocks = stocks.filter(stock => {
        return stock.type === value;
      });
      this.setState({ displayStocks: filteredStocks, filterValue: value });
    } else {
      this.setState({ displayStocks: this.state.stocks });
    }
  };

  render() {
    return (
      <div>
        <SearchBar
          displayStocks={this.state.displayStocks}
          radioBtn={this.state.radioBtn}
          filterValue={this.state.filterValue}
          handleRadioClick={this.handleRadioClick}
          handleFilterClick={this.handleFilterClick}
        />

        <div className="row">
          <div className="col-8">
            <StockContainer
              displayStocks={this.state.displayStocks}
              handleOnClick={this.handleOnClick}
            />
          </div>
          <div className="col-4">
            <PortfolioContainer
              myPortfolio={this.state.myPortfolio}
              handleOnClick={this.handleOnClick}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MainContainer;
