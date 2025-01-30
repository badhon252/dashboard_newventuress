import React from "react";
import CustomerFilter from "./_components/FinancerFilter";
import CustomerContainer from "./_components/FinanceContainer";

const page = () => {
  return (
    <div>
      <CustomerFilter />
      <CustomerContainer />
    </div>
  );
};

export default page;
