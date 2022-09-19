import React from 'react';

export default class Header extends React.Component {
  render() {
    return (
      <div className='container black-background'>
        <div className='row'>
          <div className='column-full text-center'>
            <img className='logo' src="/images/logo.png" alt="logo" />
            <h1 className='title'>CodingFuze</h1>
          </div>
        </div>
      </div>
    );
  }
}
