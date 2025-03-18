import { createContext, ReactNode, useContext, useReducer } from 'react';
import {
  Action,
  FormStatus,
  ScheduleContextValue,
  ScheduleState,
  Status,
} from './ScheduleContextType';

const ScheduleContext = createContext<ScheduleContextValue | null>(null);

const initialState: ScheduleState = {
  events: [
    {
      title: 'title1',
      description: 'description1',
      date: '2022-09-09',
      status: Status.Casual,
      id: 'fhgdfsf',
    },
    {
      title: 'title2',
      description: 'description2',
      date: '1939-09-01',
      status: Status.Casual,
      id: 'erekkd',
    },
    {
      title: 'title3',
      description: 'description3',
      date: '1945-05-05',
      status: Status.Casual,
      id: '1923jdjdf',
    },
    {
      title: 'title4',
      description: 'description4',
      date: '2022-02-24',
      status: Status.Casual,
      id: 'slshjhnt',
    },
  ],
  editedEvent: null,
  formStatus: FormStatus.Add,
};

function booksReducer(state: ScheduleState, action: Action): ScheduleState {
  switch (action.type) {
    case 'event/add': {
      return {
        ...state,
        events: [...state.events, action.payload],
      };
    }
    case 'event/remove': {
      return {
        ...state,
        events: state.events.filter(event => event.id !== action.payload),
      };
    }
    case 'editedEvent/set': {
      const currentEvent = state.events.find(
        event => event.id === action.payload
      )!;
      return {
        ...state,
        editedEvent: currentEvent,
        formStatus: FormStatus.Edit,
      };
    }
    case 'editedEvent/save': {
      const pastEditedEventIndex = state.events.findIndex(
        event => event.id === state.editedEvent!.id
      )!;
      state.events.splice(pastEditedEventIndex, 1, action.payload);

      return {
        ...state,
        editedEvent: null,
        formStatus: FormStatus.Add,
      };
    }
    default:
      throw new Error('Unknown action type');
  }
}

function ScheduleProvider({ children }: { children: ReactNode }) {
  const [scheduleState, dispatch] = useReducer(booksReducer, initialState);

  const ctx: ScheduleContextValue = {
    ...scheduleState,
    addEvent(newEvent) {
      dispatch({ type: 'event/add', payload: newEvent });
    },
    removeEvent(id) {
      dispatch({ type: 'event/remove', payload: id });
    },
    setEditedEvent(id) {
      dispatch({ type: 'editedEvent/set', payload: id });
    },
    saveEditedEvent(newEditedEvent) {
      dispatch({ type: 'editedEvent/save', payload: newEditedEvent });
    },
  };

  return (
    <ScheduleContext.Provider value={ctx}>{children}</ScheduleContext.Provider>
  );
}

function useSchedule() {
  const context = useContext(ScheduleContext);
  if (context === undefined)
    throw new Error('ScheduleContext was used outside of the ScheduleProvider');

  return context as ScheduleContextValue;
}

// eslint-disable-next-line react-refresh/only-export-components
export { ScheduleProvider, useSchedule };
