"use client";

import { Button } from "@/components/ui/button";
import { notificationDataTypes } from "@/data/notificationData";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";


export const NotificationColumn: ColumnDef<notificationDataTypes>[] = [


    {
        header: "Tittle",
        cell: ({ row }) => {
            return (
                <div className="">
                    <div className="flex items-center justify-center gap-[4px] pt-[30px] ">
                        <span className="text-base font-normal leading-[19px] text-[#444444]">Store :</span>
                        <span>
                            <Image src={row.original.img} alt="notification user img" width={17} height={18} />
                        </span>
                        <span className="text-lg font-semibold leading-[21px] text-gradient">{row.original.name}</span>
                    </div>
                    <div className="pt-[30px] pb-[12px]">
                        <p className="text-base font-medium leading-[19px] text-[#444444]">{row.original.message}</p>
                    </div>
                </div>
            );
        },
    },
    {
        id: "type",
        header: () => <div className="ml-[-90px] ">Type</div>,
        
        cell: ({ row }) => {
            return (
                <div className="w-[175px] h-[38px] flex justify-center items-center bg-gradient-to-br from-[#121D42] via-[#152764] to-[#4857BD] rounded-[10px] py-[10px] px-[23px]">
                    <span className="text-xs font-medium leading-[14px] text-[#F9FAFD]">{row.original.type}</span>
                </div>
            );
        },
    },
    {
        id: "form",
        header: () => <div className="ml-[-70px] ">Form</div>,
       
        cell: ({ row }) => {
            return (
                <div className="w-[175px] h-[38px] flex items-center justify-center gap-[2px]">
                    <span className="text-base font-medium leading-[19px] text-[#444444] text-center">{row.original.form}</span>
                </div>
            );
        },
    },
    {
        id: "date",
        header: () => <div className="ml-[-90px] ">Date</div>,
        cell: ({ row }) => {
            return (
                <div className="w-[175px] h-[38px] flex items-center justify-center gap-[2px]">
                    <span className="text-base font-medium leading-[19px] text-[#444444] text-center">{row.original.date}</span>
                </div>
            );
        },
    },
    {
        id: "actions",
        header: () => <div className="ml-[-10px] ">Actions</div>,
       
        cell: () => {
            return (
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="cursor-default h-8 w-8 p-0 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0">
                                <MoreHorizontal className="h-4 w-4 " />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-white h-auto w-[110px] rounded-lg shadow-[4px_4px_8px_0px_#0000000D,-4px_-4px_8px_0px_#0000000D]">
                            <DropdownMenuItem className="p-[8px] text-gradient rounded-b-[8px] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 cursor-default text-left" >Mark as seen</DropdownMenuItem>
                            <DropdownMenuItem className="p-[8px] text-red-600 hover:bg-[#E6EEF6] rounded-b-[8px] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 cursor-default text-left" >Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            );
        },
    }
];