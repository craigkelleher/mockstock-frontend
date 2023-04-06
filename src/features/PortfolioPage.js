import React, {useEffect, useState} from "react";
import PortfolioTable from './PortfolioTable';
import Marketplace from "../Components/Marketplace";
import '../PortfolioPage.css';
import axios from "axios";

function PortfolioPage() {
  const [user, setUser] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [profit, setProfit] = useState(0.00);
  const [investmentValue, setInvestmentValue] = useState(0.00);

  // TEST ID
  const userId = 4;

  useEffect(() => {
    async function fetchUser() {
        const response = await axios.get(`http://springbootmockstockaws-env.eba-m9mpenp5.us-west-1.elasticbeanstalk.com/api/user/${userId}`);
        setUser(response.data);
    }
    fetchUser();
  }, [portfolio])

  useEffect(() => {
    axios.get(`http://springbootmockstockaws-env.eba-m9mpenp5.us-west-1.elasticbeanstalk.com/api/user/${userId}/transactions`)
    .then((response) => {
        let sum = 0.00;
        response.data.forEach((transaction) => {
            if (transaction.transactionType === "buy") {
                sum += transaction.stockPrice;
            } else {
                sum -= transaction.stockPrice;
            }
        })

        setTransactions(response.data)
        setProfit(sum);
    })
  }, [portfolio])

  useEffect(() => {
    axios.get(`http://springbootmockstockaws-env.eba-m9mpenp5.us-west-1.elasticbeanstalk.com/api/user/${userId}/portfolio`)
    .then((response) => {
        let sum = 0.00;
        response.data.forEach((stock) => sum += stock.price * stock.quantity);

        setPortfolio(response.data);
        setInvestmentValue(sum);
    })
  }, [portfolio])

    return (
        <div>
            <div className="user-info">
                <p>{`${user.name}'s Portfolio`}</p>
                {/* Add cash balance and investment value here */}
                <p>{`Cash: $${user.balance}`}</p>
                {/* Add cash balance and investment value here */}
                <p>{`Profit / Loss: $${profit}`}</p>
                {/* Add cash balance and investment value here */}
                <p>{`Investment Value: $${investmentValue}`}</p>
            </div>
            <div>
                <h2 className="section-header"> My Portfolio </h2>
                <PortfolioTable portfolio={portfolio} userId={user.id} setPortfolio={setPortfolio} />
                <h2 className="section-header"> Marketplace</h2>
                <Marketplace Marketplace={Marketplace} />
            </div>
        </div>
    )
}

export default PortfolioPage;