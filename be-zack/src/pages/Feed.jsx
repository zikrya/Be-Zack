import { useState, useEffect } from "react";
import { useProtectedRoute } from "../components/useProtectedRoute";
import { storage, database } from "../utils/firebase-config";
import { ref as storageRef, getDownloadURL, deleteObject } from "firebase/storage";
import { onValue, ref as dbRef, remove } from "firebase/database";

const Feed = () => {
  useProtectedRoute();

  const [fileDataList, setFileDataList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const imagesRef = dbRef(database, "images");

    const unsubscribe = onValue(imagesRef, async (snapshot) => {
      const data = snapshot.val();
      const fileDataPromises = Object.entries(data).map(async ([uniqueId, item]) => {
        const imageUrl = item.imageUrl ? await getDownloadURL(storageRef(storage, `images/${item.imageUrl}`)) : null;
        const videoUrl = item.videoUrl ? await getDownloadURL(storageRef(storage, `videos/${item.videoUrl}`)) : null;
        return {
          uniqueId,
          title: item.title,
          caption: item.caption,
          imageName: item.imageUrl, // store the imageName instead of imageUrl
          videoName: item.videoUrl, // store the videoName instead of videoUrl
          imageUrl,
          videoUrl,
        };
      });
      const fileDataList = await Promise.all(fileDataPromises);
      setFileDataList(fileDataList);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const deletePost = async (uniqueId) => {
    const fileData = fileDataList.find((item) => item.uniqueId === uniqueId);

    if (fileData.imageName) {
      const imageRef = storageRef(storage, `images/${fileData.imageName}`);
      await deleteObject(imageRef);
    }

    if (fileData.videoName) {
      const videoRef = storageRef(storage, `videos/${fileData.videoName}`);
      await deleteObject(videoRef);
    }

    await remove(dbRef(database, `images/${uniqueId}`));

    setFileDataList(fileDataList.filter((item) => item.uniqueId !== uniqueId));
  };

  return (
    <div>
      <br />
      <h1>Feed</h1>
      <div className="flex flex-col justify-center items-center space-y-8">
        {loading ? (
          <p>Loading...</p>
        ) : (
          fileDataList.map((fileData, index) => {
            return (
              <div className="box-border h-[700px] w-96 p-4 border-4 shadow-xl my-9 rounded-lg" key={index}>
                <h3 className="font-mono">Title: {fileData.title}</h3>
                <br />
                <div className="image-container">
                  {fileData.imageUrl && (
                    <img className="object-contain h-full w-auto" src={fileData.imageUrl} alt="Uploaded" />
                  )}
                  {fileData.videoUrl && (
                    <video className="object-contain h-full w-auto" controls>
                      <source src={fileData.videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
                <br />
                <p className="font-sans text-lg">{fileData.caption}</p>
                <button onClick={() => deletePost(fileData.uniqueId)}>Delete</button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Feed;






