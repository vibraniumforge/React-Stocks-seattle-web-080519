import React, { Component } from "react";
import Stock from "../components/Stock";

class PortfolioContainer extends Component {
  render() {
    const portfolio = this.props.myPortfolio.map(stock => {
      return (
        <Stock
          key={stock.id}
          stock={stock}
          handleOnClick={this.props.handleOnClick}
        />
      );
    });
    return (
      <div>
        <h2>My Portfolio</h2>
        {portfolio}
      </div>
    );
  }
}

export default PortfolioContainer;
