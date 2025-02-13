import Image from "next/image";
import { Star } from "lucide-react";

interface ProductReviewProps {
  image: string;
  title: string;
  reviewer: string;
  rating: number;
}

export default function ProductReview({
  title,
  reviewer,
  rating,
}: ProductReviewProps) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-lg max-w-md">
      <div className="relative w-[100px] h-[80px] 2xl:w-[142px] 2xl:h-[110px] shrink-0">
        <Image
          src="/assets/img/reviewProduct.png"
          alt={title}
          fill
          className="object-cover rounded-lg"
        />
      </div>
      <div className="min-w-0">
        <div className="flex gap-0.5 mb-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < rating
                  ? "fill-[#FF8A00] text-[#FF8A00]"
                  : "fill-[#CCCCCC] text-[#CCCCCC]"
              }`}
            />
          ))}
        </div>
        <h3 className="text-[18px] font-semibold truncate my-2">{title}</h3>
        <p className="text-[16px] text-[#444444] truncate">{reviewer}</p>
      </div>
    </div>
  );
}