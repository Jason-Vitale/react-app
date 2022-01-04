import React, {useState} from 'react'
import Button from '@mui/material/Button';
import { storage } from '../firebase';
import { db } from '../firebase';
import { serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';
import { collection, addDoc, doc} from 'firebase/firestore';
import './ImageUpload.css';

function ImageUpload({username}) {
    const [caption, setCaption]= useState('');
    const [url, setUrl] = useState('');
    const [progress, setProgress] = useState(0);
    const [image, setImage] = useState(null);

    const handleChange = (e) => {
        if (e.target.files[0]){
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        //const storageRef = ref(storage, `images/${image.name}`);
        const randomId = doc(collection(db, "temp")).id;
        const storageRef = ref(storage, `images/${randomId}`);
        console.log(storageRef.fullPath);
        console.log("HELLO WOLRD");
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                //Progress function ... (shows the load bar)
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                //Error Function...
                console.log(error);
                alert(error.message);
            },
            async () => {
                //complete function
                    const url = await getDownloadURL(storageRef);
                    const docRef = await addDoc(collection(db, "posts"), {
                        imageURL: url, 
                        caption: caption, 
                        username: username, 
                        timestamp: serverTimestamp()
                    });

                    console.log("THE APP HAS POSTED");
                    setProgress(0);
                    setCaption('');
                    setImage(null);
                    setUrl('');
                }
            )
                

        }
        
    return (
        <div className= "imageUpload">
            <progress className ='imageUploadProgress' value = {progress} max="100"/>
            <input type="text" placeholder='Enter a caption...' onChange={event => setCaption(event.target.value)}/>
            <input type="file" onChange={handleChange}/>
            <Button onClick={handleUpload}>
                Post
            </Button>

        </div>
    )
}

export default ImageUpload
