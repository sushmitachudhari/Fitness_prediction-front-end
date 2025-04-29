import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoMdCloseCircle } from "react-icons/io";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faEdit,faForward } from '@fortawesome/free-solid-svg-icons';

function ManageWorkoutCalories() {
  const [data, setData] = useState([]);
  const [wdata, setWdata] = useState([]);
  const [intensityData, setIntensityData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const navigate = useNavigate();

  useEffect(() => {
    fetchWorkoutCalories();
    fetchWorkoutTypes();
    fetchIntensityTypes();
  }, []);

  const fetchWorkoutCalories = () => {
    axios.get("http://localhost:8080/admin/viewWorkoutCalories")
      .then(res => setData(res.data))
      .catch(err => console.error("Error fetching workout data", err));
  };

  const fetchWorkoutTypes = () => {
    axios.get("http://localhost:8080/admin/workout/view")
      .then(res => setWdata(res.data))
      .catch(err => console.error("Error fetching workout types", err));
  };

  const fetchIntensityTypes = () => {
    axios.get("http://localhost:8080/admin/intensity/view")
      .then(res => setIntensityData(res.data))
      .catch(err => console.error("Error fetching intensity types", err));
  };

  const handleUpdate = (recordid) => {
    navigate(`/account/admin/admin-dashboard/manage-workout-calories/updateWorkoutCalories/${recordid}`);
  };

  const getWorkoutName = (id) => {
    const match = wdata.find(item => item.workout_type_id?.toString() === id?.toString());
    return match ? match.workout_type_name : id;
  };

  const getIntensityName = (id) => {
    const match = intensityData.find(item => item.intensityid?.toString() === id?.toString());
    return match ? match.intensity_type : id;
  };

  // Pagination calculations
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

  const goToPrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (<div className="cont">
    
    <div className=" container mt-4 position-relative p-4 ">
      <h3 className="mb-2">Manage Workout Calories</h3>
     <IoMdCloseCircle
              size={28}
              className="position-absolute"
              style={{ top: "2%", right: "2%", cursor: "pointer", color: "#dc3545" }}
              onClick={() => navigate(`/account/admin/admin-dashboard/`)}
            />
      {/* Items per page input */}
      <div className="d-flex align-items-center mb-3">
        <label className="me-2">Items per page:</label>
        <input
          type="text"
          className="form-control p-2"
          style={{width:"2rem",height:"2rem",outline:"none",boxShadow: "0 0 5px rgba(129, 129, 129, 0.5)" }}
          min={1}
          placeholder="3"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              let value = parseInt(e.target.value, 10);
              setItemsPerPage(isNaN(value) || value < 1 ? 5 : value);
              setCurrentPage(1);
            }
          }}
        />
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>Rn.</th>
              <th>Workout Name</th>
              <th>Intensity Name</th>
              <th>Duration (min)</th>
              <th>Calories Burned</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item, index) => (
                <tr key={index}>
                  <td>{startIndex + index + 1}</td>
                  <td>{getWorkoutName(item.workout_type_id)}</td>
                  <td>{getIntensityName(item.intensityid)}</td>
                  <td>{item.duration}</td>
                  <td>{item.calories_burn}</td>
                  <td>
                    <button className="btn btn-warning btn-sm" onClick={() => handleUpdate(item.recordid)}>
                      <FontAwesomeIcon icon={faEdit}  />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">No records found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="d-flex justify-content-end gap-2 align-items-center mt-2">
        <button className="btn btn-secondary" onClick={goToPrevious} disabled={currentPage === 1}>
          <FontAwesomeIcon icon={faBackward} />
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button className="btn btn-secondary" onClick={goToNext} disabled={currentPage === totalPages}>
          <FontAwesomeIcon icon={faForward} />
        </button>
      </div>
    </div>
  </div>
  );
}

export default ManageWorkoutCalories;
