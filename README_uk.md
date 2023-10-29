[**BG**](README_bg.md) | [**DE**](README_de.md) | [**EN**](README.md) | [**RU**](README_ru.md) | **UK**

# I18nService

I18nService - це об'єкт, що реалізує роботу з інтернаціоналізацією.

## Встановлення

1. Відкрийте свій проект в [Google Apps Script Dashboard](https://script.google.com/).
2. Скопіюйте вміст файлу `index.js` і вставте його в новий файл у вашому проекті Google Apps Script.

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

- [ ] Додати до методу `I18n.load()` можливість завантажувати переклади `json` за `url-посиланням`.
- [ ] Використовувати `CacheService` для зберігання мови.

## Історія змін

- **1.0.0**: Реліз.
