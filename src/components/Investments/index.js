import React, { useState, useEffect } from "react";
import Icon1 from "../../images/1.svg";
import Icon2 from "../../images/2.svg";
import Icon3 from "../../images/3.svg";
import {
  ServicesContainer,
  ServicesCard,
  ServicesH1,
  ServicesH2,
  ServicesH21,
  ServicesIcon,
  ServicesData,
  ServicesP,
  Input,
  ServicesWrapper,
} from "./InvestmentsElements";
import { Button } from "../ButtonElement";
import { Row, Col } from "antd";

const Investments = ({
  account,
  contract,
  networkId,
  buttonTxt,
  setButtonTxt,
  setAccount,
  setContract,
  setNetworkId,
}) => {
  const [plans, setPlans] = useState([
    {
      period: "7",
      dailyProfit: "8",
      totalProfit: "56",
      withdrawl: "Anytime",
      period: "7",
      dailyProfit: "8",
      totalProfit: "56",
      withdrawl: "Anytime",
      period: "7",
      dailyProfit: "8",
      totalProfit: "56",
      withdrawl: "Anytime",
      period: "7",
      dailyProfit: "8",
      totalProfit: "56",
      withdrawl: "Anytime",
    },
    {
      period: "7",
      dailyProfit: "8",
      totalProfit: "56",
      withdrawl: "Anytime",
      period: "7",
      dailyProfit: "8",
      totalProfit: "56",
      withdrawl: "Anytime",
      period: "7",
      dailyProfit: "8",
      totalProfit: "56",
      withdrawl: "Anytime",
      period: "7",
      dailyProfit: "8",
      totalProfit: "56",
      withdrawl: "Anytime",
    },
    {
      period: "7",
      dailyProfit: "8",
      totalProfit: "56",
      withdrawl: "Anytime",
      period: "7",
      dailyProfit: "8",
      totalProfit: "56",
      withdrawl: "Anytime",
      period: "7",
      dailyProfit: "8",
      totalProfit: "56",
      withdrawl: "Anytime",
      period: "7",
      dailyProfit: "8",
      totalProfit: "56",
      withdrawl: "Anytime",
    },
    {
      period: "7",
      dailyProfit: "8",
      totalProfit: "56",
      withdrawl: "Anytime",
      period: "7",
      dailyProfit: "8",
      totalProfit: "56",
      withdrawl: "Anytime",
      period: "7",
      dailyProfit: "8",
      totalProfit: "56",
      withdrawl: "Anytime",
      period: "7",
      dailyProfit: "8",
      totalProfit: "56",
      withdrawl: "Anytime",
    },
  ]);

  const [depositCount, setDepositCount] = useState(0);

  const [planValues, setPlanValues] = useState({});

  const getDate = (dt) => dt.toLocaleDateString("pt-PT");

  const handleFetchDeposits = async () => {
    const depositCount = await contract.getUserAmountOfDeposits(account); //get total array
    for (let i = 0; i < parseInt(depositCount._hex, 16); i++) {
      const depositInfo = await contract.getUserDepositInfo(account, i); //loop to get indidivual info
      const values = {
        planNumber: depositInfo.plan,
        dailyProfit: (parseFloat(depositInfo.percent) / Math.pow(10, 18)) * 100,
        totalProfit: (parseFloat(depositInfo.profit) / Math.pow(10, 18)) * 100,
        start: getDate(new Date(parseFloat(depositInfo.start) * 1000)),
        end: getDate(new Date(parseFloat(depositInfo.finish) * 1000)),
      };
      setPlanValues({
        ...planValues,
        [`plan${i}`]: values,
      });
      setDepositCount(depositCount);
    }
  };

  useEffect(() => {
    if (contract && account) {
      handleFetchDeposits();
    }
  }, [contract, account]);

  return (
    <ServicesContainer id="services">
      <ServicesH1>
        <u>Your Stakes</u>
      </ServicesH1>
      <Row gutter={[40, 40]}>
        {[...Array(depositCount)].map((plan, i) => (
          <Col xs={24} sm={24} md={8} lg={8} xl={8} key={i}>
            <ServicesCard>
              <ServicesP>Plan {planValues[`plan${i}`].planNumber}</ServicesP>
              <ServicesData>
                <ServicesH2>Plan </ServicesH2>
                <ServicesH21>{plan?.period} Days</ServicesH21>
              </ServicesData>
              <ServicesData>
                <ServicesH2>Daily Profit </ServicesH2>
                <ServicesH21>{planValues[`plan${i}`].dailyProfit}%</ServicesH21>
              </ServicesData>
              <ServicesData>
                <ServicesH2>Total Profit </ServicesH2>
                <ServicesH21>{planValues[`plan${i}`].totalProfit}%</ServicesH21>
              </ServicesData>
              <ServicesData>
                <ServicesH2>Start Date & Time </ServicesH2>
                <ServicesH21>{planValues[`plan${i}`].start}</ServicesH21>
              </ServicesData>
              <ServicesData>
                <ServicesH2>End Date & Time </ServicesH2>
                <ServicesH21>{planValues[`plan${i}`].end}</ServicesH21>
              </ServicesData>
              <ServicesData>
                <ServicesH2>Withdrawal </ServicesH2>
                <ServicesH21>{plan?.withdrawl}</ServicesH21>
              </ServicesData>
            </ServicesCard>
          </Col>
        ))}
      </Row>
    </ServicesContainer>
  );
};

export default Investments;
