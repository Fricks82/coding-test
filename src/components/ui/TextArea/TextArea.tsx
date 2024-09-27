import React from "react";
import classNames from "classnames";
import styles from "./TextArea.module.scss";
import { forwardRef } from "react";

type Props = React.ComponentProps<"textarea"> & {
  /** テキストフィールドのスタイル */
  className?: string;
  /** テキストフィールの横幅 */
  width?: "s" | "m" | "l";
};

export const TextArea = forwardRef<HTMLTextAreaElement, Props>(
  ({ className, width, ...textareaProps }, ref) => {
    return (
      <textarea
        ref={ref}
        data-width={width}
        {...textareaProps}
        className={classNames(styles.textarea, className)}
      />
    );
  }
);
TextArea.displayName = "TextArea";
