[**BG**](README_bg.md) | **DE** | [**EN**](README.md) | [**RU**](README_ru.md) | [**UK**](README_uk.md)

# I18nService

I18nService ist ein Objekt, das die Arbeit mit Internationalisierung umsetzt.

## Installation

1. Öffnen Sie Ihr Projekt im [Google Apps Script Dashboard](https://script.google.com/).
2. Kopieren Sie den Inhalt der Datei `index.js` und fügen Sie ihn in eine neue Datei in Ihrem Google Apps Script-Projekt ein.

## Verwendung

### Beispiel 1

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
  .init('de')
  .load(data);

console.log(i18n.getLanguage('de').getTranslate('title'));
console.log(__('title'));
```

### Beispiel 2

```javascript
const data = {
  title: "Example Application"
};
const locale = "de";

const i18n = I18nService
  .init(locale)
  .load(data, locale);

console.log(i18n.getLanguage(locale).getTranslate('title'));
console.log(__('title'));
```

### Beispiel 3

```javascript
const sheet = SpreadsheetApp
  .getActiveSpreadsheet()
  .getSheetByName('I18n');

const i18n = I18nService
  .init('de')
  .load(sheet);

console.log(i18n.getLanguage('de').getTranslate('title'));
console.log(__('title'));
```

## Aufgaben

- [ ] Fügen Sie die Möglichkeit hinzu, Übersetzungen im `json-Format` über einen `URL-Link` in die Methode `I18n.load()` zu laden.
- [ ] Verwenden Sie `CacheService` zur Speicherung der Sprache.

## Änderungsprotokoll

- **1.0.0**: Erstveröffentlichung.
