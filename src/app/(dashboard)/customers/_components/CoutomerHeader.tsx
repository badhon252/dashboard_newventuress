import Link from "next/link";

function CustomerListHeader() {
  return (
    <div className="flex h-[80px] w-full items-center rounded-[12px] bg-white p-[8px]">
      <div className="so px-[10px] text-[12px] leading-[14.4px]">
        <Link href="#" className="font-medium">
          All
        </Link>
        (20) |
        <Link href="#" className="text-gradient">
          Published (30) |
        </Link>
        <Link href="#" className="text-gradient">
          Draft (30) |
        </Link>
        <Link href="#" className="text-gradient">
          Pending (30) |
        </Link>
        <Link href="#" className="text-gradient">
          Archived (30)
        </Link>
      </div>
    </div>
  );
}

export default CustomerListHeader;
