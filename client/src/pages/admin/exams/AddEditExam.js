import { Form, Row, Col, message} from "antd";
import PageTitle from "../../../components/pageTitle";
import {useNavigate} from "react-router-dom";
import {addExam} from "../../../apicalls/exams";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
const AddEditExam = () => {
    const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async(values)=>{
    try{
       dispatch(ShowLoading());
        const response = await addExam(values);
        
        if(response.success){
          message.success(response.message);
           navigate("/admin/exams");
        }
        else{
          message.error(response.message);
        }
        dispatch(HideLoading());
    }
    catch(error){
      dispatch(HideLoading());
     message.error(error.message);
    }
  }


  return (
    <div>
      <PageTitle title="Add Exam"></PageTitle>
      <div className="divider"></div>
      <Form layout="vertical" onFinish={onFinish}>
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
        <div className="flex justify-end">
          <button className="primary-contained-btn" type="submit">
            Save
          </button>
        </div>
      </Form>
    </div>
  );
};

export default AddEditExam;
