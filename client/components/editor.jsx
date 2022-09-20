import React from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/theme/dracula.css';
import { Controlled as EditorComponent } from 'react-codemirror2';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/display/autorefresh';

export default class Editor extends React.Component {
  render() {
    const codingLanguage = this.props.codingLanguage;
    const value = this.props.value;
    const onBeforeChange = this.props.onBeforeChange;
    const className = this.props.className;
    return (
      <div className={`editor-container ${className}`}>
        <EditorComponent
          onBeforeChange={onBeforeChange}
          value={value}
          className="code-mirror-wrapper"
          options={{
            lineWrapping: true,
            lint: true,
            mode: codingLanguage,
            lineNumbers: true,
            theme: 'dracula',
            autoCloseTags: true,
            autoCloseBrackets: true,
            autoRefresh: true
          }}
        />
      </div>
    );
  }
}
