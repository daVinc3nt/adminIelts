import { LeakAddTwoTone } from "@mui/icons-material";
import { student, columns } from "./column";
import { DataTable } from "./datatable";
import { AnyARecord } from "dns";

async function getData(): Promise<any> {
  // Fetch data from your API here.p
  // const myToken: token = {
  //   token: cookie.get("token"),
  // };
  // const student= new StudentOperation()
  // console.log(cookie.get("token"))
  // const res = await student.findByAdmin(conditions[0],myToken) 
  const res = await fetch("https://666557add122c2868e406245.mockapi.io/Writing")
  // console.log(res)
  // // const data = await res.json();
  // // console.log(res1)
  // // console.log(data)
  // // console.log(res1)  
  // return res.data;
  return res.json();
}
export default async function DemoPage(reloadData:any) {
  // const test = useContext(UserContext)
  const data = await getData();
  console.log("hello",data)
  const columnsWdata = await columns(reloadData);
  if (data)
    return(
      <div>
        <DataTable columns={columnsWdata} data={data} reload={reloadData}/>
      </div>
    )
  else 
    return(
      <div className="text-xl flex items-center">
        Lỗi xảy ra vui lòng thử lại!
      </div>
  )
}
