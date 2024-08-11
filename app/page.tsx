"use client";
import { use, useDebugValue, useEffect, useState } from "react";
import { useUtility } from "./provider/UtilityProvider";
import { FaRegCheckCircle, FaUsers } from "react-icons/fa";
import { RiFilePaper2Fill } from "react-icons/ri";
import { GiPapers } from "react-icons/gi";
import { FaTag } from "react-icons/fa";
import { PiCardsFill } from "react-icons/pi";
import {
	AccountOperation,
	FlashCardOperation,
	PracticeOperation,
	TagOperation,
	TestOperation,
	UploadOperation,
} from "./lib/main";
import { useAuth } from "./provider/AuthProvider";
import { FaCircleUser } from "react-icons/fa6";
import { UserInformation } from "./interface/user/user";
import { FiXCircle } from "react-icons/fi";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import { FetchingType, SearchPayload } from "./lib/interfaces";
import Link from "next/link";
import {
	getAccountPrivilege,
	getRoleFromRoleInfor,
} from "./interface/privilegeconfig/privilegeconfig";
import { Test } from "./interface/test/test";
import { getSid } from "./interface/cookies/cookies";
import { IoMdRefresh } from "react-icons/io";

export default function Home() {
	const { userInformation, privilage } = useAuth();
	const { setSuccess, setError } = useUtility();

	const [numberOfUsers, setNumberOfUsers] = useState<number>(0);
	const [numberOfTests, setNumberOfTests] = useState<number>(0);
	const [numberOfPractices, setNumberOfPractices] = useState<number>(0);
	const [numberOfTags, setNumberOfTags] = useState<number>(0);
	const [numberOfFlashcards, setNumberOfFlashcards] = useState<number>(0);

	const hasUserPrivilege = getAccountPrivilege(
		getRoleFromRoleInfor(userInformation.roles),
		"search",
		privilage
	);

	useEffect(() => {
		if (hasUserPrivilege) {
			const accountOperation = new AccountOperation();
			accountOperation.count(getSid()).then((res) => {
				if (res.success) {
					setNumberOfUsers(res.data);
				} else {
					setError(res.message);
				}
			});
		}
	}, [userInformation, privilage]);

	useEffect(() => {
		const testOperation = new TestOperation();
		const practiceOperation = new PracticeOperation();
		const tagOperation = new TagOperation();
		const flashcardOperation = new FlashCardOperation();

		testOperation.count(getSid()).then((res) => {
			if (res.success) {
				setNumberOfTests(res.data);
			} else {
				setError(res.message);
			}
		});

		practiceOperation.count(getSid()).then((res) => {
			if (res.success) {
				setNumberOfPractices(res.data);
			} else {
				setError(res.message);
			}
		});

		tagOperation.count(getSid()).then((res) => {
			if (res.success) {
				setNumberOfTags(res.data);
			} else {
				setError(res.message);
			}
		});

		flashcardOperation.count(getSid()).then((res) => {
			if (res.success) {
				setNumberOfFlashcards(res.data);
			} else {
				setError(res.message);
			}
		});
	}, []);

	return (
		<main className="flex justify-center flex-1 py-4 h-fit">
			<div className="w-11/12 h-full flex flex-col gap-4 items-center">
				<h1 className="w-full h-fit flex flex-row gap-4">
					<span className="text-4xl font-bold text-pot-black dark:text-gray-200">
						Dashboard
					</span>
				</h1>
				<div className="w-full flex flex-row gap-4 mb-8">
					<div className="w-1/5 h-fit py-4 px-2 rounded-md flex flex-row items-center justify-center bg-white dark:bg-pot-black shadow-md gap-4 flex-wrap">
						<div className="w-fit h-fit p-2 rounded-md bg-foreground-blue dark:bg-foreground-red text-white">
							<FaUsers className="size-10" />
						</div>
						<div className="w-1/2 h-fit flex flex-col gap-1 items-center">
							<span className="text-base text-zinc-500">
								Users
							</span>
							<span className="text-xl font-bold">
								{numberOfUsers}
							</span>
						</div>
					</div>
					<div className="w-1/5 h-fit py-4 px-2 rounded-md flex flex-row items-center justify-center bg-white dark:bg-pot-black shadow-md gap-4 flex-wrap">
						<div className="w-fit h-fit p-2 rounded-md bg-foreground-blue dark:bg-foreground-red text-white">
							<RiFilePaper2Fill className="size-10" />
						</div>
						<div className="w-1/2 h-fit flex flex-col gap-1 items-center">
							<span className="text-base text-zinc-500">
								Tests
							</span>
							<span className="text-xl font-bold">
								{numberOfTests - numberOfPractices}
							</span>
						</div>
					</div>
					<div className="w-1/5 h-fit py-4 px-2 rounded-md flex flex-row items-center justify-center bg-white dark:bg-pot-black shadow-md gap-4 flex-wrap">
						<div className="w-fit h-fit p-2 rounded-md bg-foreground-blue dark:bg-foreground-red text-white">
							<GiPapers className="size-10" />
						</div>
						<div className="w-1/2 h-fit flex flex-col gap-1 items-center">
							<span className="text-base text-zinc-500">
								Practice
							</span>
							<span className="text-xl font-bold">
								{numberOfPractices}
							</span>
						</div>
					</div>
					<div className="w-1/5 h-fit py-4 px-2 rounded-md flex flex-row items-center justify-center bg-white dark:bg-pot-black shadow-md gap-4 flex-wrap">
						<div className="w-fit h-fit p-3 rounded-md bg-foreground-blue dark:bg-foreground-red text-white">
							<FaTag className="size-8" />
						</div>
						<div className="w-1/2 h-fit flex flex-col gap-1 items-center">
							<span className="text-base text-zinc-500">
								Tags
							</span>
							<span className="text-xl font-bold">
								{numberOfTags}
							</span>
						</div>
					</div>
					<div className="w-1/5 h-fit py-4 px-2 rounded-md flex flex-row items-center justify-center bg-white dark:bg-pot-black shadow-md gap-4 flex-wrap">
						<div className="w-fit h-fit p-2 rounded-md bg-foreground-blue dark:bg-foreground-red text-white">
							<PiCardsFill className="size-10" />
						</div>
						<div className="w-1/2 h-fit flex flex-col gap-1 items-center">
							<span className="text-base text-zinc-500">
								Flashcards
							</span>
							<span className="text-xl font-bold">
								{numberOfFlashcards}
							</span>
						</div>
					</div>
				</div>

				{hasUserPrivilege ? (
					<div className="w-4/5 h-fit flex-col">
						<UserList />
					</div>
				) : (
					<div className="w-4/5 h-fit flex-col">
						<TestList />
					</div>
				)}
			</div>
		</main>
	);
}

function UserList() {
	const { setError } = useUtility();
	const [userList, setUserList] = useState<UserInformation[]>([]);
	const [avatarList, setAvatarList] = useState<string[]>(
		new Array(6).fill("/images/user.png")
	);
	const [loading, setLoading] = useState<boolean>(true);

	const refresh = () => {
		setLoading(true);
		setTimeout(() => {
			search();
		}, 100);
	};

	useEffect(() => {
		search();
	}, []);

	const search = () => {
		const accountOperation = new AccountOperation();

		const searchPayload: SearchPayload = {
			criteria: [],
			addition: {
				sort: [["createdAt", "DESC"]],
				page: 1,
				size: 6,
				group: null,
			},
		};

		accountOperation.search(searchPayload, getSid()).then((res) => {
			if (res.success) {
				const userInforList = res.data as UserInformation[];
				userInforList.sort((a, b) => {
					if (a.createdAt > b.createdAt) {
						return -1;
					}
					if (a.createdAt < b.createdAt) {
						return 1;
					}
					return 0;
				});
				const newUploadOperation = new UploadOperation();
				userInforList.forEach((user, index) => {
					if (user.avatar) {
						newUploadOperation
							.search(user.avatar, getSid())
							.then((res) => {
								if (res.success) {
									const newAvatarList = [...avatarList];
									newAvatarList[index] = res.data;
									setAvatarList(newAvatarList);
								} else {
									const newAvatarList = [...avatarList];
									newAvatarList[index] = "/images/user.png";
									setAvatarList(newAvatarList);
								}
							});
					}
				});
				setUserList(userInforList);
			} else {
				setError(res.message);
			}
			setLoading(false);
		});
	};

	if (!userList) return null;

	return (
		<div className="flex flex-col items-center w-full px-4 pt-2 pb-4  bg-white border rounded-md shadow-sm drop-shadow-md dark:border-pot-black min-h-[434px] dark:bg-pot-black">
			<div className="w-full p-2 flex flex-row items-start justify-between">
				<h1 className="text-2xl font-bold">New Users</h1>
				<Link
					href="/management/users"
					className="text-sm font-medium text-blue-500 dark:text-blue-300 hover:underline">
					{"See all >>"}
				</Link>
			</div>
			<div className="flex flex-row items-center w-full gap-2 py-2 font-medium text-gray-400 h-fit">
				<div className="w-[7%] flex justify-center items-center"></div>
				<div className="w-[38%]">Name</div>
				<div className="w-[40%]">Email</div>
				<div className="w-[5%] text-center">Active</div>
				<div className="w-[5%]">
					<IoMdRefresh
						onClick={() => refresh()}
						className="rounded-md size-6 hover:bg-gray-100 dark:hover:bg-gray-22"
					/>
				</div>
			</div>
			<hr className="w-full my-1 border border-gray-200 dark:border-gray-400" />

			{!loading ? (
				<div className="flex flex-col items-center w-full h-fit">
					{userList.map((user, index) => (
						<div
							key={user.id}
							className="flex flex-row items-center w-full gap-2 py-2 text-sm text-gray-600 bg-white rounded-md cursor-default dark:text-gray-200 h-fit dark:bg-pot-black dark:hover:bg-black-night group hover:shadow-md hover:z-10">
							<div className="w-[7%] flex justify-center items-center">
								<img
									src={avatarList[index]}
									className="size-10 rounded-full"
									alt="user-avatar"
								/>
							</div>
							<div className="w-[38%] flex flex-col">
								<span className="text-base font-semibold">
									{user.lastName + " " + user.firstName}
								</span>
								<span className="text-zinc-400 dark:text-gray-400">
									@{user.username}
								</span>
							</div>
							<div className="w-[40%] font-semibold">
								{user.email}
							</div>
							<div className="w-[5%] flex items-center justify-center">
								{user.active ? (
									<FaRegCheckCircle className="text-green-500 size-5" />
								) : (
									<FiXCircle className="text-red-500 size-5" />
								)}
							</div>
							<div className="w-[5%]"></div>
						</div>
					))}
				</div>
			) : (
				<div className="flex flex-col items-center justify-center flex-1">
					<LoadingSpinner size={2} />
				</div>
			)}
		</div>
	);
}

function TestList() {
	const [testList, setTestList] = useState<Test[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		const testOperation = new TestOperation();
		let searchPayload: SearchPayload = {
			criteria: [],
			addition: {
				sort: [],
				page: 1,
				size: 6,
				group: null,
			},
		};
		testOperation
			.search(FetchingType.FULL, "" as any, searchPayload, getSid())
			.then((res) => {
				if (res.success) {
					setTestList(res.data);
				}
				setIsLoading(false);
			});
	});

	if (isLoading) {
		return (
			<div className="flex flex-col items-center justify-center flex-1">
				<LoadingSpinner size={2} />
			</div>
		);
	}

	return (
		<div className="flex flex-col items-center w-full px-4 pt-2 pb-4  bg-white border rounded-md shadow-sm drop-shadow-md dark:border-pot-black min-h-[430px] dark:bg-pot-black">
			<div className="w-full p-2 flex flex-row items-start justify-between">
				<h1 className="text-2xl font-bold">New Tests & Practices</h1>
				<Link
					href="/management/ielts"
					className="text-sm font-medium text-blue-500 dark:text-blue-300 hover:underline">
					{"See all >>"}
				</Link>
			</div>
			<div className="flex flex-row items-center w-full gap-2 py-2 font-medium text-gray-400 h-fit">
				<div className="w-[3%]"></div>
				<div className="w-[30%]">Name</div>
				<div className="w-[42%]">ID</div>
				<div className="w-[10%]">Created At</div>
				<div className="w-[10%]">Updated At</div>
				<div className="w-[5%]"></div>
			</div>
			<hr className="w-full my-1 border border-gray-200 dark:border-gray-400" />
			{testList.map((test, index) => {
				return (
					<div
						key={test.id + index}
						className="flex flex-row items-center w-full gap-2 py-2 text-sm text-gray-600 bg-white rounded-md cursor-default dark:text-gray-200 h-fit dark:bg-pot-black dark:hover:bg-black-night group hover:shadow-md hover:z-10">
						<div className="w-[3%]"></div>
						<div className="w-[30%]">
							<span className="text-base font-semibold">
								{test.name}
							</span>
						</div>
						<div className="w-[42%]">
							<span className="text-base font-semibold">
								{test.id}
							</span>
						</div>
						<div className="w-[10%] flex flex-col">
							<span className="text-base font-semibold">
								{new Date(test.createdAt).toLocaleDateString()}
							</span>
							<span className="text-xs">
								{
									new Date(test.createdAt)
										.toTimeString()
										.split(" ")[0]
								}
							</span>
						</div>
						<div className="w-[10%] flex flex-col">
							<span className="text-base font-semibold">
								{new Date(test.updatedAt).toLocaleDateString()}
							</span>
							<span className="text-xs ">
								{
									new Date(test.updatedAt)
										.toTimeString()
										.split(" ")[0]
								}
							</span>
						</div>
						<div className="w-[5%]"></div>
					</div>
				);
			})}
		</div>
	);
}
