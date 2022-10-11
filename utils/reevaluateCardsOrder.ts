import {
  collection,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../config/firebase';

export const reevaluateCardsOrder = async (projectId: string) => {
  const q = query(
    collection(db, 'projects', projectId, 'cards'),
    orderBy('order', 'asc')
  );

  try {
    let order = 0;
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (card) => {
      await updateDoc(card.ref, {
        order: ++order,
      });
    });
  } catch (error) {
    console.log(error);
  }
};
