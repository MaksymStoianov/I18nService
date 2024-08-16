<div id="locales" align="right">
  <a href="../bg/README.md"><img src="https://img.shields.io/badge/BG-grey?style=flat" alt="Български"></a>
  <a href="../de/README.md"><img src="https://img.shields.io/badge/DE-grey?style=flat" alt="Deutsch"></a>
  <a href="../en/README.md"><img src="https://img.shields.io/badge/EN-blue?style=flat" alt="English"></a>
  <a href="../ru/README.md"><img src="https://img.shields.io/badge/RU-grey?style=flat" alt="Русский"></a>
  <a href="../uk/README.md"><img src="https://img.shields.io/badge/UK-grey?style=flat" alt="Українська"></a>
</div>


# I18nService

<div id="badges" align="left">
  <img src="https://img.shields.io/github/v/release/MaksymStoianov/I18nService" alt="Release">
  <a href="LICENSE.md"><img src="https://img.shields.io/github/license/MaksymStoianov/I18nService" alt="License"></a>
  <a href="https://github.com/google/clasp"><img src="https://img.shields.io/badge/built%20with-clasp-4285f4.svg" alt="clasp"></a>
</div>

**I18nService** is an object that implements internationalization functionality.


## Installation

1. Open your project in the [Google Apps Script Dashboard](https://script.google.com/).
2. Copy the contents of the [i18n.js](../../src/i18n.js) file and paste it into a new file in your Google Apps Script project.


## Usage

### Example 1

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
  .init('ru')
  .load(data);

console.log(i18n.getLanguage('en').getTranslate('title'));
console.log(__('title'));
```

### Example 2

```javascript
const data = {
  title: "Example Application"
};
const locale = "en";

const i18n = I18nService
  .init(locale)
  .load(data, locale);

console.log(i18n.getLanguage(locale).getTranslate('title'));
console.log(__('title'));
```

### Example 3

```javascript
const sheet = SpreadsheetApp
  .getActiveSpreadsheet()
  .getSheetByName('I18n');

const i18n = I18nService
  .init('en')
  .load(sheet);

console.log(i18n.getLanguage('en').getTranslate('title'));
console.log(__('title'));
```


## Tasks

- [ ] Add the ability to load translations in `json` format via url-link to the `I18n.load()` method.
- [ ] Use [`CacheService`](https://developers.google.com/apps-script/reference/cache) for language storage.


## Contribution

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to contribute to this project.


## Change History

Please refer to [CHANGELOG.md](CHANGELOG.md) for a detailed list of changes and updates.


## License

This project is licensed under the [LICENSE.md](LICENSE.md) file.