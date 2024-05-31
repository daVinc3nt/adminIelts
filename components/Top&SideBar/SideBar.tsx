"use client"
import { useState } from "react";
import Side from "./Side";
import {
  ReceiptLong,
  Inventory,
  Assistant,
  People,
  PendingActions,
  LocalShipping,
  BusinessCenter,
  MapsHomeWork,
  Handshake,
  AccountBox,
  TaskAlt,
} from "@mui/icons-material";
import { FormattedMessage } from "react-intl";
const SideItemData = [
	{
		id: 0,
		title: "Tạo bài thi",
		icon: <Assistant className="scale-75 lg:block" />,
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
				title: "Writting",
				url: "/",
				icon: <LocalShipping className="scale-75 lg:block" />,
			},
			{
				id: 4,
				title: "Speaking",
				url: "/",
				icon: <MapsHomeWork className="scale-75 lg:block" />,
			},
		],
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
