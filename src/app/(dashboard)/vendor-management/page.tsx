import React from "react";
import CustomerListHeader from "./_components/CustomerListHeader";
import CustomerFilter from "./_components/CustomerFilter";
import CustomerContainer from "./_components/CustomerContainer";

const page = () => {
  return (
    <div>
      <CustomerListHeader />
      <CustomerFilter />
      <CustomerContainer />
    </div>
  );
};

export default page;
