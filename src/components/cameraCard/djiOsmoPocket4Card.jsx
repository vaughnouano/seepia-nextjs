import Styles from "./djiOsmoPocket4MarkiiiCard.module.css";

import TextIconButton from "../ui/button/TextIconButton/TextIconButton";

import DjiOsmoPocket4 from "../../../public/equipment-mock/dji-osmo-pocket-4-front.png";
import Image from "next/image";

export default function djiOsmoPocket4Card() {
  return (
    <div className={Styles.backgroundContainer}>
      <div className={Styles.container}>
        {/* =============== IMAGE-PANEL =============== */}

        <Image
          src={DjiOsmoPocket4}
          alt="Canon G7X Mark III"
          className={Styles.DjiOsmoPocket4}
          // placeholder="blur"
          layout="responsive"
        />

        {/* =============== DETAILS-PANEL =============== */}
        <div className={Styles.details}>
          <div className={Styles.tags}></div>

          <div className={Styles.header}>
            <h1 className={Styles.title}>OSMO Pocket 4</h1>
          </div>
          <div className={Styles.description}>
            <p className={Styles.textDescription}>
              Ultra-portable 4K/240fps gimbal camera
            </p>
          </div>
          <div className={Styles.buttonContainer}>
            <TextIconButton
              textContent={"BOOK"}
              buttonState={"active"}
              fill={false}
            ></TextIconButton>
          </div>
        </div>
      </div>
    </div>
  );
}
