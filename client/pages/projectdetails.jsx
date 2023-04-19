import React from 'react';
import Editor from '../components/editor';
import Button from '../components/button';
import parseRoute from '../../server/parse-route';

export default class ProjectDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      project: null,
      language: 'HTML',
      isDeleted: false,
      route: parseRoute(window.location.hash)
    };
    this.handleClick = this.handleClick.bind(this);
    this.toggleDelete = this.toggleDelete.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleClick(event) {
    this.setState({ language: event.target.textContent });
  }

  componentDidMount() {
    const projectId = this.state.route.params.get('projectId');
    fetch(`/api/projects/${projectId}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ project: data });
      })
      .catch(err => { console.error('error:', err); });
  }

  toggleDelete() {
    this.setState({ isDeleted: !this.state.isDeleted });
  }

  handleDelete(event) {
    event.preventDefault();
    const projectId = this.state.route.params.get('projectId');
    fetch(`/api/projects/${projectId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    window.location.hash = '#myprojects';
  }

  render() {
    if (!this.state.project) return null;
    const { html, css, javascript } = this.state.project;
    const srcDoc =
    `<html>
      <body>${html}</body>
      <style>${css}</style>
      <script>${javascript}</script>
    </html>`;
    const language = this.state.language;
    const clickedHTML = (language === 'HTML') ? 'dark-background' : 'blue-background';
    const clickedCSS = (language === 'CSS') ? 'dark-background' : 'blue-background';
    const clickedJS = (language === 'JavaScript') ? 'dark-background' : 'blue-background';
    const openedEditor = (language === 'HTML') ? 'xml' : (language === 'CSS') ? 'css' : 'javascript';
    const code = (language === 'HTML') ? html : (language === 'CSS') ? css : javascript;
    const modalBackground = (!this.state.isDeleted) ? 'hide' : 'finish-modal-background';
    const modal = (!this.state.isDeleted) ? 'hide' : 'finish-modal';
    return (
      <>
        <div className='container night-background color-white padding-20'>
          <div className='row justify-center'>
            <Button className={clickedHTML} name='HTML' onClick={this.handleClick} />
            <Button className={clickedCSS} name='CSS' onClick={this.handleClick} />
            <Button className={clickedJS} name='JavaScript' onClick={this.handleClick} />
          </div>
        </div>
        <div className='container'>
          <div className='row justify-center'>
            <Editor
              codingLanguage={openedEditor}
              value={code}
              className='inline'
            />
            <Editor
              codingLanguage='xml'
              value={html}
              className='hidden'
            />
            <Editor
              codingLanguage='css'
              value={css}
              className='hidden'
            />
            <Editor
              codingLanguage='javascript'
              value={javascript}
              className='hidden'
            />
          </div>
        </div>
        <div className='container'>
          <div className='row justify-center'>
            <iframe
              srcDoc={srcDoc}
              title='output'
              sandbox='allow-scripts'
              frameBorder='1'
              width='100%'
              height='100%'
              className='iframe'
            />
          </div>
          <div className='row position-fixed black-background justify-end'>
            <button className='finish-button' onClick={this.toggleDelete}>Delete</button>
          </div>
        </div>
        <div className='container text-center'>
          <div className={modalBackground} onClick={this.toggleDelete}></div>
          <div className={modal}>
            <div className='finish-modal-content text-center font-24 padding-10'>
              <h3>Are you sure you want to delete this project?</h3>
              <p>This action cannot be undone</p>
              <div className='row justify-center'>
                <button className='modal-button red-background' onClick={this.handleDelete}>Delete</button>
                <button className='modal-button grey-background' onClick={this.toggleDelete}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
