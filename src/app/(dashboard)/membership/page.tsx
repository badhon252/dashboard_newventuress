import MembershipContainer from "./_components/membership-container";
import MembershipFilter from "./_components/membership-filter";

const Page = () => {
  return (
    <div className="space-y-[30px]">
      <MembershipFilter />
      <MembershipContainer />
    </div>
  );
};

export default Page;
