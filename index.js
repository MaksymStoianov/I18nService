/**
 * `I18nService` - представляет собой объект реализующий работу интернационализации.
 * @class I18nService
 * @version 1.0.0
 * @author Maksym Stoianov <stoianov.maksym@gmail.com>
 * @see [Snippet Source](https://script.google.com/home/projects/1AmjQDD0MQu6CTzYdEupF-scnfLcHbtSrXpLVJeWZfrVa5XSfXNwPDfDf/edit)
 * @see [Snippet Documentation](https://apps-script.blog/)
 * @todo В метод I18n.load() добавить возможность загружать переводы json по url-ссылке.
 */
globalThis.I18nService = class I18nService {
  /**
   * Статический метод для инициализации сервиса.
   * @param {string} [locale]
   * @param {object} [options={}]
   * @param {integer} [options.cache=0] Определяет время хранения языка в [`CacheService`](https://developers.google.com/apps-script/reference/cache/cache-service) в секундах.
   * @param {boolean} [options.translate=false] Включает автоматический перевод через [`LanguageApp`](https://developers.google.com/apps-script/reference/language/language-app).
   */
  static init(...args) {
    return Reflect.construct(this.I18n, args);
  }



  /**
   * Создает и возвращает экземпляр класса [`Language`](#).
   * @param {string} locale
   * @param {Object} [values={}]
   * @return {I18nService.Language} Экземпляр класса [`Language`](#).
   */
  static newLanguage(...args) {
    return Reflect.construct(this.Language, args);
  }



  /**
   * Cтатический метод, который используется для определения правильной формы множественного числа слова.
   * @param {number} n
   * @param {string[]} forms
   * @return {string} 
   */
  static pluralize(n, forms) {
    return forms[n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];
  }



  /**
   * Возвращает `true`, если объект является [`I18n`](#); иначе, `false`.
   * @param {*} input Объект для проверки.
   * @return {boolean}
   */
  static isI18n(input) {
    return input instanceof this.I18n;
  }



  /**
   * Возвращает `true`, если объект является [`Language`](#); иначе, `false`.
   * @param {*} input Объект для проверки.
   * @return {boolean}
   */
  static isLanguage(input) {
    return input instanceof this.Language;
  }



  static isLocaleName(input) {
    return typeof input === 'string' && input.trim().length >= 2;
  }



  static isLabelName(input) {
    return typeof input === 'string' && input.trim().length >= 1;
  }



  static isTranslateName(input) {
    return typeof input === 'string';
  }



  constructor() {
    throw new Error(`${this.constructor.name} is not a constructor.`);
  }
};





/**
 * Конструктор 'I18n' - представляет собой объект для работы с ...
 * @class I18n
 * @memberof I18nService
 */
I18nService.I18n = class I18n {
  /**
   * @param {string} [locale]
   * @param {object} [options={}]
   * @param {integer} [options.cache=0] todo Использовать кеш для хранения языка.
   * @param {boolean} [options.translate=false] Автоматически переводить с помощью Google Переводчика.
   */
  constructor(locale, options = {}) {
    this.locale = null;

    /**
     * @private
     * @type {Object}
     */
    Object.defineProperty(this, '_values', {
      configurable: true,
      enumerable: false,
      writable: true,
      value: {}
    });

    if (locale)
      this.setLocale(locale);

    if (typeof options.translate === 'boolean')
      this.translate = options.translate;


    /**
     * Получает перевод.
     * @param {string} label
     * @param {string} [locale]
     * @return {string}
     */
    globalThis.__ = (label, locale) => this.getLanguage(locale ?? this.locale).getTranslate(label, this.translate);
  }



  /**
   * Загружает языки.
   */
  /**
   * @overload
   * @param {I18nService.I18n} i18n Экземпляр класса [`I18n`](#).
   * @return {I18nService.I18n}
   */
  /**
   * @overload
   * @param {I18nService.Language} language Экземпляр класса [`Language`](#).
   * @return {I18nService.I18n}
   */
  /**
   * @overload
   * @param {string} spreadsheetId
   * @param {string} sheetName
   * @return {I18nService.I18n}
   */
  /**
   * @overload
   * @param {SpreadsheetApp.Spreadsheet} spreadsheet Экземпляр класса [`Sheet`](https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet).
   * @param {string} sheetName
   * @return {I18nService.I18n}
   */
  /**
   * @overload
   * @param {SpreadsheetApp.Sheet} sheet Экземпляр класса [`Sheet`](https://developers.google.com/apps-script/reference/spreadsheet/sheet).
   * @return {I18nService.I18n}
   */
  /**
   * @overload
   * @param {object} json
   * @param {string} locale
   * @return {I18nService.I18n}
   */
  /**
   * @overload
   * @param {object} json
   * @return {I18nService.I18n}
   */
  load(...args) {
    if (!arguments.length)
      throw new Error(`Параметры () не соответствуют сигнатуре метода ${this}.load.`);

    let data = {};
    let sheet = null;

    /**
     * @param {string} locale
     * @param {Object} translates
     */
    const setTranslates = (locale, translates) => {
      if (!I18nService.isLocaleName(locale)) return false;

      // Метка перевода
      locale = locale.trim().toLowerCase();

      if (!data[locale])
        data[locale] = {};

      // todo translates === url

      for (let label in translates) {
        // Метка перевода
        label = (item => typeof item === 'string' && (item = item.trim()).length > 0 ? item.toLowerCase() : null)(label);

        if (!label) continue;

        let translate = translates[label];

        if (!I18nService.isTranslateName(translate)) continue;

        // Устанавливаем текст перевода
        data[locale][label] = (item => typeof item === 'string' && item.length > 0 ? item : null)(translate);
      }
    };

    // Аргументы: I18n
    if (args.length === 1 && I18nService.isI18n(args[0]) && Object.isObject(args[0]?._values))
      this._values = args[0]._values;

    // Аргументы: Language
    if (args.length === 1 && I18nService.isLanguage(args[0]) && Object.isObject(args[0]?._values) && typeof args[0]?.locale === 'string')
      this._values[args[0].locale] = args[0];

    // Аргументы: spreadsheetId, sheetName
    else if (args.length === 2 && typeof args[0] === 'string' && args[0].length && typeof args[1] === 'string' && args[1].length)
      sheet = (ss => ss.getSheetByName(args[1]) ?? ss.insertSheet(args[1]))(SpreadsheetApp.openById(args[0]));

    // Аргументы: spreadsheet, sheetName
    else if (args.length === 2 && SpreadsheetApp.isSpreadsheet(args[0]) && typeof args[1] === 'string' && args[1].length)
      sheet = args[0].getSheetByName(args[1]) ?? args[0].insertSheet(args[1]);

    // Аргументы: sheet
    else if (args.length === 2 && SpreadsheetApp.isSheet(args[0]))
      sheet = args[0];

    // Аргументы: json, locale
    else if (args.length === 2 && Object.isObject(args[0]) && typeof args[1] === 'string')
      setTranslates(args[1], args[0]);

    // Аргументы: json
    else if (args.length === 1 && Object.isObject(args[0]))
      for (const locale in args[0])
        setTranslates(locale, args[0][locale]);

    else throw new Error(`Недопустимые аргументы: невозможно определить правильную перегрузку статического метода ${this}.init.`);


    if (sheet) {
      const [headers, ...values] = sheet
        .getDataRange()
        .getDisplayValues();

      const locales = headers.map(item => typeof item === 'string' && (item = item.trim()).length - 2 >= 0 ? item.toLowerCase() : null);

      for (const item of values) {
        let [label, ...translates] = item;

        // Метка перевода
        label = (item => typeof item === 'string' && (item = item.trim()).length > 0 ? item.toLowerCase() : null)(label);

        if (!label) continue;

        for (let [i, locale] of locales.entries()) {
          if (!I18nService.isLocaleName(locale)) continue;

          if (!data[locale])
            data[locale] = {};

          let translate = translates[i - 1];

          if (!I18nService.isTranslateName(translate)) continue;

          // Устанавливаем текст перевода
          data[locale][label] = (item => typeof item === 'string' && item.length > 0 ? item : null)(translate);
        }
      }
    }

    for (const locale in data)
      if (!this._values[locale])
        this._values[locale] = I18nService.newLanguage(locale, data[locale]);

    return this;
  }



  /**
   * Устанавливает локаль для сервиса.
   * @param {string} locale Код локали, который нужно установить.
   * @return {I18nService.I18n} Возвращает текущий экземпляр для цепочки вызовов.
   */
  setLocale(locale) {
    if (!arguments.length)
      throw new Error(`Параметры () не соответствуют сигнатуре метода ${this}.setLocale.`);

    if (!I18nService.isLocaleName(locale))
      throw new Error(`Параметры (${typeof locale}) не соответствуют сигнатуре метода ${this}.setLocale.`);

    this.locale = locale.trim();

    return this;
  }



  /**
   * Возвращает установленную локаль.
   * @return {string} Возвращает текущую локаль или `null`, если локаль не установлена.
   */
  getLocale() {
    return this.locale ?? null;
  }



  /**
   * Получает экземпляр класса [`Language`](#) на основе указанной локали.
   * @param {string} locale Код локали для получения языка.
   * @return {I18nService.Language} Экземпляр класса [`Language`](#) или `null`.
   */
  getLanguage(locale) {
    if (!arguments.length)
      throw new Error(`Параметры () не соответствуют сигнатуре статического метода ${this}.getLanguage.`);
    console.log(locale);
    if (!I18nService.isLocaleName(locale))
      throw new Error(`Параметры (${typeof locale}) не соответствуют сигнатуре метода ${this}.getLanguage.`);

    return this._values[locale] ?? (this._values[locale] = I18nService.newLanguage(locale));
  }



  /**
   * @param {string} locale
   * @return {boolean}
   */
  hasLanguage(locale) {
    return !!this.values[locale];
  }



  /**
   * Возвращает строку, представляющую объект.
   * @return {string}
   */
  toString() {
    return this.constructor.name;
  }
};





/**
 * Конструктор 'Language' - представляет собой объект для работы с ...
 * @class Language
 * @memberof I18nService
 */
I18nService.Language = class Language {
  /**
   * @param {string} locale
   * @param {Object} [values={}]
   */
  constructor(locale, values = {}) {
    this.locale = locale;
    this.values = {};

    if (Object.isObject(values))
      for (const label in values)
        addTranslate(label, values[label])
  }



  /**
   * Устанавливает локаль для сервиса.
   * @param {string} locale Код локали, который нужно установить.
   * @return {I18nService.Language} Возвращает текущий экземпляр для цепочки вызовов.
   */
  setLocale(locale) {
    if (!arguments.length)
      throw new Error(`Параметры () не соответствуют сигнатуре метода ${this}.setLocale.`);

    if (!I18nService.isLocaleName(locale))
      throw new Error(`Параметры (${typeof locale}) не соответствуют сигнатуре метода ${this}.setLocale.`);

    this.locale = locale.trim();

    return this;
  }



  /**
   * Возвращает установленную локаль.
   * @return {string} Возвращает текущую локаль или `null`, если локаль не установлена.
   */
  getLocale() {
    return this.locale ?? null;
  }



  /**
   * @param {string} label
   * @param {string} translate
   * @return {I18nService.Language} Возвращает текущий экземпляр для цепочки вызовов.
   */
  addTranslate(label, translate) {
    if (!arguments.length)
      throw new Error(`Параметры () не соответствуют сигнатуре метода ${this}.addTranslate.`);

    if (!I18nService.isLabelName(label))
      throw new Error(`Параметры (${typeof label}) не соответствуют сигнатуре метода ${this}.addTranslate.`);

    if (!I18nService.isTranslateName(translate))
      throw new Error(`Параметры (${typeof label}, ${typeof translate}) не соответствуют сигнатуре метода ${this}.addTranslate.`);

    this.values[label.toLowerCase()] = translate;

    return this;
  }



  /**
   * @param {string} label
   * @param {boolean} [isTranslate=false]
   * @return {string}
   */
  getTranslate(label, isTranslate = false) {
    if (!arguments.length)
      throw new Error(`Параметры () не соответствуют сигнатуре метода ${this}.getTranslate.`);

    if (!I18nService.isLabelName(label))
      throw new Error(`Параметры (${typeof label}) не соответствуют сигнатуре метода ${this}.getTranslate.`);

    if (typeof isTranslate !== 'boolean')
      throw new Error(`Параметры (${typeof label}, ${typeof isTranslate}) не соответствуют сигнатуре метода ${this}.getTranslate.`);

    const locale = this.getLocale();

    if (!locale)
      throw new Error(`Недопустимый аргумент locale.`);

    return this.values[label.toLowerCase()] ?? (isTranslate === true ? LanguageApp.translate(label, 'auto', locale) : label);
  }



  /**
   * Возвращает строку, представляющую объект.
   * @return {string}
   */
  toString() {
    return this.constructor.name;
  }
};





if (typeof Object.isObject !== 'function')
  /**
   * Возвращает `true`, если объект является [`Object`](#); иначе, `false`.
   * @param {*} input Объект для проверки.
   * @return {boolean}
   */
  Object.isObject = input => input === Object(input) && !Array.isArray(input);





if (typeof SpreadsheetApp.isSpreadsheet !== 'function')
  /**
   * Возвращает `true`, если объект является [`Spreadsheet`](https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet); иначе, `false`.
   * @param {*} input Объект для проверки.
   * @return {boolean}
   */
  SpreadsheetApp.isSpreadsheet = input => input === Object(input) && !Array.isArray(input) && input.toString() === 'Spreadsheet';





if (typeof SpreadsheetApp.isSheet !== 'function')
  /**
   * Возвращает `true`, если объект является [`Sheet`](https://developers.google.com/apps-script/reference/spreadsheet/sheet); иначе, `false`.
   * @param {*} input Объект для проверки.
   * @return {boolean}
   */
  SpreadsheetApp.isSheet = input => input === Object(input) && !Array.isArray(input) && input.toString() === 'Sheet';





if (typeof SpreadsheetApp.isRange !== 'function')
  /**
   * Возвращает `true`, если объект является [`Range`](https://developers.google.com/apps-script/reference/spreadsheet/range); иначе, `false`.
   * @param {*} input Объект для проверки.
   * @return {boolean}
   */
  SpreadsheetApp.isRange = input => input === Object(input) && !Array.isArray(input) && input.toString() === 'Range';
