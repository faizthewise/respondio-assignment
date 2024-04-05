export interface CustomData {
  description: string;
  title: string;
}

export interface CustomEvents {
  [key: string]: CustomEvent;
}

// Define the structure of a custom event
export interface CustomEvent {
  onCustomEvent: (event: MouseEvent) => void;
}
