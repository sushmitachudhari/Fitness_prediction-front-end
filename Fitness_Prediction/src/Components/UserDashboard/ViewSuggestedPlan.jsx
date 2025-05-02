import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IoMdCloseCircle } from "react-icons/io";

function ViewSuggestedPlan() {
  const navigate = useNavigate();
  const [userid, setUserId] = useState(null);
  const [planContent, setPlanContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Fetch user ID using email
  useEffect(() => {
    const fetchUser = async () => {
      const email = localStorage.getItem("userEmail");
      if (email) {
        try {
          const res = await axios.get(`http://localhost:8080/user/getuser/${email}`);
          setUserId(res.data.userid);
        } catch (err) {
          console.error("Error fetching user data:", err);
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // Fetch the suggested plan content after userid is available
  useEffect(() => {
    if (userid) {
      axios.get(`http://localhost:8080/user/getSuggestedPlan/${userid}`)
        .then(res => {
          setPlanContent(res.data);
        })
        .catch(err => {
          console.error("Error fetching suggested plan:", err);
          setPlanContent("No suggested plan found.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [userid]);

  const downloadPlan = () => {
    const blob = new Blob([planContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `suggested_plan_user_${userid}.txt`;
    link.click();
  };

  // Request admin to suggest a plan
  const requestAdmin = async () => {
    try {
      const res = await axios.post(`http://localhost:8080/user/requestplan/${userid}`);
      setMessage(res.data);
    } catch (error) {
      console.error("Error requesting plan:", error);
      setMessage("Failed to request plan.");
    }
  };

  return (
    <div className="cont">
      <div className="head d-flex justify-content-between w-100 text-dark fw-bolder position-relative">
        <h4 className="pt-2 ps-3 text-center">Suggested Plan</h4>
        <IoMdCloseCircle
          size={28}
          className="position-absolute"
          style={{ top: "2%", right: "2%", cursor: "pointer", color: "#dc3545" }}
          onClick={() => navigate(-1)}
        />
      </div>

      <div className="p-4">
        {loading ? (
          <p className="text-center">Loading your suggested plan...</p>
        ) : (
          <>
            <pre className="border p-3 rounded" style={{ whiteSpace: "pre-wrap", background: "#f8f9fa" }}>
              {planContent}
            </pre>

            {message && <p className="text-success text-center mt-3">{message}</p>}

            <div className="d-flex align-items-center justify-content-center gap-3 mt-3">
              <button className="btn btn-dark" onClick={downloadPlan}>
                Download Plan
              </button>
              <button className="btn btn-dark" onClick={requestAdmin}>
                Request Plan
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ViewSuggestedPlan;
