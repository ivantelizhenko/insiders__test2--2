import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import {
  Action,
  EventStatus,
  FormStatus,
  ScheduleState,
  ScheduleContextValue,
} from './ScheduleContextType';
import { fetchEvents } from '../../firebase/firestoreOperations';

const ScheduleContext = createContext<ScheduleContextValue | null>(null);

const initialState: ScheduleState = {
  events: [],
  editedEvent: null,
  formStatus: FormStatus.Add,
  isAuth: false,
};

function booksReducer(state: ScheduleState, action: Action): ScheduleState {
  switch (action.type) {
    case 'events/load': {
      return {
        ...state,
        events: action.payload,
      };
    }
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
    case 'auth/setTrue': {
      return {
        ...state,
        isAuth: true,
      };
    }
    case 'auth/setFalse': {
      return {
        ...state,
        isAuth: false,
      };
    }
    default:
      throw new Error('Unknown action type');
  }
}

function ScheduleProvider({ children }: { children: ReactNode }) {
  const [scheduleState, dispatch] = useReducer(booksReducer, initialState);

  useEffect(() => {
    async function get() {
      const data = await fetchEvents();
      const newData = data!.map(event => ({
        ...event,
        status: EventStatus[event.status as EventStatus],
      }));
      dispatch({ type: 'events/load', payload: newData });
    }
    get();
  }, [scheduleState.events, scheduleState.isAuth]);

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
    setAuthTrue() {
      dispatch({ type: 'auth/setTrue' });
    },
    setAuthFalse() {
      dispatch({ type: 'auth/setFalse' });
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
