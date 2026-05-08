const SHEET_NAME = "RSVP";

function doPost(e) {
  try {
    const sheet = getOrCreateSheet_();
    const data = JSON.parse(e.postData.contents || "{}");

    sheet.appendRow([
      new Date(),
      safe_(data.name),
      safe_(data.phone),
      safe_(data.attendance),
      safe_(data.note),
      safe_(data.submittedAt),
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ ok: true, message: "Saved" })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, message: error.message })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({ ok: true, message: "RSVP endpoint is alive" })
  ).setMimeType(ContentService.MimeType.JSON);
}

function getOrCreateSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    sheet.appendRow([
      "createdAt",
      "name",
      "phone",
      "attendance",
      "note",
      "submittedAt",
    ]);
  }

  return sheet;
}

function safe_(value) {
  return value === undefined || value === null ? "" : String(value).trim();
}
