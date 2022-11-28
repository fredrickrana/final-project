import React from 'react';
import TypewriterComponent from 'typewriter-effect';

export default class HomePage extends React.Component {
  render() {
    return (
      <>
        <div className='container background-image'>
          <div className='row'>
            <div className='column-one-third position-left move-left'>
              <TypewriterComponent
                options={{
                  delay: 130
                }}
                onInit={typewriter => {
                  typewriter
                    .pauseFor(2000)
                    .typeString('<h1 class="title"> Build Code With...</h1>')
                    .deleteAll()
                    .typeString('<h1 class="title">HTML</h1>')
                    .start();
                }}
              />
              <img className='code' src="./images/html.png" alt="html" />
            </div>
            <div className='column-one-third position-center'>
              <TypewriterComponent
                options={{
                  delay: 130
                }}
                onInit={typewriter => {
                  typewriter
                    .pauseFor(2000)
                    .typeString('<h1 class="title">Build Code With...</h1>')
                    .deleteAll()
                    .typeString('<h1 class="title">CSS</h1>')
                    .start();
                }}
              />
              <img className='code fade-in-image object-contain' src="./images/css.png" alt="css" />
            </div>
            <div className='column-one-third position-right move-right'>
              <TypewriterComponent
                options={{
                  delay: 130
                }}
                onInit={typewriter => {
                  typewriter
                    .pauseFor(2000)
                    .typeString('<h1 class="title">Build Code With...</h1>')
                    .deleteAll()
                    .typeString('<h1 class="title">JavaScript</h1>')
                    .start();
                }}
              />
              <img className='code' src="./images/javascript.png" alt="javascript" />
            </div>
          </div>
          <div className='row margin-description'>
            <div className='column-one-third description'>
              <TypewriterComponent
                options={{
                  delay: 10
                }}
                onInit={typewriter => {
                  typewriter
                    .pauseFor(7000)
                    .typeString('<h3 class="color-blue">Welcome to CodingFuze...</h3>')
                    .typeString('<p class="color-blue">CodingFuze is a social development environment for front-end designers and developers. Users can be part of an online comminity where coders can build and showcase their user-created HTML, CSS, JavaScript code snippets.</p>')
                    .start();
                }}
              />
            </div>
          </div>
          <div className='position-bottom fade-in-image'>
            <a href="#newproject">
              <button className='button'>Get Started</button>
            </a>
          </div>
        </div>
      </>
    );
  }
}
