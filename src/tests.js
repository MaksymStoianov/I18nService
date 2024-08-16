function test_1() {
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
}
