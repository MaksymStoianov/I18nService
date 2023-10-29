**BG** | [**DE**](README_de.md) | [**EN**](README.md) | [**RU**](README_ru.md) | [**UK**](README_uk.md)

# I18nService

I18nService е обект, който реализира работа с интернационализация.

## Инсталация

1. Отворете вашия проект в [Google Apps Script Dashboard](https://script.google.com/).
2. Копирайте съдържанието на файла `index.js` и го поставете в нов файл във вашия проект на Google Apps Script.

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

- [ ] Добавете в метода `I18n.load()` възможността за зареждане на преводи `json` чрез `url-връзка`.
- [ ] Използвайте `CacheService` за съхранение на езика.

## История на промените

- **1.0.0**: Първоначална публикация.
