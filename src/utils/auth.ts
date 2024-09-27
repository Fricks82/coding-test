import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

/**
 * uidからユーザーの詳細データ取得用関数
 * @param {string} uid
 * @returns
 */
export const fetchUserData = async (uid: string) => {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data();
      return userData;
    } else {
      return null;
    }
  } catch {
    alert("ユーザーデータ取得に失敗しました。");
  }
};
