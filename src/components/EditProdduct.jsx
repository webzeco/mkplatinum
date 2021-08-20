import React, { useEffect, useState } from "react";
import "./style/forgot.css";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Progressbar from "./common/Progress";

export default function EditProduct({ product }) {
  const history = useHistory();

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
  const editProductHandler = async (data, id) => {
    try {
      const url = `${process.env.REACT_APP_URL}/api/v1/product`;
      axios
        .patch(`${url}/updateProduct/${id}`, data, {
          onUploadProgress: (ProgressEvent) => {
            console.log((ProgressEvent.loaded / ProgressEvent.total) * 100);
            setLoaded((ProgressEvent.loaded / ProgressEvent.total) * 100);
          },
        })
        .then((response) => {
          toast.success("Success :Apk Successfully Updated !!!");
          console.log(response);
        });
      // history.push('/');
    } catch (error) {
      toast.error("Error: Something went Wrong !!!!");
    }
  };

  const onSubmitHandler = () => {
    const data = new FormData();
    if (selectedImage || selectedFile) {
      if (selectedFile) data.append("file", selectedFile);
      if (selectedImage) data.append("image", selectedImage);
      editProductHandler(data, product.id);
    }
  };

  useEffect(() => {
    console.log(product);
    if (!product) {
      history.push("/");
    }
    return () => {
      console.log("clean up");
    };
  }, []);
  return (
    <div className="container pt-5 mt-5 pb-5 font_fam w-75">
      <h3 className="submit-content fw-bold text-center text-uppercase mt-3 mb-4">
        Edit Apk
      </h3>
      <div className="card text-center p-3">
        <div>
          <img
            src={`${process.env.REACT_APP_URL}/img/${product.image}`}
            className="img-fluid mb-3"
            style={{ height: "100px", width: "100px", borderRadius: "50px" }}
            alt="apk img"
          />
        </div>
        <div>
          <h6 className="fw-bold">{product.name}</h6>
        </div>
        <div>
          <h6>{product.size}MB</h6>
        </div>
        <div>
          <h6>{product.modifiedAt}</h6>
        </div>
      </div>
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
      <Progressbar loaded={loaded} type="circle" />
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
