const express = require("express");
const Book = require("../model/bookSchema");
const editBooks = require("../middleware/editUser");
const router = express.Router();

// Create Books In Database

router.post("/add-data", async (req, res) => {
  const { title, author, pages, rating, date, country, quantity } = req.body;
  if (
    !title ||
    !author ||
    !pages ||
    !rating ||
    !date ||
    !country ||
    !quantity
  ) {
    return res.status(402).json({
      error: "Please fill all details",
    });
  }
  try {
    const existingBook = await Book.findOne({ title });
    if (existingBook) {
      return res.status(401).json({
        error: "This book is already exists",
      });
    } else {
      const newBook = new Book({
        title,
        author,
        pages,
        rating,
        date,
        country,
        quantity,
      });
      await newBook.save();

      res.status(200).json({
        message: "Book Added successfully",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

// Get All details of Books from Database

router.get("/all-details", async (req, res) => {
  try {
    const findAllBooks = await Book.find();
    res.status(200).send(findAllBooks);
  } catch (error) {
    console.log(error);
  }
});

// Get Particular Details of Book Using MongoID from Database

router.get("/all-details/:id", editBooks, (req, res) => {
  res.send(req.rootUser);
});
module.exports = router;

// Delete Book Document from Database

router.delete("/delete/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const deleteBook = await Book.findByIdAndDelete(_id);
    res.status(201).send(deleteBook);
  } catch (error) {
    console.log(error);
  }
});

// Update Books from Database

router.patch("/update/:id", async (req, res) => {
  try {
    const _id = req.params.id;

    const updateBook = await Book.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.status(201).send(updateBook);
  } catch (error) {
    res.status(401).send(error);
  }
});
