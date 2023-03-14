import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/profile/${keyword}`);
    } else {
      history.push("/");
    }
    setKeyword("");
  };

  return (
    <Form onSubmit={submitHandler} className='d-flex' inline>
      <Form.Control
        type='search'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search'
        className='mr-sm-2 ml-sm-5 me-2'
        aria-label='Search'
      />
      <Button onClick={submitHandler} variant='outline-success'>
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
