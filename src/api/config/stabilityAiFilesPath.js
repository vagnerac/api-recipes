// below logic receive the file name data to set the location and full file name and return it in the output
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

//generate file name based on the current date and time
function generateFileName() {
  const dateTimeNow = Date.now();
  const fileName = `${dateTimeNow}`;
  return fileName;
}

// function to join file name and extension
function setFullFileName(fileName, fileExtension) {
  if (!fileExtension.includes('.')) fileExtension = `.${fileExtension}`;

  const fullFileName = `${fileName}${fileExtension}`;

  return fullFileName;
}
