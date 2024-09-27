import React from "react";
import { forwardRef } from "react";

export const RadioButton = forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ ...inputProps }, ref) => {
  return <input type="radio" ref={ref} {...inputProps} />;
});
RadioButton.displayName = "RadioButton";
