/**
 * Unit tests for the setup-component-test module
 */

import {expect} from 'chai'
import {deps, integration, unit} from 'ember-test-utils/test-support/setup-component-test'
import {afterEach, beforeEach, describe, it} from 'mocha'
import sinon from 'sinon'

describe('setupComponentTest()', function () {
  let sandbox
  beforeEach(function () {
    sandbox = sinon.sandbox.create()
    sandbox.stub(deps, 'setupComponentTest')
  })

  afterEach(function () {
    sandbox.restore()
  })

  describe('unit()', function () {
    let test
    describe('when just name is given', function () {
      beforeEach(function () {
        test = unit('my-component')
      })

      it('should create proper describe label', function () {
        expect(test.label).to.equal('Unit / Component / my-component /')
      })

      describe('when .setup() is called', function () {
        beforeEach(function () {
          test.setup()
        })

        it('should call setupComponentTest() with proper args', function () {
          expect(deps.setupComponentTest).to.have.been.calledWith('my-component', {unit: true})
        })
      })
    })

    describe('when dependencies are given', function () {
      let needs
      beforeEach(function () {
        needs = ['component:foo-bar', 'helper:baz']
        test = unit('my-component', needs)
      })

      it('should create proper describe label', function () {
        expect(test.label).to.equal('Unit / Component / my-component /')
      })

      describe('when .setup() is called', function () {
        beforeEach(function () {
          test.setup()
        })

        it('should call setupComponentTest() with proper args', function () {
          expect(deps.setupComponentTest).to.have.been.calledWith('my-component', {
            needs: ['component:foo-bar', 'helper:baz'],
            unit: true
          })
        })
      })
    })
  })

  describe('integration()', function () {
    let test
    beforeEach(function () {
      test = integration('my-component')
    })

    it('should create proper describe label', function () {
      expect(test.label).to.equal('Integration / Component / my-component /')
    })

    describe('when .setup() is called', function () {
      beforeEach(function () {
        test.setup()
      })

      it('should call setupComponentTest() with proper args', function () {
        expect(deps.setupComponentTest).to.have.been.calledWith('my-component', {integration: true})
      })
    })
  })
})
