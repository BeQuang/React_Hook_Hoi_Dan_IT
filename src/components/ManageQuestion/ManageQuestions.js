import { useState } from "react";
import Select from "react-select";
import { BsPatchPlusFill, BsPatchMinusFill } from "react-icons/bs";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";

import "./ManageQuestions.scss";

function ManageQuestions() {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const [selectedQuiz, setSelectedQuiz] = useState({});

  return (
    <div className="manage-questions">
      <div className="title">ManageQuestions</div>
      <div className="add-questions">
        <div className="col-6 form-group"></div>
        <label>Select Quiz:</label>
        <Select
          defaultValue={selectedQuiz}
          onChange={setSelectedQuiz}
          options={options}
          className="col-6"
        />
      </div>
      <div className="mt-3">Add questions:</div>
      <div className="">
        <div className="questions-content">
          <div className="form-floating description">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Description"
            />
            <label>Description</label>
          </div>
          <div className="group-upload">
            <label className="label-upload">Upload image</label>
            <input type="file" hidden />
            <span>myImage.png</span>
          </div>
          <div className="btn-group">
            <span className="icon-add">
              <BsPatchPlusFill />
            </span>
            <span className="icon-remove">
              <BsPatchMinusFill />
            </span>
          </div>
        </div>
        <div className="answers-content">
          <input className="form-check-input isCorrect" type="checkbox" />
          <div className="form-floating name">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Answer 1"
            />
            <label>Answer 1</label>
          </div>
          <div className="btn-group">
            <span className="icon-add">
              <FiPlusCircle />
            </span>
            <span className="icon-remove">
              <FiMinusCircle />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageQuestions;
