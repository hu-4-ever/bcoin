var bn = require('bn.js');
var bcoin = require('../').set('main');
var utils = bcoin.utils;
var assert = require('assert');
var mnemonic1 = require('./data/mnemonic1').english;
var mnemonic2 = require('./data/mnemonic2');

describe('Mnemonic', function() {
  mnemonic1.forEach(function(data, i) {
    var entropy = new Buffer(data[0], 'hex');
    var phrase = data[1];
    var seed = new Buffer(data[2], 'hex');
    var xpriv = data[3];
    it('should create an english mnemonic (' + i + ')', function() {
      var mnemonic = new bcoin.hd.Mnemonic({
        language: 'english',
        entropy: entropy,
        passphrase: 'TREZOR'
      });
      mnemonic.toSeed();
      assert.equal(mnemonic.phrase, phrase);
      assert.equal(mnemonic.toSeed().toString('hex'), seed.toString('hex'));
      var key = bcoin.hd.fromMnemonic(mnemonic);
      assert.equal(key.xprivkey, xpriv);
    });
  });
  mnemonic2.forEach(function(data, i) {
    var entropy = new Buffer(data.entropy, 'hex');
    var phrase = data.mnemonic;
    var seed = new Buffer(data.seed, 'hex');
    var passphrase = data.passphrase;
    var xpriv = data.bip32_xprv;
    it('should create a japanese mnemonic (' + i + ')', function() {
      var mnemonic = new bcoin.hd.Mnemonic({
        language: 'japanese',
        entropy: entropy,
        passphrase: passphrase
      });
      mnemonic.toSeed();
      assert.equal(mnemonic.phrase, phrase);
      assert.equal(mnemonic.toSeed().toString('hex'), seed.toString('hex'));
      var key = bcoin.hd.fromMnemonic(mnemonic);
      assert.equal(key.xprivkey, xpriv);
    });
  });
});
