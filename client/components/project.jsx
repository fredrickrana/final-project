import React from 'react';
import Button from './button';
import Editor from './editor';

export default class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      language: 'HTML',
      html: '',
      css: '',
      js: '',
      srcDoc: '',
      isFinished: false,
      title: ''
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChangeHTML = this.handleChangeHTML.bind(this);
    this.handleChangeCSS = this.handleChangeCSS.bind(this);
    this.handleChangeJS = this.handleChangeJS.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.toggleFinish = this.toggleFinish.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClick(event) {
    this.setState({ language: event.target.textContent });
  }

  handleChangeHTML(editor, data, value) {
    this.setState({ html: value });
    editor.refresh();
  }

  handleChangeCSS(editor, data, value) {
    this.setState({ css: value });
    editor.refresh();
  }

  handleChangeJS(editor, data, value) {
    this.setState({ js: value });
    editor.refresh();
  }

  handleChangeTitle(event) {
    this.setState({ title: event.target.value });
  }

  componentDidUpdate() {
    const timeOut = setTimeout(() => {
      this.setState({
        srcDoc:
          `<html>
          <body>${this.state.html}</body>
          <style>${this.state.css}</style>
          <script>${this.state.js}</script>
        </html>`
      });
    }, 800);
    return () => clearTimeout(timeOut);
  }

  toggleFinish() {
    this.setState({ isFinished: !this.state.isFinished });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { html, css, js, title } = this.state;
    const data = {
      html,
      css,
      js,
      title
    };
    fetch('/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => {
        res.json();
      })
      .then(result => {
        this.setState({ isFinished: !this.state.isFinished });
        this.setState({ title: '' });
      })
      .catch(err => { console.error('error:', err); });
  }

  render() {
    const language = this.state.language;
    const clickedHTML = (language === 'HTML') ? 'dark-background' : 'blue-background';
    const clickedCSS = (language === 'CSS') ? 'dark-background' : 'blue-background';
    const clickedJS = (language === 'JavaScript') ? 'dark-background' : 'blue-background';
    const openedEditor = (language === 'HTML') ? 'xml' : (language === 'CSS') ? 'css' : 'javascript';
    const code = (language === 'HTML') ? this.state.html : (language === 'CSS') ? this.state.css : this.state.js;
    const updateCode = (language === 'HTML') ? this.handleChangeHTML : (language === 'CSS') ? this.handleChangeCSS : this.handleChangeJS;

    const modalBackground = (!this.state.isFinished) ? 'hide' : 'finish-modal-background';
    const modal = (!this.state.isFinished) ? 'hide' : 'finish-modal';
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
              onBeforeChange={updateCode}
              className='inline'
            />
            <Editor
              codingLanguage='xml'
              value={this.state.html}
              onBeforeChange={this.handleChangeHTML}
              className='hidden'
            />
            <Editor
              codingLanguage='css'
              value={this.state.css}
              onBeforeChange={this.handleChangeCSS}
              className='hidden'
            />
            <Editor
              codingLanguage='javascript'
              value={this.state.js}
              onBeforeChange={this.handleChangeJS}
              className='hidden'
            />
          </div>
        </div>
        <div className='container'>
          <div className='row justify-center'>
            <iframe
              srcDoc={this.state.srcDoc}
              title='output'
              sandbox='allow-scripts'
              frameBorder='1'
              width='100%'
              height='100%'
              className='iframe'
            />
          </div>
          <div className='row position-fixed black-background justify-end'>
            <button className='finish-button' onClick={this.toggleFinish}>Finish</button>
          </div>
        </div>
        <div className='container text-center'>
          <div className={modalBackground} onClick={this.toggleFinish}></div>
          <div className={modal}>
            <div className='finish-modal-content text-center font-24'>
              <h3>Enter Title:</h3>
              <input type="text" size='20' className='input-title' placeholder='Project Name' onChange={this.handleChangeTitle} required/>
              <div className='row justify-center'>
                <button className='modal-button blue-background' onClick={this.handleSubmit}>Save</button>
                <button className='modal-button grey-background' onClick={this.toggleFinish}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
