import { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import DummyProfile  from '../../assets/images.png'

import "./index.css";

const fileTypes = ["JPEG", "PNG", "GIF"];

export default function UploadImage({setFieldValue, errors}) {
    const [file, setFile] = useState('')
    const [preview, setPreview] = useState()
  const handleChange = (file) => {
    setFile(file);
    setFieldValue("image",file);
  };

  useEffect(() => {
    // create the preview
    let objectUrl = ''
    if(file){
       objectUrl = URL.createObjectURL(file)
        setPreview(objectUrl)
    }
 
    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
 }, [file])


  return (
    <div className="upload_image">
        <p className="profile_image_container" >{ <img src={preview ? preview : DummyProfile} alt={file.name} />}</p>
      <FileUploader
        multiple={false}
        handleChange={handleChange}
        name="image"
        types={fileTypes}
      />
        <p className="error_text" >{errors.image && errors.image}</p>
    </div>
  );
}