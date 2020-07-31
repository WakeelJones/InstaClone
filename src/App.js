import React, { useState, useEffect } from 'react';
import './App.css';
import { db, auth } from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';

import InstagramEmbed from 'react-instagram-embed';

import Post from './Post';
import ImageUpload from './ImageUpload';
import Community from './Community';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user has logged in
        console.log(authUser);
        setUser(authUser);

        if (authUser.displayName) {
          // dont update username
        } else {
          return authUser.updateProfile({
            displayName: username,
          });
        }
      } else {
        // user has logged out
        setUser(null);
      }
    });

    return () => {
      // perform cleanup actions
      unsubscribe();
    };
  }, [user, username]);

  useEffect(() => {
    db.collection('posts')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.postsId,
            post: doc.data(),
          }))
        );
      });
  }, []);

  const signUp = (event) => {
    event.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));
  };

  const signIn = (event) => {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));

    setOpenSignIn(false);
  };

  return (
    <div className="App">
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app_signup">
            <center>
              <div className="app_headerImage">
                <i class="fab fa-angrycreative fa-4x"></i>
              </div>
            </center>

            <Input
              placeholder="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signUp}>
              Sign Up
            </Button>
          </form>
        </div>
      </Modal>

      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app_signup">
            <center>
              <div className="app_headerImage">
                <i class="fab fa-angrycreative fa-4x"></i>
              </div>
            </center>

            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signIn}>
              Sign In
            </Button>
          </form>
        </div>
      </Modal>

      <div className="app_header">
        <i class="fab fa-angrycreative fa-4x"></i>
        {user ? (
          <div>
            <Button onClick={() => auth.signOut()}>Logout</Button>
            <h3>Logged in user : { user.displayName }</h3>
          </div>
        ) : (
          <div className="app_loginContainer">
            <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
            <Button onClick={() => setOpen(true)}>Sign Up</Button>
          </div>
        )}
      </div>
      <div className="app_post">
        <div>
          <Community className="app_postFloatleft" />
        </div>
        <div className="app_postleft">
          {posts.map(({ postId, postsId, post }) => (
            <Post
              key={postsId}
              postId={postId}
              user={user}
              username={post.username}
              caption={post.caption}
              imageUrl={post.imageUrl}
            />
            
          ))}
        </div>
        <div className="app_postright">
          <InstagramEmbed
            url="https://instagr.am/p/Zw9o4/"
            maxWidth={320}
            hideCaption={false}
            containerTagName="div"
            protocol=""
            injectScript
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
          />
        </div>
      </div>

      {user?.displayName ? (
              <ImageUpload username={user.displayName} />
            ) : (
              <h3 className="request">Please Login to start uploading</h3>
            )}

      <footer>
        <div className="footer_content">
          <div className="Logo">
            <i class="fab fa-angrycreative fa-4x"></i>
          </div>
          <div className="App_Info">
            Designed and Built By AngryCreative in {new Date().getFullYear()}
          </div>
          <div className="icons">
            <a href="https://github.com/WakeelJones/InstaClone" target="blank">
              <i class="fab fa-github"></i>
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=100008464240624"
              target="blank"
            >
              <i class="fab fa-facebook"></i>
            </a>
            <a
              href="https://www.instagram.com/wakeel_jones2402/"
              target="blank"
            >
              <i class="fab fa-instagram"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/wakeel-jones-3b0036157/"
              target="blank"
            >
              <i class="fab fa-linkedin"></i>
            </a>
            <a href="https://porfolio-ac.netlify.app/" target="blank">
              <i class="fas fa-laptop-code"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
