export function processFilePath(fileExtension, fileName) {
  if (!fileExtension) return console.error('file extension not provided.');

  let filename = fileName ?? generateFileName();

  const fullFileName = setFullFileName(filename, fileExtension);

  const locationPath = new URL(
    `../../api/assets/images/${fullFileName}`,
    import.meta.url,
  );

  const filePathData = {
    filename: filename,
    fullFileName: fullFileName,
    locationPath: locationPath.pathname.slice(1),
  };

  return filePathData;
}

function generateFileName() {
  const dateTimeNow = Date.now();
  const fileName = `${dateTimeNow}`;
  return fileName;
}

function setFullFileName(fileName, fileExtension) {
  if (!fileExtension.includes('.')) fileExtension = `.${fileExtension}`;

  const fullFileName = `${fileName}${fileExtension}`;

  return fullFileName;
}
