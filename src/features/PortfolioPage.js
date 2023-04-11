import React, {useEffect, useState} from "react";
import PortfolioTable from './PortfolioTable';
import Marketplace from "../Components/Marketplace";
import '../PortfolioPage.css';
import axios from "axios";
import helpers from '../helpers';

function PortfolioPage() {
  const [user, setUser] = useState({});
  const [portfolio, setPortfolio] = useState([]);
  const [investmentValue, setInvestmentValue] = useState(0.00);
  const [totalProfitLoss, setTotalProfitLoss] = useState(0.00);
  const [stockPrice, setStockPrice] = useState({});
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchPortfolio();
  }, [])

    function fetchUser() {
        axios.get(`http://springbootmockstockaws-env.eba-m9mpenp5.us-west-1.elasticbeanstalk.com/api/user`, {
            headers: { Authorization: `Bearer ${token}` }})
            .then((response) => {
                response.data.balance = helpers.formatNumber(response.data.balance);
                setUser(response.data);
            })
    }

    function fetchPortfolio() {
        fetchUser();
        axios.get(`http://springbootmockstockaws-env.eba-m9mpenp5.us-west-1.elasticbeanstalk.com/api/user/portfolio`, {
            headers: { Authorization: `Bearer ${token}` }})
        .then(async (response) => {
        let investmentSum = 0.00;
        let profitLossSum = 0.00;
        for (let stock of response.data) {
            const fetchedStockPrice = await getStockPrice(stock.stockSymbol);
            
            investmentSum += fetchedStockPrice * stock.quantity;
            profitLossSum += stock.profitLoss;

            setStockPrice(prevState => ({
                ...prevState,
                [stock.stockSymbol]: fetchedStockPrice
            }));
        }
        investmentSum = helpers.formatNumber(investmentSum);
        setPortfolio(response.data);
        setInvestmentValue(investmentSum);
        setTotalProfitLoss(profitLossSum);
    })
    }

    async function getStockPrice(stockSymbol) {
        const response = await axios.get(`http://springbootmockstockaws-env.eba-m9mpenp5.us-west-1.elasticbeanstalk.com/quotes/${stockSymbol}`, {
            headers: { Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json" }});
        return response.data.price;
    }

    return (
        <div>
            <div className="user-info">
                <p>{`${user.name}'s Portfolio`}</p>
                <p>{`Cash: $${user.balance}`}</p>
                <p>{`Profit/Loss: $${totalProfitLoss}`}</p>
                <p>{`Investment Value: $${investmentValue}`}</p>
            </div>
            <div>
                <h2 className="section-header"> My Portfolio </h2>
                <PortfolioTable portfolio={portfolio} stockPrice={stockPrice} fetchPortfolio={fetchPortfolio} />
                <h2 className="section-header"> Marketplace</h2>
                <Marketplace Marketplace={Marketplace} fetchPortfolio={fetchPortfolio} portfolio={portfolio} />
            </div>
        </div>
    )
}

export default PortfolioPage;


