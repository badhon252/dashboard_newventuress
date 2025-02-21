import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

interface SkeletonWrapperProps {
  width?: string;
  height?: string;
  className?: string;
  count?: number;
}

const SkeletonWrapper: React.FC<SkeletonWrapperProps> = ({
  width = "100%", 
  height = "200px", 
  className = "", 
  count = 1
}) => {
  return (
    <div className="flex flex-col gap-4">
      {[...Array(count)].map((_, index) => (
        <Skeleton 
          key={index} 
          className={`rounded-lg bg-white ${className}`} 
          style={{ width, height }} 
        />
      ))}
    </div>
  );
};

export default SkeletonWrapper;
