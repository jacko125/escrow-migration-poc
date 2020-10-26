const path = require('path');

usePlugin("@nomiclabs/buidler-waffle");
require('@eth-optimism/ovm-toolchain/build/src/buidler-plugins/buidler-ovm-compiler'); // enable custom solc compiler
require('@eth-optimism/ovm-toolchain/build/src/buidler-plugins/buidler-ovm-node'); // add ability to start an OVM node

task('test')
	.addFlag('ovm', 'Run tests on the OVM using a custom OVM provider')
	.setAction(async (taskArguments, bre, runSuper) => {
		const { ovm } = taskArguments;

		if (ovm) {
			bre.ovm = true;

			console.log('Compiling and running tests in the OVM...');
			bre.config.solc = {
        path: path.resolve(__dirname, 'node_modules', '@eth-optimism', 'solc'),
        optimizer: {
          enabled: true,
          runs: 1
        }
			};
			await bre.config.startOvmNode();
			bre.config.mocha.timeout = 10000000;
    }

		await runSuper(taskArguments);
	});

module.exports = {
  networks: {
		buidlerevm: {
      blockGasLimit: 100000000,
    },
  },
  solc: {
    version: "0.5.16",
  },
};
