import Select from "react-select";
import { useState } from "react";
import { toast } from "react-toastify";
import Accordion from "react-bootstrap/Accordion";
import { useTranslation } from "react-i18next";

import "./ManageQuiz.scss";
import { postCreateNewQuiz } from "../../services/quizService";
import { validateEmpty } from "../Validate/Validate";
import TableQuiz from "../TableQuiz/TableQuiz";
import QuizQA from "../QuizQA/QuizQA";
import AssignQuiz from "../AssignQuiz/AssignQuiz";

const options = [
  { value: "EASY", label: "EASY" },
  { value: "MEDIUM", label: "MEDIUM" },
  { value: "HARD", label: "HARD" },
];

function ManageQuiz() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("EASY");
  const [image, setImage] = useState(null);
  const { t } = useTranslation();

  const handleChangeFile = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmitQuiz = async () => {
    // validate
    if (!validateEmpty(name)) {
      toast.error(t("toast.fieldNameQuiz"));
      return;
    } else if (!validateEmpty(description)) {
      toast.error(t("toast.fieldDescription"));
      return;
    }

    const res = await postCreateNewQuiz(name, description, type?.value, image);

    if (res && res.EC === 0) {
      toast.success(res.EM);
      setName("");
      setDescription("");
      setType({ label: "", value: "" });
      setImage(null);
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <div className="manage-quiz">
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <div className="title">{t("admin.TestManager")}</div>
          </Accordion.Header>
          <Accordion.Body>
            <div className="add-new">
              <fieldset className="border rounded-3 p-3">
                <legend className="float-none w-auto px-3">
                  {t("admin.quiz.legend")}
                </legend>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your quiz name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <label>{t("admin.quiz.name")}</label>
                </div>
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    placeholder={t("admin.quiz.description")}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <label>{t("admin.quiz.description")}</label>
                </div>
                <div className="my-3">
                  <Select
                    defaultValue={type}
                    onChange={setType}
                    options={options}
                    placeholder={t("admin.quiz.testType")}
                  />
                </div>
                <div className="more-actions form-group">
                  <label className="mb-1">{t("admin.quiz.uploadImage")}</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => handleChangeFile(e)}
                  />
                </div>
                <div className="mt-3 text-end">
                  <button
                    className="btn btn-info"
                    onClick={() => handleSubmitQuiz()}
                  >
                    {t("admin.quiz.save")}
                  </button>
                </div>
              </fieldset>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <div className="list-detail ">
        <Accordion>
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              <div className="title">{t("admin.quiz.listQuiz")}</div>
            </Accordion.Header>
            <Accordion.Body>
              <TableQuiz />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
      <div className="update-qa">
        <Accordion>
          <Accordion.Item eventKey="2">
            <Accordion.Header>
              <div className="title">{t("admin.quiz.update")}</div>
            </Accordion.Header>
            <Accordion.Body>
              <QuizQA />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
      <div className="assign">
        <Accordion>
          <Accordion.Item eventKey="3">
            <Accordion.Header>
              <div className="title">{t("admin.quiz.assign")}</div>
            </Accordion.Header>
            <Accordion.Body>
              <AssignQuiz />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
}

export default ManageQuiz;
