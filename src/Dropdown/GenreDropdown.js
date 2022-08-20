import React, { useState } from "react";
import { genreDropdown } from "./NavItems";
import { Link } from "react-router-dom";

function genreDropDown() {
    const [dropdown, setDropdown] = useState(false);
  
    return (
      <>
        <ul
          className={dropdown ? "genre-submenu clicked" : "genre-submenu"}
          onClick={() => setDropdown(!dropdown)}
        >
          {genreDropdown.map((item) => {
            return (
              <li key={item.id}>
                <Link
                  to={item.path}
                  className={item.cName}
                  onClick={() => setDropdown(false)}
                >
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </>
    );
  }
  
  export default genreDropDown;