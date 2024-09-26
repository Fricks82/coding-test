"use client";

import { auth } from "@/lib/firebase";
import styles from "./page.module.scss";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { LoginPanelContainer } from "@/components/page/home/LoginPanel";
import { PostFormContainer } from "@/components/page/home/PostForm";
import { PostListContainer } from "@/components/page/home/PostList";

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
        setIsLogin(true);
      } else {
        // 未ログイン
        setIsLogin(false);
      }
    });
  }, [auth]);

  return (
    <>
      {isLogin ? (
        // ログイン中は投稿一覧表示
        <div className={styles.homeContent}>
          <PostListContainer />
          <PostFormContainer />
        </div>
      ) : (
        isLogin === false && (
          // 未ログインはログインパネル表示
          <div className={styles.loginContent}>
            <LoginPanelContainer />
          </div>
        )
      )}
    </>
  );
};
export default Home;
