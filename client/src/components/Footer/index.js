import React from "react";
import "./style.css";

function Footer(props) {
  return (
    <footer className="page-footer font-small pt-4">
      <div className="container">
        <div className="text-center">
          Made with <i className="fas fa-heart" /> and{" "}
        <i className="fas fa-mug-hot" />
        </div>
      </div>

      <div className="footer-copyright text-center py-3">
        © 2019 Copyright:
        <a
          className="btn-floating btn-github mx-1"
          href="https://github.com/SamTaub/project-3"
          target="_blank" rel="noopener noreferrer"
        >
          <i className="fab fa-github"> </i>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
