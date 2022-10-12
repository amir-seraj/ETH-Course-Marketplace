const MarketplaceMigrations = artifacts.require("CourseMarketplace");

module.exports = function (deployer) {
  deployer.deploy(MarketplaceMigrations);
};
