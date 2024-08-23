<div id="locales" align="right">
  <a href="../bg/README.md"><img src="https://img.shields.io/badge/BG-blue?style=flat" alt="Български"></a>
  <a href="../de/README.md"><img src="https://img.shields.io/badge/DE-grey?style=flat" alt="Deutsch"></a>
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

**I18nService** е обект, който реализира работа с интернационализация.


## Инсталация

1. Отворете своя проект в [Google Apps Script Dashboard](https://script.google.com/).
2. Копирайте съдържанието на файла [i18n.js](../../src/i18n.js) и го поставете в нов файл във вашия проект в Google Apps Script.


## Документация

За подробна документация, моля, посетете страницата [Wiki](../../../../wiki/bg).


## Употреба

### Пример 1

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
  .init('bg')
  .load(data);

console.log(i18n.getLanguage('bg').getTranslate('title'));
console.log(__('title'));
```

### Пример 2

```javascript
const data = {
  title: "Example Application"
};
const locale = "bg";

const i18n = I18nService
  .init(locale)
  .load(data, locale);

console.log(i18n.getLanguage(locale).getTranslate('title'));
console.log(__('title'));
```

### Пример 3

```javascript
const sheet = SpreadsheetApp
  .getActiveSpreadsheet()
  .getSheetByName('I18n');

const i18n = I18nService
  .init('bg')
  .load(sheet);

console.log(i18n.getLanguage('bg').getTranslate('title'));
console.log(__('title'));
```


## Задачи

- [ ] Добавете в метода `I18n.load()` възможността за зареждане на преводи `json` чрез url-връзка.
- [ ] Използвайте [`CacheService`](https://developers.google.com/apps-script/reference/cache) за съхранение на езика.


## Принос

Моля, прочетете [CONTRIBUTING.md](CONTRIBUTING.md) за подробности относно това как да допринесете за този проект.


## История на промените

Моля, направете справка с [CHANGELOG.md](CHANGELOG.md) за подробен списък на промените и актуализациите.


## Лиценз

Този проект е лицензиран съгласно файла [LICENSE.md](LICENSE.md).