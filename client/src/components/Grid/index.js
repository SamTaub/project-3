import React from "react";

// This Container component allows us to use a bootstrap container without worrying about class names
export function Container({ styles, children }) {
  return <div className={`container ${styles}`}>{children}</div>;
}

// This Row component lets us use a bootstrap row without having to think about class names
export function Row({ styles, children }) {
  return <div className={`row ${styles}`}>{children}</div>;
}

// This Col component lets us size bootstrap columns with less syntax
// e.g. <Col size="md-12"> instead of <div className="col-md-12">
export function Col({ size, children }) {
  return (
    <div
      className={size
        .split(" ")
        .map(size => "col-" + size)
        .join(" ")}
    >
      {children}
    </div>
  );
}
