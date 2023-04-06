import React from "react";
import PortfolioTable from './PortfolioTable';
import Marketplace from "../Components/Marketplace";
import '../PortfolioPage.css';

function PortfolioPage() {
  const portfolio = [
    { symbol: 'AAPL', name: "Apple Inc.", numberOfShares: 10, amountInvested: 1500},
    { symbol: 'MSFT', name: "Microsoft Corporation", numberOfShares: 5, amountInvested: 2500},
    { symbol: 'TSLA', name: "Telsa Corporation", numberOfShares: 50, amountInvested: 20000}
];
    return (
        <div>
            <div className="user-info">
                <p>Robin's Portfolio</p>
                {/* Add cash balance and investment value here */}
                <p>Cash: $25000</p>
                {/* Add cash balance and investment value here */}
                <p>Profit / Loss: $115000</p>
                {/* Add cash balance and investment value here */}
                <p>Investment Value: $225,000</p>
            </div>
            <div>
                <h2 className="section-header"> My Portfolio </h2>
                <PortfolioTable portfolio={portfolio} />
                <h2 className="section-header"> Marketplace</h2>
                <Marketplace Marketplace={Marketplace} />
            </div>
        </div>
    )
}

export default PortfolioPage;