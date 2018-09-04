import React from 'react';
import {
  Container,
  Icon,
  Image,
  Menu,
  Sidebar,
  Responsive,
  Dropdown,
  Search
} from "semantic-ui-react";
import logo from '../img/sync.png';

const navbarSearchTest = [
{key: '808_this', text: '808_this', value: '808_this'},
{key: 'bitcoin', text: 'bitcoin', value: 'bitcoin'},
]

const NavbarDesktop = (props) => (
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
          <Dropdown floating item text='Make A Room'>
           <Dropdown.Menu>
             <Dropdown.Item>Public</Dropdown.Item>
             <Dropdown.Item>Private</Dropdown.Item>
           </Dropdown.Menu>
         </Dropdown>
      <Menu.Menu/>
     <Menu.Item as='a'>Sign Up/Login</Menu.Item>
    </Menu>
)

const NavbarMobile = (props) => (
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
          </Dropdown.Menu>
        </Dropdown>
      <Menu.Menu/>
    </Menu>
)

const NavbarMain = () => (
  <div>
    <Responsive minWidth={800}>
      <NavbarDesktop/>
    </Responsive>
    <Responsive maxWidth={800}>
      <NavbarMobile/>
    </Responsive>
  </div>
)

export default NavbarMain;
