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
import { useTranslation } from "react-i18next";

import "./DashBoard.scss";
import { getOverview } from "../../services/authService";

function DashBoard() {
  const [dataOverview, setDataOverview] = useState([]);
  const [dataChart, setDataChart] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    fetchDataOverview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          name: t("admin.dashBoard.total.quiz"),
          T,
        },
        {
          name: t("admin.dashBoard.total.questions"),
          Q,
        },
        {
          name: t("admin.dashBoard.total.answer"),
          A,
        },
      ];

      setDataChart(data);
    }
  };

  console.log(dataOverview);

  return (
    <div className="dashboard">
      <div className="title">{t("admin.dashBoard.title")}</div>
      <div className="content">
        <div className="parameter">
          <div className="total">
            <span className="text">{t("admin.dashBoard.total.user")}</span>
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
            <span className="text">{t("admin.dashBoard.total.quiz")}</span>
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
            <span className="text">{t("admin.dashBoard.total.questions")}</span>
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
            <span className="text">{t("admin.dashBoard.total.answer")}</span>
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
