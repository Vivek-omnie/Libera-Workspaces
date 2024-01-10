import React, { useState } from "react";
import axios from "axios";
import "./create.css";
// import Switch from "@mui/material/Switch";
import { useNavigate, useParams } from "react-router-dom";

export const Update = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [your_name, setyour_name] = useState("");
  const [isActive] = useState(false);
  const [response, setResponse] = useState("");

  const postData = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:3000/workspace/${_id}`,
        {
          your_name: your_name,
          isActive: your_name ? true : false,
        }
      );
      setResponse(response.data);
      navigate("/");
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <form onSubmit={postData}>
      <label>
        Your Name:
        <input
          type="text"
          name="your_name"
          value={your_name}
          onChange={(e) => setyour_name(e.target.value)}
        />
        {isActive && !your_name.trim() && (
          <p className="error">Your Name is mandatory when isActive is true.</p>
        )}
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
        <input type="submit" value="Back" onClick={() => navigate("/")} />
        <input type="submit" value="Submit" />
      </div>
      {response && <p> {"WorkSpace Updated"}</p>}
    </form>
  );
};
