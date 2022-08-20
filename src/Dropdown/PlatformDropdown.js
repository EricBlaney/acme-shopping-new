import React, { useState } from "react";
import { platformDropdown } from "./NavItems";
import { Link } from "react-router-dom";

function platformDropDown() {
    const [dropdown, setDropdown] = useState(false);
  
    return (
      <>
        <ul
          className={dropdown ? "platform-submenu clicked" : "platform-submenu"}
          onClick={() => setDropdown(!dropdown)}
        >
          {platformDropdown.map((item) => {
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
  
  export default platformDropDown;