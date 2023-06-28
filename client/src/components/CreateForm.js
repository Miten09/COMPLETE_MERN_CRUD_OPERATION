import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function CreateForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    pages: "",
    rating: "",
    date: "",
    country: "",
    quantity: "",
  });

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // console.log("formdata", formData);
    const { title, author, pages, rating, date, country, quantity } = formData;
    const res = await fetch("/add-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        author,
        pages,
        rating,
        date,
        country,
        quantity,
      }),
    });
    const data = await res.json();
    console.log("data", data);
    console.log("resp", res);

    if (res.status === 402) {
      window.alert("Plzz field all fields");
    } else if (res.status === 401) {
      window.alert("This book is already exists");
    } else {
      window.alert("Book added successfully");
      navigate("/book-details");
    }
  }

  async function handleUpdate(e) {
    // console.log(location.state._id);
    e.preventDefault();
    const { title, author, pages, rating, date, country, quantity } = formData;
    const res = await fetch(`/update/${location.state._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        author,
        pages,
        rating,
        date,
        country,
        quantity,
      }),
    });
    const data = await res.json();
    if (data) {
      window.alert("Data updated successfully");
      setFormData({
        title: "",
        author: "",
        pages: "",
        rating: "",
        date: "",
        country: "",
        quantity: "",
      });
    }
  }

  const fetchData = () => {
    // console.log(location);
    setFormData({
      title: location?.state?.title,
      author: location?.state?.author,
      pages: location?.state?.pages,
      rating: location?.state?.rating,
      date: location?.state?.date,
      country: location?.state?.country,
      quantity: location?.state?.quantity,
    });
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <form method="POST" className="w-50" style={{ marginLeft: "25%" }}>
        <h2 style={{ textAlign: "center" }}>Book Details</h2>
        <div className="form-row ">
          <div className="form-group col-md-6">
            <label htmlFor="inputEmail4">Book Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Title"
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputPassword4">Author</label>
            <input
              type="text"
              className="form-control"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Author"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="inputAddress">Total Pages</label>
          <input
            type="text"
            className="form-control"
            id="pages"
            name="pages"
            value={formData.pages}
            onChange={handleChange}
            placeholder="Pages"
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputAddress2">Ratings</label>
          <input
            type="text"
            className="form-control"
            id="rating"
            value={formData.rating}
            onChange={handleChange}
            name="rating"
            placeholder="Rating"
          />
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputCity">Publish Date</label>
            <input
              type="date"
              className="form-control"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              placeholder="Date"
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputCity">Country</label>
            <input
              type="text"
              className="form-control"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Country"
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputCity">Quantity</label>
            <input
              type="text"
              className="form-control"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Quantity"
            />
          </div>
        </div>

        <button
          type="submit"
          id="submit"
          className="btn btn-primary"
          onClick={location.state ? handleUpdate : handleSubmit}
        >
          {location.state ? "Update" : "Create"}
        </button>
      </form>
    </>
  );
}

export default CreateForm;
