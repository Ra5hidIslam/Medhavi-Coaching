import React,{useRef} from 'react'

function FileUpload({onFileSelect}) {
    const fileInput = useRef(null);
   
    const handleFileInput =(e)=>{
        const file = e.target.files[0];
        if (file.size > 5000)
          return ({ error: "File size cannot exceed more than 5MB" });
        else return file;
        
    }
  return (
    <div className='file-uploader'>
        <input type = 'file' onChange={handleFileInput}></input>
        <button onClick={e=> fileInput.current && fileInput.current.click()} ></button>
    </div>
  )
}

export default FileUpload