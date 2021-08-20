import React, { useState } from "react";
import "./style/forgot.css";
import { Link } from "react-router-dom";
import { addNewProduct } from "../services/productServices";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import Progressbar from "./common/Progress";
export default function AddProduct({ onLogin }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loaded, setLoaded] = useState(0);
  const onFileChangeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(selectedFile);
  };
  const onImageChangeHandler = (event) => {
    setSelectedImage(event.target.files[0]);
    console.log(selectedFile);
  };
  const addNewProductHandler = async (data) => {
    const url = `${process.env.REACT_APP_URL}/api/v1/product`;
    try {
      axios.post(`${url}/addProduct`, data, {
        onUploadProgress: (ProgressEvent) => {
          // console.log((ProgressEvent.loaded / ProgressEvent.total * 100));
          setLoaded((ProgressEvent.loaded / ProgressEvent.total) * 100);
        },
      });
    } catch (error) {
      toast.error("Error: Something went Wrong !!!!");
    }
  };

  const onSubmitHandler = () => {
    const data = new FormData();
    if (selectedImage && selectedFile) {
      if (selectedFile) data.append("file", selectedFile);
      if (selectedImage) data.append("image", selectedImage);
      addNewProductHandler(data);
    } else {
      toast.warning("Please add complete info");
    }
  };
  return (
    <div className="container pt-5 mt-5 pb-5 font_fam w-50">
      <h3 className="submit-content fw-bold text-center text-uppercase mt-5">
        add new Apk
      </h3>
      <div className="mb-4 mt-5 ">
        <label htmlFor="file">Apk Image</label>
        <input
          name="file"
          type="file"
          className="form-control"
          placeholder="Choose image"
          onChange={onImageChangeHandler}
        />
      </div>
      <div className="mb-4 mt-5 ">
        <label htmlFor="file">Apk File</label>
        <input
          name="image"
          type="file"
          className="form-control"
          placeholder="Choose file"
          onChange={onFileChangeHandler}
        />
      </div>
      <Progressbar loaded={loaded} />
      <div className="cart mt-4 align-items-center">
        <button
          type="button"
          onClick={onSubmitHandler}
          className="btn text-uppercase w-100 creat_btn message_look fw-bold "
        >
          Submit
        </button>
      </div>
      <Link className="creat_look text-center fw-bold mb-4" to="/">
        <h5 className=" mb-2 mt-5 creat_look fw-bold "> Go Back</h5>
      </Link>
    </div>
  );
}
