import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDataQuiz } from "../../../services/questionsService";

function DetailQuiz() {
  const params = useParams();
  const quizId = params.id;

  useEffect(() => {
    fetchQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizId]);

  const fetchQuestions = async () => {
    const res = await getDataQuiz(quizId);
    console.log("check >>>>>", res);
  };

  return <div className="detail-quiz">DetailQuiz</div>;
}

export default DetailQuiz;
