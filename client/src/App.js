import { useState, useEffect,useRef } from "react";
import "./App.css";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";

function App() {
  // DATA TO BE ENTERD
  const columns = [
    {
      name: "UserName",
      selector: (row) => row.name,
      sortable: true,
      cell: (row) => <span className="blurred">{row.name}</span>,
      style: {
        fontWeight: "bold",
        backgroundColor: "#f7f9fc",
        padding: "15px 20px",
        borderBottom: "3px solid #e1e8ed",
        textAlign: "left",
        textTransform: "lowercase",
        letterSpacing: "0.5px",
        fontSize: "0.9rem",
        color: "#52616b",
        transition: "background-color 0.3s ease-in-out",
      },
    },
    {
      name: "Available",
      selector: (row) => row.isActive,
      sortable: true,
      cell: (row) => (row.isActive ? "🔴" : "🟢"),
      style: {
        fontWeight: "bold",
        backgroundColor: "#f7f9fc",
        padding: "15px 20px",
        borderBottom: "3px solid #e1e8ed",
        textAlign: "left",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
        fontSize: "0.9rem",
        color: "#52616b",
        transition: "background-color 0.3s ease-in-out",
      },
    },
    {
      name: "Using Now",
      selector: (row) => row.your_name,
      sortable: true,
      style: {
        fontWeight: "bold",
        backgroundColor: "#f7f9fc",
        padding: "15px 20px",
        borderBottom: "3px solid #e1e8ed",
        textAlign: "left",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
        fontSize: "0.9rem",
        color: "#52616b",
        transition: "background-color 0.3s ease-in-out",
      },
    },
    {
      cell: (row) => (
        <Link to={`/update/${row._id}`}>
          <button
            id={row.ID}
            style={{ ...styles.button, ...styles.thirdButton }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
             🔄Update Status
          </button>
        </Link>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      cell: (row) => (
        <button
          onClick={() => handleViewMore(row)}
          style={{ ...styles.button, ...styles.primaryButton }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          🗑️ DELETE
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      cell: (row) => (
        <Link to={`/updated/${row._id}`}>
          <button
            id={row.ID}
            style={{ ...styles.button, ...styles.secondaryButton }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
             🆕UPDATE
          </button>
        </Link>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  // USE STATE
  const data = [];
  const [records, setRecords] = useState(data);

  // SEARCH BAR
  function handlefilter(event) {
    const searchTerm = event.target.value.toLowerCase();

    if (searchTerm.trim() === "") {
      fetch(`${process.env.REACT_APP_API_URL}`)
        .then((response) => response.json())
        .then((json) => setRecords(json));
    } else {
      const newData = records.filter((row) => {
        return row.name.toLowerCase().includes(searchTerm);
      });
      setRecords(newData);
    }
  }

  // CONNECTION WITH API
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}`)
      .then((response) => response.json())
      .then((json) => setRecords(json));
  }, []);

  // POP UP
  const [showModal, setShowModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const handleViewMore = (row) => {
    setSelectedRecord(row);
    setShowModal(true);
  };

  // DELETE API CONNECTION
  const handleDelete = async () => {
    if (selectedRecord) {
      try {
        await fetch(`${process.env.REACT_APP_API_URL}/${selectedRecord._id}`, {
          method: "DELETE",
        });
        
        const updatedRecords = records.filter(
          (record) => record._id !== selectedRecord._id
        );
        setRecords(updatedRecords);
        setShowModal(false);
      } catch (error) {
        console.error("Error deleting record:", error);
      }
    }
  };
const deleteButtonRef = useRef(null);

  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        
        event.preventDefault();
        
        deleteButtonRef.current.click();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);

  // OUTPUT
  return (
    <div style={styles.container}>
      {/* SEARCH BAR */}
      <div style={styles.inputContainer}>
        <input
          type="text"
          onChange={handlefilter}
          style={styles.input}
          placeholder="Search by Name..."
        />
      </div>

      {/* HEADER */}
      <h1 style={styles.header}>ALL WORKSPACES</h1>

      {/* Modal Or POP UP */}
      {showModal && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <span onClick={() => setShowModal(false)} style={styles.closeBtn}>
              &times;
            </span>
            <h2 style={{ textTransform: "uppercase" }}>
              {selectedRecord?.name}
            </h2>
            <b><p>Are You Sure You Want to Delete It??</p></b>
            <div style={styles.popupbtn}>
              <button
                ref={deleteButtonRef}
                onClick={handleDelete}
                style={{ ...styles.deleteButton,}}
              >
                Delete
              </button>

              <button
                className="no-button"
                onClick={() => setShowModal(false)}
                style={styles.noButton}
              >
                NO
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TABLE */}

      <div style={styles.dataTable}>
        <DataTable
          tableStyle={{ minWidth: "40rem" }}
          columns={columns}
          data={records}
          // selectableRows
          fixedHeader
          pagination
        />
      </div>
    </div>
  );
}

// CSS

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    padding: "40px",
    backgroundColor: "#f4f4f4",
    minHeight: "100vh",
  },
  header: {
    textAlign: "center",
    marginBottom: "40px",
    color: "#333",
    fontSize: "2rem",
    borderBottom: "2px solid #333",
    paddingBottom: "10px",
  },
  inputContainer: {
    marginBottom: "40px",
  },
  input: {
    width: "30%",
    padding: "15px",
    fontSize: "1rem",
    borderRadius: "25px",
    border: "2px solid #ccc",
    outline: "none",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
  },
  modal: {
    position: "fixed",
    zIndex: "3",
    left: "0",
    top: "0",
    width: "100%",
    height: "100%",
    overflow: "auto",
    backgroundColor: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fefefe",
    padding: "40px",
    textAlign: "center",
    border: "1px solid #ddd",
    borderRadius: "8px",
    maxWidth: "80%",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    position: "relative",
    overflow: "auto",
    maxHeight: "90%",
    height: "18rem",
    width: "20rem",
  },
  closeBtn: {
    position: "absolute",
    top: "10px",
    right: "10px",
    color: "#aaa",
    fontSize: "2rem",
    fontWeight: "bold",
    cursor: "pointer",
  },
  dataTable: {
    marginTop: "40px",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
  },

  button: {
    padding: "5px 15px  ",
    marginLeft: "50px",
    fontSize: "1rem",
    borderRadius: "25px",
    border: "none",
    cursor: "pointer",
    transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
    outline: "none",
    display: "inline-block",
    verticalAlign: "middle",
    textDecoration: "none",
    textAlign: "center",
    fontWeight: "600",
  },
  primaryButton: {
    backgroundColor: "#d11a2a",
    color: "#fff",
    marginLeft: "-130px",
  },
  secondaryButton: {
    backgroundColor: "#f8f9fa",
    color: "#333",
    marginLeft: "-20px",
    padding: "0 0 0 0px",
  },

  thirdButton: {
    backgroundColor: "#f8f9fa",
    color: "#333",
    marginLeft: "-190px",
    padding: "0 0 0 0px",
  },

  buttonHover: {
    transform: "scale(1.05)",
    boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.15)",
  },
  buttonActive: {
    transform: "scale(0.98)",
    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
  },

  tableHeader: {
    fontWeight: "bold",
    backgroundColor: "#f7f9fc",
    padding: "15px 20px",
    borderBottom: "3px solid #e1e8ed",
    textAlign: "left",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    fontSize: "0.9rem",
    color: "#52616b",
    transition: "background-color 0.3s ease-in-out",
  },

  popupBtn: {
    display: "flex",
    gap: "5rem",
  },

  deleteButton: {
    backgroundColor: "#d11a2a",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s ease-in-out",
    gap:"1rem"
  },

  noButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    marginTop:"60px",
    marginLeft:"20px",
    padding: "10px 30px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s ease-in-out",
  },
};

export default App;
