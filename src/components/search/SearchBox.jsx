import React, { useState } from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const SearchBox = ({ onChange }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    onChange(event);  // Call the passed in onChange handler
  };

  return (
    <div className="search-box ms-6 mx-3 d-flex align-items-center">
      <i className="bi bi-search"></i>
      <InputGroup className="ms-2">
        <FormControl
          type="text"
          className="form-control"
          id="search-input"
          placeholder="Search…"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </InputGroup>
    </div>
  );
};

export default SearchBox;
