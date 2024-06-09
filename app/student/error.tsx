'use client'
import { Player } from "@lottiefiles/react-lottie-player";
import Image from "next/image";
import Link from "next/link";
export default function error() {
    return (
        <div className="w-full h-screen flex flex-col gap-4 justify-center place-items-center  ">
            <div className="w-fit h-fit p-20 gap-10 items-center justìy-center  flex flex-col border-4 border-gray-400 rounded-xl">
                <Player
                    src='/animation/error.json'
                    loop
                    autoplay
                    className="md:block hidden"
                    style={{ height: '200px', width: '200px' }}
                    rendererSettings={{
                        preserveAspectRatio: "xMidYMid slice",
                    }}
                    data-aos="fade-left"
                />
                <span className="text-5xl font-bold text-gray-400">
                    Uầy! Hình như đã có lỗi gì đó rồi.
                </span>
                <Link
                    href="/"
                    className="h-fit w-fit p-4 bg-red-500 text-white font-bold rounded-full active:scale-125 duration-300 ease-in-out"
                >
                    Thử lại
                </Link>
            </div>
        </div>
    );
}