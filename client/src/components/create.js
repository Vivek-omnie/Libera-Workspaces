import React, { useState } from "react";
import axios from "axios";
import "./create.css";
import { useNavigate } from "react-router-dom";

export const Create = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [registrationKey, setRegistrationKey] = useState("");
  const [password, setpassword] = useState("");
  const [isActive] = useState(false);
  const [response, setResponse] = useState("");

  const postData = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/workspace/create",
        {
          name: name,
          registration_key: registrationKey,
          password: password,
          isActive: isActive,
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
      <h2 style={{textAlign:"center"}}>Enter Details</h2>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        Registration Code:
        <select
          name="registration_key"
          value={registrationKey}
          onChange={(e) => setRegistrationKey(e.target.value)}
          required
        >
          <option value="" disabled>Select a Registration Code</option>
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
      <input type="submit" value="Submit" />
      {response && <p> {"WorkSpace Added"}</p>}
    </form>
  );
};
