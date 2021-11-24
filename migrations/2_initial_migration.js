const WATP = artifacts.require("WATP");
const UniswapV2Factory = artifacts.require("UniswapV2Factory");
const UniswapV2Router02 = artifacts.require("UniswapV2Router02");
const Multicall = artifacts.require("Multicall");

const feeToSetter = 'atp1ay4d53qawvp64myjzgdstppxp4tn3fudwnn89j';

module.exports = async function (deployer) {

  await deployer.deploy(WATP);
  console.log('WATP at:', WATP.address);

  await deployer.deploy(UniswapV2Factory, feeToSetter);
  console.log('UniswapV2Factory at:', UniswapV2Factory.address);

  await deployer.deploy(Multicall);
  console.log('Multicall  at:', Multicall.address);

  var factory = new web3.platon.Contract(require("../build/contracts/UniswapV2Factory.json")['abi'], 'atp1qw4a25nq4cmuc7anw304tf0fkqarw0xluer2jr', { net_type: "atp" });
  var initHash = await factory.methods.INIT_CODE_PAIR_HASH().call();
  console.log("initHash is at:", initHash);

  // 需要先得到 initHash 修改 libraries/UniswapV2Library 59行，再进行部署
  await deployer.deploy(UniswapV2Router02, UniswapV2Factory.address, WATP.address);
  console.log('UniswapV2Router02 at:', UniswapV2Router02.address);
};