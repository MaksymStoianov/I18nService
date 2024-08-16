/**
 * MIT License
 * 
 * Copyright (c) 2023 Maksym Stoianov
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */



/**
 * `I18nService` - представляет собой объект реализующий работу интернационализации.
 * @class               I18nService
 * @namespace           I18nService
 * @version             1.1.2
 * @author              Maksym Stoianov <stoianov.maksym@gmail.com>
 * @license             MIT
 * @tutorial            https://maksymstoianov.com/
 * @see                 [GitHub](https://github.com/MaksymStoianov/I18nService)
 * 
 * @todo В метод `I18n.load()` добавить возможность загружать переводы `json` по url-ссылке.
 * @todo Определять метаданные, например:
 * "@metadata": {
 * 	"authors": ['Maksym Stoianov <stoianov.maksym@gmail.com>'],
 * 	"updated": "2024-04-19",
 * 	"locale": "en",
 * };
 */
class I18nService {

  /**
   * Статический метод для инициализации сервиса.
   * @param {string} [locale]
   * @param {object} [options = {}]
   * @param {integer} [options.cache = 0] Определяет время хранения языка в [`CacheService`](https://developers.google.com/apps-script/reference/cache/cache-service) в секундах.
   * @param {boolean} [options.translate = false] Включает автоматический перевод через [`LanguageApp`](https://developers.google.com/apps-script/reference/language/language-app).
   */
  static init(...args) {
    return Reflect.construct(this.I18n, args);
  }



  /**
   * Создает и возвращает экземпляр класса [`I18n`](#).
   * @return {I18nService.I18n}
   */
  static newI18n(...args) {
    return Reflect.construct(this.I18n, args);
  }



  /**
   * Создает и возвращает экземпляр класса [`Language`](#).
   * @return {I18nService.Language}
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
   * @param {*} input Значение для проверки.
   * @return {boolean}
   */
  static isI18n(input) {
    if (!arguments.length)
      throw new Error(`The parameters () don't match any method signature for ${this.name}.isI18n.`);

    return (input instanceof this.I18n);
  }



  /**
   * Возвращает `true`, если объект является [`Language`](#); иначе, `false`.
   * @param {*} input Значение для проверки.
   * @return {boolean}
   */
  static isLanguage(input) {
    if (!arguments.length)
      throw new Error(`The parameters () don't match any method signature for ${this.name}.isLanguage.`);

    return (input instanceof this.Language);
  }



  /**
   * 
   * @param {*} input Значение для проверки.
   * @return {boolean}
   */
  static isValidLocaleName(input) {
    if (!arguments.length)
      throw new Error(`The parameters () don't match any method signature for ${this.name}.isValidLocaleName.`);

    return (
      typeof input === 'string' &&
      input.trim().length - 2 >= 0
    );
  }



  /**
   * 
   * @param {*} input Значение для проверки.
   * @return {boolean}
   */
  static isValidLabelName(input) {
    if (!arguments.length)
      throw new Error(`The parameters () don't match any method signature for ${this.name}.isValidLabelName.`);

    return (
      typeof input === 'string' &&
      input.trim().length - 1 >= 0
    );
  }



  /**
   * 
   * @param {*} input Значение для проверки.
   * @return {boolean}
   */
  static isValidTranslateName(input) {
    if (!arguments.length)
      throw new Error(`The parameters () don't match any method signature for ${this.name}.isValidTranslateName.`);

    return (typeof input === 'string');
  }



  constructor() {
    throw new Error(`${this.constructor.name} is not a constructor.`);
  }

}





/**
 * Конструктор 'I18n' - представляет собой объект для работы с ...
 * @class               I18n
 * @memberof            I18nService
 * @version             1.1.2
 */
I18nService.I18n = class I18n {

  /**
   * @param {string} [locale]
   * @param {object} [options = {}]
   * @param {integer} [options.cache = 0] todo Использовать кеш для хранения языка.
   * @param {boolean} [options.translate = false] Автоматически переводить с помощью Google Переводчика.
   */
  constructor(locale, options = {}) {

    /**
     * @type {string}
     */
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
    globalThis.__ = (label, locale) => this
      .getLanguage(locale ?? this.locale)
      .getTranslate(label, this.translate);

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
      throw new Error(`Параметры () не соответствуют сигнатуре метода ${this.constructor.name}.load.`);

    let data = {};
    let sheet = null;


    /**
     * @param {string} locale
     * @param {Object} translates
     */
    const setTranslates_ = (locale, translates) => {
      if (!I18nService.isValidLocaleName(locale)) return false;

      // Метка перевода
      locale = locale.trim().toLowerCase();

      if (!data[locale])
        data[locale] = {};

      // todo translates === url

      for (let label in translates) {
        // Метка перевода
        label = (item => typeof item === 'string' && item.length > 0 ? item : null)(label);

        if (!I18nService.isValidLabelName(label)) continue;

        let translate = (item => typeof item === 'string' && item.length >= 0 ? item : null)(translates[label]);

        if (!I18nService.isValidTranslateName(translate)) continue;

        // Устанавливаем текст перевода
        data[locale][label] = translate;
      }
    };


    // Аргументы: I18n
    if (args.length === 1 && I18nService.isI18n(args[0]) && Object.isObject(args[0]?._values))
      this._values = args[0]._values;

    // Аргументы: Language
    else if (args.length === 1 && I18nService.isLanguage(args[0]) && Object.isObject(args[0]?._values) && typeof args[0]?.locale === 'string')
      this._values[args[0].locale] = args[0];

    // Аргументы: spreadsheetId, sheetName
    else if (args.length === 2 && typeof args[0] === 'string' && args[0].length && typeof args[1] === 'string' && args[1].length)
      sheet = (ss => ss.getSheetByName(args[1]) ?? ss.insertSheet(args[1]))(SpreadsheetApp.openById(args[0]));

    // Аргументы: spreadsheet, sheetName
    else if (args.length === 2 && SpreadsheetApp.isSpreadsheet(args[0]) && typeof args[1] === 'string' && args[1].length)
      sheet = args[0].getSheetByName(args[1]) ?? args[0].insertSheet(args[1]);

    // Аргументы: sheet
    else if (args.length === 1 && SpreadsheetApp.isSheet(args[0]))
      sheet = args[0];

    // Аргументы: json, locale
    else if (args.length === 2 && Object.isObject(args[0]) && typeof args[1] === 'string')
      setTranslates_(args[1], args[0]);

    // Аргументы: json
    else if (args.length === 1 && Object.isObject(args[0]))
      for (const locale in args[0])
        setTranslates_(locale, args[0][locale]);

    else throw new Error(`Недопустимые аргументы: невозможно определить правильную перегрузку статического метода ${this.constructor.name}.load.`);


    if (sheet) {
      const [headers, ...values] = sheet
        .getDataRange()
        .getDisplayValues();

      let json = headers
        .slice(1)
        .map(item => [item, {}]);

      for (const [label, ...translates] of values)
        for (const [i] of json.entries())
          json[i][1][label] = translates[i];

      json = Object.fromEntries(json);

      for (const locale in json)
        setTranslates_(locale, json[locale]);
    }

    for (const locale in data) {
      const translates = data[locale];

      if (!this._values[locale])
        this._values[locale] = I18nService.newLanguage(locale, translates);
    }

    return this;
  }



  /**
   * Устанавливает локаль для сервиса.
   * @param {string} locale Код локали, который нужно установить.
   * @return {I18nService.I18n} Возвращает текущий экземпляр для цепочки вызовов.
   */
  setLocale(locale) {
    if (!arguments.length)
      throw new Error(`Параметры () не соответствуют сигнатуре метода ${this.constructor.name}.setLocale.`);

    if (!I18nService.isValidLocaleName(locale))
      throw new Error(`Параметры (${typeof locale}) не соответствуют сигнатуре метода ${this.constructor.name}.setLocale.`);

    this.locale = locale.trim().toLowerCase();

    this._values[this.locale] = I18nService.newLanguage(locale);

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
      throw new Error(`Параметры () не соответствуют сигнатуре статического метода ${this.constructor.name}.getLanguage.`);

    if (!I18nService.isValidLocaleName(locale))
      throw new Error(`Параметры (${typeof locale}) не соответствуют сигнатуре метода ${this.constructor.name}.getLanguage.`);

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
   * Вызывается при преобразовании объекта в соответствующее примитивное значение.
   * @param {string} hint Строковый аргумент, который передаёт желаемый тип примитива: `string`, `number` или `default`.
   * @return {string}
   */
  [Symbol.toPrimitive](hint) {
    if (hint !== 'string')
      return null;

    return this.constructor.name;
  }



  /**
   * Возвращает значение текущего объекта.
   * @return {string}
   */
  valueOf() {
    return (this[Symbol.toPrimitive] ? this[Symbol.toPrimitive]() : this.constructor.name);
  }



  /**
   * Геттер для получения строки, представляющей тег объекта.
   * @return {string} Имя класса текущего объекта, используемое в `Object.prototype.toString`.
   */
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }



  /**
   * Возвращает строку, представляющую объект.
   * @return {string}
   */
  toString() {
    return (this[Symbol.toPrimitive] ? this[Symbol.toPrimitive]('string') : this.constructor.name);
  }

};





/**
 * Конструктор 'Language' - представляет собой объект для работы с ...
 * @class               Language
 * @memberof            I18nService
 * @version             1.1.2
 */
I18nService.Language = class Language {

  /**
   * @param {string} locale
   * @param {Object} [values = {}]
   */
  constructor(locale, values = {}) {

    /**
     * @type {string}
     */
    this.locale = locale;


    /**
     * @type {Object}
     */
    this.values = {};


    if (Object.isObject(values)) {
      for (const label in values) {
        this.addTranslate(label, values[label]);
      }
    }

  }



  /**
   * Устанавливает локаль для сервиса.
   * @param {string} locale Код локали, который нужно установить.
   * @return {I18nService.Language} Возвращает текущий экземпляр для цепочки вызовов.
   */
  setLocale(locale) {
    if (!arguments.length)
      throw new Error(`Параметры () не соответствуют сигнатуре метода ${this.constructor.name}.setLocale.`);

    if (!I18nService.isValidLocaleName(locale))
      throw new Error(`Параметры (${typeof locale}) не соответствуют сигнатуре метода ${this.constructor.name}.setLocale.`);

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
      throw new Error(`Параметры () не соответствуют сигнатуре метода ${this.constructor.name}.addTranslate.`);

    if (!I18nService.isValidLabelName(label))
      throw new Error(`Параметры (${typeof label}) не соответствуют сигнатуре метода ${this.constructor.name}.addTranslate.`);

    if (!I18nService.isValidTranslateName(translate))
      throw new Error(`Параметры (${typeof label}, ${typeof translate}) не соответствуют сигнатуре метода ${this.constructor.name}.addTranslate.`);

    this.values[label.toLowerCase()] = translate;

    return this;
  }



  /**
   * @param {string} label
   * @param {boolean} [isTranslate = false]
   * @return {string}
   */
  getTranslate(label, isTranslate = false) {
    if (!arguments.length)
      throw new Error(`Параметры () не соответствуют сигнатуре метода ${this.constructor.name}.getTranslate.`);

    if (!I18nService.isValidLabelName(label))
      throw new Error(`Параметры (${typeof label}) не соответствуют сигнатуре метода ${this.constructor.name}.getTranslate.`);

    if (typeof isTranslate !== 'boolean')
      throw new Error(`Параметры (${typeof label}, ${typeof isTranslate}) не соответствуют сигнатуре метода ${this.constructor.name}.getTranslate.`);

    const locale = this.getLocale();

    if (!locale)
      throw new Error(`Недопустимый аргумент locale.`);

    return this.values[label.toLowerCase()] ?? (isTranslate === true ? LanguageApp.translate(label, 'auto', locale) : label);
  }



  /**
   * Вызывается при преобразовании объекта в соответствующее примитивное значение.
   * @param {string} hint Строковый аргумент, который передаёт желаемый тип примитива: `string`, `number` или `default`.
   * @return {string}
   */
  [Symbol.toPrimitive](hint) {
    if (hint !== 'string')
      return null;

    return this.constructor.name;
  }



  /**
   * Возвращает значение текущего объекта.
   * @return {string}
   */
  valueOf() {
    return (this[Symbol.toPrimitive] ? this[Symbol.toPrimitive]() : this.constructor.name);
  }



  /**
   * Геттер для получения строки, представляющей тег объекта.
   * @return {string} Имя класса текущего объекта, используемое в `Object.prototype.toString`.
   */
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }



  /**
   * Возвращает строку, представляющую объект.
   * @return {string}
   */
  toString() {
    return (this[Symbol.toPrimitive] ? this[Symbol.toPrimitive]('string') : this.constructor.name);
  }

};





if (typeof Object.isObject !== 'function') {
  /**
   * Возвращает `true`, если объект является [`Object`](#); иначе, `false`.
   * @param {*} input Объект для проверки.
   * @return {boolean}
   */
  Object.isObject = input => (
    input === Object(input) &&
    !Array.isArray(input)
  );
}





if (typeof SpreadsheetApp.isSpreadsheet !== 'function') {
  /**
   * Возвращает `true`, если объект является [`Spreadsheet`](https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet); иначе, `false`.
   * @param {*} input Объект для проверки.
   * @return {boolean}
   */
  SpreadsheetApp.isSpreadsheet = input => (
    input === Object(input) &&
    !Array.isArray(input) &&
    input.toString() === 'Spreadsheet'
  );
}





if (typeof SpreadsheetApp.isSheet !== 'function') {
  /**
   * Возвращает `true`, если объект является [`Sheet`](https://developers.google.com/apps-script/reference/spreadsheet/sheet); иначе, `false`.
   * @param {*} input Объект для проверки.
   * @return {boolean}
   */
  SpreadsheetApp.isSheet = input => (
    input === Object(input) &&
    !Array.isArray(input) &&
    input.toString() === 'Sheet'
  );
}
