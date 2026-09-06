import Styles from "./page.module.css";

import CanonG7XMarkIIICard from "../../components/cameraCard/canonG7xMarkiiiCard";
import DjiOsmoPocket4Card from "../../components/cameraCard/djiOsmoPocket4Card";
import KodakFz55PixproCard from "@/src/components/cameraCard/kodakFz55PixproCard";

import Image from "next/image";
import seepiaLogo from "../../../public/images/seepia-rental-logo.png";

export default function Home() {
  return (
    <div className={Styles.Main}>
      <div className={Styles.header}>
        <Image
          src={seepiaLogo}
          className={Styles.SeepiaLogo}
          alt="Seepia Large Logo"
        />
      </div>

      <div className={Styles.container}>
        <div className={Styles.heroSection}>
          <CanonG7XMarkIIICard />
        </div>
        <div className={Styles.cards}>
          <DjiOsmoPocket4Card />
          <KodakFz55PixproCard />
        </div>
      </div>
    </div>
  );
}
