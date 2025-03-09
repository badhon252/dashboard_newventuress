import React from "react";
import CustomerListHeader from "./_components/CustomerListHeader";
import VendorManagementContainer from "./_components/VendorManagementContainer";

const page = () => {
  return (
    <div>
      <CustomerListHeader />
      <VendorManagementContainer/>
    </div>
  );
};

export default page;
