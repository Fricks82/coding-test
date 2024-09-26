import { fetchUserData } from "@/utils/auth";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { DocumentData } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./MyPageDateList.module.scss";
import Image from "next/image";

/** マイページの情報リスト表示用コンポーネント */
export const MyPageDateList = () => {
  /** 未ログイン時リダイレクト用のルーター */
  const router = useRouter();
  /** ログインユーザー情報 */
  const user = auth.currentUser;
  /** ログインユーザーの登録データ */
  const [userData, setUserData] = useState<DocumentData | null | undefined>(
    null
  );

  /** ページアクセス時にユーザー状態を取得 */
  useEffect(() => {
    (async () => {
      if (user) {
        const uid = user.uid;
        setUserData(await fetchUserData(uid));
      }
    })();
  }, [user]);

  return (
    <table className={styles.dataTable}>
      {userData && (
        <tbody>
          <tr>
            <th>ユーザー名</th>
            <td>{userData.userName}</td>
          </tr>
          <tr>
            <th>メールアドレス</th>
            <td>{userData.email}</td>
          </tr>
          <tr>
            <th>アイコン画像</th>
            <td>
              <div className={styles.avatar}>
                <Image
                  src={userData.avatar}
                  layout="fill"
                  objectFit="contain"
                  alt=""
                />
              </div>
            </td>
          </tr>
          <tr>
            <th>生年月日</th>
            <td>{userData.birthDay}</td>
          </tr>
          <tr>
            <th>性別</th>
            <td>{userData.gender}</td>
          </tr>
        </tbody>
      )}
    </table>
  );
};
