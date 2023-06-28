import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <>
      <NavLink to="form-fill">Form</NavLink>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <NavLink to="book-details">List</NavLink>
    </>
  );
}

export default Navbar;
