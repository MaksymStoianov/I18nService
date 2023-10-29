[**BG**](README_bg.md) | [**DE**](README_de.md) | **EN** | [**RU**](README_ru.md) | [**UK**](README_uk.md)

# I18nService

I18nService is an object that implements internationalization functionality.

## Installation

1. Open your project in [Google Apps Script Dashboard](https://script.google.com/).
2. Copy the contents of the `index.js` file and paste it into a new file in your Google Apps Script project.

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

console.log(i18n.getLanguage('ru').getTranslate('title'));
console.log(__('title'));
```

### Example 2

```javascript

const data = {
  title: "Example Application"
};
const locale = "en";

const i18n = I18nService
  .init('en')
  .load(data, locale);

console.log(i18n.getLanguage('en').getTranslate('title'));
console.log(__('title'));
```

## Tasks

- [ ] Add the ability to load translations in `json` format via `url-link` to the `I18n.load()` method.
- [ ] Use `CacheService` for language storage.

## Changelog

- **1.0.0**: Release.
