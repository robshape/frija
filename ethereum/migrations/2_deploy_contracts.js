const Claimable = artifacts.require('Claimable');
const Election = artifacts.require('Election');
const ElectionAuthority = artifacts.require('ElectionAuthority');
const Ownable = artifacts.require('Ownable');

module.exports = (deployer) => {
  deployer.deploy(Ownable);
  deployer.deploy(Claimable);
  deployer.deploy(Election);
  deployer.deploy(ElectionAuthority);
};
