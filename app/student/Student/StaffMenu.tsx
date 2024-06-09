"use client"
import React, { useCallback } from "react";
import { useState, useEffect } from "react";
import DemoPage from "./Table/export";
import LoadingSkeleton from "@/components/LoadingSkeleton/loadingSkeleton";
const StaffMenu = () => {
  const [demoPage, setDemoPage] = useState(<LoadingSkeleton />);
  const fetchDemoPage = async () => {
      const result = await DemoPage(reloadData);
      setDemoPage(result);
      console.log("đã gọi lại bảng")
  };
  const reloadData = useCallback(() => {
      fetchDemoPage();
    }, []);
  useEffect(() => {
      fetchDemoPage();
    }, []);
  return (
    <div className="h-full content-center overflow-y-hidden flex flex-col w-full">
      <div className="h-full  items-center w-full left-0 right-0 overflow-y-scroll no-scrollbar">
        <section className="p-2 flex justify-center">
          <div className="container shadow-sm rounded-xl px-3 bg-white ">
            <div className="relative text-3xl font-bold border-b-[1px] border-gray-600">
              <div className=" font-bold text-xl sm:text-3xl pt-3 pb-2 text-center">
                {/* <FormattedMessage id="student.Title" /> */} Học sinh đã đăng ký
              </div>
            </div>
            <div className="w-full">{demoPage}</div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default StaffMenu;
