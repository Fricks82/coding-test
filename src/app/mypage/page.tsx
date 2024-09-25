"use client";

import { MyPageDateList } from "@/components/page/mypage";
import styles from "./mypage.module.scss";
import Link from "next/link";

const Mypage = () => {
  return (
    <div className={styles.mypageContent}>
      <h2 className={styles.title}>マイページ</h2>
      <MyPageDateList />
      <Link href="/" className={styles.backLink}>
        トップページに戻る
      </Link>
    </div>
  );
};

export default Mypage;
