import React from "react";
import classNames from "classnames";
import styles from "./InputText.module.scss";
import { forwardRef } from "react";

type Props = React.ComponentProps<"input"> & {
  /** テキストフィールドのスタイル */
  className?: string;
  /** テキストフィールの横幅 */
  width?: "s" | "m" | "l";
};

export const InputText = forwardRef<HTMLInputElement, Props>(
  ({ className, width, ...inputProps }, ref) => {
    return (
      <input
        ref={ref}
        data-width={width}
        {...inputProps}
        className={classNames(styles.input, className)}
      />
    );
  }
);
InputText.displayName = "InputText";
