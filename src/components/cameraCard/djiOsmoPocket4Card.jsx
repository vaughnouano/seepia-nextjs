"use client";

import { useRouter } from "next/navigation";
import Styles from "./djiOsmoPocket4Card.module.css";

import TextIconButton from "../ui/button/TextIconButton/TextIconButton";
import Tag from "../ui/tags/Tag";

import DjiOsmoPocket4 from "../../../public/equipment-mock/dji-osmo-pocket-4-front.png";
import Image from "next/image";

export default function djiOsmoPocket4Card() {
  const router = useRouter();

  return (
    <div className={Styles.backgroundContainer}>
      <div className={Styles.container}>
        {/* =============== IMAGE-PANEL =============== */}

        <Image
          src={DjiOsmoPocket4}
          alt="DJI Osmo Pocket 4"
          className={Styles.DjiOsmoPocket4}
          layout="responsive"
        />

        {/* =============== DETAILS-PANEL =============== */}
        <div className={Styles.details}>
          <div>
            <div className={Styles.tags}>
              <Tag colorShade="vibrant">NEW</Tag>
              <Tag colorShade="dark">FUll SET</Tag>
            </div>

            <div className={Styles.header}>
              <h1 className={Styles.title}>OSMO Pocket 4</h1>
            </div>
            <div className={Styles.description}>
              <p className={Styles.textDescription}>
                Ultra-portable 4K/240fps gimbal camera
              </p>
            </div>
          </div>

          <div className={Styles.buttonContainer}>
            <TextIconButton
              textContent={"BOOK"}
              buttonState={"active"}
              fill={false}
              onClick={() => router.push("/calendar/osmo-pocket-4")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
