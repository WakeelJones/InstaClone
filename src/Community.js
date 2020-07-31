import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import firebase from 'firebase';
import { db } from './firebase';

import './Community.css'

const Community = ({ username }) => {
  const [complaint, setComplaint] = useState('');

  const postComplaint = (event) => {
    event.preventDefault();

    db.collection('community').add({
      complaint: complaint,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  return (
    <div className="community_post">
      <Avatar
        className="post_avatar"
        alt={username}
        src="./images/portrait.jpg "
      />
      <h3>{username}</h3>
      <h4 className="post_text">
        <strong>{username}</strong> {complaint}
      </h4>
      <Button onClick={postComplaint}>Submit Complaint</Button>
    </div>
  );
};

export default Community;
