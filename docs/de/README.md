<div id="locales" align="right">
  <a href="../bg/README.md"><img src="https://img.shields.io/badge/BG-grey?style=flat" alt="Български"></a>
  <a href="../de/README.md"><img src="https://img.shields.io/badge/DE-blue?style=flat" alt="Deutsch"></a>
  <a href="../en/README.md"><img src="https://img.shields.io/badge/EN-grey?style=flat" alt="English"></a>
  <a href="../ru/README.md"><img src="https://img.shields.io/badge/RU-grey?style=flat" alt="Русский"></a>
  <a href="../uk/README.md"><img src="https://img.shields.io/badge/UK-grey?style=flat" alt="Українська"></a>
</div>


# I18nService

<div id="badges" align="left">
  <img src="https://img.shields.io/github/v/release/MaksymStoianov/I18nService" alt="Release">
  <a href="LICENSE.md"><img src="https://img.shields.io/github/license/MaksymStoianov/I18nService" alt="License"></a>
  <a href="https://github.com/google/clasp"><img src="https://img.shields.io/badge/built%20with-clasp-4285f4.svg" alt="clasp"></a>
</div>

**I18nService** ist ein Objekt, das die Arbeit mit Internationalisierung umsetzt.


## Installation

1. Öffnen Sie Ihr Projekt im [Google Apps Script Dashboard](https://script.google.com/).
2. Kopieren Sie den Inhalt der Datei [i18n.js](../../src/i18n.js) und fügen Sie ihn in eine neue Datei in Ihrem Google Apps Script-Projekt ein.


## Dokumentation

Eine ausführliche Dokumentation finden Sie auf der Seite [Wiki](../../../../wiki/de).


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

- [ ] Fügen Sie die Möglichkeit hinzu, Übersetzungen im `json`-Format über einen URL-Link in die Methode `I18n.load()` zu laden.
- [ ] Verwenden Sie [`CacheService`](https://developers.google.com/apps-script/reference/cache) zur Speicherung der Sprache.


## Beitrag

Bitte lesen Sie [CONTRIBUTING.md](CONTRIBUTING.md) für Details, wie Sie zu diesem Projekt beitragen können.


## Änderungshistorie

Bitte lesen Sie [CHANGELOG.md](CHANGELOG.md) für eine detaillierte Liste der Änderungen und Aktualisierungen.


## Lizenz

Dieses Projekt ist lizenziert unter der Datei [LICENSE.md](LICENSE.md).