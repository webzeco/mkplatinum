import React, { useState } from 'react'

   const  useFileDownloader=()=> {
       const [files, setFiles] = useState(()=>[]);
       const download=file=>setFiles(fileList=>[...fileList,{...file,downloadId:Math.random()}]);
       const remove=removeId=>setFiles(files=>[...files.filter(p=>p.downloadId!==removeId)]);
       
    return [
        (e)=>download(),
        // files.length>0? <Downloader files={files} remove={(e)=>remove(e)} />:null
    ]
}
export default useFileDownloader;