import React from "react";

const Footer = () => {

  return (

    <footer
      style={{
        background: "#111827",
        color: "white",
        padding: "15px 20px",
        textAlign: "center",
        marginTop: "auto",
      }}
    >

      <p
        style={{
          margin: 0,
          fontSize: "14px",
        }}
      >

        © {new Date().getFullYear()} Smart Society Management System

      </p>

    </footer>
  );
};

export default Footer;