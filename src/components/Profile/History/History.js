import "./History.scss";

function History() {
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
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>24/09/2003</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default History;
