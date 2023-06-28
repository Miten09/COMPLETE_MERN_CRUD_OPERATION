import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function BookDetails() {
  const navigate = useNavigate();
  const [formDetails, setFormDetails] = useState([]);
  const [loading, setloading] = useState(true);

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

  async function handleDelete(val) {
    console.log(val._id);
    const res = await fetch(`/delete/${val._id}`, {
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

  async function handleEdit(val) {
    const res = await fetch(`/all-details/${val._id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    if (data) {
      navigate("/form-fill", { state: data });
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
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
                  <td>{val.date}</td>
                  <td>{val.country}</td>
                  <td>{val.quantity}</td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-warning"
                      onClick={() => {
                        handleEdit(val);
                      }}
                    >
                      Edit
                    </button>
                    &nbsp;
                    <button
                      type="button"
                      class="btn btn-danger"
                      onClick={() => {
                        handleDelete(val);
                      }}
                    >
                      Delete
                    </button>
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
