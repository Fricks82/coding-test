"use client";

import { RegisterPanelContainer } from "@/components/page/register/RegisterPanel";
import styles from "./register.module.scss";

const Register = () => {
  return (
    <div className={styles.registerContent}>
      <RegisterPanelContainer />
    </div>
  );
};

export default Register;
