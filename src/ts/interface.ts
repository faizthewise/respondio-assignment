export interface NodeCustomData {
  description?: string;
  title: string;
  payload?: SendMessagePayload[];
  comment?: string;
  type?: string;
  timezone?: string;
  action?: string;
  oncePerContact?: boolean;
  times?: BusinessHoursTimes[];
  connectors?: string[];
  connectorType?: string;
}

export interface SendMessagePayload {
  type: string;
  attachment?: string;
  text?: string;
}

export interface BusinessHoursTimes {
  startTime: string;
  endTime: string;
  day: string;
}

export interface EdgeCustomData {
  connectorType: string;
}

export interface CustomEvents {
  [key: string]: CustomEvent;
}

export interface CustomEvent {
  onCustomEvent: (event: MouseEvent) => void;
}
