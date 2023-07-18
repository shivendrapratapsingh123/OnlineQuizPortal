import { useEffect, useState } from "react";
import moment from "moment";
import PageTitle from "../../../components/pageTitle";
import { Table, message } from "antd";
import { useDispatch } from "react-redux";
import { getAllReports } from "../../../../src/apicalls/reports";
import { ShowLoading, HideLoading } from "../../../redux/loaderSlice";

const AdminReports = () => {
  const dispatch = useDispatch();
  const [reportsData, setReportsData] = useState([]);

  const [filters, setFilters] = useState({
    examName: "",
    userName: "",
  });

  const columns = [
    {
      title: "Exam Name",
      dataIndex: "examName",
      render: (text, record) => {
        return <div>{record.exam.name}</div>;
      },
    },
    {
      title: "User Name",
      dataIndex: "userName",
      render: (text, record) => {
        return <div>{record.user.name}</div>;
      },
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (text, record) => {
        return (
          <div>{moment(record.createdAt).format("DD-MM-YYYY hh:mm:ss")}</div>
        );
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
  const getData = async (filters) => {
    try {
      dispatch(ShowLoading());
      const response = await getAllReports(filters);
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
    getData(filters);
  }, []);

  return (
    <div>
      <PageTitle title="Reports" />
      <div className="divider"></div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Exam"
          value={filters.examName}
          onChange={(e) => setFilters({ ...filters, examName: e.target.value })}
        />
        <input
          type="text"
          placeholder="User"
          value={filters.userName}
          onChange={(e) => setFilters({ ...filters, userName: e.target.value })}
        />
        <button
          className="primary-outlined-btn"
          onClick={() => {
            setFilters({
              examName: "",
              userName: "",
            });
            getData({
              examName: "",
              userName: "",
            });
          }}
        >
          Clear
        </button>
        <button
          className="primary-contained-btn"
          onClick={() => {
            getData(filters);
          }}
        >
          Search
        </button>
      </div>
      <Table columns={columns} dataSource={reportsData} className="mt-2" />
    </div>
  );
};

export default AdminReports;
