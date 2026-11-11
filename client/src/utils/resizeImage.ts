const MAX_WIDTH = 320;
const MAX_HEIGHT = 96;
const MAX_DATA_URL_LENGTH = 150_000;

function loadImage(file: File) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("The file is not a supported image"));
    };
    image.src = url;
  });
}

// Scales a logo down to fit the chat header (at 2x for sharp screens)
// and returns it as a small data URL that can be stored with the chat style.
export async function resizeLogo(file: File) {
  const image = await loadImage(file);
  const scale = Math.min(
    1,
    MAX_WIDTH / image.naturalWidth,
    MAX_HEIGHT / image.naturalHeight,
  );
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
  canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
  canvas.getContext("2d")?.drawImage(image, 0, 0, canvas.width, canvas.height);

  const dataUrl = canvas.toDataURL("image/webp", 0.9);

  if (dataUrl.length > MAX_DATA_URL_LENGTH) {
    throw new Error("The logo is too large, please use a simpler image");
  }

  return dataUrl;
}
