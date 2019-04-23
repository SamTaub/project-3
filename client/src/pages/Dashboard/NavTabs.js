import React from "react";
import "./Dashboard.css";

function NavTabs(props) {
  return (
    <ul className="nav nav-pills">
      <li className="nav-item">
        <a
          href="#published"
          onClick={() => props.handleTabClick("Published")}
          className={props.currentTab === "Published" ? "nav-link active" : "nav-link"}
        >
          Published
        </a>
      </li>
      <li className="nav-item">
        <a
          href="#drafts"
          onClick={() => props.handleTabClick("Drafts")}
          className={props.currentTab === "Drafts" ? "nav-link active" : "nav-link"}
        >
          Drafts
        </a>
      </li>
      <li className="nav-item">
        <a
          href="#favorites"
          onClick={() => props.handleTabClick("Favorites")}
          className={props.currentTab === "Favorites" ? "nav-link active" : "nav-link"}
        >
          Favorites
        </a>
      </li>
    </ul>
  );
}

export default NavTabs;
