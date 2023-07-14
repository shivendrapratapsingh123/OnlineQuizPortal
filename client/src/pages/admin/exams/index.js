import { useNavigate } from "react-router-dom";
import PageTitle from "../../../components/pageTitle";
import {Table, message} from "antd";
import { useEffect, useState } from "react";
import {useDispatch} from "react-redux";
import { getAllExams } from "../../../apicalls/exams";
import {ShowLoading, HideLoading} from "../../../redux/loaderSlice";

const Exams = () => {
  
  const navigate = useNavigate();
  const [exams,setExams] = useState([]);
  const dispatch = useDispatch();
  const columns = [
    { title: "Exam Name", dataIndex: "name" },
    {
      title: "Duration",
      dataIndex: "category",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Total Marks",
      dataIndex: "totalMarks",
    },
    {
      title: "Passing Marks",
      dataIndex: "passingMarks",
    },
    {
      title:"Marks Per Question",
      dataIndex:"marksPerQuestion"
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => <div className="flex gap-2">
       <i className="ri-pencil-line"
       onClick={()=>navigate(`/admin/exams/edit/${record._id}`)}
       ></i>
       <i className="ri-delete-bin-line"></i>
      </div>,
    },
  ];

   const  getExamsData = async()=>{
    try{
      dispatch(ShowLoading());
      const response = await getAllExams();
      dispatch(HideLoading());
      if(response.success){
        setExams(response.data);
      }
      else{
        message.error(response.message);
      }
    }
    catch(error){
      dispatch(HideLoading());
    message.error(error.message);
    }
   }

    useEffect(()=>{
      getExamsData();
    },[])

  return (
    <div>
      <div className="flex justify-between mt-2">
        <PageTitle title="Exams" />
        <button
          className="primary-outlined-btn flex items-center"
          onClick={() => navigate("/admin/exams/add")}
        >
          <i className="ri-add-line" />
          Add Exam
        </button>
      </div>
      <div className="divider"></div>
      <Table columns ={columns} dataSource = {exams}>
      </Table>
    </div>
  );
};

export default Exams;
