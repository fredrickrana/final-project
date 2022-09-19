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
      // eslint-disable-next-line
      srcDoc: ``
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChangeHTML = this.handleChangeHTML.bind(this);
    this.handleChangeCSS = this.handleChangeCSS.bind(this);
    this.handleChangeJS = this.handleChangeJS.bind(this);
  }

  handleClick(event) {
    this.setState({ language: event.target.textContent });
  }

  handleChangeHTML(editor, data, value) {
    this.setState({ html: value });
  }

  handleChangeCSS(editor, data, value) {
    this.setState({ css: value });
  }

  handleChangeJS(editor, data, value) {
    this.setState({ js: value });
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

  render() {
    const language = this.state.language;
    const clickedHTML = (language === 'HTML') ? 'dark-background' : 'blue-background';
    const clickedCSS = (language === 'CSS') ? 'dark-background' : 'blue-background';
    const clickedJS = (language === 'JavaScript') ? 'dark-background' : 'blue-background';
    const openedEditor = (language === 'HTML') ? 'xml' : (language === 'CSS') ? 'css' : 'javascript';
    const code = (language === 'HTML') ? this.state.html : (language === 'CSS') ? this.state.css : this.state.js;
    const updateCode = (language === 'HTML') ? this.handleChangeHTML : (language === 'CSS') ? this.handleChangeCSS : this.handleChangeJS;
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
        </div>
      </>
    );
  }
}
