import React from "react";
import PortfolioTable from './PortfolioTable';
import '../PortfolioPage.css';

function PortfolioPage() {
    const portfolio = [
        { symbol: 'AAPL', numberOfShares: 10, amountInvested: 1500},
        { symbol: 'MSFT', numberOfShares: 5, amountInvested: 2500},
        { symbol: 'TSLA', numberOfShares: 50, amountInvested: 20000}
    ];

    return (
        <div>
            <PortfolioTable portfolio={portfolio} />
            <h2> My Portfolio </h2>
        </div>
    )
}

export default PortfolioPage;