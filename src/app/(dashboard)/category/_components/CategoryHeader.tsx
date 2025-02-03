import { Button } from "@/components/ui/button";
import { Box } from "lucide-react";



const CateforyHeader = ({ showcategory, setShowCategory }: { setShowCategory: React.Dispatch<React.SetStateAction<boolean>>, showcategory: boolean }) => {
  return (
    <div className="h-[80px] w-full bg-white p-[8px] rounded-[12px] flex items-center justify-end">
      <div className="pr-2">
      <Button onClick={() => setShowCategory((prev) => !prev)} className="w-[135px] h-[43px] px-[24px] py-[12px] text-[16px] font-medium leading-[19.2px]">
          {showcategory ? "Category List" : "Add New" } <Box />
        </Button>
      </div>
    </div>
  );
};

export default CateforyHeader;
