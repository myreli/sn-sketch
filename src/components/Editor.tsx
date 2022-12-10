import React from 'react';
import EditorKit, { EditorKitDelegate } from '@standardnotes/editor-kit';
import Whiteboard, { WhiteboardContent } from './Whiteboard';

interface EditorState {
  locked: boolean;
}

interface EditorProps {}

export default class Editor extends React.Component<EditorProps, EditorState> {
  private editorKit?: EditorKit;
  private existingContent?: WhiteboardContent;

  constructor(props: any) {
    super(props);
    this.state = {
      locked: false,
    };
  }

  componentDidMount() {
    this.configureEditorKit();
  }

  configureEditorKit = () => {
    const delegate: EditorKitDelegate = {
      /** This loads every time a different note is loaded */
      setEditorRawText: (rawNoteContent: string) => {
        this.existingContent = rawNoteContent
          ? JSON.parse(rawNoteContent)
          : undefined;
      },
      onNoteLockToggle: (locked: boolean) => {
        this.setState({ locked });
      },
    };

    this.editorKit = new EditorKit(delegate, {
      mode: 'json',
      supportsFileSafe: false,
    });
  };

  sync = (note: WhiteboardContent) => {
    /**
     * This will work in an SN context, but breaks the standalone editor,
     * so we need to catch the error
     */
    try {
      this.editorKit?.onEditorValueChanged(JSON.stringify(note, null));
    } catch (error) {
      console.log('Error saving note trough SN EditorKit.', error);
    }
  };

  render() {
    return (
      <Whiteboard
        onChange={this.sync}
        existingContent={this.existingContent}
        readOnly={this.state.locked}
      />
    );
  }
}
