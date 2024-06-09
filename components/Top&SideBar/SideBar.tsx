"use client"
import { useState } from "react";
import Side from "./Side";
import {
  School,
  People,
  PendingActions,
  LocalShipping,
  MapsHomeWork,
  AddCircle,
} from "@mui/icons-material";
const SideItemData = [
	{
		id: 0,
		title: "Tạo bài thi",
		icon: <AddCircle className="scale-75 lg:block" />,
		submenus: [
			{
				id: 1,
				title: "Listening",
				url: "/management/listening",
				icon: <People className="scale-75 lg:block" />,
			},
			{
				id: 2,
				title: "Reading",
				url: "/management/reading",
				icon: <PendingActions className="scale-75 lg:block" />,
			},
			{
				id: 3,
				title: "Writing",
				url: "/management/writing",
				icon: <LocalShipping className="scale-75 lg:block" />,
			},
			{
				id: 4,
				title: "Speaking",
				url: "/management/speaking",
				icon: <MapsHomeWork className="scale-75 lg:block" />,
			},
		]
	},
	{
		id: 1,
		title: "Quản lý học viên",
		icon: <School className="scale-75 lg:block" />,
		url: "/student"
	},
];
export default function SideBar({ toggleCollapseMobile }) {
  const [dropdown, Setdropdown] = useState(false);
  return (
    <Side
      menuItems={SideItemData}
      toggleCollapseMobile={toggleCollapseMobile}
    />
  );
}
