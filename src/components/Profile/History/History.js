import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import moment from "moment";

import "./History.scss";
import { getHistoryProfile } from "../../../services/authService";

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    const res = await getHistoryProfile();
    if (res && res.EC === 0) {
      let newHistory = res.DT.data.map((item) => {
        return {
          id: item.id,
          name: item.quizHistory.name,
          total_questions: item.total_questions,
          total_correct: item.total_correct,
          date: moment(item.createdAt).utc().format("DD/MM/YYYY hh:mm:ss A"),
        };
      });
      if (newHistory.length > 10) {
        newHistory = newHistory.slice(
          newHistory.length - 10,
          newHistory.length
        );
      }
      setHistory(newHistory);
    } else {
      toast.error(res.EM);
    }
  };

  console.log("check history", history);

  return (
    <div className="history">
      <table className="table table-info table-bordered table-hover">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Test Name</th>
            <th scope="col">Total Question</th>
            <th scope="col">Total Correct</th>
            <th scope="col">Date Time</th>
          </tr>
        </thead>
        <tbody>
          {history &&
            history.length > 0 &&
            history.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.total_questions}</td>
                  <td>{item.total_correct}</td>
                  <td>{item.date}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default History;
