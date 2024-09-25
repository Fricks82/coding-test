import classNames from "classnames";
import styles from "./Button.module.scss";

type Props = React.ComponentProps<"button"> & {
  /** ボタンのラベル */
  label: string;
  /** ボタンのスタイル */
  className?: string;
  /** ボタンのサイズ */
  width?: "s" | "m" | "l";
  /** ボタンのデザイン */
  variant?: "strong";
};

export const Button = ({
  label,
  className,
  width,
  variant,
  ...buttonProps
}: Props) => {
  return (
    <button
      data-width={width}
      data-variant={variant}
      {...buttonProps}
      className={classNames(styles.button, className)}
    >
      {label}
    </button>
  );
};
