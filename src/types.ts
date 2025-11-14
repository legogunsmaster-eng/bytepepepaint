export interface Layer {
  id: string;
  name: string;
  visible: boolean;
  locked: boolean;
  opacity: number;
  pixels: Map<string, string>;
}

export type Tool = 
  | 'pencil' 
  | 'eraser' 
  | 'fill' 
  | 'eyedropper' 
  | 'line' 
  | 'rectangle' 
  | 'ellipse' 
  | 'selection';

export interface HistoryState {
  layers: Layer[];
  timestamp: number;
}

export interface Project {
  name: string;
  width: number;
  height: number;
  layers: Layer[];
  palette: string[];
  backgroundColor: string;
  gridEnabled: boolean;
  gridColor: string;
  gridSize: number;
}
