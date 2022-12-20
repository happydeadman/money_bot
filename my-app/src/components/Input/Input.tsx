import { ChangeEventHandler } from "react";
import styles from "./Input.module.scss";

interface IInputProps {
  value: string | number;
  type: "text" | "number";
  name: string;
  placeholder: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export function Input(props: IInputProps) {
  const { value, type, placeholder, onChange, name } = props;
  return (
    <input
      className={styles.input}
      value={value}
      onChange={onChange}
      type={type}
      name={name}
      placeholder={placeholder}
    />
  );
}
