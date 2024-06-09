"use client";
import React, { useEffect } from "react";
import { TbMinusVertical } from "react-icons/tb";
import { useState } from "react";
import AddStaff from "./AddStaff/addstaff";
import {
  ColumnDef,
  SortingState,
  flexRender,
  ColumnFiltersState,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/TableUI/table";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import Filter from "@/components/Common/Filters";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

import BasicPopover from "@/components/Common/Popover";
import AddFile from "./AddStaff/addNoti2";
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  reload: any;
}
const validValue = ["AGENCY_MANAGER","AGENCY_HUMAN_RESOURCE_MANAGER", "ADMIN", "HUMAN_RESOURCE_MANAGER"]
// const student = new StudentOperation()

export function DataTable<TData, TValue>({
  columns,
  data,
  reload
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpen2, setModalIsOpen2] = React.useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };
  const openModal2 = () => {
    setModalIsOpen2(true);
  };
  const closeModal2 = () => {
    setModalIsOpen2(false);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
  const paginationButtons = [];
  for (let i = 0; i < table.getPageCount(); i++) {
    paginationButtons.push(
      <Button key={i} onClick={() => table.setPageIndex(i)}>
        {i + 1}
      </Button>
    );
  }

  const handleDeleteRowsSelected = async () => {
    // table.getFilteredSelectedRowModel().rows.forEach(async (row) => {
    //   console.log();
    //   const condition:  StudentID = {
    //     student_id: (row.original as any).student_id,
    //   };
    //   const myToken: token = {
    //     token: cookie.get("token"),
    //   };
    //   const res = await student.delete(condition, myToken);
    //   if (res.error) {
    //     alert(res.error.message);
    //     return;
    //   }
    //   alert(res.message);
    //   reload();
    // });
  };
  const confirmDelete = () => {
    return window.confirm("Are you sure you want to delete?");
  };
  const deleteRows = () => {
    // Gọi hàm confirmDelete và lưu kết quả vào biến result
    const result = confirmDelete();
    // Nếu result là true, tức là người dùng nhấn yes
    if (result) {
      // Gọi hàm handleDeleteRowsSelected để xóa các hàng đã chọn
      handleDeleteRowsSelected();
    }
    // Nếu result là false, tức là người dùng nhấn no
    else {
      // Không làm gì cả
    }
  };
  return (
    <div>
      <div className="flex items-center py-4">
        <div className="w-full flex flex-col sm:flex-row">
          <div className="relative w-full gap-2 sm:w-1/2 lg:w-1/3 flex">
            <input
              id="staffSearch"
              type="text"
              value={
                (table.getColumn("fullname")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("fullname")?.setFilterValue(event.target.value)
              }
              className={`peer h-10 self-center w-full border border-gray-600 rounded focus:outline-none focus:border-blue-500 truncate bg-transparent
                    text-left placeholder-transparent pl-3 pt-2 pr-12 text-sm text-white`}
              placeholder=""
            />
            <label
              htmlFor="staffSearch"
              className={`absolute left-3 -top-0 text-xxs leading-5 text-gray-500 transition-all 
                    peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2.5 
                    peer-focus:-top-0.5 peer-focus:leading-5 peer-focus:text-blue-500 peer-focus:text-xxs`}
            >
              Tìm kiếm
            </label>
            <Dropdown className="z-30">
              <DropdownTrigger>
                <Button
                  className="text-xs md:text-base border border-gray-600 rounded w-32"
                  aria-label="Show items per page"
                >
                  Show {table.getState().pagination.pageSize}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                className="bg-[#1a1b23] border border-gray-300 rounded w-32"
                aria-labelledby="dropdownMenuButton"
              >
                {[10, 20, 30, 40, 50].map((pageSize, index) => (
                  <DropdownItem
                    key={pageSize}
                    textValue={`Show ${pageSize} items per page`}
                  >
                    <Button
                      onClick={() => table.setPageSize(pageSize)}
                      variant="bordered"
                      aria-label={`Show ${pageSize}`}
                      className="text-center  text-white w-full"
                    >
                      Show {pageSize}
                    </Button>
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
          <div className="flex-grow h-10 flex mt-4 sm:mt-0 justify-center sm:justify-end">
            <Dropdown className=" z-30 ">
              <DropdownTrigger>
                <Button
                  className="text-xs md:text-base border border-gray-600 rounded ml-2 w-36 h-10 text-center"
                  aria-label="Show items per page"
                >
                  Thêm
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                className=" bg-white border border-gray-300 rounded w-26"
                aria-labelledby="dropdownMenuButton"
              >
                <DropdownItem>
                  <Button
                    className="text-center   w-36"
                    onClick={openModal}
                  >
                    Thêm
                  </Button>
                </DropdownItem>
                <DropdownItem>
                  <Button
                    className="text-center w-36"
                    onClick={openModal2}
                  >
                    Thêm hàng loạt
                  </Button>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
              {modalIsOpen &&<AddStaff onClose={closeModal} reload={reload}/>}
              {modalIsOpen2 && ( <AddFile onClose={closeModal2} reloadData={reload} />)}
          </div>
        </div>
      </div>
      <div className="rounded-md h-fit overflow-y-scroll no-scrollbar border border-gray-700">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-gray-700">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className={`border-gray-700 ${
                    row.getIsSelected() ? "bg-blue-300" : ""
                  }`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="relative  flex items-center justify-center space-x-2 py-4">
        <Button
          className={`text-xs md:text-sm justify-self-start rounded-lg border
           border-gray-600 px-4 py-2 bg-transparent hover:bg-gray-700 
           hover:text-white hover:shadow-md focus:outline-none font-normal text-black 
          ${
            table.getFilteredSelectedRowModel().rows.length > 0
              ? "border-red-500"
              : "border-gray-600"
          }`}
          onClick={deleteRows}
        >
          Xoá {" "}
          {table.getFilteredSelectedRowModel().rows.length}/
          {table.getFilteredRowModel().rows.length}
        </Button>
        <Button
          variant="light"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="px-2 py-[0.15rem] mb-0.5 w-12 sm:w-16 bg-transparent 
          drop-shadow-md hover:drop-shadow-xl hover:bg-opacity-30 hover:text-white border border-black hover:bg-black text-black
          hover:shadow-md md:text-base focus:outline-none font-normal
          rounded-md text-sm text-center me-2"
        >
          <span>
            {/* <FormattedMessage id="prev" /> */} Trước
          </span>
        </Button>
        <span className="flex items-center gap-1">
          <div className="text-xs md:text-base">
            {/* <FormattedMessage id="page" /> */} Sau
          </div>
          <strong className="text-xs md:text-base whitespace-nowrap">
            {table.getState().pagination.pageIndex + 1}{" "}
            {/* <FormattedMessage id="of" /> {table.getPageCount()} */} trên
          </strong>
        </span>
        <TbMinusVertical className="text-xl text-gray-700" />
        <span className="flex items-center gap-1 text-xs md:text-base whitespace-nowrap">
          {/* <FormattedMessage id="gotopage" /> */} Đến trang

          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="border border-gray-500 px-1 py-0.5 rounded w-8 sm:w-16 bg-transparent"
          />
        </span>
        <Button
          variant="light"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="px-2 py-[0.15rem] mb-0.5 w-12 sm:w-16 bg-transparent 
          drop-shadow-md hover:drop-shadow-xl hover:bg-opacity-30 hover:text-white 
          border border-black  hover:bg-black text-black
          hover:shadow-md md:text-base focus:outline-none font-normal
          rounded-md text-sm text-center me-2"
        >
          <span>
            {/* <FormattedMessage id="next" /> */} Kế tiếp
          </span>
        </Button>
      </div>
    </div>
  );
}
