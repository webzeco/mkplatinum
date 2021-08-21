import axios from 'axios';
import React, { useState } from 'react'
const FileDownload = require("js-file-download");

export default function DownloadLinkPage() {
    const [loaded, setLoaded] = useState(0);

    const onDownloadHandler = (id, name) => {
        const url = `${process.env.REACT_APP_URL}/api/v1/product/download/${id}`;
        axios({
          url,
          method: "GET",
          responseType: "blob", // Important
          onDownloadProgress: (ProgressEvent) => {
            setLoaded((ProgressEvent.loaded / ProgressEvent.total) * 100);
          },
        }).then((response) => {
          console.log(response);
          FileDownload(response.data, name);
        });
      };
    return (
        <div>
             <button
                                  type="button"
                                  onClick={() =>
                                    onDownloadHandler("id","name")
                                  }
                                  class="btn btn-sm btn-danger"
                                >
                                  Download
                                </button>
        </div>
    )
}
