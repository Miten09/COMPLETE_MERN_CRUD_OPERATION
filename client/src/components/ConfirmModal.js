import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ConfirmModal({ modal, deleteOne, handleCloseNew }) {
  function handleClose() {
    // console.log(show);
    handleCloseNew();
  }

  function handleDelete() {
    deleteOne();
  }

  return (
    <>
      <Modal show={modal} onHide={handleClose}>
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
    </>
  );
}

export default ConfirmModal;
