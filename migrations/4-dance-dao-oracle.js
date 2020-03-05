module.exports = d => {
  d.deploy(
    artifacts.require('DanceDaoOracle'),
    artifacts.require('DanceDao').address
  );
};
