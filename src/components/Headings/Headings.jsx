import React from "react";

export default function Heading({ text, color }) {
  return (
    <h2
      className={`text-xl font-bold ${color != "default" && "text-primary "}`}
    >
      {text}
    </h2>
  );
}
