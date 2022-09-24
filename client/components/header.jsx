import React from 'react';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.toggleOpen = this.toggleOpen.bind(this);
  }

  toggleOpen() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const modalBackground = (!this.state.isOpen) ? 'hide' : 'menu-modal-background';
    const modal = (!this.state.isOpen) ? 'hide' : 'menu-modal';
    const menuButton = (!this.state.isOpen) ? 'fa-solid fa-bars' : 'hide';
    return (
      <>
      <div className='container black-background'>
        <div className='row align-center'>
          <div className='column-full text-center'>
            <img className='logo' src="/images/logo.png" alt="logo" />
            <h1 className='title'>CodingFuze</h1>
            <i className={`fa-solid fa-bars ${menuButton}`} onClick={this.toggleOpen}></i>
          </div>
        </div>
      </div>
      <div className='container'>
        <div className={modalBackground} onClick={this.toggleOpen}></div>
        <div className={modal}>
          <div className='menu-modal-content text-center'>
            <a className='block' href="#">Home</a>
            <a className='block' href="#myprojects">My Projects</a>
            <a className='block border' href="#">New Project</a>
          </div>
        </div>
      </div>
      </>
    );
  }
}
