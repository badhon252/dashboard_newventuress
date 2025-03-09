"use client";

import React from "react";
import AuctionHeader from "./AuctionHeader";
import AuctionFilter from "./AuctionFilter";
import VendorAuctionContainer from "./VendorAuctionContainer";

function ProductTogler() {
  return (
    <div className="space-y-[30px] mb-[30px]">
      <AuctionHeader
      // setShowAddProduct={setShowAddProduct}
      // showAddProduct={showAddProduct}
      />
      <AuctionFilter />
      <VendorAuctionContainer />
      {/* {showAddProduct ? <AddNewProduct /> : <VendorAuctionContainer />} */}
    </div>
  );
}

export default ProductTogler;
