export interface CustomData {
  description: string;
  title: string;
}

export interface CustomEvents {
  onCustomEvent: (event: MouseEvent) => void;
}
