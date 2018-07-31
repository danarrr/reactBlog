/**
 * Created by ocean on 17/12/13.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import { Drawer, Button } from 'antd';

class Header extends React.Component {
  state = { visible: false };

 showDrawer = () => {
   this.setState({
     visible: true,
   });
 };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render(){
     return (
        <div className="top">
            <h1>
              <span className="logo" onClick={this.showDrawer}>DANBLOG</span>
              <small className="hidden-xs">(sequelize+node+react)</small>
            </h1>
            <div className="animate-usrinfo visible-xs-block"></div>
        </div>
      );
  }
}
export default Header

// export default () => {
//   return (
//     <div className="top">
//         <h1>
//           <span className="logo ">DANBLOG</span>
//           <small className="hidden-xs">(sequelize+node+react)</small>
//         </h1>
//         <div className="animate-usrinfo visible-xs-block"></div>
// <Drawer
//   title="Basic Drawer"
//   placement="right"
//   closable={false}
//   onClose={this.onClose}
//   visible={this.state.visible}
// >
//   <p>Some contents...</p>
//   <p>Some contents...</p>
//   <p>Some contents...</p>
// </Drawer>
//     </div>
//   );
// };
