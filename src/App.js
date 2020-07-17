import React from 'react';
import './App.css';
import Posts from './Posts';
import portrait from './images/portrait.jpg'
import unicorn from './images/unicorn.jpg'
import trick from './images/trick.jpg'

function App() {
  return (
    <div className="App">
      <div className="app_header">
        <i class="fab fa-angrycreative fa-4x"></i>
      </div>
      
      <h1>Instagram Clone</h1>

      <Posts username="Wakeel Jones" caption="Dope Cap" imageUrl={portrait} />
      <Posts username="Bob John " caption="It works" imageUrl={trick} />
      <Posts username="Patricia Willbert" caption="Unicorns" imageUrl={unicorn}/>
    </div>
  );
}

export default App;
