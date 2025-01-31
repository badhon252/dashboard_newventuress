"use client"

const ContentManagementHeader = () => {
    return (
        <div className="w-full h-[90px] py-[38px] pl-[26px] bg-white rounded-[12px] mb-[30px]">
            <div className="px-[10px] text-[12px] leading-[14.4px]">
                <span className="text-xs font-normal text-[#444444] leading-[14px]">All</span> (58) |
                <span className="text-xs font-normal leading-[14px] text-gradient"> Published (58) | </span>
                <span className="text-xs font-normal leading-[14px] text-gradient"> Draft (0) | </span>
                <span className="text-xs font-normal leading-[14px] text-gradient"> Pending (0) | </span>
                <span className="text-xs font-normal leading-[14px] text-gradient"> Archived (32) </span>
            </div>
        </div>


    );
};

export default ContentManagementHeader;
