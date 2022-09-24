import React from 'react';
import parseRoute from '../server/parse-route';
import Header from './components/header';
import Project from './pages/project';
import MyProjects from './pages/myprojects';
import ProjectDetails from './pages/projectdetails';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', event => {
      const location = parseRoute(window.location.hash);
      this.setState({ route: location });
    });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <Project />;
    }
    if (route.path === 'myprojects') {
      return <MyProjects />;
    }
    if (route.path === 'projects') {
      const projectId = route.params.get('projectId');
      return <ProjectDetails projectId={projectId} />;
    }
  }

  render() {
    return (
      <>
        <Header />
        { this.renderPage() }
      </>
    );
  }
}
