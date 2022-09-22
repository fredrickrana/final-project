import React from 'react';

export default class Button extends React.Component {
  render() {
    const { onClick, name, className } = this.props;
    return (
      <div>
    <button className={`language-tab ${className}`} onClick={onClick}>{name}</button>
      </div >
    );
  }
}
