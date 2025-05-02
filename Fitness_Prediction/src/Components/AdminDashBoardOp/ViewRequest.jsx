import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IoMdCloseCircle } from "react-icons/io";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward, faForward, faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import "./AdminPanel.css";

function ViewRequest(){
     const [data, setdata] = useState([]);
      const [currentPage, setCurrentPage] = useState(1);
      const [itemsPerPage, setItemsPerPage] = useState(5);
    const navigate = useNavigate();
    const fetchdata =() =>{
     axios.get("http://localhost:8080/admin/getrequesteduser").then((res)=>setdata(res.data)).catch((error)=>console.error("Error Fetching Requests",error));
    };
      useEffect(() => {
        fetchdata();
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
      const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

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
    
return(
    <div className="cont p-3 mt-4 container position-relative">
              <h3 className="text-center mb-4">All Registered Users</h3>
                   <IoMdCloseCircle
                     size={28}
                     className="position-absolute"
                     style={{ top: "2%", right: "2%", cursor: "pointer", color: "#dc3545" }}
                     onClick={() => navigate(-1)}
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
                   <div className="table-responsive" style={{overflow:"auto"}}>
                    <table className=" table table-bordered table-striped">
                        <thead className="table-dark">
                            <tr>
                                <th>Rn.</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Requested Date</th>
                                <th>Assign Plan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.length ===0?(
                                <tr>
                                    <td colSpan="7" className="text-center">No Request Found !!! </td>
                                </tr>
                            ):(paginatedData.map((dt,index)=>(
                                <tr key={dt.rid}>
                                    <td>{index+1}</td>
                                    <td>{dt.name}</td>
                                    <td>{dt.email}</td>
                                    <td>{dt.requested_at}</td>
                                    <td>
                    <button
                      className="btn btn-outline-info btn-sm rp"
                      onClick={() => suggestPlan(dt.userid)}
                    >
                      Recommend Plan
                    </button>
                  </td>
                                </tr>
                            )))}
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
}
export default ViewRequest;