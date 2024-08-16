<div id="locales" align="right">
  <a href="../bg/README.md"><img src="https://img.shields.io/badge/BG-grey?style=flat" alt="Български"></a>
  <a href="../de/README.md"><img src="https://img.shields.io/badge/DE-grey?style=flat" alt="Deutsch"></a>
  <a href="../en/README.md"><img src="https://img.shields.io/badge/EN-grey?style=flat" alt="English"></a>
  <a href="../ru/README.md"><img src="https://img.shields.io/badge/RU-blue?style=flat" alt="Русский"></a>
  <a href="../uk/README.md"><img src="https://img.shields.io/badge/UK-grey?style=flat" alt="Українська"></a>
</div>


# I18nService

<div id="badges" align="left">
  <img src="https://img.shields.io/github/v/release/MaksymStoianov/I18nService" alt="Release">
  <a href="LICENSE.md"><img src="https://img.shields.io/github/license/MaksymStoianov/I18nService" alt="License"></a>
  <a href="https://github.com/google/clasp"><img src="https://img.shields.io/badge/built%20with-clasp-4285f4.svg" alt="clasp"></a>
</div>

**I18nService** - представляет собой объект реализующий работу интернационализации.


## Установка

1. Откройте свой проект в [Google Apps Script Dashboard](https://script.google.com/).
2. Скопируйте содержимое файла [i18n.js](../../src/i18n.js) и вставьте его в новый файл в вашем проекте Google Apps Script.


## Использование

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
  .init('ru')
  .load(data);

console.log(i18n.getLanguage('ru').getTranslate('title'));
console.log(__('title'));
```

### Пример 2

```javascript
const data = {
  title: "Example Application"
};
const locale = "ru";

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
  .init('ru')
  .load(sheet);

console.log(i18n.getLanguage('ru').getTranslate('title'));
console.log(__('title'));
```


## Задачи

- [ ] В метод `I18n.load()` добавить возможность загружать переводы `json` по url-ссылке.
- [ ] Использовать [`CacheService`](https://developers.google.com/apps-script/reference/cache) для хранения языка.


## Вклад

Пожалуйста, прочитайте [CONTRIBUTING.md](CONTRIBUTING.md) для получения подробной информации о том, как внести вклад в этот проект.


## История изменений

Для получения подробного списка изменений и обновлений, пожалуйста, обратитесь к файлу [CHANGELOG.md](CHANGELOG.md).


## Лицензия

Этот проект лицензируется в соответствии с файлом [LICENSE.md](LICENSE.md).