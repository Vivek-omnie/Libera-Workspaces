import React, { useState } from "react";
import axios from "axios";
import "./create.css";
import { useNavigate } from "react-router-dom";

export const Create = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [isActive] = useState(false);
  const [response, setResponse] = useState("");

  const postData = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/create`,
        {
          name: name,
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
      <input type="submit" value="Submit" />
      {response && <p> {"WorkSpace Added"}</p>}
    </form>
  );
};
