import React, { useState } from "react";
import axios from "axios";
import "./create.css";
// import Switch from "@mui/material/Switch";
import { useNavigate, useParams } from "react-router-dom";

export const Updatefull = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [name, setname] = useState("");
  const [response, setResponse] = useState("");

  const postData = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(
        `https://libera-workspace-server.zeabur.app/workspace/update/${_id}`,
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
        <input type="submit" value="Back" onClick={() => navigate("/")} />
        <input type="submit" value="Submit" />
      </div>
      {response && <p> {"WorkSpace Updated"}</p>}
    </form>
  );
};
