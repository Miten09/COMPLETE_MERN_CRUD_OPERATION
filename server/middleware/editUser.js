const Book = require("../model/bookSchema");

const editUser = async (req, res, next) => {
  try {
    const _id = req.params.id;
    console.log(_id);
    const onlyOneBook = await Book.findById(_id);

    // res.status(201).send(onlyOneBook);
    if (!onlyOneBook) {
      res.status(404).json({
        error: "Book not found",
      });
    }
    req.rootUser = onlyOneBook;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = editUser;
