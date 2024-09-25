"use client";

import { auth } from "@/lib/firebase";
import styles from "./page.module.scss";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LoginPanelContainer } from "@/components/page/home/LoginPanel";

/** 初期表示のホーム画面 */
const Home = () => {
  /** ログイン状態 */
  const [isLogin, setIsLogin] = useState<boolean | null>(null);

  /** ページアクセス時にログイン状態を取得し表示を切り替える */
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // ログイン中
        const uid = user.uid;
        console.log(uid);
        setIsLogin(true);
      } else {
        // 未ログイン状態
        setIsLogin(false);
      }
    });
  }, [auth]);

  return (
    <>
      {isLogin ? (
        <div className={styles.homeContent}>Home</div>
      ) : (
        isLogin === false && (
          <div className={styles.loginContent}>
            <LoginPanelContainer />
          </div>
        )
      )}
    </>
  );
};
export default Home;
