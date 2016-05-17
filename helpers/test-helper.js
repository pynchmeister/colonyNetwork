/* eslint-env node */
/* globals web3, assert, module */
var leftPad = require('left-pad');
var Promise = require('bluebird');
var _ = require('lodash');
module.exports = {
  ifUsingTestRPC : function () {
    //Okay, so, there is a discrepancy between how testrpc handles
    //OOG errors (throwing an exception all the way up to these tests) and
    //how geth handles them (still making a valid transaction and returning
    //a txid). For the explanation of why, see
    //
    //See https://github.com/ethereumjs/testrpc/issues/39
    //
    //Obviously, we want our tests to pass on both, so this is a
    //bit of a problem. We have to have this special function that we use to catch
    //the error. I've named it so that it reads well in the tests below - i.e.
    //.catch(ifUsingTestRPC)
    //Note that it just swallows the error - open to debate on whether this is
    //the best thing to do, or it should log it even though it's expected, in
    //case we get an error that is unexpected...
    // console.log('Error:',err)
    return;
  },
  checkAllGasSpent : function(gasAmount, gasPrice, account, prevBalance){
    var newBalance = web3.eth.getBalance(account);
    //When a transaction throws, all the gas sent is spent. So let's check that
    //we spent all the gas that we sent.
    assert.equal(prevBalance.minus(newBalance).toNumber(), gasAmount*gasPrice, 'didnt fail - didn\'t throw and use all gas');
  },
  getRandomString : function(_length){
    var length = _length || 7;
    return Math.random().toString(36).substring(length);
  },
  waitAll : function(promises, callback){
    return Promise.all(promises)
    .then(function(){
      callback();
    })
    .catch(callback);
  },
  _ : _,
  Promise : Promise,
  hexToUtf8 : function (text) {
    return web3.toAscii(text).replace(/\u0000/g, '');
  },
  solSha3 : function (...args) {
    args = args.map(arg => {
        if (typeof arg === 'string') {
            if (arg.substring(0, 2) === '0x') {
                return arg.slice(2)
            } else {
                return web3.toHex(arg).slice(2)
            }
        }

        if (typeof arg === 'number') {
            return leftPad((arg).toString(16), 64, 0)
        } else {
          return ''
        }
    })
    args = args.join('')
    return '0x' + web3.sha3(args, { encoding: 'hex' })
}
};
