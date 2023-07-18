import { useEffect, useState } from "react";
import moment from "moment";
import PageTitle from "../../../components/pageTitle";
import { Table, message } from "antd";
import { useDispatch } from "react-redux";
import { getAllReportsByUser } from "../../../../src/apicalls/reports";
import { ShowLoading, HideLoading } from "../../../redux/loaderSlice";

const UserReports = () => {
  const dispatch = useDispatch();
  const [reportsData, setReportsData] = useState([]);
  const columns = [
    {
      title: "Exam Name",
      dataIndex: "examName",
      render: (text, record) => {
        return <div>{record.exam.name}</div>;
      },
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (text, record) => {
        return <div>{moment(record.createdAt).format("DD-MM-YYYY hh:mm:ss")}</div>;
      },
    },
    {
      title: "Total Marks",
      dataIndex: "totalQuestions",
      render: (text, record) => {
        return <div>{record.exam.totalMarks}</div>;
      },
    },
    {
      title: "Passing Marks",
      dataIndex: "correctanswers",
      render: (text, record) => {
        return <div>{record.exam.passingMarks}</div>;
      },
    },
    {
      title: "Obtanied Marks",
      dataIndex: "correctAnswers",
      render: (text, record) => {
        return <div>{record.result.correctAnswers.length}</div>;
      },
    },
    {
      title: "Verdict",
      dataIndex: "verdict",
      render: (text, record) => {
        return <div>{record.result.verdict}</div>;
      },
    },
  ];
  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllReportsByUser();
      dispatch(HideLoading());
      if (response.success) {
        setReportsData(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <PageTitle title="Reports" />
      <div className="divider"></div>
      <Table columns={columns} dataSource={reportsData} />
    </div>
  );
};

export default UserReports;
