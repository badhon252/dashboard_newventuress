"use client";
import { useState } from "react";
import AddNewMembership from "./AddNewMembership";
import MembershipContainer from "./membership-container";
import MembershipFilter from "./membership-filter";

const Membership = () => {
  const [showMembership, setShowMembership] = useState(false);
  return (
    <div className="space-y-[30px]">
      <MembershipFilter
        showMembership={showMembership}
        setShowMembership={setShowMembership}
      />
      {showMembership ? (
        <AddNewMembership setShowMembership={setShowMembership} />
      ) : (
        <MembershipContainer />
      )}
    </div>
  );
};

export default Membership;
