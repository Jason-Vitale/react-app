import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './components/Post';
import ImageUpload from './components/ImageUpload';
import { db, auth } from './firebase'; 
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from 'firebase/auth';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};

function App() {

  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);
  const [openSignIn, setOpenSignIn] = useState(false);
  
  //Everytime post change it goes on here
  /*
  useEffect(() =>{
    onSnapshot(collection(db, 'posts'), (snapshot) => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id, 
        post: doc.data()
      })))
    })
  }, [])
  */

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // User has logged in
        console.log(authUser);
        setUser(authUser);
      }
      else{
        //user has logged out
        setUser(null);
      }
    })
    return () => {
      //cleanup
      unsubscribe();
    }
  }, [user, username]);
  
  useEffect(() =>{
    console.log("THE APP HAS STARTED");
    const q = (query(collection(db, 'posts'), orderBy('timestamp', 'desc')));
    onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map(doc => doc.data()))
    })
  }, [])


  const signUp = (event) => {
    event.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
    .then((authUser) => {
      return updateProfile(authUser.user, {
        displayName: username
      })
    })
    .catch((error) => alert(error.message));
    console.log('User Signed Up:', user.email);
    setOpen(false);
  }
  
  const signIn = (event) =>{
    event.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
    .catch((error) => alert(error.message));
    setOpenSignIn(false);
  }

  const signOut = (event) => {
    event.preventDefault();
    console.log('User Logged Out:', user.email);
    auth.signOut();

    setOpen(false);
  }

  return (
    <div className="App">

      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
         <Box sx={style}>
           <form className="app_signup">
            <center>
              <h2>Sign Up</h2>
            </center>
              <Input
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) =>setUsername(e.target.value)}
              />
                <Input
                type="text"
                placeholder="email"
                value={email}
                onChange={(e) =>setEmail(e.target.value)}
              />
                <Input
                type="text"
                placeholder="password"
                value={password}
                onChange={(e) =>setPassword(e.target.value)}
              />
              <Button type="submit" onClick={signUp}>Sign Up</Button>
           </form>
        </Box>
      </Modal>

      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
         <Box sx={style}>
           <form className="app_signup">
            <center>
              <h2>Sign In Button</h2>
            </center>
                <Input
                type="text"
                placeholder="email"
                value={email}
                onChange={(e) =>setEmail(e.target.value)}
              />
                <Input
                type="text"
                placeholder="password"
                value={password}
                onChange={(e) =>setPassword(e.target.value)}
              />
              <Button type="submit" onClick={signIn}>Sign In</Button>
           </form>
        </Box>
      </Modal>


      <div className="app_navbar">
          <img className="app_navbar_image" src="https://cdn-icons-png.flaticon.com/512/38/38002.png" alt="" height="50" width= "50"/>
          { user ? (
          <Button variant="outlined" onClick={signOut}>Logout</Button>
          ): (
        <div className="app_loginContainer">
          <Button variant="outlined" onClick={() => setOpenSignIn(true)}>Sign In</Button>
          <Button variant="outlined" onClick={() => setOpen(true)}>Sign Up</Button>
        </div>
      )}
      </div>


      {/* <h1>Jason</h1> */}

      <div className="app_posts">
        {
          posts.map(post => (
            <Post username={post.username} caption={post.caption} imageURL={post.imageURL}/>
          ))
        }
      </div>






      {user?.displayName ? (
          <ImageUpload username={user.displayName}/>
      ): (
        <div className="upload_message">
        <h3>Please Login to upload!</h3>
        </div>
      )}

    </div>
  );
}

export default App;
