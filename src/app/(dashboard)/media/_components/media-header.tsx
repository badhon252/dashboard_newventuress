import { Button } from "@/components/ui/button";
import { Box } from "lucide-react";
import Link from "next/link";

const MediaHeader = () => {
  return (
    <div className="h-[80px] w-full bg-white p-[8px] rounded-[12px] flex items-center justify-end">
      <div>
        <Button asChild className="w-[135px] h-[43px] px-[24px] py-[12px] text-[16px] font-medium leading-[19.2px]">
          <Link href="/">
            Add New <Box />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default MediaHeader;
