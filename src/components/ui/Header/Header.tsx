"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "../Button";
import { useRouter } from "next/navigation";

/**
 * 共通ヘッダー用コンポーネント
 */
export const Header = () => {
  const router = useRouter();
  /** ログイン状態 */
  const [isLogin, setIsLogin] = useState<boolean | null>(null);

  /** ページアクセス時にログイン状態を取得し表示を切り替える */
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsOpen(false);
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

  /** ログアウトボタンのクリック処理 */
  const handleLogoutClick = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      alert("ログアウトに失敗しました。");
    }
  };

  /** メニューの展開の状態 */
  const [isOpen, setIsOpen] = useState<boolean>(false);

  /** ハンバーガメニューのクリックハンドラー */
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  /** リンククリック処理 */
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.header}>
      <h1 className={styles.title}>CodingTest App</h1>
      <div onClick={handleClick} data-expand={isOpen} className={styles.burger}>
        <span />
        <span />
        <span />
      </div>
      {isOpen && (
        <div className={styles.menu}>
          <ul>
            <li>
              <Link href="/" onClick={handleLinkClick}>
                Home
              </Link>
            </li>
            {isLogin ? (
              <>
                <li>
                  <Button
                    label="ログアウト"
                    onClick={handleLogoutClick}
                    width="m"
                  />
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/register" onClick={handleLinkClick}>
                    新規登録
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
