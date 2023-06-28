import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function CreateForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, seterror] = useState({
    title: false,
    author: false,
    pages: false,
    rating: false,
    date: false,
    country: false,
    quantity: false,
  });

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
    console.log([name][0]);
    seterror({ ...error, [name]: false });
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
      // window.alert("Plzz field all fields");
      if (formData.title === "") {
        if (formData.author === "") {
          if (formData.pages === "") {
            if (formData.rating === "") {
              if (formData.date === "") {
                if (formData.country === "") {
                  if (formData.quantity === "") {
                    seterror({
                      title: true,
                      author: true,
                      pages: true,
                      rating: true,
                      date: true,
                      country: true,
                      quantity: true,
                    });
                  }
                }
              }
            }
          }
        }
      }
    } else if (res.status === 401) {
      window.alert("This book is already exists");
    } else {
      window.alert("Book added successfully");
      navigate("/book-details");
    }
  }

  async function handleUpdate(e) {
    // console.log(location.state);
    e.preventDefault();
    const { title, author, pages, rating, date, country, quantity } = formData;
    const res = await fetch(`/update/${location.state}`, {
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
    console.log(res);
    if (res.status === 401) {
      window.alert("book already exists please update to another book");
    } else {
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

  const fetchData = async () => {
    // console.log(location);
    const res = await fetch(`/all-details/${location.state}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    if (data) {
      setFormData({
        title: data?.title,
        author: data?.author,
        pages: data?.pages,
        rating: data?.rating,
        date: data?.date,
        country: data?.country,
        quantity: data?.quantity,
      });
    }
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
            {error.title ? <p style={{ color: "red" }}>Enter title</p> : ""}
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
            {error.author ? <p style={{ color: "red" }}>Enter Author</p> : ""}
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
          {error.pages ? <p style={{ color: "red" }}>Enter pages</p> : ""}
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
          {error.rating ? <p style={{ color: "red" }}>Enter rating</p> : ""}
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
            {error.date ? <p style={{ color: "red" }}>Enter date</p> : ""}
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
            {error.country ? <p style={{ color: "red" }}>Enter country</p> : ""}
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
            {error.quantity ? (
              <p style={{ color: "red" }}>Enter quantity</p>
            ) : (
              ""
            )}
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
