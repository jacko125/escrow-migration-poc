const { expect } = require('chai');
const ethers = require('ethers');
const bre = require('@nomiclabs/buidler');

describe('Test', function() {
  let test;

  before('deploy Test contract', async () => {
    const Test = await bre.ethers.getContractFactory('Test');
    test = await Test.deploy();
  });

  describe('when registering the data to be sent', () => {
    let timestamps;
    let amounts;

    function simulateData() {
      timestamps = [];
      amounts = [];

      for (let i = 0; i < 52; i++) {
        timestamps.push(Math.floor(Date.now() / 1000) + i);
        amounts.push(Math.floor(5000 * Math.random()));
      }
    }

    before('simulate and register data', async () => {
      simulateData();

      const tx = await test.setData(timestamps, amounts);
      await tx.wait();
    });

    it('should have registered timestamps', async () => {
      const retrievedTimestamps = await test.getTimestamps();

      for (let i = 0; i < timestamps.length; i++) {
        const timestamp = timestamps[i];
        const retrievedTimestamp = retrievedTimestamps[i];

        expect(timestamp).to.equal(retrievedTimestamp);
      }
    });

    it('should have registered amounts', async () => {
      const retrievedAmounts = await test.getAmounts();

      for (let i = 0; i < amounts.length; i++) {
        const amount = amounts[i];
        const retrievedAmount = retrievedAmounts[i];

        expect(amount).to.equal(retrievedAmount);
      }
    });

    describe('when packing the data', () => {
      let packedData;

      before('pack the data', async () => {
        const tx = await test.packData();
        await tx.wait();
      });

      it('packed the data', async () => {
        packedData = await test.getPackedData();
        console.log(packedData);

        const expectedBytes =
          52 * 32 + // timestamps, 52 * 32 bytes
          52 * 32   // amounts, 52 * 32 bytes

        const expectedLength =
          2 +               // 0x
          2 * expectedBytes // 1 byte = 2 chars

        expect(packedData.length).to.equal(expectedLength);
      });
    });
  });
});
