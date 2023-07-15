import { Form, Row, Col, message, Tabs } from "antd";
import PageTitle from "../../../components/pageTitle";
import { useNavigate, useParams } from "react-router-dom";
import { addExam, editExamById, getExamById } from "../../../apicalls/exams";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import { useEffect, useState } from "react";
const TabPane = Tabs;

const AddEditExam = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [examData, setExamData] = useState(null);

  const params = useParams();

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      let response;
      if (params.id) {
        response = await editExamById({
          ...values,
          examId: params.id,
        });
      } else {
        response = await addExam(values);
      }    

      if (response.success) {
        message.success(response.message);
        navigate("/admin/exams");
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const getExamData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getExamById({
        examId: params.id,
      });
      dispatch(HideLoading());
      if (response.success) {
        setExamData(response.data);
      } else {
        message.error(response.data);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (params.id) {
      getExamData();
    }
  }, []);

  return (
    <div>
      <PageTitle title={params.id ? "Edit Exam" : "Add Exam"}></PageTitle>
      <div className="divider"></div>
      {(examData || !params.id) && (
        <Form layout="vertical" onFinish={onFinish} initialValues={examData}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Exam Details" key="1">
              <Row gutter={[10, 10]}>
                <Col span={8}>
                  <Form.Item label="Exam Name" name="name">
                    <input type="text" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Exam Duration" name="duration">
                    <input type="number" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Category" name="category">
                    <select name="" id="">
                      <option value="">select Category</option>
                      <option value="javasript">Javasript</option>
                      <option value="React">React</option>
                      <option value="Node">Node</option>
                      <option value="Mongodb">Mongodb</option>
                    </select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Total Marks" name="totalMarks">
                    <input type="number" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Passing Marks" name="passingMarks">
                    <input type="number" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Marks Per Question" name="marksPerQuestion">
                    <input type="number" />
                  </Form.Item>
                </Col>
              </Row>
            </TabPane>
            {params.id && (
              <TabPane tab="Questions" key="2">
                <h1>questions</h1>
              </TabPane>
            )}
          </Tabs>
          <div className="flex justify-end">
            <button className="primary-contained-btn" type="submit">
              Save
            </button>
          </div>
        </Form>
      )}
    </div>
  );
};

export default AddEditExam;
