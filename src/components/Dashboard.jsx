/* ========== DEPENDENCIES ============= */
import React from "react";
/* ========== COMPONENTS ============ */
import { ChooseBook } from "comp/ChooseBook";
import { ListBooks } from "comp/ListBooks";
/* ============ CODE ============== */
const Dashboard = () => {
  return (
    <div className="main-content">
      <h2 className="page-heading">Dashboard</h2>
      <ChooseBook />
      <ListBooks />
    </div>
  );
};
export default Dashboard;
