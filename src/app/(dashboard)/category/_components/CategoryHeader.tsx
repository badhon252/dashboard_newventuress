import { Button } from "@/components/ui/button";



const CateforyHeader = ({ showcategory, setShowCategory }: { setShowCategory: React.Dispatch<React.SetStateAction<boolean>>, showcategory: boolean }) => {
  return (
    <div className="h-[80px] w-full bg-white p-[8px] rounded-[12px] flex items-center justify-end">
      <div>
      <Button onClick={() => setShowCategory((prev) => !prev)}>
          {showcategory ? "Category List" : "Add New"} 
        </Button>
      </div>
    </div>
  );
};

export default CateforyHeader;
