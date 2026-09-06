import { supabase } from "../lib/supabaseClient";

// Converts a base64 data URL (from SignaturePad) into a Blob for upload
function dataUrlToBlob(dataUrl) {
  const [header, base64Data] = dataUrl.split(",");
  const mime = header.match(/:(.*?);/)[1];
  const binary = atob(base64Data);
  const array = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    array[i] = binary.charCodeAt(i);
  }
  return new Blob([array], { type: mime });
}

// Uploads a single file/blob to the private booking-uploads bucket,
// namespaced under a folder per booking so files don't collide.
async function uploadToBookingBucket(bookingFolder, fileName, fileOrBlob) {
  const path = `${bookingFolder}/${fileName}`;
  const { error } = await supabase.storage
    .from("booking-uploads")
    .upload(path, fileOrBlob, { upsert: false });

  if (error) throw new Error(`Failed to upload ${fileName}: ${error.message}`);
  return path; // stored in the DB — NOT a public URL, since the bucket is private
}

// Uploads all 3 required files for one booking submission.
// bookingFolder should be a unique-per-submission value (e.g. a generated UUID)
// so re-submissions or different customers never overwrite each other's files.
export async function uploadBookingFiles(
  bookingFolder,
  { idPhoto, selfieWithId, signatureDataUrl },
) {
  const idPhotoExt = idPhoto.name.split(".").pop();
  const selfieExt = selfieWithId.name.split(".").pop();

  const [id_photo_url, selfie_with_id_url, signature_url] = await Promise.all([
    uploadToBookingBucket(bookingFolder, `id-photo.${idPhotoExt}`, idPhoto),
    uploadToBookingBucket(
      bookingFolder,
      `selfie-with-id.${selfieExt}`,
      selfieWithId,
    ),
    uploadToBookingBucket(
      bookingFolder,
      "signature.png",
      dataUrlToBlob(signatureDataUrl),
    ),
  ]);

  return { id_photo_url, selfie_with_id_url, signature_url };
}
