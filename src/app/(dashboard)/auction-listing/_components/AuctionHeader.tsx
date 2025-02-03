
import { Button } from "@/components/ui/button";
import { Box } from "lucide-react";



const AuctionHeader = ({ showAddProduct, setShowAddProduct }: { setShowAddProduct: React.Dispatch<React.SetStateAction<boolean>>, showAddProduct: boolean }) => {
  return (
  <div className="h-[80px] w-full bg-white p-[8px] rounded-[12px] flex items-center justify-between">
    <div className="px-[10px] text-[12px] leading-[14.4px]">
      <span className="font-medium">All</span> (20) |
      <span className="text-gradient"> Published (30) | </span>
      <span className="text-gradient"> Draft (30) | </span>
      <span className="text-gradient"> Pending (30) | </span>
      <span className="text-gradient"> Archived (30) </span>
    </div>
    <div className="flex gap-4">
      <Button onClick={() => setShowAddProduct((prev) => !prev)} className="w-[135px] h-[43px] px-[24px] py-[12px] text-[16px] font-medium leading-[19.2px]">
        {showAddProduct ? "Product List" : "Add New" } <Box />
      </Button>
    </div>
  </div>
  );
};

export default AuctionHeader;