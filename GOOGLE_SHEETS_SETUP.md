# Подключение RSVP к Google Sheets

## 1) Создайте таблицу
- Откройте Google Sheets и создайте новую таблицу, например: `Wedding RSVP`.

## 2) Откройте Apps Script
- В таблице: `Extensions` -> `Apps Script`.
- Удалите дефолтный код и вставьте содержимое файла `google-apps-script/Code.gs`.
- Нажмите `Save`.

## 3) Разверните как Web App
- Нажмите `Deploy` -> `New deployment`.
- Тип: `Web app`.
- `Execute as`: `Me`.
- `Who has access`: `Anyone`.
- Нажмите `Deploy` и скопируйте `Web app URL`.

## 4) Подставьте URL в сайт
- В файле `script.js` замените:
  - `PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE`
  - на ваш URL вида `https://script.google.com/macros/s/.../exec`

## 5) Проверьте отправку
- Откройте сайт, заполните форму RSVP и отправьте.
- В таблице появится лист `RSVP` и новая строка с данными гостя.

## Если не работает
- После изменений в `Code.gs` делайте `Deploy` -> `Manage deployments` -> `Edit` -> `Deploy` (обновить версию).
- Убедитесь, что URL заканчивается на `/exec`, а не `/dev`.
- Проверьте, что доступ Web App выставлен как `Anyone`.
