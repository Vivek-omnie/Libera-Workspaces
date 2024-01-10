import React, { useState } from "react";
import axios from "axios";
import "./create.css";
// import Switch from "@mui/material/Switch";
import { useNavigate, useParams } from "react-router-dom";

export const Updatefull = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  const [registration_key, setregistration_key] = useState("");
  const [response, setResponse] = useState("");

  const postData = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:3000/workspace/update/${_id}`,
        {
          name: name,
          password: password,
          registration_key: registration_key,
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
      <label>
        Registration Code:
        <select
          type="text"
          name="registration_key"
          value={registration_key}
          onChange={(e) => setregistration_key(e.target.value)}
          required
        >
          <option value="" disabled>
            Select a Registration Code
          </option>
          <option value="wsbom+G32VU3">wsbom+G32VU3</option>
          <option value="SLiad+YKP85C">SLiad+YKP85C</option>
        </select>
      </label>
      <label>
        Password:
        <input
          type="text"
          name="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
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
