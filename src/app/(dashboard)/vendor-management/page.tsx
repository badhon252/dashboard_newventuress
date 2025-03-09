import React from "react";
import CustomerListHeader from "./_components/CustomerListHeader";
import VendorManagementContainer from "./_components/VendorManagementContainer";
// import CustomerFilter from "./_components/CustomerFilter";
// import CustomerContainer from "./_components/CustomerContainer";

const page = () => {
  return (
    <div>
      <CustomerListHeader />
      <VendorManagementContainer/>
    </div>
  );
};

export default page;
