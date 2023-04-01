import React, { useState } from 'react'
import FileUpload from '../components/FileUploader/FileUpload';

function AddQuestion() {

    const [name,setName] = useState("");
    const [selectedFile,setSelectedFile] = useState(null);

    const submitForm =()=>{
        const formData = new FormData();
        formData.append("name",name);
        formData.append("file",selectedFile);
    }

    return (
        <div className="upload-question-form">
            <form>
                <input
                type = "text"
                value ={name}
                onChange={(e)=>setName(e.target.value)}
                />

            <FileUpload
                onFileSelectSuccess={(file) => setSelectedFile(file)}
                onFileSelectError={({ error }) => alert(error)}
            />

        <button onClick={submitForm}>Submit</button>
            </form>
        </div>
    )
}

export default AddQuestion