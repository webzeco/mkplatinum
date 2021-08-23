import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import Progressbar from './common/Progress';
const FileDownload = require("js-file-download");

export default function DownloadLinkPage({match}) {
    const [loaded, setLoaded] = useState(0);
    // console.log(window.location.host);
// console.log(match);
useEffect(() => {
  onDownloadHandler();
}, []);
    const onDownloadHandler = () => {
        const url = `${process.env.REACT_APP_URL}/api/v1/product/download/${match.params?.id}`;
        axios({
          url,
          method: "GET",
          responseType: "blob", // Important
          onDownloadProgress: (ProgressEvent) => {
            setLoaded(Math.round((ProgressEvent.loaded / ProgressEvent.total)  * 100));
          },
        }).then((response) => {
          console.log(response);
          toast.success('Downloading starts !!!');
          FileDownload(response.data, match.params?.name);
        }).catch(err=>{
        toast.error("Something went wrong Download not available !!!");
        });
      };
    return (
        <div  className='text-center ' style={{height:'340px',marginTop:'200px'}}>
            {loaded!==100&&loaded!==0&&<h1 className='display-3 text-primary'> Downloading ...</h1> }
            {loaded===100&&<h1  className='display-3 text-primary'> Download completed !!!</h1> }

                                <Progressbar loaded={loaded} />
        </div>
    )
}
