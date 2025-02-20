"use client";

import React from "react";
import AuctionHeader from "./AuctionHeader";
import AuctionFilter from "./AuctionFilter";
import VendorAuctionContainer from "./VendorAuctionContainer";
import { AddNewProduct } from "./AddNewProduct";

function ProductTogler() {
  const [showAddProduct, setShowAddProduct] = React.useState(false);
  return (
    <div className="space-y-[30px] mb-[30px]">
      <AuctionHeader
        setShowAddProduct={setShowAddProduct}
        showAddProduct={showAddProduct}
      />
      <AuctionFilter />
      {showAddProduct ? <AddNewProduct /> : <VendorAuctionContainer />}
    </div>
  );
}

export default ProductTogler;
