import React from "react";
import { useEffect, useState } from "react";
import {
  collection,
  orderBy,
  query,
  onSnapshot,
  deleteDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import styles from "./PostList.module.scss";
import { formatTimestamp } from "@/utils/date";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

/** 投稿データの型 */
type Post = {
  id: string;
  text: string;
  userId: string;
  userName: string;
  avatar: string;
  createdAt: Timestamp;
};

/**
 * 投稿一覧表示用コンポーネント
 */
export const PostListContainer = () => {
  /** 投稿一覧データ */
  const [posts, setPosts] = useState<Post[]>([]);
  /** ログインユーザー情報 */
  const user = auth.currentUser;

  useEffect(() => {
    // Firestore から "posts" コレクションのデータを取得
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));

    // データが更新された際にリアルタイムで反映
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          text: data.text,
          userId: data.userId,
          userName: data.userName,
          avatar: data.avatar,
          createdAt: data.createdAt,
        } as Post;
      });

      setPosts(postsData);
    });

    return () => unsubscribe();
  }, []);

  /** 投稿を削除する */
  const handleDeleteClick = async (id: string) => {
    try {
      await deleteDoc(doc(db, "posts", id));
    } catch {
      alert("削除できませんでした。");
    }
  };

  return (
    <div className={styles.list} id="post-list">
      {posts.map((post) => (
        <div key={post.id} className={styles.item}>
          <div className={styles.avatar}>
            <Image
              src={post.avatar}
              fill
              sizes="50vw"
              style={{
                objectFit: "cover",
              }}
              alt=""
            />
          </div>
          <div className={styles.box}>
            <p className={styles.username}>{post.userName}</p>
            <p className={styles.text}>{post.text}</p>
            <p className={styles.createdAt}>
              {formatTimestamp(post.createdAt)}
            </p>
            {user && post.userId === user.uid && (
              <Button
                label="削除"
                onClick={() => handleDeleteClick(post.id)}
                className={styles.deleteButton}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
