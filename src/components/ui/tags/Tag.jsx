import Styles from "./tag.module.css";

export default function Tag({ children, colorShade = "light" }) {
  return (
    <div className={`${Styles[colorShade]} ${Styles.tag} `}>
      <p className={Styles.text}>{children}</p>
    </div>
  );
}
