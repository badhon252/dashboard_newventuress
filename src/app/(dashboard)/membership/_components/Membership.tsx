"use client";
import { useState } from "react";
import AddNewMembership from "./AddNewMembership";
import MembershipContainer from "./membership-container";
import MembershipFilter from "./membership-filter";
import AddSponsoredListing from "./add-sponsored-list";

const Membership = () => {
  const [showMembership, setShowMembership] = useState(false);
  // const [membershipCategory, setmembershipCategory] = useState(false);
  const [showAdditionalMembership, setShowAdditionalMembership] =
    useState(false);

  return (
    <div className="space-y-[30px]">
      <MembershipFilter
        showMembership={showMembership}
        setShowMembership={setShowMembership}
        showAdditionalMembership={showAdditionalMembership}
        setShowAdditionalMembership={setShowAdditionalMembership}
        // membershipCategory={membershipCategory}
        // setmembershipCategory={setmembershipCategory}
      />

      {showMembership ? (
        <AddNewMembership setShowMembership={setShowMembership} />
      ) : showAdditionalMembership ? (
        <AddSponsoredListing
          setShowSponsoredListing={setShowAdditionalMembership}
        />
      ) : (
        <MembershipContainer />
      )}
    </div>
  );
};

export default Membership;
