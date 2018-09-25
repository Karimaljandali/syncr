import React, {Component} from 'react';
import {
  Icon,
  Image,
  Menu,
  Responsive,
  Dropdown,
  Search,
  Checkbox
} from "semantic-ui-react";
import ThemeToggle from './themeToggle';
import logo from '../img/sync.png';

const navbarSearchTest = [
{key: '808_this', text: '808_this', value: '808_this'},
{key: 'bitcoin', text: 'bitcoin', value: 'bitcoin'},
]

class NavbarDesktop extends Component {
  componentDidMount(){
    this.props.onStartup();
  }

  render(){
    return(
      <Menu fixed="top" inverted>
        <Menu.Item>
          <Image size="mini" src={logo} />
        </Menu.Item>
         <Menu.Item as='a'>
           <div className='hvr-grow'>
             <Icon size='big' name='home'/>
           </div>
         </Menu.Item>
          <Search
            placeholder='Search For Rooms'
            className='centered-search'
          />
          <Menu.Menu position='right'></Menu.Menu>
             <Menu.Item>
               <Checkbox
                 onClick={this.props.toggleTheme}
                 checked={this.props.darkModeOn}
               />
             &nbsp;Dark mode
          </Menu.Item>
            <Dropdown floating item text='Make A Room&nbsp;'>
              <Dropdown.Menu>
                <Dropdown.Item>Public</Dropdown.Item>
                <Dropdown.Item>Private</Dropdown.Item>
               </Dropdown.Menu>
             </Dropdown>
           <Menu.Menu/>
         <Menu.Item as='a'>Sign Up/Login</Menu.Item>
        </Menu>
  )}
}

class NavbarMobile extends Component{
  componentDidMount(){
    this.props.onStartup();
  }

  render(){
    return(
      <Menu fixed="top" inverted>
        <Menu.Item>
          <Image size="mini" src={logo} />
        </Menu.Item>
         <Menu.Item as='a'>
           <div className='hvr-grow'>
             <Icon size='large' name='home'/>
           </div>
         </Menu.Item>
          <Search
            placeholder='Search For Rooms'
            className='centered-search'
          />
          <Menu.Menu position='right'></Menu.Menu>
            <Dropdown floating item icon='bars'>
              <Dropdown.Menu style={{right: 0, left: "auto"}}>
                <Dropdown.Item>
                  <Dropdown text='Make A Room'>
                    <Dropdown.Menu>
                      <Dropdown.Item>Public</Dropdown.Item>
                      <Dropdown.Item>Private</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Dropdown.Item>
               <Dropdown.Item>Sign Up/Login</Dropdown.Item>
               <Dropdown.Item>
                 <Checkbox
                   label='Dark Mode'
                   onClick={this.props.toggleTheme}
                   checked={this.props.darkModeOn}
                 />
               </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          <Menu.Menu/>
        </Menu>
  )}
}

const NavbarMain = ThemeToggle((props) => {
  return(
  <div>
    <Responsive minWidth={800}>
      <NavbarDesktop toggleTheme={props.toggleTheme} darkModeOn={props.darkModeOn} onStartup={props.onStartup}/>
    </Responsive>
    <Responsive maxWidth={800}>
      <NavbarMobile toggleTheme={props.toggleTheme} darkModeOn={props.darkModeOn} onStartup={props.onStartup}/>
    </Responsive>
  </div>
 )
})


export default NavbarMain;
