[**BG**](README_bg.md) | [**DE**](README_de.md) | [**EN**](README.md) | **RU** | [**UK**](README_uk.md)

# I18nService

I18nService - представляет собой объект реализующий работу интернационализации.

## Установка

1. Откройте свой проект в [Google Apps Script Dashboard](https://script.google.com/).
2. Скопируйте содержимое файла `index.js` и вставьте его в новый файл в вашем проекте Google Apps Script.

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

- [ ] В метод `I18n.load()` добавить возможность загружать переводы `json` по `url-ссылке`.
- [ ] Использовать `CacheService` для хранения языка.

## История изменений

- **1.0.0**: Релиз.
