"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface storeManagementDetailsProps {
    id: string;
    userName: string;
    email: string;
    storeName: string;
    phone: string;
    joiningDate: string;
    avatarUrl: string;
}

interface DeleteStoreModalProps {
    storeManagementDetails: storeManagementDetailsProps;
    setIsOpen: (open: boolean) => void;
}

export function DeleteStoreModal({
    storeManagementDetails,
    setIsOpen,
}: DeleteStoreModalProps) {
    return (
        <div className="p-0 overflow-hidden max-h-[722px] flex flex-col justify-between py-[26px]">
            <h1 className="px-[24px] text-center text-[32px] font-semibold text-gradient leading-[38px]">
                Are You Sure To Delete this Store?
            </h1>

            <div className="px-[68px] pt-[122px]">

                <div className="">
                    <div className="flex items-center justify-between py-4 border-t-[1px] border-[#C5C5C5]">
                        <span className="text-muted-foreground font-medium ">
                            User Name
                        </span>
                        <div className="flex items-center gap-2">
                            <Avatar className="h-7 w-7">
                                <AvatarImage src={storeManagementDetails.avatarUrl} />
                                <AvatarFallback>AG</AvatarFallback>
                            </Avatar>
                            <span className="text-gradient">{storeManagementDetails.userName}</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between py-4 border-t-[1px] border-[#C5C5C5]">
                        <span className="text-muted-foreground">Store Name</span>
                        <span className="text-gradient">{storeManagementDetails.storeName}</span>
                    </div>

                    <div className="flex items-center justify-between py-4 border-t-[1px] border-[#C5C5C5]">
                        <span className="text-muted-foreground">ID</span>
                        <span className="text-gradient">{storeManagementDetails.id}</span>
                    </div>

                    <div className="flex items-center justify-between py-4 border-t-[1px] border-[#C5C5C5]">
                        <span className="text-muted-foreground">Email</span>
                        <span>{storeManagementDetails.email}</span>
                    </div>

                    <div className="flex items-center justify-between py-4 border-t-[1px] border-[#C5C5C5]">
                        <span className="text-muted-foreground">Phone</span>
                        <span>{storeManagementDetails.phone}</span>
                    </div>

                    <div className="flex items-center justify-between py-4 border-y-[1px] border-[#C5C5C5]">
                        <span className="text-muted-foreground">Joining Date</span>
                        <span>{storeManagementDetails.joiningDate}</span>
                    </div>
                </div>

                <div className="mt-6 space-y-3">
                    <Button
                        variant="outline"
                        className="w-full h-[56px] border-gradient text-gradient  hover:text-blue-500 border-[#121D42] cursor-pointer py-[18px]"
                        onClick={() => setIsOpen(false)}
                    >
                        Yes
                    </Button>
                    <Button
                        className="w-full h-[56px] bg-primary   py-[18px]"
                        onClick={() => setIsOpen(false)}
                    >
                        No
                    </Button>
                </div>
            </div>
        </div>
    );
}
