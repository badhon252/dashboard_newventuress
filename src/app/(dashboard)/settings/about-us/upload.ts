export async function uploadImage(formData: FormData) {
  try {
    const file = formData.get("file") as File
    if (!file) {
      throw new Error("No file provided")
    }

    const url = URL.createObjectURL(file);

    return {
      success: true,
      url: url,
    }
  } catch (error) {
    return {
      success: false,
      error: "Failed to upload image",
    }
  }
}