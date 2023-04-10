import React, {useEffect, useState} from "react";
import PortfolioTable from './PortfolioTable';
import Marketplace from "../Components/Marketplace";
import '../PortfolioPage.css';
import axios from "axios";

function PortfolioPage() {
  const [user, setUser] = useState({});
  const [portfolio, setPortfolio] = useState([]);
  const [investmentValue, setInvestmentValue] = useState(0.00);
  const [stockPrice, setStockPrice] = useState({});

  // TEST ID
  const userId = 23;

  useEffect(() => {
    fetchPortfolio();
  }, [])

    function fetchUser() {
        axios.get(`http://springbootmockstockaws-env.eba-m9mpenp5.us-west-1.elasticbeanstalk.com/api/user/${userId}`)
            .then((response) => {
                response.data.balance = formatNumber(response.data.balance);
                setUser(response.data);
            })
    }

    function fetchPortfolio() {
        fetchUser();
        axios.get(`http://springbootmockstockaws-env.eba-m9mpenp5.us-west-1.elasticbeanstalk.com/api/user/${userId}/portfolio`)
        .then(async (response) => {
        let sum = 0.00;
        for (let stock of response.data) {
            const fetchedStockPrice = await getStockPrice(stock.stockSymbol);
            
            sum += fetchedStockPrice * stock.quantity;

            setStockPrice(prevState => ({
                ...prevState,
                [stock.stockSymbol]: fetchedStockPrice
            }));
        }
        sum = formatNumber(sum);
        setPortfolio(response.data);
        setInvestmentValue(sum);
    })
    }

    async function getStockPrice(stockSymbol) {
        const response = await axios.get(`http://springbootmockstockaws-env.eba-m9mpenp5.us-west-1.elasticbeanstalk.com/quotes/${stockSymbol}`);
        return response.data.price;
    }

    function formatNumber(number) {
        number = parseFloat(number).toFixed(2);
        number = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return number;
    }

    return (
        <div>
            <div className="user-info">
                <p>{`${user.name}'s Portfolio`}</p>
                <p>{`Cash: $${user.balance}`}</p>
                <p>{`Profit/Loss: $`}</p>
                <p>{`Investment Value: $${investmentValue}`}</p>
            </div>
            <div>
                <h2 className="section-header"> My Portfolio </h2>
                <PortfolioTable portfolio={portfolio} userId={user.id} stockPrice={stockPrice} fetchPortfolio={fetchPortfolio} formatNumber={formatNumber} />
                <h2 className="section-header"> Marketplace</h2>
                <Marketplace Marketplace={Marketplace} fetchPortfolio={fetchPortfolio} portfolio={portfolio} />
            </div>
        </div>
    )
}

export default PortfolioPage;


