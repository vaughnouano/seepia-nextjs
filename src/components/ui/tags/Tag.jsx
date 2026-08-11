import { Children } from "react";
import style from "./tag.module.css";

export default function Tag({ children, icon, variant }) {
  return (
    <>
      <div className={`${style.tag} ${style[variant]}`}>
        {icon}
        {children}
      </div>
    </>
  );
}
