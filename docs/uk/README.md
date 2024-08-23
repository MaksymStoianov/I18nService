<div id="locales" align="right">
  <a href="../bg/README.md"><img src="https://img.shields.io/badge/BG-grey?style=flat" alt="Български"></a>
  <a href="../de/README.md"><img src="https://img.shields.io/badge/DE-grey?style=flat" alt="Deutsch"></a>
  <a href="../en/README.md"><img src="https://img.shields.io/badge/EN-grey?style=flat" alt="English"></a>
  <a href="../ru/README.md"><img src="https://img.shields.io/badge/RU-grey?style=flat" alt="Русский"></a>
  <a href="../uk/README.md"><img src="https://img.shields.io/badge/UK-blue?style=flat" alt="Українська"></a>
</div>


# I18nService

<div id="badges" align="left">
  <img src="https://img.shields.io/github/v/release/MaksymStoianov/I18nService" alt="Release">
  <a href="LICENSE.md"><img src="https://img.shields.io/github/license/MaksymStoianov/I18nService" alt="License"></a>
  <a href="https://github.com/google/clasp"><img src="https://img.shields.io/badge/built%20with-clasp-4285f4.svg" alt="clasp"></a>
</div>

**I18nService** - це об'єкт, що реалізує роботу з інтернаціоналізацією.


## Встановлення

1. Відкрийте свій проект у [Google Apps Script Dashboard](https://script.google.com/).
2. Скопіюйте вміст файлу [i18n.js](../../src/i18n.js) і вставте його у новий файл у вашому проекті Google Apps Script.


## Документація

Для отримання докладної документації, будь ласка, відвідайте сторінку [Wiki](../../../../wiki/uk).


## Використання

### Приклад 1

```javascript
const data = {
  "bg": {
    title: "Тестово приложение"
  },
  "de": {
    title: "Testanwendung"
  },
  "en": {
    title: "Example Application"
  },
  "ru": {
    title: "Тестовое приложение"
  },
  "uk": {
    title: "Тестовий застосунок"
  }
};

const i18n = I18nService
  .init('uk')
  .load(data);

console.log(i18n.getLanguage('uk').getTranslate('title'));
console.log(__('title'));
```

### Приклад 2

```javascript
const data = {
  title: "Example Application"
};
const locale = "uk";

const i18n = I18nService
  .init(locale)
  .load(data, locale);

console.log(i18n.getLanguage(locale).getTranslate('title'));
console.log(__('title'));
```

### Приклад 3

```javascript
const sheet = SpreadsheetApp
  .getActiveSpreadsheet()
  .getSheetByName('I18n');

const i18n = I18nService
  .init('uk')
  .load(sheet);

console.log(i18n.getLanguage('uk').getTranslate('title'));
console.log(__('title'));
```


## Завдання

- [ ] Додати до методу `I18n.load()` можливість завантажувати переклади `json` за url-посиланням.
- [ ] Використовувати [`CacheService`](https://developers.google.com/apps-script/reference/cache) для зберігання мови.


## Внесок

Будь ласка, прочитайте [CONTRIBUTING.md](CONTRIBUTING.md) для отримання докладної інформації про те, як зробити внесок у цей проект.


## Історія змін

Для отримання докладного списку змін і оновлень, будь ласка, зверніться до файлу [CHANGELOG.md](CHANGELOG.md).


## Ліцензія

Цей проект ліцензується відповідно до файлу [LICENSE.md](LICENSE.md).