import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import Image from "next/image";
interface MetricCardProps {
  title: string;
  amount: number;
  icon: string;
  className?: string;
}
const OverViewCard = ({ title, amount, icon }: MetricCardProps) => {
  return (
    <div className="w-full">
      <Card className="  p-0   ">
        <CardContent className="flex items-center gap-[20px] p-4 ">
          <Image
            className=""
            src={icon}
            width={80}
            height={80}
            alt="Picture of the author"
          />

          <div className="space-y-1">
            <p className="text-[20px] font-medium text-[#444444]">
              {title}
            </p>
            <p className="text-[25px] text-[#1A1A1A] font-semibold">
              $ {amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverViewCard;
