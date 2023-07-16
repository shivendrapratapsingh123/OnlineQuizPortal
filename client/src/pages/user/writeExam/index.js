import { useState, useEffect } from "react";
import { message } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from "../../../redux/loaderSlice";
import { getExamById } from "../../../apicalls/exams";
import Instructions from "./instructions";

const WriteExam = () => {
  const [examData, setExamData] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [view, setView] = useState("instructions");
  const [questions, setQuestions] = useState([]);

  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);

  const [selectedOptions, setSelectedOptions] = useState({});

  const [result, setResult] = useState({});

  const [secondsLeft, setSecondsLeft]  = useState(0);

  const [timeUp, setTimeUp] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const getExamData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getExamById({
        examId: params.id,
      });
      dispatch(HideLoading());
      if (response.success) {
        setExamData(response.data);
        setQuestions(response.data.questions);
        setSecondsLeft(response.data.duration)
      } else {
        message.error(response.data);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const calculateResult = () => {
    let correctAnswers = [];
    let wrongAnswers = [];
    questions.forEach((question, index) => {
      if (question.correctOption === selectedOptions[index]) {
        correctAnswers.push(question);
      } else {
        wrongAnswers.push(question);
      }
    });
    let verdict = "Pass";
    if (correctAnswers.length < examData.passingMarks) {
      verdict = "Fail";
    }
    setResult({
      correctAnswers,
      wrongAnswers,
      verdict,
    });
    setView("result");
  };

   const startTimer = ()=>{
      let totalSeconds = examData.duration;
      const intervalId = setInterval(()=>{
        if(totalSeconds > 0){
          
          totalSeconds = totalSeconds-1;
          setSecondsLeft(totalSeconds);
        }
        else{
          setTimeUp(true);
        }
      },1000);
      setIntervalId(intervalId);
   };

   useEffect(()=>{
    if(timeUp){
      clearInterval(intervalId);
      calculateResult();
    }
   },[timeUp])

  useEffect(() => {
    if (params.id) {
      getExamData();
    }
  }, []);

  return (
    examData && (
      <div className="mt-2">
        <div className="divider"></div>
        <h1 className="text-center">{examData.name}</h1>
        <div className="divider"></div>
        {view === "instructions" && (
          <Instructions examData={examData} view={view} setView={setView} startTimer = {startTimer}/>
        )}
        {view === "questions" && (
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
            <h1 className="text-2xl">
              {selectedQuestionIndex + 1} :{" "}
              {questions[selectedQuestionIndex].name}
            </h1>
            <div className="timer">
                <span className="text-2xl">{secondsLeft}</span>
            </div>
            </div>

            <div className="flex flex-col gap-2">
              {Object.keys(
                JSON.parse(questions[selectedQuestionIndex].options)
              ).map((option, index) => {
                return (
                  <div
                    className={`flex flex-col ${
                      selectedOptions[selectedQuestionIndex] === option
                        ? "selected-option"
                        : "option"
                    }`}
                    key={index}
                    onClick={() => {
                      setSelectedOptions({
                        ...selectedOptions,
                        [selectedQuestionIndex]: option,
                      });
                    }}
                  >
                    <h1 className="text-xl">
                      {option} :{" "}
                      {
                        JSON.parse(questions[selectedQuestionIndex].options)[
                          option
                        ]
                      }
                    </h1>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between">
              {selectedQuestionIndex > 0 && (
                <button
                  className="Primary-outlined-btn"
                  onClick={() => {
                    setSelectedQuestionIndex(selectedQuestionIndex - 1);
                  }}
                >
                  Previous
                </button>
              )}
              {selectedQuestionIndex < questions.length - 1 && (
                <button
                  className="primary-contained-btn"
                  onClick={() => {
                    setSelectedQuestionIndex(selectedQuestionIndex + 1);
                  }}
                >
                  Next
                </button>
              )}

              {selectedQuestionIndex === questions.length - 1 && (
                <button
                  className="primary-contained-btn"
                  onClick={() => {
                    setTimeUp(true);
                    clearInterval(intervalId);
                    calculateResult();
                  }}
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        )}

        {view === "result" && (
          <div className="flex items-center mt-2 justify-center">
            <div className="flex flex-col gap-2 result">
              <h1 className="text-2xl">RESULT</h1>
              <div className="marks">
                <h1 className="text-md">Total Marks : {examData.totalMarks}</h1>
                <h1 className="text-md">
                  Passing Marks : {examData.passingMarks}
                </h1>
                <h1 className="text-md">
                  Obtained Marks : {result.correctAnswers.length}
                </h1>
                <h1 className="text-md">
                  wrong Answers : {result.wrongAnswers.length}{" "}
                </h1>
                <h1 className="text-md">VERDICT : {result.verdict} </h1>
              </div>
            </div>
            <div className="lottie-animation">
              {result.verdict === "Pass" && (
                <lottie-player
                  src="https://lottie.host/aefb9b0b-077d-47f0-a76b-cf7c746d4a92/T7tu4c82hI.json"
                  background="#fff"
                  speed="1"
                  loop
                  autoplay
                ></lottie-player>
              )}

              {result.verdict === "Fail" && (
                <lottie-player
                  src="https://lottie.host/5da27f01-0521-45c9-bebf-adea2085697a/ipg9Tnr5ZJ.json"
                  background="#fff"
                  speed="1"
                  loop
                  autoplay
                ></lottie-player>
              )}
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default WriteExam;
