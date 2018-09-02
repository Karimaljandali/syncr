import React, { Component } from 'react';
import NavbarMain from './components/navbar';
import Events from './utils/socketEvents';
import userNameGenerator from './utils/userNamesTest';
import axios from 'axios';
import viewers from './img/viewers.png';
import { Container, Header, Button, Input } from 'semantic-ui-react'
import {
  changeBorderColor,
  onPlayerReady,
  onPlayerStateChange,
  urlRegex,
  onYouTubeIframeAPIReady
} from './utils/playerUtils';

const viewerCount = {
  color: 'red'
}

//Quick test component
class Syncr extends Component {
  constructor(){
    super();

    this.state = {
      chatValue: '',
      youtubeUrlValue: '',
      paused: true,
      playing: false,
      user: userNameGenerator(),
      mainPageViewers: 0,
      currentYoutubeVideo: '',
      currentYoutubeVideoId: 0
    }
  }

  componentDidMount(){
    Events.on.chatMessage();
    Events.on.youtubePlayerCreated();

    //Grab the main page queue and viewer count after youtube iframe
    //api has loaded.
    window.addEventListener('load', () => {
      axios.get('http://localhost:8000')
      .then((res) => {
        console.log(res);
        if(res.data.main_page_queue.length > 0){
          this.createYoutubePlayer(res.data.main_page_queue[0]);
        }
        this.setState({
          mainPageViewers: res.data.main_page_viewers
        })
      })
      .catch((err) => {
        console.log(err);
      })
    })
  }

  updateVal = (e) => {
    if(e.target.id === 'chatmessage'){
      this.setState({
        chatValue: e.target.value
      })
    }else if(e.target.id === 'youtubeurl'){
      console.log(e.target.value);
      this.setState({
        youtubeUrlValue: e.target.value
      })
    }
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

  youtubePlayerCreated = (id) => {
    Events.emit.youtubePlayerCreated(id);
    this.setState({
      paused: false,
      playing: true
    })
  }

  createYoutubePlayer = (id) => {
    //Kind of a not worth it hack. id is an optional parameter
    //in the sense that if it is not passed in and is called it will use
    //the value of this.state.youtubeUrlValue. However when it is not passed in
    //a proxy object is passed in its place so that is why the type check is here.
    if(typeof id !== 'object'){
      onYouTubeIframeAPIReady(id);
      return;
    }
    let reg_id = urlRegex(this.state.youtubeUrlValue);
    console.log(this.state.youtubeUrlValue);
    if(reg_id !== -1){
      this.setState({
        currentYoutubeVideo: this.state.youtubeUrlValue,
        currentYoutubeVideoId: reg_id,
      })
    }
    //Must have this function as shown in docs.
    //Sets up player with all params passed.
    //Afterwards simply call the youtubePlayerCreated
    //class method and pass in the id and url of the video so
    //the player can be constructed for everyone connected
    //to the socket. Don't actually need the url, just the id
    //but as a failsafe the url is sent with it.
    onYouTubeIframeAPIReady(reg_id);
    this.youtubePlayerCreated([reg_id,this.state.youtubeUrlValue]);
  }

  render() {
    return (
     <div>
       <NavbarMain/>
        <Container fluid>
          <Header as='h2'>Syncr Test</Header>
            <br></br>
              <Input id="chatmessage" type="text" placeholder="Send a chat message." value={this.state.chatValue} onChange={this.updateVal}></Input>
               <Button positive type="button" onClick={this.submitChatMessage}>Submit</Button>
               <br></br>
               <br></br>
              <Input id="youtubeurl" placeholder="Paste a Youtube URL" onChange={this.updateVal}></Input>
             <Button positive onClick={this.createYoutubePlayer}>Create Youtube Player</Button>
            <br></br>
           <div id="player"></div>
          <img className='viewer-count' src={viewers} alt=''/>
          <p className='viewer-count'>
            {this.state.mainPageViewers}
          </p>
        </Container>
      </div>
    );
  }
}

export default Syncr;
