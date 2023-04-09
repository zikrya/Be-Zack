import { useState } from "react";
import { useProtectedRoute } from "../components/useProtectedRoute";
import { storage, database } from "../utils/firebase-config";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { set, child, getDatabase, ref as dbRef } from "firebase/database";
import heic2any from "heic2any";

const Submit = () => {
  useProtectedRoute();

  const [fileUpload, setFileUpload] = useState(null);
  const [isVideo, setIsVideo] = useState(false);
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const navigate = useNavigate();

  const upload = async () => {
    if (fileUpload === null) return;

    const uniqueId = v4();
    const fileType = isVideo ? "videos" : "images";
    const fileRef = ref(storage, `${fileType}/${fileUpload.name + uniqueId}`);
    await uploadBytes(fileRef, fileUpload);

    const fileData = {
      title,
      caption,
      imageUrl: isVideo ? null : fileUpload.name + uniqueId,
      videoUrl: isVideo ? fileUpload.name + uniqueId : null,
    };
    await set(child(dbRef(getDatabase()), `images/${uniqueId}`), fileData);

    alert("Image or Video Uploaded!");
    navigate("/feed");
  };

  const handleFileChange = async (e) => {
    let file = e.target.files[0];
    if (file) {
      // Convert HEIC to JPEG
      if (file.type === "image/heic") {
        const buffer = await file.arrayBuffer();
        const heicBlob = new Blob([buffer], { type: "image/heic" });

        const convertedBlob = await heic2any({
          blob: heicBlob,
          toType: "image/jpeg",
          quality: 0.8,
        });

        file = new File([convertedBlob], `${file.name.split(".")[0]}.jpeg`, {
          type: "image/jpeg",
        });
      }

      setIsVideo(file.type.startsWith("video"));
      setFileUpload(file);
    } else {
      setFileUpload(null);
    }
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    upload();
  };

  return (
    <div>
        <br />
    <form onSubmit={handleSubmit}>
    <div className="flex items-center justify-center w-full">
    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
        </div>
        <input accept="image/*, image/heic, video/*" onChange={handleFileChange} id="dropzone-file" type="file" className="hidden" />
    </label>
</div>
<br />
<div className="relative mb-3 xl:w-96" data-te-input-wrapper-init>
  <input
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    type="text"
    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
    id="exampleFormControlInputText"
    placeholder="Example label" />
  <label
    htmlFor="exampleFormControlInputText"
    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200"
    >Title
  </label>
</div>
<br />
<div className="relative mb-3 xl:w-96" data-te-input-wrapper-init>
  <input
    value={caption}
    onChange={(e) => setCaption(e.target.value)}
    type="text"
    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
    id="exampleFormControlInputText"
    placeholder="Example label" />
  <label
    htmlFor="exampleFormControlInputText"
    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200"
    >Caption
  </label>
</div>
<button type="button" onClick={upload}>
          Upload
        </button>
        </form>
</div>
  );
};

export default Submit;






