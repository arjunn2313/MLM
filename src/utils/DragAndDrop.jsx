import React, { useState, useEffect, useRef } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";
import {
    useDeleteImage,
  useUpdateImageIndex,
  useUpdateProductImage,
  useUploadImage,
} from "../hooks/useProduct";

const ImageReorder = ({ images, onUpdateOrder, id }) => {
  const [imageList, setImageList] = useState(images);
  const { mutate: updateImageOrder } = useUpdateImageIndex();
  const { mutate: updateImage } = useUpdateProductImage();
  const { mutate: uploadImage, isLoading } = useUploadImage();
  const { mutate: deleteImage } = useDeleteImage();
  const fileInputRef = useRef(null);

  useEffect(() => {
    setImageList(images);
  }, [images]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Function to change image order
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = active.id;
      const newIndex = over.id;

      if (oldIndex === undefined || newIndex === undefined) {
        console.error("Index not found for drag-and-drop.");
        return;
      }

      const newImageList = arrayMove(imageList, oldIndex, newIndex);
      setImageList(newImageList);

      onUpdateOrder(newImageList);

      updateImageOrder({
        productId: id,
        sourceIndex: oldIndex,
        destinationIndex: newIndex,
      });
    }
  };

  // Function to upload new image
  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    let productId = id;

    updateImage(
      { productId, file, index },
      {
        onSuccess: (updatedData) => {
          const updatedPhotos = [...imageList];
          updatedPhotos[index] = updatedData.photos[index];
          setImageList(updatedPhotos);
        },
      }
    );
  };

  // Function to handle image edit
  const handleEdit = (imageId) => {
    console.log("Edit image with id:", imageId);
  };

  const handleRemove = (imageId) => {
    console.log("Removing image with id:", imageId);
  
    // Create a new array excluding the image with the specified imageId
    const updatedImageList = imageList.filter((image) => image._id !== imageId);
  
    // Update the state with the new array
    setImageList(updatedImageList);
  
    // Log the removal action
    console.log("Image removed successfully");
  };
  
  

  const handleAddImageClick = () => {
    // Trigger the file input to open the file selection dialog
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      toast.error("Please select a file to upload!");
      return;
    }

    uploadImage(
      { productId: id, file },
      {
        onSuccess: () => {
          toast.success("Image uploaded successfully!");
          console.log("Image uploaded successfully!");
        },
        onError: (error) => {
          console.error("Upload failed:", error);
        },
      }
    );
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={imageList.map((img, index) => index)} // Use index for the items
        strategy={verticalListSortingStrategy}
      >
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {imageList.map((image, index) => (
            <SortableItem
              key={index}
              id={index}
              image={image}
              onEdit={handleEdit}
              onRemove={handleRemove}
              onUpload={handleImageUpload}
            />
          ))}

          {/* Add New Image Placeholder */}
          <div
            style={{
              width: "100px",
              height: "100px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              backgroundColor: "#f0f0f0",
              color: "#ccc",
            }}
            onClick={handleAddImageClick}
          >
            <span>+ Add Image</span>
          </div>

          {/* Hidden file input to trigger file manager */}
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default ImageReorder;
