import React from "react";
import Link from "next/link";
import styles from "./LoginPanel.module.scss";
import { Button } from "@/components/ui/Button/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { InputText } from "@/components/ui/InputText";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

/** ログインフォームの型 */
type FormData = {
  email: string;
  password: string;
};

/** アクセスした際に未ログイン時に表示するログイン用のパネル */
export const LoginPanelContainer = () => {
  /** RHFの定義 */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    reValidateMode: "onSubmit",
  });

  /** ログイン処理 */
  const handleOnSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("ログインに失敗しました");
      }
    }
  };

  return (
    <div className={styles.box}>
      <h3 className={styles.title}>ログイン</h3>
      <p className={styles.caption}>
        メールアドレスとパスワードでログインしてください
      </p>
      <form onSubmit={handleSubmit(handleOnSubmit)} className={styles.form}>
        <div className={styles.input}>
          <InputText
            id="email"
            placeholder="メールアドレス"
            {...register("email", {
              required: {
                value: true,
                message: "メールアドレスを入力してください",
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "メールアドレスを入力してください",
              },
            })}
            width="l"
          />
          {errors.email?.message && (
            <p className={styles.error}>{errors.email.message as string}</p>
          )}
        </div>
        <div className={styles.input}>
          <InputText
            id="password"
            placeholder="パスワード"
            type="password"
            {...register("password", {
              required: {
                value: true,
                message: "パスワードを入力してください",
              },
              pattern: {
                value: /^(?=.*[a-zA-Z])(?=.*\d).{8,32}$/,
                message: "設定したパスワードを入力してください。",
              },
            })}
            width="l"
          />
          {errors.password?.message && (
            <p className={styles.error}>{errors.password.message as string}</p>
          )}
        </div>
        <Button
          label="ログイン"
          width="l"
          variant="strong"
          className={styles.loginButton}
        />
      </form>
      <div className={styles.nonUser}>
        <p className={styles.caption}>
          アカウントをお持ちでない方は<Link href="/register">こちら</Link>
          から新規ユーザー登録
        </p>
      </div>
    </div>
  );
};
