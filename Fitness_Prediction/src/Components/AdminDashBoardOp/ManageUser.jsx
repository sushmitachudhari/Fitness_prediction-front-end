import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IoMdCloseCircle } from "react-icons/io";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward, faForward, faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import "./AdminPanel.css";

const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All"); // <-- Added this
  const navigate = useNavigate();

  const fetchUsers = () => {
    axios
      .get("http://localhost:8080/admin/viewusers")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const suggestPlan = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8080/admin/suggest/${userId}`);
      alert(response.data);
    } catch (error) {
      console.error("Error suggesting plan:", error);
      const message = error.response?.data || "Failed to suggest a plan for the user";
      alert(message);
    }
  };

  const updateUserStatus = async (userId, newStatus) => {
    try {
      await axios.put(`http://localhost:8080/admin/updateUserStatus/${userId}/${newStatus}`);
      fetchUsers();
    } catch (error) {
      console.error("Error updating user status:", error);
      alert("Failed to update user status.");
    }
  };

  const filteredUsers = users
    .filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter((user) => {
      if (filterStatus === "All") return true;
      if (filterStatus === "Approved") return user.statuss === "Approve";
      if (filterStatus === "Rejected") return user.statuss === "Reject";
      if (filterStatus === "Pending") return user.statuss === "Pending";
      return true;
    });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  const goToPrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePageSizeChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setItemsPerPage(value);
      setCurrentPage(1);
    }
  };

  return (
    <div className="container mt-4 cont p-3 position-relative">
      <h3 className="text-center mb-4">All Registered Users</h3>
      <IoMdCloseCircle
        size={28}
        className="position-absolute"
        style={{ top: "2%", right: "2%", cursor: "pointer", color: "#dc3545" }}
        onClick={() => navigate(-1)}
      />

      {/* Search and Items Per Page */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-3">
        <input
          type="text"
          className="form-control"
          style={{ maxWidth: "250px", boxShadow: "0 0 5px rgba(129, 129, 129, 0.5)" }}
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          style={{ maxWidth: "150px", boxShadow: "0 0 5px rgba(129, 129, 129, 0.5)" }}
          placeholder="Items per page"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handlePageSizeChange(e);
            }
          }}
        />
      </div>

      {/* Filter Buttons */}
      <div className="d-flex justify-content-center mb-4 flex-wrap gap-2">
        <button
          className={`btn ${filterStatus === "All" ? "btn-secondary" : "btn-outline-secondary"}`}
          onClick={() => setFilterStatus("All")}
        >
          All
        </button>
        <button
          className={`btn ${filterStatus === "Approved" ? "btn-success" : "btn-outline-success"}`}
          onClick={() => setFilterStatus("Approved")}
        >
          Approved
        </button>
        <button
          className={`btn ${filterStatus === "Rejected" ? "btn-danger" : "btn-outline-danger"}`}
          onClick={() => setFilterStatus("Rejected")}
        >
          Rejected
        </button>
        <button
          className={`btn ${filterStatus === "Pending" ? "btn-warning" : "btn-outline-warning"}`}
          onClick={() => setFilterStatus("Pending")}
        >
          Pending
        </button>
      </div>

      {/* Table */}
      <div className="table-responsive" style={{ overflowX: "auto" }}>
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Rn.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Height</th>
              <th>Weight</th>
              <th>Suggest Plan</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">No users found.</td>
              </tr>
            ) : (
              paginatedData.map((user, index) => (
                <tr key={user.userid}>
                  <td>{startIndex + index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.height}</td>
                  <td>{user.weight}</td>
                  <td>
                    <button
                      className="btn btn-outline-info btn-sm rp"
                      onClick={() => suggestPlan(user.userid)}
                    >
                      Recommend Plan
                    </button>
                  </td>
                  <td>
  {user.statuss === "Approve" ? (
    <span className="badge bg-success">Approved</span>
  ) : (
    <>
    {user.statuss !== "Reject" &&(
      <button
        className="btn btn-outline-success btn-sm me-1"
        onClick={() => updateUserStatus(user.userid, 1)}
      >
        <FontAwesomeIcon icon={faCheckCircle} />
      </button>)}
      {user.statuss === "Pending" && (
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={() => updateUserStatus(user.userid, -1)}
        >
          <FontAwesomeIcon icon={faTimesCircle} />
        </button>
      )}
      {user.statuss === "Reject" ? (
       <button
       className="btn btn-outline-success btn-sm me-1"
       onClick={() => updateUserStatus(user.userid, 1)}
     ><FontAwesomeIcon icon={faCheckCircle} /> Re-Approve
    </button>
      ):null}
    </>
  )}
</td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-end align-items-center mt-3 flex-wrap gap-2">
        <button className="btn btn-secondary" onClick={goToPrevious} disabled={currentPage === 1}>
          <FontAwesomeIcon icon={faBackward} /> Prev
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button className="btn btn-secondary" onClick={goToNext} disabled={currentPage === totalPages}>
          Next <FontAwesomeIcon icon={faForward} />
        </button>
      </div>
    </div>
  );
};

export default ViewUsers;
