import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

const Navigation = ({ libraryIsOpen, setLibraryIsOpen }) => {
  return (
    <nav>
      <h1>Deeze</h1>
      <button onClick={() => setLibraryIsOpen(!libraryIsOpen)}>
        Library
        <FontAwesomeIcon icon={faMusic} />
      </button>
    </nav>
  );
};

export default Navigation;
