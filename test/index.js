import {expect} from 'chai';

import handleAuth from 'packages/helpers/node/handle-auth';

describe('Handle Auth module', () => {
  describe('handleAuth()', () => {
    it('Should throw an error if the argument is not a string.', () => {
      expect(handleAuth).to.throw(Error);
    });

    it('Should throw an error if the argument is not an URL.', () => {
      function notAnURLTest() {
        return handleAuth('yolo');
      }
      expect(notAnURLTest).to.throw(Error);
    });

    it('Should return a function.', () => {
      expect(handleAuth('http://someUrl.com')).to.be.an('function');
    });
  });
});
