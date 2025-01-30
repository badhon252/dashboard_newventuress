import { Button } from "@/components/ui/button";
import { Box } from "lucide-react";
import Link from "next/link";

const CuponHeader = () => {
  return (
    <div className="h-[80px] w-full bg-white p-[8px] rounded-[12px] flex items-center justify-between mb-[30px]">
      <div className="px-[10px] text-[12px] leading-[14.4px]">
        <span className="text-xs font-normal text-[#444444] leading-[14px]">All</span> (58) |
        <span className="text-xs font-normal leading-[14px] text-gradient"> Published (58) | </span>
        <span className="text-xs font-normal leading-[14px] text-gradient"> Draft (0) | </span>
        <span className="text-xs font-normal leading-[14px] text-gradient"> Pending (0) | </span>
        <span className="text-xs font-normal leading-[14px] text-gradient"> Archived (32) </span>
      </div>

      <div>
        <Button asChild>
          <Link href="/">
            Add New <Box />
          </Link>
        </Button>
      </div>

    </div>
  );
};

export default CuponHeader;
