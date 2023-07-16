import { useState, useEffect } from "react";
import { getAllExams } from "../../../apicalls/exams";
import { message, Row, Col } from "antd";
import PageTitle from "../../../components/pageTitle.js";
import { useDispatch, useSelector } from "react-redux";
import { ShowLoading, HideLoading } from "../../../redux/loaderSlice.js";
import {useNavigate} from "react-router-dom";

const Home = () => {
  const { user } = useSelector((state) => state.users);
  const [exams, setExams] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getExams = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllExams();
      dispatch(HideLoading());
      if (response.success) {
        setExams(response.data);
      } else {
        message.error(response.error);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getExams();
  }, []);

  return (
    user && <div>
      <PageTitle title={`Hi ${user.name}, Welcome to EduQuiz!`} />
      <div className="divider"></div>
      <Row guttor={[16, 16]}>
        {exams.map((exam) => (
          <Col span={6}>
            <div className="card-lg flex flex-col gap-1 p-2">
              <h1 className="text-2xl">{exam.name}</h1>
              <h1 className="text-md">Category : {exam.category}</h1>
              <h1 className="text-md">Total Marks : {exam.totalMarks}</h1>
              <h1 className="text-md">Passing Marks : {exam.passingMarks}</h1>
              <h1 className="text-md">Duration : {exam.duration}</h1>
              <button className="primary-outlined-btn"
              onClick={() =>navigate(`/user/write-exam/${exam._id}`)}
              >
                Start Exam
              </button>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Home;
