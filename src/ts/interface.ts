export interface NodeCustomData {
  description: string;
  title: string;
  payload?: SendMessagePayload[];
}

export interface SendMessagePayload {
  type: string;
  attachment?: string;
  text?: string;
}

export interface EdgeCustomData {
  connectorType: string;
}

export interface CustomEvents {
  [key: string]: CustomEvent;
}

// Define the structure of a custom event
export interface CustomEvent {
  onCustomEvent: (event: MouseEvent) => void;
}
