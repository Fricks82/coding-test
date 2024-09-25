import Link from "next/link";
import styles from "./RegisterPanel.module.scss";
import { Button } from "@/components/ui/Button/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { InputText } from "@/components/ui/InputText";
import { CheckBox } from "@/components/ui/CheckBox";
import { RadioButton } from "@/components/ui/RadioButton";
import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/navigation";
import { useState } from "react";

type FormData = {
  userName: string;
  email: string;
  password: string;
  avatar: FileList;
  birthDay: string;
  gender: "male" | "female";
  agree: boolean;
};

/** アクセスした際に未ログイン時に表示するログイン用のパネル */
export const RegisterPanelContainer = () => {
  /** ローディングの表示切替 */
  const [isLoading, setIsLoading] = useState<boolean>(false);
  /** 登録完了後自動ページ遷移 */
  const router = useRouter();
  /** RHFの定義 */
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    reValidateMode: "onSubmit",
  });

  /** 規約に同意でボタン活性 */
  const isAgreed = watch("agree");

  /**
   * アイコン画像のアップロード処理
   * @param {File} file - アイコン画像ファイル
   * @returns  {Promise<string>} アイコン画像URL
   *  */
  const uploadAvatar = async (file: File): Promise<string> => {
    const storage = getStorage();
    const storageRef = ref(storage, `avatars/${file.name}`);
    await uploadBytes(storageRef, file);
    // アップロード後に画像URLを取得
    const url = await getDownloadURL(storageRef);
    return url;
  };

  /**
   * フォーム送信時の処理
   * @param {FormData} data - フォームの入力値
   * */
  const handleOnSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    try {
      //　ローディングを表示
      setIsLoading(true);
      // Firebase Authenticationでユーザー登録
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;

      // アイコン画像のアップロード処理
      let avatarURL = "";
      if (data.avatar.length > 0) {
        avatarURL = await uploadAvatar(data.avatar[0]);
      }

      // Firestoreにユーザー情報を保存
      await setDoc(doc(db, "users", user.uid), {
        userName: data.userName,
        email: data.email,
        birthDay: data.birthDay,
        gender: data.gender,
        avatar: avatarURL,
        createdAt: new Date(), // 作成日
      });

      router.push("/");
    } catch (error) {
      //　ローディングを非表示
      setIsLoading(false);
      alert("ユーザー登録に失敗しました。");
    }
  };

  return (
    <>
      {isLoading && (
        <div className={styles.loading}>
          <p>登録中...</p>
        </div>
      )}
      <div className={styles.box}>
        <h3 className={styles.title}>新規登録</h3>
        <p className={styles.caption}>登録情報を入力してください。</p>
        <form onSubmit={handleSubmit(handleOnSubmit)} className={styles.form}>
          <div className={styles.input}>
            <label className={styles.label}>ユーザー名</label>
            <InputText
              id="userName"
              placeholder="ユーザー名"
              {...register("userName", {
                required: {
                  value: true,
                  message: "ユーザー名を入力してください",
                },
                pattern: {
                  value: /^[a-zA-Z0-9]+$/,
                  message: "半角英数字のみで入力してください。",
                },
              })}
              width="l"
            />
            {errors.userName?.message && (
              <p className={styles.error}>
                {errors.userName.message as string}
              </p>
            )}
          </div>
          <div className={styles.input}>
            <label className={styles.label}>メールアドレス</label>
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
                  message: "8桁の数字のみ入力してください。",
                },
              })}
              width="l"
            />
            {errors.email?.message && (
              <p className={styles.error}>{errors.email.message as string}</p>
            )}
          </div>
          <div className={styles.input}>
            <label className={styles.label}>パスワード</label>
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
                  message:
                    "8文字以上、32文字以下の少なくとも1つ以上の半角英字と数字をもつパスワードを入力してください。",
                },
              })}
              width="l"
            />
            {errors.password?.message && (
              <p className={styles.error}>
                {errors.password.message as string}
              </p>
            )}
          </div>
          <div className={styles.input}>
            <label className={styles.label}>アイコン画像</label>
            <InputText
              id="avatar"
              type="file"
              accept="image/*"
              {...register("avatar", {
                required: "画像ファイルを選択してください",
              })}
              width="l"
            />
            {errors.avatar?.message && (
              <p className={styles.error}>{errors.avatar.message as string}</p>
            )}
          </div>
          <div className={styles.input}>
            <label className={styles.label}>生年月日</label>
            <InputText
              id="birthDay"
              type="date"
              {...register("birthDay", {
                required: "生年月日を入力してください",
              })}
              width="l"
            />
            {errors.birthDay?.message && (
              <p className={styles.error}>
                {errors.birthDay.message as string}
              </p>
            )}
          </div>
          <div className={styles.input}>
            <label className={styles.label}>性別</label>
            <div className={styles.gender}>
              <label htmlFor="gender-male" className={styles.genderLabel}>
                <RadioButton
                  id="gender-male"
                  value="male"
                  {...register("gender", {
                    required: "性別を選択してください",
                  })}
                />
                <span>男性</span>
              </label>
              <label htmlFor="gender-female" className={styles.genderLabel}>
                <RadioButton
                  id="gender-female"
                  value="female"
                  {...register("gender", {
                    required: "性別を選択してください",
                  })}
                />
                <span>女性</span>
              </label>
            </div>
            {errors.gender?.message && (
              <p className={styles.error}>{errors.gender.message as string}</p>
            )}
          </div>
          <div className={styles.input}>
            <div className={styles.agree}>
              <CheckBox id="agree" {...register("agree")} />
              <p>
                <a
                  href="https://luna-matching.notion.site/a714620bbd8740d1ac98f2326fbd0bbc"
                  target="_blank"
                >
                  利用規約
                </a>
                に同意する。
              </p>
            </div>
          </div>
          <Button
            label="新規登録"
            width="l"
            variant="strong"
            disabled={!isAgreed}
            className={styles.registerButton}
          />
        </form>
      </div>
    </>
  );
};
