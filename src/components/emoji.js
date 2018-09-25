import React from 'react';
import ThemeToggle from './themeToggle';
import ReactTooltip from 'react-tooltip';
import {Picker} from 'emoji-mart';

const Emoji = (props) => (
  <div>
    <div>
      <span
        className='emoji-mart-opener hvr-grow'
        data-event='click'
        data-tip
        data-for='emoji-mart'
        data-scroll-hide='false'
        role='img'
        >
        😊
      </span>
      {props.children}
    </div>
   <ReactTooltip
     className="emoji-mart-tooltip"
     id='emoji-mart'
     place='top'
     effect='solid'>
     <Picker
       title='Pick An Emoji'
       set='emojione'
       color='black'
     />
   </ReactTooltip>
 </div>
)

const EmojiPicker = ThemeToggle(Emoji);

export default EmojiPicker;
