import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { Button } from "@nextui-org/react";
import CustomDropdown from "./dropdown";
import { FaMapMarkedAlt } from "react-icons/fa";
// import { FormattedMessage, useIntl } from "react-intl";
interface AddStaffProps {
  onClose: () => void;
  reload: any;
}

interface City {
  Id: string;
  Name: string;
  Districts: District[];
}

interface District {
  Id: string;
  Name: string;
  Wards: Ward[];
}

interface Ward {
  Id: string;
  Name: string;
}
const AddStaff: React.FC<AddStaffProps> = ({ onClose, reload }) => {
  const openModal = (type) => {
    setType(type);
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
  const major = [
    "Kỹ thuật Điện",
    "Kỹ thuật Điện tử - Viễn thông",
    "Kỹ thuật Điều khiển và Tự động hóa",
    "Kỹ thuật Y sinh",
    "Công nghệ Nano",
    "Kỹ thuật Cơ khí",
    "Kỹ thuật Ô tô",
    "Kỹ thuật Hàng không",
    "Kỹ thuật Đóng tàu",
    "Kỹ thuật Năng lượng",
    "Khoa học Máy tính",
    "Kỹ thuật Phần mềm",
    "Kỹ thuật Hệ thống Máy tính",
    "Kỹ thuật Mạng Máy tính",
    "Trí tuệ nhân tạo",
    "Kỹ thuật Hóa học",
    "Công nghệ Hóa học",
    "Khoa học Vật liệu",
    "Kỹ thuật Hóa sinh",
    "Kỹ thuật Môi trường",
    "Kỹ thuật Xây dựng",
    "Kỹ thuật Cầu đường",
    "Kỹ thuật Giao thông vận tải",
    "Kỹ thuật Thủy lợi",
    "Quy hoạch Đô thị và Kỹ thuật Hạ tầng",
    "Vật lý",
    "Kỹ thuật Vật lý",
    "Khoa học Vật liệu",
    "Nano",
    "Năng lượng Mặt trời",
    "Kỹ thuật Dầu khí",
    "Kỹ thuật Địa chất",
    "Kỹ thuật Xử lý Khí",
    "Kỹ thuật An toàn Mỏ",
    "Kinh tế Dầu khí",
    "Kỹ thuật Dệt may",
    "Thiết kế Thời trang",
    "Công nghệ Dệt",
    "Kỹ thuật May",
    "Quản lý Chất lượng Dệt may",
    "Kỹ thuật Y sinh",
    "Kỹ thuật Y sinh Điện tử",
    "Kỹ thuật Y sinh Vật liệu",
    "Kỹ thuật Y sinh Cơ học",
    "Kỹ thuật Hình ảnh Y tế",
    "Quản lý Công nghiệp",
    "Quản trị Kinh doanh",
    "Kỹ thuật Hệ thống Công nghiệp",
    "Kỹ thuật Logistics và Quản lý Chuỗi cung ứng",
    "Kỹ thuật Tài chính",
    "Tiếng Anh",
    "Tiếng Pháp",
    "Tiếng Nhật",
    "Tiếng Hàn",
    "Tiếng Trung",
    "Giáo dục Thể chất",
    "Huấn luyện Thể thao",
    "Y học Thể thao",
    "Quản lý Thể dục Thể thao",
    "Quản trị Kinh doanh",
    "Kế toán",
    "Tài chính - Ngân hàng",
    "Kinh tế Quốc tế",
    "Marketing",
    "Xã hội học",
    "Tâm lý học",
    "Ngôn ngữ học",
    "Văn học",
    "Lịch sử",
  ];
  const program = ["CQ", "CLC", "VHVL"]
  const faculty = [
    "ME",
    "EE",
    "EEE",
    "IT",
    "CHE",
    "MSE",
    "CE",
    "ENVE",
    "PE",
    "FT",
    "BME",
    "NE",
    "MCIT",
    "CSE",
    "TRE",
    "AE",
    "FL"
  ];
  const [isShaking, setIsShaking] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [type, setType] = useState();
  // const intl = useIntl();
  const initialData = {
    fullname: "",                 
    date_of_birth: "",                                     
    gender: "",                               
    credential_id: "",               
    phone_number: "",                  
    contact_email: "",     
    address: "",                                            
    class: "",                           
    faculty: "",    
    major: "",                  
    level: "",                            
    program: "",    
  }
  const [Studentdata, setStudentdata] = useState<any>(initialData);
  const handleClickOutside = (event: MouseEvent) => {
    if (
      notificationRef.current &&
      !notificationRef.current.contains(event.target as Node)
    ) {
      setIsShaking(true);
      setTimeout(() => {
        setIsShaking(false);
      }, 300);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleAnimationComplete = () => {
    if (!isVisible) {
      onClose();
    }
  };

  const handleInputChange = (key: string, value: any) => {
    setStudentdata((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };


  // A function to handle the password input change

  // A function to handle the confirm password input change
  const [checkmissing, setCheckmissing] = useState({
    agency_id: false,
    fullname: false,
    username: false,
    password: false,
    date_of_birth: false,
    cccd: false,
    phone_number: false,
    email: false,
    role: false,
    position: false,
    salary: false,
    province: false,
    district: false,
    town: false,
    detail_address: false,
    paid_salary: false
  });
  const handleCheckMissing = (key: string, value: boolean) => {
    setCheckmissing((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
  const [error, setError] = useState("");
  // const handleConfirm = async () => {
  //   const Order = new OrdersOperation();
  //   const condition: UploadingOrderFileCondition = {
  //     file: selectedFile,
  //   };
  //   console.log(condition);
  //   try {
  //     const checkfile = await Order.checkFileFormat(condition);
  //     console.log(checkfile);
  //     if (checkfile.error.error) {
  //       alert(checkfile.error.message);
  //       setSelectedFile(null);
  //       return;
  //     }
  //     if (checkfile.valid === false) {
  //       alert(checkfile.message);
  //       setSelectedFile(null);
  //       return;
  //     }
  //     const response = await Order.createByFile(condition);
  //     console.log(response);
  //     alert(response.message);
  //     setSelectedFile(null);
  //     reload();
  //   } catch (e) {
  //     console.log(e);
  //     alert("Đã xảy ra lỗi hệ thống, vui lòng thử lại sau!");
  //   }
  // };

  const handleSubmit = async () => {
    // const myToken: token = {
    //   token: cookie.get("token"),
    // };
    // const student =new StudentOperation()
    // console.log(Studentdata)
    // const response= await student.create(Studentdata, myToken)
    // console.log(response.error.error)
    // if (response.error && response.error?.error)
    //   {
    //     alert(response.error.message);
    //     return;
    //   }
    // alert(response.message);
    // setStudentdata(initialData)  
    // reload();
  };

  return (
    
    <motion.div
      className={`fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-60 z-50 `}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onAnimationComplete={handleAnimationComplete}
      style={{ backdropFilter: "blur(12px)" }}
    >
      <motion.div
        ref={notificationRef}
        className={`relative w-[98%] sm:w-9/12 lg:w-1/2 bg-white rounded-xl p-4 overflow-y-auto ${
          isShaking ? "animate-shake" : ""
        }`}
        initial={{ scale: 0 }}
        animate={{ scale: isVisible ? 1 : 0 }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative items-center justify-center flex-col flex h-10 w-full border-b-2 border-[#545e7b]">
          <div className="font-bold text-lg sm:text-2xl pb-2 text-white w-full text-center">
            {/* <FormattedMessage id="Staff.AddButton" /> */}Thêm học viên
          </div>
          <Button
            className="absolute right-0 w-8 h-8 rounded-full mb-2 hover:bg-gray-300"
            onClick={handleClose}
          >
            <IoMdClose className="w-5/6 h-5/6" />
          </Button>
        </div>
        <div>
          <div className="h-fit overflow-y-scroll border border-[#545e7b] mt-4 no-scrollbar flex flex-col items-center bg-white   p-2 rounded-md text-black">
            <div className="w-fit h-fit">
              <h1 className="font-semibold pb-2 text-center">
                {/* <FormattedMessage id="student" /> */} Học viên
              </h1>
              <div className="flex flex-col gap-3">
                <input
                  type="string"
                  className={`text-xs md:text-sm border border-gray-600 rounded  bg-white  h-10 p-2 w-full
                  ${checkmissing.fullname ? "border-red-500" : ""}`}
                  placeholder={"Họ và tên"}
                  value={Studentdata.fullname}
                  onChange={(e) => handleInputChange("fullname", e.target.value)}
                />

                <input
                  type="string"
                  className={`text-xs md:text-sm border border-gray-600 rounded  bg-white  h-10 p-2 w-full
                  ${checkmissing.phone_number ? "border-red-500" : ""}`}
                  placeholder={"Số điện thoại"}
                  value={Studentdata.phone_number}
                  onChange={(e) => handleInputChange("phone_number", e.target.value)}
                />
              </div>

              <div className="flex gap-3 mt-3">
                <input 
                  type="date"
                  className={`text-xs md:text-sm border border-gray-600 rounded  bg-white  h-10 p-2 w-full
                  ${checkmissing.date_of_birth ? "border-red-500" : ""}`}
                  placeholder={"Ngày tháng năm sinh"}
                  value={Studentdata.date_of_birth}
                  onChange={(e) =>
                    handleInputChange("date_of_birth", e.target.value)
                  }
                />
                <input
                  type="text"
                  className={`text-xs md:text-sm border border-gray-600 rounded  bg-white  h-10 p-2 w-full
                  ${checkmissing.cccd ? "border-red-500" : ""}`}
                  placeholder={"CCCD"}
                  value={Studentdata.credential_id}
                  onChange={(e) => handleInputChange("credential_id", e.target.value)}
                />
                <input
                  type="text"
                  className={`text-xs md:text-sm border border-gray-600 rounded  bg-white  h-10 p-2 w-full
                  ${checkmissing.email ? "border-red-500" : ""}`}
                  placeholder="Email"
                  value={Studentdata.contact_email}
                  onChange={(e) => handleInputChange("contact_email", e.target.value)}
                />
                
              </div>            
              <div className="flex gap-3 mt-3">
                <div
                  className={`text-xs text-center md:text-sm border border-gray-600 rounded  bg-white   h-10 p-2 w-fit
                  ${checkmissing.role ? "border-red-500" : ""}`}
                >
                  <CustomDropdown
                    label={"Giới tính"}
                    options={["Nam", "Nữ"]}
                    selectedOption={Studentdata.gender}
                    onSelectOption={(option) => handleInputChange("gender", option)}
                  />
                </div>
                <div
                  className={`text-xs text-center md:text-sm border border-gray-600 rounded bg-white   h-10 p-2 w-fit
                  ${checkmissing.role ? "border-red-500" : ""}`}
                >
                  <CustomDropdown
                    label={"Chương trình"}
                    options={program}
                    selectedOption={Studentdata.program}
                    onSelectOption={(option) => handleInputChange("program", option)}
                  />
                </div>          
              </div>              
            </div>
          </div>
          <Button
            className="w-full rounded-lg mt-5 mb-1 py-3 border-green-700 hover:bg-green-700 text-green-500
          bg-transparent drop-shadow-md hover:drop-shadow-xl hover:text-white border hover:shadow-md"
            onClick={handleSubmit}
          >
            <span className="hidden xs:block">
              {/* <FormattedMessage id="Staff.AddButton" /> */} Thêm
            </span>
          </Button>
        </div>
        <div className=" flex place-content-center text-red-500 font-bold ">
          {error && <p>{error}</p>}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AddStaff;
