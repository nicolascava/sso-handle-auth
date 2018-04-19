import { expect } from 'chai';

import handleAuth from '../';

describe('handleAuth()', () => {
  it('should throw an error if the argument is not a string', () =>
    expect(handleAuth).to.throw(Error));

  it('should throw an error if the argument is not an URL', () => {
    function notATestURL() {
      return handleAuth('test');
    }

    expect(notATestURL).to.throw(Error);
  });

  it('should return a function', () =>
    expect(handleAuth('http://someurl.com')).to.be.an('function'));
});
