import React from "react";
import CuponContainer from "./_components/CuponContainer";
import CuponFilter from "./_components/CuponFilter";
import CuponHeader from "./_components/CuponHeader";


const page = () => {
  return (
    <div>
      <CuponHeader/>
      <CuponFilter />
      <CuponContainer />
    </div>
  );
};

export default page;
