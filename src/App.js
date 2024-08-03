import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import Container from "react-bootstrap/Container"; 
import Row from "react-bootstrap/Row"; 
import Col from "react-bootstrap/Col"; 
import Button from "react-bootstrap/Button"; 
import InputGroup from "react-bootstrap/InputGroup"; 
import FormControl from "react-bootstrap/FormControl"; 
import ListGroup from "react-bootstrap/ListGroup"; 
import Modal from "react-bootstrap/Modal";

import React, { useState } from 'react';

function App() {
  const [userInput, setUserInput] = useState("");
  const [list, setList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  const updateInput = (value) => {
    setUserInput(value);
  };

  const addItem = () => {
    if (userInput !== "") {
      const userInputItem = {
        id: Math.random(),
        value: userInput,
        isDone: false
      };

      setList([...list, userInputItem]);
      setUserInput("");
    }
    else{
        alert("Enter item first.")
    }
  };

  const deleteItem = (key) => {
    const updatedList = list.filter((item) => item.id !== key);
    setList(updatedList);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditValue(list[index].value);
    setShowModal(true);
  };

  const saveEdit = () => {
    const updatedList = [...list];
    updatedList[editIndex].value = editValue;
    setList(updatedList);
    setShowModal(false);
  };

  const doneItem = (index) => {
    const updatedList = [...list];
    updatedList[index].isDone = !updatedList[index].isDone;
    setList(updatedList);
  };

  return (
    <Container>
      <Row
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "3rem",
          fontWeight: "bolder",
        }}
      >
        TODO LIST
      </Row>

      <hr />
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Add an item . . . "
              size="lg"
              value={userInput}
              onChange={(e) => updateInput(e.target.value)}
              aria-label="add something"
              aria-describedby="basic-addon2"
            />
            <InputGroup>
              <Button
                variant="primary"
                className="mt-2"
                onClick={addItem}
              >
                ADD ITEM
              </Button>
            </InputGroup>
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <ListGroup>
            {list.map((item, index) => (
              <div key={item.id}>
                <ListGroup.Item
                  variant="dark"
                  action
                  style={{
                    display: "flex",
                    justifyContent: 'space-between',
                    textDecoration: item.isDone ? 'line-through' : 'none'
                  }}
                >
                  {item.value}
                  <span>
                    <Button
                      style={{ marginRight: "10px" }}
                      variant="danger"
                      onClick={() => deleteItem(item.id)}
                    >
                      Delete
                    </Button>
                    <Button
                      style={{ marginRight: "10px" }}
                      variant="warning"
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </Button>

                    <Button
                      variant={item.isDone ? "secondary" : "success"}
                      onClick={() => doneItem(index)}
                    >
                      {item.isDone ? "Undone" : "Done"}
                    </Button>
                  </span>
                </ListGroup.Item>
              </div>
            ))}
          </ListGroup>
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormControl
            placeholder="Edit item . . . "
            size="lg"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={saveEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default App;
