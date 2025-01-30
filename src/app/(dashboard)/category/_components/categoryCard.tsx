import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import { useState } from "react";
import Modal from "@/components/shared/modal/modal";

interface CategoryCardProps {
  title: string;
  imageUrl: string;
  onEdit: () => void;
  onDelete: () => void;
}

export function CategoryCard({ title, imageUrl }: CategoryCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleModal = () => {
    setIsOpen(true); // Show the modal when "Log out" is clicked
  };

  return (
    <div>
      <Card className="">
        <CardContent className=" pt-4 ">
          <div className="aspect-square relative mb-3 ">
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover w-[306px] h-[270px]"
            />
          </div>
          <h3 className="text-center text-lg font-medium">{title}</h3>
        </CardContent>
        <CardFooter className="grid grid-cols-2 gap-2 ">
          <Button
            variant="default"
            className="w-full bg-[#1a237e] hover:bg-[#0d47a1]"
          >
            Edit
          </Button>

          <Button
            onClick={() => {
              {
                handleModal();
              }
            }}
            variant="outline"
            className="w-full"
          >
            Delete
          </Button>
        </CardFooter>
      </Card>
      {isOpen && (
        <Modal>
          <div className="flex justify-center pt-[24px]">
            <Image
              src="/assets/img/logo.png"
              alt="Modal"
              width={205}
              height={205}
              className=" object-cover"
            />
          </div>
          <h2 className="text-[36px] text-[#333333]  font-bold text-center mt-3">
            PACIFIC RIM FUSION
          </h2>
          <h3 className="text-[32px]  text-gradient  font-bold text-center leading-[38.4px] mt-3">
            Are You Sure To Delete this Category?
          </h3>
          <p className="text-[26px] text-[#102011] font-normal text-center mt-3">
            Keep shopping with Rim Fusion.
          </p>
          <div className="flex justify-center mt-[50px]">
            <button className="w-full border-[1px] border-[#4857BD] py-[18px] text-base text-gradient font-semibold rounded-[8px] ">
              Yes
            </button>
          </div>
          <div className="mt-[20px]">
            <button
              onClick={() => setIsOpen(false)}
              className="w-full bg-primary border-[1px]  py-[18px] text-base text-[#FFFFFF] font-semibold rounded-[8px]  "
            >
              NO
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
