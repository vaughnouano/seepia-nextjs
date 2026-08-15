import styles from "../calendar/BookingPanel.module.css";

import Image from "next/image";
import canonG7X from "@/public/equipment-mock/canon_g7x_top.png";

export default function BookingPanel() {
  return (
    <>
      <div className={styles.card}>
        <div className={styles.image_container}>
          <Image className={styles.image} src={canonG7X} alt="Canon G7X" />
        </div>
        <div className={styles.information_panel}></div>
      </div>
    </>
  );
}
