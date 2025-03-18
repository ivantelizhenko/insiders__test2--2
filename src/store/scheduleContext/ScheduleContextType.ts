export enum EventStatus {
  Casual = 'Casual',
  Important = 'Important',
  Crucial = 'Crucial',
}

export enum FormStatus {
  Add,
  Edit,
}

export interface Event {
  title: string;
  description: string;
  date: string;
  status: EventStatus;
  id: string;
}

export interface ScheduleState {
  events: Event[];
  editedEvent: Event | null;
  formStatus: FormStatus;
}

export type ScheduleContextValue = ScheduleState & {
  addEvent: (newEvent: Event) => void;
  removeEvent: (id: string) => void;
  setEditedEvent: (id: string) => void;
  saveEditedEvent: (newEvents: Event) => void;
};

interface LoadEventsAction {
  type: 'events/load';
  payload: Event[];
}

interface AddEventAction {
  type: 'event/add';
  payload: Event;
}
interface removeEventAction {
  type: 'event/remove';
  payload: string;
}
interface setEditedEventAction {
  type: 'editedEvent/set';
  payload: string;
}
interface saveEditedEventAction {
  type: 'editedEvent/save';
  payload: Event;
}

export type Action =
  | AddEventAction
  | removeEventAction
  | setEditedEventAction
  | saveEditedEventAction
  | LoadEventsAction;
