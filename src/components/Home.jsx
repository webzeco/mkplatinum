import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  deleteProduct,
  editProduct,
  getAllProducts,
} from "../services/productServices";
import DownloadBtn from "./common/DownloadBtn";
import Progressbar from "./common/Progress";
import { RechargeContext } from "./contexts/rechargeContact";
import { UserContext } from "./contexts/UserContext";
import "./style/home.css";
const FileDownload = require("js-file-download");

const Home = ({ editProduct }) => {
  const { user } = useContext(UserContext);
  const { rechargeProdHandler } = useContext(RechargeContext);

  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(0);
  useEffect(() => {
    getAllProductHandler();
    return () => {};
  }, []);

  const getAllProductHandler = async () => {
    const { data } = await getAllProducts();
    console.log(data.data);
    setProducts(data.data);
  };
  function copyToClipboard(text) {
    const elem = document.createElement("textarea");
    elem.value = text;
    document.body.appendChild(elem);
    elem.select();
    document.execCommand("copy");
    document.body.removeChild(elem);
  }
  const onDownloadHandler = (id, name) => {
    const url = `${process.env.REACT_APP_URL}/api/v1/product/download/${id}`;
    axios({
      url,
      method: "GET",
      responseType: "blob", // Important
      onDownloadProgress: (ProgressEvent) => {
        setLoaded(
          Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100)
        );
      },
    }).then((response) => {
      console.log(response);
      FileDownload(response.data, name);
    });
  };
  const onDeleteHandler = async (id) => {
    const preProducts = [...products];
    const filtered = products.filter((prod) => prod.id !== id);
    setProducts(filtered);
    try {
      const { data } = await deleteProduct(id);
    } catch (error) {
      toast.error("something went wrong product was not deleted !!!");
      setProducts(preProducts);
    }
  };

  return (
    <div>
      <section id="hero" class="d-flex align-items-center mt-2 ">
        <div class="containe-fluid">
          <div class="row">
            <div
              class="col-lg-6 d-flex flex-column justify-content-center pt-2 px-5 pt-lg-0 order-2 order-lg-1"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <h1 class="banner_h1_look">Welcome to Mk Platinum World</h1>
            </div>
            <div
              class="col-lg-6 order-1 order-lg-2 hero-img"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <img
                src={process.env.PUBLIC_URL + "/banner_img.png"}
                style={{ height: "370px" }}
                class="img-fluid animated img_size"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
      {/* <!-- End Hero -->
  <!--Popup --> */}
      {/* <!--End popup--> */}
      <main id="main">
        {/* <!-- ======= Content Section ======= --> */}
        <section id="about" class="about">
          <div class="container" data-aos="fade-up">
            <div class="section-title">
              <h2>Content</h2>
            </div>
            <div class="row content">
              <div class="table-responsive">
                <table class="table ">
                  <thead
                    class="text-white"
                    style={{ backgroundColor: "#4879C5" }}
                  >
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Image</th>
                      <th scope="col">Name</th>
                      <th scope="col">Size</th>
                      {user && <th>Downloads</th>}

                      <th scope="col">Modification</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products &&
                      products.map((prod, index) => {
                        // console.log(prod);
                        return (
                          <tr>
                            <th scope="row">{index + 1}</th>
                            <td>
                              <img
                                src={`${process.env.REACT_APP_URL}/img/${prod.image}`}
                                class="img-fluid"
                                style={{ height: "30px" }}
                                alt="apk img"
                              />
                            </td>
                            <td>{prod.name}</td>
                            <td>{prod.size} MB</td>
                            {user && <td>{prod.downloads}</td>}
                            <td>
                              {new Date(prod.modifiedAt).toLocaleDateString()} -{" "}
                              {new Date(prod.modifiedAt).toLocaleTimeString()}
                            </td>
                            {user && (
                              <td>
                                <Link>
                                  <button
                                    onClick={() => editProduct(prod)}
                                    type="button"
                                    class="btn m-1 btn-sm btn-info"
                                  >
                                    Edit
                                  </button>
                                </Link>
                                <button
                                  type="button"
                                  onClick={() => onDeleteHandler(prod.id)}
                                  class="btn btn-sm btn-danger"
                                >
                                  Delete
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    copyToClipboard(
                                      `${window.location.host}/download/${prod.id}/${prod.name}`
                                    )
                                  }
                                  class="btn btn-sm mx-1 btn-primary"
                                >
                                  copy
                                </button>
                              </td>
                            )}
                            {!user && (
                              <td>
                                <button
                                  type="button"
                                  onClick={() =>
                                    onDownloadHandler(prod.id, prod.name)
                                  }
                                  class="btn btn-sm btn-danger"
                                >
                                  Download
                                </button>
                                <Link to="/recharge">
                                  <button
                                    type="button"
                                    onClick={() => rechargeProdHandler(prod)}
                                    class="btn btn-sm mx-1 btn-primary"
                                  >
                                    Recharge
                                  </button>
                                </Link>
                                {/* <DownloadBtn/> */}
                              </td>
                            )}
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
        <Progressbar loaded={loaded} />
      </main>
    </div>
  );
};
export default Home;
