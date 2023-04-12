import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import helpers from '../features/helpers';

function fetchMarketplace(token) {
    return axios.get(`http://springbootmockstockaws-env.eba-m9mpenp5.us-west-1.elasticbeanstalk.com/quotes`, { 
        headers : {Authorization: `Bearer ${token}`},
        params: {symbols: `ATVI,AMD,GOOG,AMZN,AAPL`}
    })
    .then((response) => {
        return response.data;
    });
}

function Marketplace({ fetchPortfolio, portfolio }) {
    const [marketplace, setMarketplace] = useState([]);
    const [isAddingPortfolioEntry, setIsAddingPortfolioEntry] = useState(false);
    const [hasFetchedData, setHasFetchedData] = useState(false);
    const token = localStorage.getItem('token');

    const handleClick = useCallback((stock) => {
        if (isAddingPortfolioEntry){
            return;
        }
        setIsAddingPortfolioEntry(true);

        if(portfolio.some(entry => entry.stockSymbol === stock.symbol)){
            setIsAddingPortfolioEntry(false);
            return;
        }

        const portfolioEntry = {
            stockSymbol: stock.symbol,
            name: stock.companyName,
            quantity: 0,
            profitLoss: 0.00
        }
        for(let i = 0; i < portfolio.length; i++){
            if(portfolio[i].stockSymbol === stock.symbol){
                return;
            }
        }

        axios.post(`http://springbootmockstockaws-env.eba-m9mpenp5.us-west-1.elasticbeanstalk.com/api/user/portfolio`, portfolioEntry, { 
            headers : {Authorization: `Bearer ${token}`}})
        .then(() => {
            fetchPortfolio();
            setTimeout(() => {
                setIsAddingPortfolioEntry(false);
            }, 2000);
        })
        .catch(error => {
            console.error(error);
            setIsAddingPortfolioEntry(false);
        });
    }, [fetchPortfolio, isAddingPortfolioEntry, portfolio, token]);

    useEffect(() => {
        if (!hasFetchedData) {
            fetchMarketplace(token).then(data => {
                setMarketplace(data);
                setHasFetchedData(true);
            });
        }
    }, []);

    return (
        <table>
            <thead>
                <tr>
                    <th>Symbol</th>
                    <th className="stock-name">Name</th>
                    <th>Price</th>
                    <th>Daily % Change</th>
                </tr>
            </thead>
            <tbody>
                {marketplace.map((stock) => (
                    <tr key={stock.symbol}>
                        <td>{stock.symbol}</td>
                        <td className="stock-name">{stock.companyName}</td>
                        <td>{`$${helpers.formatNumber(stock.price)}`}</td>
                        <td>{`${helpers.formatNumber(stock.percentChange)}%`}</td>
                        <td onClick={() => handleClick(stock)} title='Add to Portfolio' className="button-mimic">
                            <p>+</p>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Marketplace;