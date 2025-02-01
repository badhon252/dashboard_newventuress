import { ReactNode } from "react";

const DeleteModal = ({ children }: { children: ReactNode }) => {

  return (
    <section className="fixed inset-0 w-full h-full flex justify-center items-center bg-black bg-opacity-60  z-50">
      <div className="w-[533px]  bg-white rounded-[16px] px-[25px] pb-[25px]  ">
        {/* Content */}
        <div className="relative z-10">{children}</div>
      </div>
    </section>
  );
};
export default DeleteModal;