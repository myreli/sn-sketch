import React from 'react';
import EditorKit, { EditorKitDelegate } from '@standardnotes/editor-kit';
import Whiteboard from './Whiteboard';

export enum HtmlElementId {
  snComponent = 'sn-component',
  textarea = 'textarea',
}

export enum HtmlClassName {
  snComponent = 'sn-component',
  textarea = 'sk-input contrast textarea',
}

export interface EditorInterface {
  printUrl: boolean;
  text: string;
}

const initialState = {
  printUrl: false,
  text: '',
};

let keyMap = new Map();

export default class Editor extends React.Component<{}, EditorInterface> {
  private editorKit?: EditorKit;

  constructor(props: EditorInterface) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    this.configureEditorKit();
  }

  configureEditorKit = () => {
    const delegate: EditorKitDelegate = {
      /** This loads every time a different note is loaded */
      setEditorRawText: (text: string) => {
        this.setState({
          ...initialState,
          text,
        });
      },
      clearUndoHistory: () => {},
      getElementsBySelector: () => [],
    };

    this.editorKit = new EditorKit(delegate, {
      mode: 'plaintext',
      supportsFileSafe: false,
    });
  };

  handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = event.target;
    const value = target.value;
    this.saveText(value);
  };

  saveText = (text: string) => {
    this.saveNote(text);
    this.setState({
      text: text,
    });
  };

  saveNote = (text: string) => {
    /**
     * This will work in an SN context, but breaks the standalone editor,
     * so we need to catch the error
     */
    try {
      this.editorKit?.onEditorValueChanged(text);
    } catch (error) {
      console.log('Error saving note:', error);
    }
  };

  onBlur = (e: React.FocusEvent) => {};

  onFocus = (e: React.FocusEvent) => {};

  onKeyDown = (e: React.KeyboardEvent | KeyboardEvent) => {
    keyMap.set(e.key, true);
    // Do nothing if 'Control' and 's' are pressed
    if (keyMap.get('Control') && keyMap.get('s')) {
      e.preventDefault();
    }
  };

  onKeyUp = (e: React.KeyboardEvent | KeyboardEvent) => {
    keyMap.delete(e.key);
  };

  render() {
    const { text } = this.state;
    return <Whiteboard />;
  }
}
