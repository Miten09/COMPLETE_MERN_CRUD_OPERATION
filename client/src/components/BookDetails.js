import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function BookDetails() {
  const navigate = useNavigate();
  const [formDetails, setFormDetails] = useState([]);
  const [loading, setloading] = useState(true);
  const [show, setshow] = useState(false);

  //   console.log(formDetails[0].state.title);

  function handleClose() {
    setshow(false);
  }

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

  async function handleDelete() {
    const id = localStorage.getItem("id");
    console.log(id);

    setshow(false);
    const res = await fetch(`/delete/${id}`, {
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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="text-center">Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Do you really want to delete these records? This process cannot be
          undone
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      ;
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
                        setshow(true);
                        localStorage.setItem("id", val._id);
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
