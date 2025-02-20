"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

export default function AjaxBidding() {
  const [settings, setSettings] = useState({
    instantBidding: false,
    realTimeAuction: false,
    getBidAmount: false,
    enableShopPage: false,
    enableCategoryPage: false,
    enableDetailPage: false,
    checkInterval: "1"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle saving settings
    console.log("Saving settings:", settings);
  };

  return (
   <div className="pb-[30px]">
     <div className="w-full bg-white p-[32px] rounded-3xl ">
      {/* Header */}
      <div className="bg-primary p-6 rounded-t-3xl">
        <h1 className="text-2xl text-white">Ajax Bidding</h1>
      </div>

      {/* Content */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl border border-[#C5C5C5] mt-[30px]"
      >
        <div className="p-6 space-y-8 text-[#444444] text-[16px] font-medium">
          {/* Instant Bidding Section */}
          <div className="flex justify-between items-start">
            <h2 className="text-[#444444] text-[16px] font-medium">
              Instant Bidding
            </h2>
            <div className="flex items-center gap-2">
              <Checkbox
                id="instantBidding"
                checked={settings.instantBidding}
                onCheckedChange={checked =>
                  setSettings(prev => ({
                    ...prev,
                    instantBidding: checked as boolean
                  }))}
              />
              <span className="text-[#444444] text-[16px] font-normal">
                By enabling this setting, bids will be placed without page
                refresh.
              </span>
            </div>
          </div>

          {/* Real Time Auction Information */}
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <h2 className="text-[#444444] text-[16px] font-medium">
                Real Time Auction Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="realTimeAuction"
                    checked={settings.realTimeAuction}
                    onCheckedChange={checked =>
                      setSettings(prev => ({
                        ...prev,
                        realTimeAuction: checked as boolean
                      }))}
                  />
                  <span className="text-[#444444] text-[16px] font-normal">
                    By enabling this setting, bids will be placed without page
                    refresh.
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="getBidAmount"
                    checked={settings.getBidAmount}
                    onCheckedChange={checked =>
                      setSettings(prev => ({
                        ...prev,
                        getBidAmount: checked as boolean
                      }))}
                  />
                  <span className="text-[#444444] text-[16px] font-normal">
                    Get Bid amount information instantly without page refresh.
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="enableShopPage"
                    checked={settings.enableShopPage}
                    onCheckedChange={checked =>
                      setSettings(prev => ({
                        ...prev,
                        enableShopPage: checked as boolean
                      }))}
                  />
                  <span className="text-[#444444] text-[16px] font-normal">
                    Enable on shop page
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="enableCategoryPage"
                    checked={settings.enableCategoryPage}
                    onCheckedChange={checked =>
                      setSettings(prev => ({
                        ...prev,
                        enableCategoryPage: checked as boolean
                      }))}
                  />
                  <span className="text-[#444444] text-[16px] font-normal">
                    Enable on product category page
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="enableDetailPage"
                    checked={settings.enableDetailPage}
                    onCheckedChange={checked =>
                      setSettings(prev => ({
                        ...prev,
                        enableDetailPage: checked as boolean
                      }))}
                  />
                  <span className="text-[#444444] text-[16px] font-normal">
                    Enable on auction product detail page
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Check Bidding Information */}
          <div className="flex justify-start items-center">
            <h2 className="text-[#444444] text-[16px] font-medium mr-20">
              Check Bidding <br/> Information
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-[#444444] text-[16px] font-medium">
                In every
              </span>
              <Input
                type="number"
                value={settings.checkInterval}
                onChange={e =>
                  setSettings(prev => ({
                    ...prev,
                    checkInterval: e.target.value
                  }))}
                className="w-[50px] h-[28px] text-center"
                min="1"
              />
              <span className="text-[#444444] text-[16px] font-medium">
                Seconds
              </span>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end p-4">
          <Button type="submit" className="">
            Save changes
          </Button>
        </div>
      </form>
    </div>
   </div>
  );
}
