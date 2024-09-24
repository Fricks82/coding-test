'use client';

import Link from 'next/link';
import { useState } from 'react';
import styles from './Header.module.scss';

/**
 * 共通ヘッダー用コンポーネント
 */
export const Header = () => {
  /**
   * メニューの展開の状態
   * @type {boolean}
   */
  const [isOpen, setIsOpen] = useState<boolean>(false);
  /**
   * ハンバーガメニューのクリックハンドラー
   */
  const handleClick = () => {
    setIsOpen(!isOpen);
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
              <Link href='/'>Home</Link>
            </li>
            <li>
              <Link href='/'>Home</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
