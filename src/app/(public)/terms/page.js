"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import TextButton from "../../../components/ui/button/TextButton/TextButton";
import Styles from "./page.module.css";
import PaperScroll from "@/src/components/icons/PaperScroll";

function TermsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo") || "/";

  function handleAgree() {
    sessionStorage.setItem("termsAgreed", "true");
    router.push(returnTo);
  }

  return (
    <div className={Styles.container}>
      <div className={Styles.termsAndCondition}>
        <h1 className={Styles.formTitle}>
          <PaperScroll />
          Terms & Condition
        </h1>

        <div className={Styles.subGroup}>
          <h2 className={Styles.title}>Eligibility</h2>
          <ul className={Styles.lists}>
            <li className={Styles.listItem}>
              Renters must be 18 years old and above.
            </li>
            <li className={Styles.listItem}>
              Valid government-issued IDs are required.
            </li>
            <li className={Styles.listItem}>
              Accounts must be active and publicly accessible for verification.
            </li>
            <li className={Styles.listItem}>
              We reserve the right to decline bookings that cannot be properly
              verified.
            </li>
          </ul>
        </div>

        <div className={Styles.subGroup}>
          <h2 className={Styles.title}>Security Deposit</h2>
          <ul className={Styles.lists}>
            <li className={Styles.listItem}>
              A P500 refundable security deposit is required.
            </li>
            <li className={Styles.listItem}>
              The deposit will be returned within 24 hours after the equipment
              has been inspected.
            </li>
            <li className={Styles.listItem}>
              Any damages, missing accessories, or unpaid fees will be
            </li>
            <li className={Styles.listItem}>deducted from the deposit.</li>
          </ul>
        </div>

        <div className={Styles.subGroup}>
          <h2 className={Styles.title}>Rental Duration</h2>
          <ul className={Styles.lists}>
            <li className={Styles.listItem}>
              Rentals are based on a 24-hour period.
            </li>
            <li className={Styles.listItem}>
              The return time must match the pickup time.
            </li>
            <li className={Styles.listItem}>
              Pickup time may be adjusted upon approval.
            </li>
            <li className={Styles.listItem}>
              Late returns incur P100 per hour.
            </li>
          </ul>
        </div>

        <div className={Styles.subGroup}>
          <h2 className={Styles.title}>Care & Responsibility</h2>
          <ul className={Styles.lists}>
            <li className={Styles.listItem}>
              Equipment is tested, sanitized, and documented before release.
            </li>
            <li className={Styles.listItem}>
              Renters must inspect the unit upon receipt.
            </li>
            <li className={Styles.listItem}>
              Any issues must be reported immediately.
            </li>
            <li className={Styles.listItem}>
              Equipment must be returned in the same condition with all
              accessories.
            </li>
          </ul>
        </div>

        <div className={Styles.subGroup}>
          <h2 className={Styles.title}>Pickup & Delivery</h2>
          <ul className={Styles.lists}>
            <li className={Styles.listItem}>
              Pickup or delivery is available.
            </li>
            <li className={Styles.listItem}>
              Delivery fees are shouldered by the renter.
            </li>
            <li className={Styles.listItem}>
              Delivery schedules depend on availability.
            </li>
            <li className={Styles.listItem}>
              Renters must be available to receive the equipment.
            </li>
          </ul>
        </div>

        <div className={Styles.subGroup}>
          <h2 className={Styles.title}>Cancellation & Refund</h2>
          <ul className={Styles.lists}>
            <li className={Styles.listItem}>
              The 50% down payment is non-refundable once the booking is
              confirmed.
            </li>
            <li className={Styles.listItem}>
              Delivery fees are shouldered by the renter.
            </li>
            <li className={Styles.listItem}>
              Bookings may only be rescheduled subject to availability.
            </li>
            <li className={Styles.listItem}>
              Refunds will only be issued if Seepia Rentals cancels the
              reservation.
            </li>
          </ul>
        </div>

        <div className={Styles.buttonContainer}>
          <TextButton
            textContent="Agree"
            buttonState="active"
            fill={true}
            onClick={handleAgree}
          />
        </div>
      </div>
    </div>
  );
}

export default function TermsPage() {
  return (
    <Suspense fallback={null}>
      <TermsContent />
    </Suspense>
  );
}
