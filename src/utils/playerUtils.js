//Pretty much copy and pasted from https://developers.google.com/youtube/iframe_api_reference
//Many great examples if you've never seen it before, I didn't even know it existed when this
//was just an idea.
export function urlRegex(url){
//Will match www.youtube.com/watch?v= as well as https://www.youtube.com/watch?v=
  let regex = /.*www\.youtube\.com\/watch\?v=/,
  match = regex.test(url),
  id = [];

  //If it's a valid youtube url(if it passes the regex check) then
  //split the id from the url to be sent to construct the youtube player
  //else return -1 and use that value to do conditional rendering later
  //i.e an error message that what you entered isn't a youtube url
  if(match){
    id = url.split(regex);
  }else{
    return -1;
  }
  return id[1];
}

export function onPlayerReady(event) {
    document.getElementById('player').style.borderColor = '#FF6D00';
  }

export function changeBorderColor(playerStatus) {
  let color;
  if (playerStatus === -1) {
    color = "#37474F"; // unstarted = gray
  } else if (playerStatus === 0) {
    color = "#FFFF00"; // ended = yellow
  } else if (playerStatus === 1) {
    color = "#33691E"; // playing = green
  } else if (playerStatus === 2) {
    color = "#DD2C00"; // paused = red
  } else if (playerStatus === 3) {
    color = "#AA00FF"; // buffering = purple
  } else if (playerStatus === 5) {
    color = "#FF6DOO"; // video cued = orange
  }
  if (color) {
    document.getElementById('player').style.borderColor = color;
  }
}

export function onPlayerStateChange(event) {
  changeBorderColor(event.data);
}

export function onYouTubeIframeAPIReady(id) {
  //Must be window.YT.Player as its loaded into the actual
  //index.html page. There is a package available on npm that
  //essentially wraps the iframe api but I'd rather just
  //use the standard provided by Google. PlayerVars origin setting
  //MUST be set or else you will receive a Failed To Execute 'postMessage'
  //error which basically means you cannot use any of the API.
  console.log(id);
  var player = new window.YT.Player('player', {
    height: '480vw',
    width: '90%',
    videoId: id,
    playerVars: {
      'origin': "http://localhost:3000",
      'autoplay': 0
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}
