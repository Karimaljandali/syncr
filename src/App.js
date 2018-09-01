import React, { Component } from 'react';
import Events from './utils/socketEvents';
import userNameGenerator from './utils/userNamesTest';
import {
  changeBorderColor,
  onPlayerReady,
  onPlayerStateChange,
  urlRegex,
  onYouTubeIframeAPIReady
} from './utils/playerUtils';

//Quick test component
class Syncr extends Component {
  constructor(){
    super();

    this.state = {
      chatValue: '',
      paused: true,
      playing: false,
      user: userNameGenerator(),
      currentYoutubeVideo: '',
    }
  }

  componentDidMount(){
    Events.on.buttonPress();
    Events.on.chatMessage();
    Events.on.youtubeStart();
  }

  updateVal = (e) => {
    this.setState({
      chatValue: e.target.value
    })
  }

  buttonPress = () => {
    Events.emit.buttonPress("button was pressed");
  }

  submitChatMessage = () => {
    Events.emit.chatMessage([this.state.user, this.state.chatValue]);
    this.setState({
      chatValue: ''
    })
  }

  youtubeStart = () => {
    Events.emit.youtubeStart("Youtube video started.");
    this.setState({
      paused: false,
      playing: true
    })
  }

  createYoutubePlayer = () => {
    let id = urlRegex(this.urlRef.value);
    if(id !== 0){
      this.setState({
        currentYoutubeVideo: this.urlRef.value
      })
    }
    onYouTubeIframeAPIReady(id);
  }

  render() {
    return (
     <div>
       <p>Quick Tests</p>
        <button onClick={() => this.buttonPress()}>Emit Websocket Message</button>
         <br></br>
         <br></br>
          <input id="chatmessage" type="text" placeholder="Send a chat message." value={this.state.chatValue} onChange={this.updateVal}></input>
           <button type="button" onClick={this.submitChatMessage}>Submit</button>
          <br></br>
         <input ref={el => this.urlRef = el} placeholder="Paste a Youtube URL"></input>
        <button onClick={this.createYoutubePlayer}>Create Youtube Player</button>
       <div id="player"></div>
      </div>
    );
  }
}

export default Syncr;
