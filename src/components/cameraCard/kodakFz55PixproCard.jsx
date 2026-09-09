"use client";

import { useRouter } from "next/navigation";
import Styles from "./kodakFz55PixproCard.module.css";

import TextIconButton from "../ui/button/TextIconButton/TextIconButton";
import Tag from "../ui/tags/Tag";

import KodakFz55Pixpro from "../../../public/equipment-mock/kodak-fz55-pixpro-front.png";
import Image from "next/image";

export default function KodakFz55PixproCard() {
  const router = useRouter();

  return (
    <div className={Styles.backgroundContainer}>
      <div className={Styles.container}>
        {/* =============== IMAGE-PANEL =============== */}

        <Image
          src={KodakFz55Pixpro}
          alt="Kodak FZ55 PIXPRO"
          className={Styles.KodakFz55Pixpro}
          layout="responsive"
        />

        {/* =============== DETAILS-PANEL =============== */}
        <div className={Styles.details}>
          <div>
            <div className={Styles.tags}>
              <Tag colorShade="light">Classic</Tag>
            </div>
            <div className={Styles.header}>
              <h1 className={Styles.title}>FZ55 - PIXPRO</h1>
            </div>
            <div className={Styles.description}>
              <p className={Styles.textDescription}>
                One-touch HD video, 28mm wide-angle lens and a host of features
                and shooting modes
              </p>
            </div>
          </div>

          <div className={Styles.buttonContainer}>
            <TextIconButton
              textContent={"BOOK"}
              buttonState={"active"}
              fill={false}
              onClick={() => router.push("/calendar/fz55-pixpro")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
