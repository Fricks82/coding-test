import React from "react";
import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  DocumentData,
  Timestamp,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import styles from "./PostForm.module.scss";
import { Button } from "@/components/ui/Button";
import { TextArea } from "@/components/ui/TextArea";
import { fetchUserData } from "@/utils/auth";

/**
 * 投稿フォーム用コンポーネント
 */
export const PostFormContainer = () => {
  /** 新規投稿のテキスト */
  const [newPost, setNewPost] = useState<string>("");
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

  /** Firebaseに投稿 */
  const handlePost = async () => {
    if (user && userData && newPost.trim()) {
      try {
        await addDoc(collection(db, "posts"), {
          text: newPost,
          userId: user.uid,
          userName: userData.userName,
          avatar: userData.avatar,
          createdAt: Timestamp.now(),
        });
        setNewPost("");
      } catch {
        alert("投稿に失敗しました。");
      }
    }
  };

  return (
    <>
      {user && (
        <div className={styles.box}>
          <div className={styles.form}>
            <div className={styles.textarea}>
              <TextArea
                id="post-text"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="いまどうしてる？"
                className={styles.input}
              />
              <p data-error={newPost.length > 140} className={styles.count}>
                {newPost.length}/140
              </p>
            </div>
            <Button
              id="post-button"
              type="button"
              onClick={handlePost}
              label="投稿"
              width="s"
              disabled={newPost.length > 140}
            />
          </div>
        </div>
      )}
    </>
  );
};
