function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  try {
    const data = e.parameter;
    sheet.appendRow([
      data.name        || "",
      data.attendance  || "",
      data.guests      || "0",
      data.submittedAt || new Date().toISOString()
    ]);
  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({ 
        message: "Error", 
        error: err.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  return ContentService
    .createTextOutput(JSON.stringify({ message: "OK" }))
    .setMimeType(ContentService.MimeType.JSON);
}