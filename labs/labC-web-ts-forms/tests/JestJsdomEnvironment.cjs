const { TestEnvironment } = require('jest-environment-node');
const { JSDOM } = require('jsdom');

class JestJsdomEnvironment extends TestEnvironment {
  customExportConditions = ['browser'];

  async setup() {
    await super.setup();

    this.dom = new JSDOM('<!doctype html><html><body></body></html>', {
      pretendToBeVisual: true,
      url: 'http://localhost/',
    });

    const { window } = this.dom;
    this.global.window = window;
    this.global.self = window;
    this.global.document = window.document;
    this.global.navigator = window.navigator;

    Object.getOwnPropertyNames(window)
      .filter(property => !(property in this.global))
      .forEach(property => {
        const descriptor = Object.getOwnPropertyDescriptor(window, property);
        if (descriptor) {
          Object.defineProperty(this.global, property, descriptor);
        }
      });
  }

  async teardown() {
    this.dom?.window.close();
    await super.teardown();
  }
}

module.exports = JestJsdomEnvironment;
