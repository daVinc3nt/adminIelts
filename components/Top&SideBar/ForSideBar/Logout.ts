"use client"
import {  useRouter } from "next/navigation";
export function Logout(router: any){
    const confirmDelete = () => {
        return window.confirm("Bạn có muốn là thoát phiên đăng nhập không?");
    };

    // Gọi hàm confirmDelete và lưu kết quả vào biến result
    const result = confirmDelete();
    // Nếu result là true, tức là người dùng nhấn yes
    if (result) {
        router.push("/log")
    }
    // Nếu result là false, tức là người dùng nhấn no
    else {
        // Không làm gì cả
    };
}