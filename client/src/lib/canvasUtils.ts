export async function cropImage(imageUrl: string, aspectRatio: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.referrerPolicy = 'no-referrer';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      let width = img.width;
      let height = img.height;
      const currentAspectRatio = width / height;

      let sourceX = 0;
      let sourceY = 0;
      let sourceWidth = width;
      let sourceHeight = height;

      if (currentAspectRatio > aspectRatio) {
        // Image is wider than target aspect ratio
        sourceWidth = height * aspectRatio;
        sourceX = (width - sourceWidth) / 2;
      } else {
        // Image is taller than target aspect ratio
        sourceHeight = width / aspectRatio;
        sourceY = (height - sourceHeight) / 2;
      }

      // Set canvas size to target dimensions (or just use source dimensions for high quality)
      canvas.width = sourceWidth;
      canvas.height = sourceHeight;

      ctx.drawImage(
        img,
        sourceX, sourceY, sourceWidth, sourceHeight,
        0, 0, sourceWidth, sourceHeight
      );

      resolve(canvas.toDataURL('image/jpeg', 0.9));
    };
    img.onerror = (err) => reject(err);
    img.src = imageUrl;
  });
}
