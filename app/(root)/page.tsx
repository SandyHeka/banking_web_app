import TotalBalanceBox from "@/components/TotalBalanceBox";
import HeaderBox from "@/components/HeaderBox";
import React from "react";
import RightSideBar from "@/components/RightSideBAr";

const Home = () => {
  const loggedIn = {
    firstName: "Sandesh",
    lastName: "Heka",
    email: "contact@heka.com",
  };
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || "GUEST"}
            subtext="Access and manage your account and transaction"
          />
          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1250.35}
          />
        </header>
        Recent Tranasaction
      </div>

      <RightSideBar
        user={loggedIn}
        banks={[{ currentBalance: 123.5 }, { currentBalance: 5.5 }]}
        transactions={[]}
      />
    </section>
  );
};

export default Home;
