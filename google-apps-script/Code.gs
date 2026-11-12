const SPREADSHEET_ID = '1XxdUXtC_yYUGQe8pdt6hQpk5q1sDRl2LwfsWBmK2ZJ4';
const SHEET_NAME = 'Página1';

function doGet() {
  return jsonResponse({ ok: true, service: 'diario-voce-cadastro' });
}

function doPost(event) {
  try {
    const payload = JSON.parse(event.postData.contents || '{}');
    const email = String(payload.email || '').trim().toLowerCase();
    const origem = String(payload.origem || 'diariovoce.com').trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return jsonResponse({ ok: false, error: 'email_invalido' });
    }

    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
    if (!sheet) throw new Error('Aba não encontrada: ' + SHEET_NAME);

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['e-mail', 'data de inscrição', 'origem']);
    }

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      sheet.appendRow([email, new Date(), origem]);
    } finally {
      lock.releaseLock();
    }

    return jsonResponse({ ok: true });
  } catch (error) {
    return jsonResponse({ ok: false, error: String(error.message || error) });
  }
}

function jsonResponse(body) {
  return ContentService
    .createTextOutput(JSON.stringify(body))
    .setMimeType(ContentService.MimeType.JSON);
}
