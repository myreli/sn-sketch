import { Excalidraw } from '@excalidraw/excalidraw';
import { ExcalidrawImperativeAPI } from '@excalidraw/excalidraw/types/types';
import { useRef } from 'react';

export default function Whiteboard() {
  const excalidraw = useRef<ExcalidrawImperativeAPI>(null);
  return <Excalidraw ref={excalidraw} zenModeEnabled={true} />;
}
