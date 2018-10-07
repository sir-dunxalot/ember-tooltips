/* eslint-env node, mocha */
'use strict';

const expect = require('chai').expect;
const setupTest = require('ember-fastboot-addon-tests').setupTest;

describe('index', function() {
  setupTest('fastboot'/*, options */);

  it('does not blow up', function() {
    return this.visit('/')
      .then(function(res) {
        let $ = res.jQuery;
        let response = res.response;

        // add your real tests here
        expect(response.statusCode).to.equal(200);
        expect($('body').length).to.equal(1);
        expect($('h1').text().trim()).to.equal('ember-fastboot-addon-tests');
        expect($('.ember-tooltip-base').text().trim()).to.contain('i am an inline tooltip');
        expect($('.ember-tooltip-base').text().trim()).to.contain('Hello, I am a tooltip!');
      });
  });

});
