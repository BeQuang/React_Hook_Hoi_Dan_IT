import {
  BarChart,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";
import { useEffect, useState } from "react";

import "./DashBoard.scss";
import { getOverview } from "../../services/authService";

function DashBoard() {
  const [dataOverview, setDataOverview] = useState([]);
  const [dataChart, setDataChart] = useState([]);

  useEffect(() => {
    fetchDataOverview();
  }, []);

  const fetchDataOverview = async () => {
    const res = await getOverview();
    if (res && res.EC === 0) {
      setDataOverview(res.DT);
      //processing Chart data
      let T = res?.DT?.others?.countQuiz ?? 0;
      let Q = res?.DT?.others?.countQuestions ?? 0;
      let A = res?.DT?.others?.countAnswers ?? 0;

      const data = [
        {
          name: "Test",
          T,
        },
        {
          name: "Question",
          Q,
        },
        {
          name: "Answer",
          A,
        },
      ];

      setDataChart(data);
    }
  };

  console.log(dataOverview);

  return (
    <div className="dashboard">
      <div className="title">Analytics DashBoard</div>
      <div className="content">
        <div className="parameter">
          <div className="total">
            <span className="text">Total Users</span>
            <span className="count">
              {dataOverview &&
              dataOverview.users &&
              dataOverview.users.total ? (
                <>{dataOverview.users.total}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
          <div className="total">
            <span className="text">Total Tests</span>
            <span className="count">
              {dataOverview &&
              dataOverview.others &&
              dataOverview.others.countQuiz ? (
                <>{dataOverview.others.countQuiz}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
          <div className="total">
            <span className="text">Total Questions</span>
            <span className="count">
              {dataOverview &&
              dataOverview.others &&
              dataOverview.others.countQuestions ? (
                <>{dataOverview.others.countQuestions}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
          <div className="total">
            <span className="text">Total Answers</span>
            <span className="count">
              {dataOverview &&
              dataOverview.others &&
              dataOverview.others.countAnswers ? (
                <>{dataOverview.others.countAnswers}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
        </div>
        <div className="chart">
          <ResponsiveContainer width={"90%"} height={"100%"}>
            <BarChart data={dataChart}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="T" fill="#4feb6299" />
              <Bar dataKey="Q" fill="var(--primary-color)" />
              <Bar dataKey="A" fill="#ff2a2a99" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
