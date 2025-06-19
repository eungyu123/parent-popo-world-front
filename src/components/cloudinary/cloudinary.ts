export const uploadImageToCloudinary = async (
  file: File
): Promise<string | null> => {
  const cloudName = "dgmbxvpv9";
  const preset = "popo_preset";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", preset);

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    return data.secure_url;
  } catch (err) {
    console.error("업로드 실패:", err);
    return null;
  }
};
