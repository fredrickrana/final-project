import React from 'react';
import TypewriterComponent from 'typewriter-effect';

export default class HomePage extends React.Component {
  render() {
    return (
      <>
        <div className='container background-image'>
          <div className='row'>
            <div className='column-full text-center'>
              <h2 className='code-title'>Build Code With...
                <TypewriterComponent
                  options={{
                    delay: 150,
                    loop: true
                  }}
                  onInit={typewriter => {
                    typewriter
                      .pauseFor(2000)
                      .typeString('<a class="code-title">HTML</a>')
                      .deleteAll()
                      .typeString('<a class="code-title">CSS</a>')
                      .deleteAll()
                      .typeString('<a class="code-title">JavaScript</a>')
                      .start();
                  }}
                />
              </h2>
              <img className='code fade-in-image fadein' src="./images/html.png" alt="html" />
              <img className='code fade-in-image fadein' src="./images/css.png" alt="css" />
              <img className='code fade-in-image fadein' src="./images/javascript.png" alt="javascript" />
              <div className='fade-in-image'>
                <a href="#newproject">
                  <button className='get-started-button'>Get Started</button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
