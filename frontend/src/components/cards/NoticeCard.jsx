import React from "react";

const NoticeCard = ({
  title,
  description,
  date,
}) => {

  return (

    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "10px",
        boxShadow:
          "0 2px 5px rgba(0,0,0,0.1)",
        marginBottom: "15px",
      }}
    >

      <h2>{title}</h2>

      <p>
        {description}
      </p>

      <small>
        {new Date(date)
          .toLocaleDateString()}
      </small>

    </div>
  );
};

export default NoticeCard;