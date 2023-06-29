import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ConfirmModal from "./ConfirmModal";

function BookDetails() {
  const navigate = useNavigate();
  const [formDetails, setFormDetails] = useState([]);
  const [loading, setloading] = useState(true);
  const [show, setshow] = useState(false);
  const [deleteid, setdeleteid] = useState("");

  //   console.log(formDetails[0].state.title);

  async function fetchData() {
    const res = await fetch("/all-details", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    // console.log(data);
    if (data) {
      setFormDetails(data);
      setloading(false);
    }
  }

  function handleClose() {
    setshow(false);
  }

  function handleDeleteOpenModal(val) {
    setshow(true);
    setdeleteid(val._id);
  }

  async function handleDelete() {
    console.log(deleteid);
    setshow(false);
    const res = await fetch(`/delete/${deleteid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    // console.log(data);
    if (data) {
      fetchData();
    }
  }

  function handleEdit(val) {
    navigate("/form-fill", { state: val._id });
  }

  // function alert() {
  //   alert("hello");
  // }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <ConfirmModal
        modal={show}
        deleteOne={handleDelete}
        handleCloseNew={handleClose}
      />

      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Book-Title</th>
            <th scope="col">Author</th>
            <th scope="col">Total-Pages</th>
            <th scope="col">Ratings</th>
            <th scope="col">Publish-Date</th>
            <th scope="col">Country</th>
            <th scope="col">Quantity</th>
            <th scope="col" style={{ marginLeft: "3%" }}>
              Actions
            </th>
          </tr>
        </thead>
        {loading ? (
          <h2 style={{ marginLeft: "270%" }}>Loading...</h2>
        ) : (
          formDetails.map((val, index) => {
            return (
              <React.Fragment key={index}>
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{val.title}</td>
                  <td>{val.author}</td>
                  <td>{val.pages}</td>
                  <td>{val.rating}</td>
                  <td>{new Date(val.date).toDateString()}</td>
                  <td>{val.country}</td>
                  <td>{val.quantity}</td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => {
                        handleEdit(val);
                      }}
                    >
                      Edit
                    </Button>
                    &nbsp;&nbsp;
                    <Button
                      variant="danger"
                      onClick={() => {
                        handleDeleteOpenModal(val);
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              </React.Fragment>
            );
          })
        )}
      </table>
    </>
  );
}

export default BookDetails;
