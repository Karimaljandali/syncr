import React, {Component} from 'react';

//HOC to add toggle theme functionality that will be on every page
const ThemeToggle = (BaseComponent) => {
  return class extends Component{
      constructor(){
        super();

        this.state = {
          darkModeOn: this.getTheme(),
          body: document.getElementById('body')
        }
     }

     getTheme = () => {
        return (localStorage.getItem("theme") === null || localStorage.getItem("theme") === 'light' ? false : true)
     }

     toggleTheme = () => {
       if(!this.state.darkModeOn){
         localStorage.setItem("theme", "dark");
         this.state.body.className = "dark";
       }else{
         localStorage.setItem("theme", "light");
         this.state.body.className = "light";
       }

       this.setState({
         darkModeOn: (this.state.body.className === 'dark' ? true : false)
       })
     }

     onStartup = () => {
       if(this.state.darkModeOn){
         this.state.body.className = 'dark';
       }
     }

     render(){
       return <BaseComponent
               toggleTheme={this.toggleTheme}
               darkModeOn={this.state.darkModeOn}
               getTheme={this.getTheme}
               onStartup={this.onStartup}
               {...this.props}
              />
     }
   }
}

export default ThemeToggle;
