import React from 'react';

export default class MyProjects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: []
    };
  }

  componentDidMount() {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        this.setState({ projects: data });
      })
      .catch(err => { console.error('error:', err); });
  }

  render() {
    const { projects } = this.state;
    return (
        <>
           <div className='container background-image'>
             <div className='row justify-center'>
               <h1 className='title font-40'>My Projects</h1>
             </div>
             <div className='row margin-5 flex-wrap justify-center'>
               {
                this.state.projects.map(product => (
                  <div key={projects.projectId}>
                    <Project project={product} />
                  </div>
                ))
              }
            </div>
          </div>
        </>
    );
  }
}

function Project(props) {
  const { projectId, html, title, uploadedAt } = props.project;
  const uploadedTime = uploadedAt.slice(0, 10);
  const htmlContent = html.slice(0, 28);
  return (
    <a href={`#projects?projectId=${projectId}`}>
      <div className='card text-center flex-wrap'>
        <h1>{title}</h1>
        <p>{`${htmlContent}...`}</p>
        <p>{uploadedTime}</p>
      </div>
    </a>
  );
}
