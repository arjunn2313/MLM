import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FaEdit, FaTrash, FaUpload } from "react-icons/fa"; // Import the required icons

export const SortableItem = ({ id, image, onEdit, onRemove, onUpload }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    width: "100px",
    height: "100px",
    cursor: "grab",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #ccc",
    borderRadius: "8px",
    overflow: "hidden",
    position: "relative",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <img
        src={`${import.meta.env.VITE_API_BASE_URL}/${image}`}
        alt={image.name}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />

      {/* Remove Icon */}
      <FaTrash
        size={25}
        onClick={(e) => onRemove(e,id)}
        style={{
          position: "absolute",
          bottom: "5px",
          right: "5px",
          fontSize: "18px",
          color: "#fff",
          cursor: "pointer",
          background: "rgba(0, 0, 0, 0.6)",
          borderRadius: "50%",
          padding: "5px",
        }}
      />

      {/* Upload Icon and Input */}
      <label
        style={{
          position: "absolute",
          bottom: "5px",
          left: "5px",
          background: "rgba(0, 0, 0, 0.6)",
          borderRadius: "50%",
          padding: "5px",
          cursor: "pointer",
        }}
      >
        <FaUpload style={{ fontSize: "18px", color: "#fff" }} />
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => onUpload(e, id)}
        />
      </label>
    </div>
  );
};
