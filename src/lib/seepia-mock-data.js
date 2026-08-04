// ============================================================
// Seepia Rentals — Mock Data
// Mirrors the Supabase schema so it can be swapped in/out
// as props while you build UI before wiring up real queries.
// ============================================================

// ---------------- equipment ----------------
// Powers: Homepage cards, Calendar page, Admin equipment tabs
export const equipment = [
  {
    id: "eq_001",
    equipment_name: "G7X - Mark III",
    description:
      "Its compact, premium design makes it perfect for Instagram, TikTok, travel, lifestyle content, and timeless memories.",
    badge_label: "Personal Favorite",
    badge_type_2: null,
    image_url: "/images/equipment/g7x-mark-iii.jpg",
    price_per_day: 500,
    is_available: true,
    display_order: 1,
  },
  {
    id: "eq_002",
    equipment_name: "OSMO Pocket 4",
    description: "Ultra-portable 4K/240fps gimbal camera",
    badge_label: "NEW",
    badge_type_2: "FULL SET",
    image_url: "/images/equipment/osmo-pocket-4.jpg",
    price_per_day: 650,
    is_available: true,
    display_order: 2,
  },
  {
    id: "eq_003",
    equipment_name: "FZ55 - PIXPRO",
    description:
      "One-touch HD video, 28mm wide-angle lens and a host of features and shooting modes",
    badge_label: "Classic",
    badge_type_2: null,
    image_url: "/images/equipment/fz55-pixpro.jpg",
    price_per_day: 350,
    is_available: true,
    display_order: 3,
  },
];

// ---------------- renters ----------------
// Powers: Renter Information form, Admin review page
export const renters = [
  {
    id: "rnt_001",
    full_name: "Jane M. Doe",
    date_of_birth: "2001-01-01",
    age: 25,
    contact_number: "09876543210",
    email_address: "janedoe@gmail.com",
    facebook_url: "facebook.com/jane.doe",
    instagram_url: "instagram.com/jane.doe",
    tiktok_url: null,
  },
];

// ---------------- rentals ----------------
// Powers: Calendar availability, Admin pending queue, Admin review page
export const rentals = [
  {
    id: "rtl_001",
    equipment_id: "eq_001",
    renter_id: "rnt_001",
    duration_type: "1-2_days",
    rental_start_date: "2026-07-12",
    rental_end_date: "2026-07-13",
    fulfillment_type: "delivery",
    delivery_address: "Aling Susan Store, Mandaue City",
    preferred_delivery_time: "15:00",
    return_time: "09:00",
    return_method: "personal_dropoff",
    occasion_type: "birthday",
    occasion_other_details: null,
    is_media_sharing_allowed: true,
    agreement_accepted: true,
    agreement_accepted_at: "2026-07-10T14:08:00+08:00",
    status: "pending", // pending | approved | cancelled | completed
    approved_at: null,
    created_at: "2026-07-10T14:08:00+08:00",
  },
];

// ---------------- rental_documents ----------------
// Powers: Admin review page (ID, selfie, signature previews)
export const rentalDocuments = [
  {
    id: "doc_001",
    rental_id: "rtl_001",
    document_type: "id_only", // id_only | selfie_with_id | signature
    file_url: "/uploads/rtl_001/id_only.jpg",
  },
  {
    id: "doc_002",
    rental_id: "rtl_001",
    document_type: "selfie_with_id",
    file_url: "/uploads/rtl_001/selfie_with_id.jpg",
  },
  {
    id: "doc_003",
    rental_id: "rtl_001",
    document_type: "signature",
    file_url: "/uploads/rtl_001/signature.png",
  },
];

// ---------------- equipment_blocked_dates ----------------
// Powers: Calendar "unavailable" state with no renter attached
export const equipmentBlockedDates = [
  {
    id: "blk_001",
    equipment_id: "eq_001",
    blocked_date: "2026-07-24",
    reason: "maintenance",
  },
];

// ---------------- site_settings ----------------
// Powers: Homepage top bar, misc. editable site text
export const siteSettings = [
  { key: "location_label", value: "Based in Mandaue" },
];

// ============================================================
// Example: combining tables the way the UI will actually need
// ============================================================

// Get all unavailable dates for a given equipment_id (booked + blocked)
export function getUnavailableDates(equipmentId) {
  const bookedDates = rentals
    .filter((r) => r.equipment_id === equipmentId && r.status === "approved")
    .flatMap((r) => [r.rental_start_date, r.rental_end_date]);

  const blockedDates = equipmentBlockedDates
    .filter((b) => b.equipment_id === equipmentId)
    .map((b) => b.blocked_date);

  return [...new Set([...bookedDates, ...blockedDates])];
}

// Get a full rental record joined with renter + documents (for Admin review page)
export function getRentalDetail(rentalId) {
  const rental = rentals.find((r) => r.id === rentalId);
  if (!rental) return null;

  const renter = renters.find((r) => r.id === rental.renter_id);
  const documents = rentalDocuments.filter((d) => d.rental_id === rentalId);
  const item = equipment.find((e) => e.id === rental.equipment_id);

  return { ...rental, renter, documents, equipment: item };
}

// Get pending rentals grouped by equipment (for Admin dashboard queue)
export function getPendingByEquipment(equipmentId) {
  return rentals
    .filter((r) => r.equipment_id === equipmentId && r.status === "pending")
    .map((r) => ({
      ...r,
      renter: renters.find((rn) => rn.id === r.renter_id),
    }));
}
