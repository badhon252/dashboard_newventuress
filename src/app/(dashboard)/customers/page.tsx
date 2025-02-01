import CustomerContainer from "./_components/customerContainer";
import CustomerFilter from "./_components/CustomerFilter";
import CustomerHeader from "./_components/CoutomerHeader";

const Page = () => {
  return (
    <div>
      <CustomerHeader />
      <CustomerFilter />
      <CustomerContainer />
    </div>
  );
};

export default Page;
