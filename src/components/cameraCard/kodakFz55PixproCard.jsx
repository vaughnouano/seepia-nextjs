import Styles from "./kodakFz55Pixpro.module.css";

import TextIconButton from "../ui/button/TextIconButton/TextIconButton";

import KodakFz55Pixpro from "../../../public/equipment-mock/kodak-fz55-pixpro-front.png";
import Image from "next/image";

export default function KodakFz55PixproCard() {
  return (
    <div className={Styles.backgroundContainer}>
      <div className={Styles.container}>
        {/* =============== IMAGE-PANEL =============== */}

        <Image
          src={KodakFz55Pixpro}
          alt="Canon G7X Mark III"
          className={Styles.KodakFz55Pixpro}
          // placeholder="blur"
          layout="responsive"
        />

        {/* =============== DETAILS-PANEL =============== */}
        <div className={Styles.details}>
          <div className={Styles.tags}></div>
          <div className={Styles.header}>
            <h1 className={Styles.title}>FZ55 - PIXPRO</h1>
          </div>
          <div className={Styles.description}>
            <p className={Styles.textDescription}>
              One-touch HD video, 28mm wide-angle lens and a host of features
              and shooting modes
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
