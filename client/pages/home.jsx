import React from 'react';
import Header from '../components/header.jsx';
import Project from '../components/project.jsx';

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Project />
      </div>
    );
  }
}
