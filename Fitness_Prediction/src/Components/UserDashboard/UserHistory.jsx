import React, { useEffect, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import "./userpanel.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faBurn, faForward } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import axios from "axios";

function UserHistory() {
  const navigate = useNavigate();
  const [userid, setUserId] = useState(null);
  const [hdata, setHdata] = useState([]);
  const [wdata, setWdata] = useState([]);
  const [intensityData, setIntensityData] = useState([]);
  const [planContent, setPlanContent] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(4);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      axios.get(`http://localhost:8080/user/getuser/${email}`)
        .then(res => setUserId(res.data.userid))
        .catch(err => console.error("Error fetching user data:", err));
    } else {
      console.log("Email Not Found");
    }
  }, []);

  useEffect(() => {
    if (userid) {
      axios.get(`http://localhost:8080/user/read/${userid}`)
        .then(res => {
          const parsed = parseCsvString(res.data);
          setHdata(parsed);
          setPlanContent(res.data);
        })
        .catch(err => {
          console.error("Error fetching suggested plan:", err);
          setPlanContent("No suggested plan found.");
        });
    }
  }, [userid]);

  useEffect(() => {
    axios.get("http://localhost:8080/admin/workout/view")
      .then(res => setWdata(res.data))
      .catch(err => console.error("Error fetching workout types", err));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8080/admin/intensity/view")
      .then(res => setIntensityData(res.data))
      .catch(err => console.error("Error fetching intensity types", err));
  }, []);

  const parseCsvString = (csvString) => {
    const lines = csvString.trim().split("\n");
    return lines.map((line) => {
      const [userid, workout_type_id, intensityid, duration, calories_burn] = line.split(",");
      return { userid, workout_type_id, intensityid, duration, calories_burn };
    });
  };

  const getWorkoutName = (id) => {
    const match = wdata.find(item => item.workout_type_id?.toString() === id);
    return match ? match.workout_type_name : id;
  };

  const getIntensityName = (id) => {
    const match = intensityData.find(item => item.intensityid?.toString() === id);
    return match ? match.intensity_type : id;
  };

  const downloadPlan = () => {
    const blob = new Blob([planContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Recommended_plan_user_${userid}.txt`;
    link.click();
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = hdata.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(hdata.length / recordsPerPage);

  return (
    <div className="cont">
      <div className="head d-flex justify-content-between w-100 text-dark fw-bolder position-relative">
        <h4 className="pt-2 ps-3 text-center fw-bold">
          Workout History <FontAwesomeIcon icon={faBurn} className="ms-3" />
        </h4>
        <IoMdCloseCircle
          size={28}
          className="position-absolute"
          style={{ top: "2%", right: "2%", cursor: "pointer", color: "#dc3545" }}
          onClick={() => navigate(-1)}
        />
      </div>

      <div className="psg ps-5 pe-5 pb-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <input
            type="text"
            className="form-control w-25"
            placeholder="Records per page"
            value={recordsPerPage === "" ? "" : recordsPerPage}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "") {
                setRecordsPerPage("");
              } else {
                const numberValue = parseInt(value);
                if (!isNaN(numberValue) && numberValue > 0) {
                  setRecordsPerPage(numberValue);
                  setCurrentPage(1);
                }
              }
            }}
            onBlur={() => {
              if (!recordsPerPage || recordsPerPage < 1) {
                setRecordsPerPage(4);
              }
            }}
          />
          <button className="btn btn-success ms-3" onClick={downloadPlan}>
            Download CSV
          </button>
        </div>

        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Record ID</th>
              <th>Workout Name</th>
              <th>Intensity Type</th>
              <th>Duration (Minutes)</th>
              <th>Calories Burned</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-warning text-center fw-bolder">
                  You have not done any workouts. History is not available.
                </td>
              </tr>
            ) : (
              currentRecords.map((hd, index) => (
                <tr key={index}>
                  <td>{indexOfFirstRecord + index + 1}</td>
                  <td>{getWorkoutName(hd.workout_type_id)}</td>
                  <td>{getIntensityName(hd.intensityid)}</td>
                  <td>{hd.duration}</td>
                  <td>{hd.calories_burn}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="d-flex justify-content-end align-items-center gap-2 mt-3">
          <button
            className="btn btn-outline-dark"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <FontAwesomeIcon icon={faBackward} />
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            className="btn btn-outline-dark"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <FontAwesomeIcon icon={faForward} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserHistory;
