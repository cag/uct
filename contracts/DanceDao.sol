pragma solidity ^0.5.1;

import { ConditionalTokens } from "@gnosis.pm/conditional-tokens-contracts/contracts/ConditionalTokens.sol";

contract DanceDao {
  mapping (address => address) public askedToDance;

  function asktoDance(address other) external {
    askedToDance[msg.sender] = other;
  }
}

contract DanceDaoOracle {
  DanceDao public danceDao;

  constructor(DanceDao _danceDao) public {
    danceDao = _danceDao;
  }

  function reportIfAskedToDanceDao(address asker, address asked, ConditionalTokens conditionalTokens) external {
  // provide implementation
  }
}
