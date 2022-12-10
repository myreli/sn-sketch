import { Excalidraw } from '@excalidraw/excalidraw';
import { ExcalidrawImperativeAPI } from '@excalidraw/excalidraw/types/types';
import { useRef } from 'react';

export type WhiteboardContent = {
  elements: any;
  appState: any;
};

export interface WhiteboardProps {
  onChange: (content: WhiteboardContent) => void;
  existingContent?: WhiteboardContent;
  readOnly?: boolean;
}

export default function Whiteboard({
  existingContent,
  onChange,
  readOnly,
}: WhiteboardProps) {
  const excalidraw = useRef<ExcalidrawImperativeAPI>(null);

  return (
    <Excalidraw
      ref={excalidraw}
      initialData={existingContent}
      zenModeEnabled={true}
      viewModeEnabled={readOnly}
      onChange={(elements, appState) => onChange({ elements, appState })}
    />
  );
}
