"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import DetailStaff from "./detailStaff";
import { Checkbox } from "@/components/TableUI/checkbox";
// Đảm bảo gọi hàm này ở đầu ứng dụng của bạn\

export type student = {
  active: boolean;
  agency_id: string;
  avatar: string;
  bank: string;
  bin: string;
  cccd: string;
  date_of_birth: string;
  deposit: number;
  detail_address: string;
  district: string;
  email: string;
  fullname: string;
  student_id: number;
  paid_salary: number;
  password: string;
  phone_number: string;
  position: string;
  privileges: string[];
  province: string;
  role: string;
  salary: number;
  staff_id: string;
  town: string;
  username: string;
};
type MyColumnDef<T> = ColumnDef<T> & {
  reloadData?: () => void;
};
export async function columns(
  reloadData: () => void,
): Promise<MyColumnDef<any>[]> {
  return [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() ? "indeterminate" : false)
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "id",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              ID
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
      },
      {
        accessorKey: "from",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Học sinh đã nộp
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
      },
      {
        accessorKey: "class",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
             Giáo viên
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
      },
      {
        accessorKey: "date_submit",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
             Ngày nộp
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          const formatter = new Intl.DateTimeFormat("vi-VN", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            timeZone: "Asia/Ho_Chi_Minh",
          });
          return (
            <div>             
              {formatter.format(new Date(row.original.date_submit))}
            </div>
          );
        },
      },
      {
        accessorKey: "Chi tiết/Sửa đổi",
        header: () => {
          return "Chi tiết/sửa đổi";
        },
        cell: ({ row }) => {
          const [modalIsOpen, setModalIsOpen] = useState(false);

          const openModal = () => {
            setModalIsOpen(true);
          };

          const closeModal = () => {
            setModalIsOpen(false);
          };

          return (
            <div className="relative flex  mr-2">
              <Button
                onClick={openModal}
                className="bg-transparent hover:bg-white font-bold hover:text-black py-1 px-[0.65rem] border border-gray-600 hover:border-transparent rounded-full"
              >
                +
              </Button>
              {modalIsOpen && (
                <DetailStaff onClose={closeModal} dataInitial={row.original} reload={reloadData} />
              )}
            </div>
          );
        },
      }
    ]
}