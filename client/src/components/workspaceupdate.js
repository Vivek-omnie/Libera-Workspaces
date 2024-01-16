import React, { useState,useEffect,useRef } from "react";
import axios from "axios";
import "./create.css";
// import Switch from "@mui/material/Switch";
import { useNavigate, useParams } from "react-router-dom";

export const Updatefull = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [name, setname] = useState("");
  const [response, setResponse] = useState("");
  const submitButtonRef = useRef(null);

  const postData = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/update/${_id}`,
        {
          name: name,
        }
      );
      setResponse(response.data);
      navigate("/");
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
   
        event.preventDefault();
    
        submitButtonRef.current.click();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <form onSubmit={postData}>
      <h2 style={{ textAlign: "center" }}>Enter Updated Details</h2>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setname(e.target.value)}
          required
        />
      </label>

      <div>
        {/* <label>
          isActive:
          <Switch
            checked={isActive}
            onChange={(e) => setisActive(e.target.checked)}
          />
        </label> */}
      </div>
      <div className="submit-buttons">
        <input  type="submit" value="Back" onClick={() => navigate("/")} />
        <input ref={submitButtonRef} type="submit" value="Submit" />
      </div>
      {response && <p> {"WorkSpace Updated"}</p>}
    </form>
  );
};
