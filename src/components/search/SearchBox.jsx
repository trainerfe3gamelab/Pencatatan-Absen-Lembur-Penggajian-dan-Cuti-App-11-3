import React, { useState } from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="search-box ms-6 mx-3 d-flex align-items-center">
      <i class="bi bi-search"></i>
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
