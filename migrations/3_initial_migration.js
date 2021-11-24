const Uni = artifacts.require("Uni");

const feeToSetter = 'atp1ay4d53qawvp64myjzgdstppxp4tn3fudwnn89j';
const minter = 'atp1ay4d53qawvp64myjzgdstppxp4tn3fudwnn89j';

module.exports = async function (deployer) {
  var seconds = (new Date().getTime() / 1000).toFixed() + 600;
  await deployer.deploy(Uni, feeToSetter, minter, seconds);
  console.log('Uni at:', Uni.address);
};