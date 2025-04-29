import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoMdCloseCircle } from "react-icons/io";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faForward } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

const ViewWorkout = () => {
  const [workouts, setWorkouts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8080/admin/workout/view")
      .then(response => setWorkouts(response.data))
      .catch(error => console.error("Error fetching workouts:", error));
  }, []);

  const filteredWorkouts = workouts.filter(workout =>
    workout.workout_type_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredWorkouts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentWorkouts = filteredWorkouts.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePageSizeChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setItemsPerPage(isNaN(value) || value < 1 ? 5 : value);
    setCurrentPage(1);
  };

  return (
    <div className="cont p-2 container mt-4 position-relative" style={{width:"60%"}}>
      <h3 className="text-center mb-4">All Registered Workouts</h3>
       <IoMdCloseCircle
                size={28}
                className="position-absolute"
                style={{ top: "2%", right: "2%", cursor: "pointer", color: "#dc3545" }}
                onClick={() => navigate(-1)}
              />
      {/* Search & Page Size Controls */}
      <div className="row mb-3 g-3">
        <div className="col-sm-12 col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search workout name..."
            style={{ boxShadow: "0 0 5px rgba(129, 129, 129, 0.5)" }}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div className="col-sm-12 col-md-6 d-flex align-items-center gap-2">
          <label className="mb-0">Items per page:</label>
          <input
            type="text"
            className="form-control"
            placeholder="5"
            style={{
              width: "5rem",
              boxShadow: "0 0 5px rgba(129, 129, 129, 0.5)",
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handlePageSizeChange(e);
              }
            }}
          />
        </div>
      </div>

      {/* Workout Table */}
      {currentWorkouts.length === 0 ? (
        <p className="text-center">No workouts available.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Rn.</th>
                <th>Workout Name</th>
              </tr>
            </thead>
            <tbody>
              {currentWorkouts.map((workout, index) => (
                <tr key={workout.workout_type_id}>
                  <td>{startIndex + index + 1}</td>
                  <td>{workout.workout_type_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Controls */}
      <div className="d-flex flex-column flex-sm-row justify-content-end gap-2 align-items-center mt-3">
        <button
          className="btn btn-secondary mb-2 mb-sm-0"
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          <FontAwesomeIcon icon={faBackward} className="me-2" />
          Prev
        </button>

        <span>Page {currentPage} of {totalPages}</span>

        <button
          className="btn btn-secondary mt-2 mt-sm-0"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          <FontAwesomeIcon icon={faForward} className="me-2" />
          Next
        </button>
      </div>
    </div>
  );
};

export default ViewWorkout;
