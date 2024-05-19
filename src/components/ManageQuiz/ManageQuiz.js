import Select from "react-select";

import "./ManageQuiz.scss";
import { useState } from "react";

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

  const handleChangeFile = (e) => {};

  return (
    <div className="manage-quiz">
      <div className="title">ManageQuiz</div>
      <hr />
      <div className="add-new">
        <fieldset className="border rounded-3 p-3">
          <legend className="float-none w-auto px-3">Add new Quiz:</legend>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Your quiz name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Name Quiz</label>
          </div>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <label>Description</label>
          </div>
          <div className="my-3">
            <Select
              value={type}
              // onChange={this.handleChange}
              options={options}
              placeholder="Quiz type..."
            />
          </div>
          <div className="more-actions form-group">
            <label className="mb-1">Upload Image</label>
            <input
              type="file"
              className="form-control"
              onChange={(e) => handleChangeFile(e)}
            />
          </div>
        </fieldset>
      </div>
      <hr />
      <div className="list-detail">Table</div>
    </div>
  );
}

export default ManageQuiz;
