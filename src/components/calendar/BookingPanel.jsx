import styles from "../calendar/BookingPanel.module.css";

import SelectorButton from "../../components/ui/button/SelectorButton/SelectorButton";
import PriceButton from "../../components/ui/button/PriceButton/PriceButton";
import IconButton from "../ui/button/IconButton/IconButton";

import ChevronLeftIcon from "../../components/icons/ChevronBack";
import ChevronRightIcon from "../../components/icons/ChevronNext";
import HomeIcon from "../../components/icons/HomeIcon";

import Image from "next/image";
import { pricing } from "../../lib/pricing";

// Keys must match lib/pricing.js and the bookings table's duration_type values
const TIER_OPTIONS = [
  { key: "1-2day", label: "1-2 Days" },
  { key: "3-4day", label: "3-4 Days" },
  { key: "custom", label: "custom" },
];

export default function BookingPanel({
  camera,
  onPrevCamera,
  onNextCamera,
  durationTier,
  onSelectDurationTier,
  onBook,
}) {
  if (!camera) return null;

  const pricePerDay = pricing[camera.slug]?.[durationTier];

  return (
    <>
      <div className={styles.card}>
        <div className={styles.image_container}>
          <Image
            className={styles.image}
            src={camera.image}
            alt={camera.name}
            width={400}
            height={300}
            loading="eager"
          />
        </div>
        <div className={styles.information}>
          <div className={styles.selector_container}>
            {TIER_OPTIONS.map((tier) => (
              <SelectorButton
                key={tier.key}
                textContent={tier.label}
                buttonState={durationTier === tier.key ? "active" : "inactive"}
                fill={true}
                onClick={() => onSelectDurationTier(tier.key)}
              />
            ))}
          </div>
          <div className={styles.description_container}>
            <div className={styles.title_container}>
              <h1 className={styles.itemTitle}>{camera.name}</h1>
              <div className={styles.controls_container}>
                <ChevronLeftIcon
                  onClick={onPrevCamera}
                  className={styles.chevronButton}
                />
                <ChevronRightIcon
                  onClick={onNextCamera}
                  className={styles.chevronButton}
                />
              </div>
            </div>
            <div className={styles.description}>
              <p className={styles.text}>
                Choose and click on your desired available date on the calendar,
                then click Book. :)
              </p>
            </div>
          </div>
          <div className={styles.bottomBottom_container}>
            <PriceButton
              textContent="Book"
              priceValue={pricePerDay}
              fill={true}
              onClick={onBook}
            />
            <IconButton iconContent={<HomeIcon />} fill={false} />
          </div>
        </div>
      </div>
    </>
  );
}
