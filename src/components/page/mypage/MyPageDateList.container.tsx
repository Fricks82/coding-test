import { fetchUserData } from "@/app/utils/auth";
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

  const [userData, setUserData] = useState<DocumentData | null | undefined>(
    null
  );

  /** ページアクセス時にユーザー状態を取得 */
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        setUserData(await fetchUserData(uid));
      } else {
        router.push("/");
      }
    });
  }, [auth]);

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
              <div className={styles.iconImage}>
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
