import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  UpdateData,
  updateDoc,
} from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth, db } from './firebase';
import { Event } from '../store/scheduleContext/ScheduleContextType';

type FetchedEvents = {
  title: string;
  description: string;
  id: string;
  date: string;
  status: string;
};

export async function fetchEvents() {
  try {
    const eventsCol = collection(db, 'events');
    const eventsSnapshot = await getDocs(eventsCol);
    const eventsList = eventsSnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
    }));

    return eventsList as FetchedEvents[];
  } catch (err) {
    console.error('Помилка при зчитуванні даних:', err);
  }
}

export async function updateEventById(updatedEvent: Event) {
  try {
    const docRef = doc(db, 'events', updatedEvent.id);
    await updateDoc(docRef, updatedEvent as UpdateData<Event>);
    console.log(`Документ з ID ${docRef.id} успішно оновлено.`);
  } catch (error) {
    console.error('Помилка при оновленні документа:', error);
  }
}

export async function addNewEvent(newEvent: Event) {
  try {
    const eventsCollection = collection(db, 'events');
    const docRef = await addDoc(eventsCollection, newEvent);
    console.log('Новий документ додано з ID:', docRef.id);
  } catch (error) {
    console.error('Помилка при додаванні документа:', error);
  }
}

export async function deleteEventById(id: string) {
  try {
    const docRef = doc(db, 'events', id);
    console.log(id);
    await deleteDoc(docRef);
    console.log(`Документ з ID ${id} успішно видалено.`);
  } catch (error) {
    console.error('Помилка при видаленні документа:', error);
  }
}

export async function loginUser(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    // Вхід успішний
    const user = userCredential.user;
    console.log('Користувач увійшов:', user);
    return user;
  } catch (error) {
    console.error('Помилка входу:', error);
  }
}

export async function registerUser(email: string, password: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log('Користувач успішно зареєстрований:', user);
    return user;
  } catch (error) {
    console.error('Помилка реєстрації:', error);
    // Обробка помилки реєстрації
  }
}
