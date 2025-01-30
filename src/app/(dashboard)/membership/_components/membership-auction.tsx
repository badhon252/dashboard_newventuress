import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, MoveRight } from "lucide-react";
import { useState } from "react";
import EmailSendingForm from "./email-sending-form";

const MembershipAction = () => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen((p) => !p);
  };
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="bg-white h-auto w-[110px] rounded-lg shadow-[4px_4px_8px_0px_#0000000D,-4px_-4px_8px_0px_#0000000D]"
        >
          <DropdownMenuItem
            className="p-[8px] hover:bg-[#E6EEF6] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            onClick={handleToggle}
          >
            Send Email
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {open && (
        <AlertDialog open={open} onOpenChange={handleToggle}>
          <AlertDialogTitle />
          <AlertDialogContent className="p-0  shadow-[0px_0px_22px_6px_#C1C9E4] rounded-[16px] min-w-[700px]">
            <div className="w-full h-[78px] bg-primary rounded-t-[16px] flex items-center justify-between  px-[32px]">
              <p className="text-white text-[32px] leading-[38.4px] ">
                Send Email
              </p>
              <Button
                onClick={handleToggle}
                className="bg-[#FFFFFF] text-[#121D42] hover:bg-white/90 transition-colors duration-300"
              >
                Back to List <MoveRight />
              </Button>
            </div>
            <div className="bg-white px-[32px]  rounded-b-[16px]">
              <EmailSendingForm />
            </div>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

export default MembershipAction;
