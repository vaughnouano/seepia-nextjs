import Styles from "./cameraCard.module.css";

import TextIconButton from "../../components/ui/button/TextIconButton/TextIconButton";

import CanonG7XMarkIII from "../../../public/equipment-mock/canon_g7x_top.png";
import Image from "next/image";

export default function canonG7xMarkiiiCard() {
  return (
    <div className={Styles.backgroundContainer}>
      <div className={Styles.container}>
        {/* =============== IMAGE-PANEL =============== */}
        <Image
          src={CanonG7XMarkIII}
          height={471.22}
          width={706.83}
          alt="Canon-G7X-Mark-III_image"
        />
        {/* =============== DETAILS-PANEL =============== */}
        <div className={Styles.details}>
          <div className={Styles.tags}></div>
          <div className={Styles.header}>
            <h1 className={Styles.title}>G7X - Mark III</h1>
          </div>
          <div className={Styles.description}>
            <p className={Styles.textDescription}>
              Its compact, premium design makes it perfect for Instagram,
              TikTok, travel, lifestyle content, and timeless memories.
            </p>
          </div>
          <TextIconButton
            textContent={"BOOK"}
            buttonState={"active"}
            fill={false}
          ></TextIconButton>
        </div>
      </div>
    </div>
  );
}
