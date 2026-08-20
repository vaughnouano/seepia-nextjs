import styles from "../calendar/BookingPanel.module.css";

import SelectorButton from "../../components/ui/button/SelectorButton/SelectorButton";
import PriceButton from "../../components/ui/button/PriceButton/PriceButton";
import IconButton from "../ui/button/IconButton/IconButton";

import ChevronLeftIcon from "../../components/icons/ChevronBack";
import ChevronRightIcon from "../../components/icons/ChevronNext";
import HomeIcon from "../../components/icons/HomeIcon";

import Image from "next/image";
import canonG7X from "@/public/equipment-mock/canon_g7x_top.png";

export default function BookingPanel() {
  return (
    <>
      <div className={styles.card}>
        {/* Image */}
        <div className={styles.image_container}>
          <Image
            className={styles.image}
            src={canonG7X}
            alt="Canon G7X"
            loading="eager"
          />
        </div>
        <div className={styles.information}>
          {/* Selectors */}
          <div className={styles.selector_container}>
            <SelectorButton
              textContent="1-2 Days"
              buttonState="active"
              fill={true}
            />
            <SelectorButton
              textContent="3-4 Days"
              buttonState="inactive"
              fill={true}
            />
            <SelectorButton
              textContent="custom"
              buttonState="inactive"
              fill={true}
            />
          </div>
          {/* Description */}
          <div className={styles.description_container}>
            <div className={styles.title_container}>
              <h1 className={styles.itemTitle}>G7X - Mark III</h1>
              <div className={styles.controls_container}>
                <ChevronLeftIcon />
                <ChevronRightIcon />
              </div>
            </div>
            <div className={styles.description}>
              <p className={styles.text}>
                Choose and click on your desired available date on the calendar,
                then click Book. :)
              </p>
            </div>
          </div>
          {/* Book Button */}
          <div className={styles.bottomBottom_container}>
            <PriceButton textContent="Book" priceValue={500} fill={true} />
            <IconButton iconContent={<HomeIcon />} fill={false} />
          </div>
        </div>
      </div>
    </>
  );
}
