const chai = require('chai');
chai.use(require('chai-bn')(web3.utils.BN));
const { expect } = chai;
require('@openzeppelin/test-helpers');

const ConditionalTokens = artifacts.require('ConditionalTokens');
const ERC20Mintable = artifacts.require('ERC20Mintable');
const DanceDao = artifacts.require('DanceDao');
const DanceDaoOracle = artifacts.require('DanceDaoOracle');

const {
  getConditionId,
  getCollectionId,
  combineCollectionIds,
  getPositionId,
} = require('@gnosis.pm/conditional-tokens-contracts/utils/id-helpers')(web3.utils);

const {
  keccak256,
  utf8ToHex,
} = web3.utils;

contract('Using Conditional Tokens', function([, alice, bob, carol, dan]) {
  let conditionalTokens;
  let danceDao;
  let danceDaoOracle;
  let carolCoin;
  let danDollar;
  before('get deployed contracts', async function() {
    conditionalTokens = await ConditionalTokens.deployed();
    danceDao = await DanceDao.deployed();
    danceDaoOracle = await DanceDaoOracle.deployed();
  });

  before('create and mint collateral tokens', async function() {
    carolCoin = await ERC20Mintable.new({ from: carol });
    danDollar = await ERC20Mintable.new({ from: dan });
    carolCoin.mint(alice, 100, { from: carol });
    carolCoin.mint(carol, 100, { from: carol });
    danDollar.mint(bob, 100, { from: dan });
  });

  /////////////////////////////////////////////////////////////////////////////
  // Step 1: Preparing Conditions                                            //
  /////////////////////////////////////////////////////////////////////////////
  const question1 = 'Does Bob like Alice, Carol, or Dan?';
  const question2 = 'Will Bob ask Alice to the DanceDao?';
  const questionId1 = keccak256(utf8ToHex(question1));
  const questionId2 = keccak256(utf8ToHex(question2));
  let conditionId1;
  let conditionId2;
  step('preparing conditions', async function() {
    // Insert code here

    expect(conditionId1)
      .to.equal('0x56da481c405290d8dfa809283c196ad54af1d1ece20e1001dc20e5fdee20adf1');
    expect(conditionId2)
      .to.equal('0xc81a9ddad1487a1bbd634ba14789d0dd937c31553f2dca36bacc86f63a10f192');
    expect(await conditionalTokens.getOutcomeSlotCount(conditionId1))
      .to.be.bignumber.equal('2');
    expect(await conditionalTokens.getOutcomeSlotCount(conditionId2))
      .to.be.bignumber.equal('2');
  });

  /////////////////////////////////////////////////////////////////////////////
  // Step 2: Collateralizing with Tokens                                     //
  /////////////////////////////////////////////////////////////////////////////
  let bobLikesAliceColId;
  let bobLikesCarolColId;
  let bobLikesDanColId;
  let bobLikesAliceOrCarolColId;
  let didAskColId;
  let noAskColId;

  let ccblaPosId;
  let ccblcPosId;
  let ccbldPosId;
  let ddblacPosId;
  let ddbldPosId;
  let ccdaPosId;
  let ccnaPosId;
  step('collateralizing with tokens', async function() {
    // Insert code here
    
    expect(bobLikesAliceColId)
      .to.equal('0x5fbef411c6093f8fe386af5969245526e37128f6eb9896d78a0f52412856a4ba');
    expect(bobLikesCarolColId)
      .to.equal('0x4b68ac87f927125821ac8d09401812a715c0be7861affc41b689a05a7e9a9a7f');
    expect(bobLikesDanColId)
      .to.equal('0x56d6256c256abe6fcd1eb582ccb99380f7164e5f990523326a8648d03fca65d3');
    expect(bobLikesAliceOrCarolColId)
      .to.equal('0x181a3eb22e1748227848f3f5ce94c1b3e1d4f612accd4244f53ab4f90d052071');
    expect(didAskColId)
      .to.equal('0x67c1000b279fd66510b60bf6a41aae162f73ee330b52d255b9ceda870b5d6e7b');
    expect(noAskColId)
      .to.equal('0x08c8961ce2422c8ec309a925f057f802ebe159f577501c83d456e4fc3004cbcb');

    expect(ccblaPosId)
      .to.equal('0x09732775681b7fc1b540749b41df56c116079f8a430063836968050ebc8dde39');
    expect(ccblcPosId)
      .to.equal('0xe69c9e3c0fd529dc54f11a335b2ba970be58aaafd3e627517b3cd1a46593605a');
    expect(ccbldPosId)
      .to.equal('0x035dca4c1242e94a5835127309f254c9e57f37152d6a0b06f51ed17d86d77586');
    expect(ddblacPosId)
      .to.equal('0xe863ed7581c5c6a6e0ef4fe537ec2a3b81ee1fafbd9cb33be8c8f8489227684d');
    expect(ddbldPosId)
      .to.equal('0x256995d238563e854f915f80d8d885a20a952c03b6384ae745ce4471692f99c2');
    expect(ccdaPosId)
      .to.equal('0x82e7fe2b1f3632e4e8d47cb9e0e14b98d3abd2739e6a923c3d6f733e25aa5696');
    expect(ccnaPosId)
      .to.equal('0x7b87cafe6a5abed1f66789340831aa2daadebf28949bba47227b24e1c7ebfa64');

    const balances = await conditionalTokens.balanceOfBatch(
      [alice, alice, alice, bob, bob, carol, carol],
      [
        ccblaPosId,
        ccblcPosId,
        ccbldPosId,
        ddblacPosId,
        ddbldPosId,
        ccdaPosId,
        ccnaPosId,
      ]
    );

    for (const balance of balances)
      expect(balance).to.be.bignumber.equal('100');
  });

  /////////////////////////////////////////////////////////////////////////////
  // Step 3: Sending and Receiving                                           //
  /////////////////////////////////////////////////////////////////////////////
  step('sending and receiving', async function() {
    // Insert code here

    const balances = await conditionalTokens.balanceOfBatch(
      [
        alice, alice, bob, bob,
        bob, alice,
        carol, dan
      ],
      [
        ccblaPosId,
        ccbldPosId,
        ccblaPosId,
        ccbldPosId,

        ddblacPosId,
        ddblacPosId,

        ccnaPosId,
        ccnaPosId,
      ]
    );

    for (const balance of balances)
      expect(balance).to.be.bignumber.equal('50');
  });

  /////////////////////////////////////////////////////////////////////////////
  // Step 4: Combining Conditions                                            //
  /////////////////////////////////////////////////////////////////////////////
  let bobLikesAliceAndDidAskColId;
  let bobLikesAliceAndNoAskColId;
  let ccblaadaPosId;
  let ccblaanaPosId;
  step('combining conditions', async function() {
    // Insert code here

    expect(bobLikesAliceAndDidAskColId)
      .to.equal('0x28c8efb3346cbb60be52d92a8b7dff9382f66c7aeeb92db2279094c997bd9e79');
    expect(bobLikesAliceAndNoAskColId)
      .to.equal('0x418d518a2f686659ac874916c1189e09d870646c2cb6977dc981fa169115773a');

    expect(ccblaadaPosId)
      .to.equal('0xf4b115f61bc5502998fd0e2973c8e9e72a488e307eaa3581542ed5aebfb5ace7');
    expect(ccblaanaPosId)
      .to.equal('0x5825ba8d78e746327dd01aec19f1104c97b890a79d3f539a00a6c854145f991f');

    const balances = await conditionalTokens.balanceOfBatch(
      [alice, alice, alice],
      [
        ccblaPosId,
        ccblaadaPosId,
        ccblaanaPosId,
      ]
    );
  
    expect(balances[0]).to.be.bignumber.equal('20');
    expect(balances[1]).to.be.bignumber.equal('30');
    expect(balances[2]).to.be.bignumber.equal('30');
  });

  /////////////////////////////////////////////////////////////////////////////
  // Step 5: Resolving and Redeeming                                         //
  /////////////////////////////////////////////////////////////////////////////
  step('resolving and redeeming', async function() {
    // Insert code here

    const balances = await conditionalTokens.balanceOfBatch(
      [
        alice, alice, alice,
        alice,
        carol, dan
      ],
      [
        ccblaPosId,
        ccblcPosId,
        ccbldPosId,
        ddblacPosId,
        ccblaadaPosId,
        ccblaanaPosId,
      ]
    );

    for (const balance of balances)
      expect(balance).to.be.bignumber.equal('0');
    
    expect(await carolCoin.balanceOf(alice))
      .to.be.bignumber.equal('50');
    expect(await danDollar.balanceOf(alice))
      .to.be.bignumber.equal('50');
  });
});
