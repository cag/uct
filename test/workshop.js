const ConditionalTokens = artifacts.require('ConditionalTokens');

const {
  getConditionId,
  getCollectionId,
  combineCollectionIds,
  getPositionId,
} = require('@gnosis.pm/conditional-tokens-contracts/utils/id-helpers')(web3.utils);

contract('Using Conditional Tokens', function([, alice, bob, carol, dan]) {
  let conditionalTokens;
  before('get deployed ConditionalTokens', async function() {
    conditionalTokens = await ConditionalTokens.deployed();
  });

  /////////////////////////////////////////////////////////////////////////////
  // Step 1: Preparing Conditions                                            //
  /////////////////////////////////////////////////////////////////////////////
  step('preparing conditions', async function() {
    assert.fail('not implemented yet');
  });

  /////////////////////////////////////////////////////////////////////////////
  // Step 2: Collateralizing with Tokens                                     //
  /////////////////////////////////////////////////////////////////////////////
  step('collateralizing with tokens', async function() {
    assert.fail('not implemented yet');
  });

  /////////////////////////////////////////////////////////////////////////////
  // Step 3: Sending and Receiving                                           //
  /////////////////////////////////////////////////////////////////////////////
  step('sending and receiving', async function() {
    assert.fail('not implemented yet');
  });

  /////////////////////////////////////////////////////////////////////////////
  // Step 4: Combining Conditions                                            //
  /////////////////////////////////////////////////////////////////////////////
  step('combining conditions', async function() {
    assert.fail('not implemented yet');
  });

  /////////////////////////////////////////////////////////////////////////////
  // Step 5: Resolving and Redeeming                                         //
  /////////////////////////////////////////////////////////////////////////////
  step('resolving and redeeming', async function() {
    assert.fail('not implemented yet');
  });
});
