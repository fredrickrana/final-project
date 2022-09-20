import React from 'react';

export default class Button extends React.Component {
  render() {
    const onClick = this.props.onClick;
    const name = this.props.name;
    const className = this.props.className;
    return (
      <div>
    <button className={`language-tab ${className}`} onClick={onClick}>{name}</button>
      </div >
    );
  }
}
