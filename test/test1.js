const { expect } = require('chai');
const ethers = require('ethers');
const bre = require('@nomiclabs/buidler');

describe('Test 1', function() {
  let sender, receiver;

  before('deploy sender', async () => {
    const Sender = await bre.ethers.getContractFactory('Sender');
    sender = await Sender.deploy();
  });

  before('deploy receiver', async () => {
    const Receiver = await bre.ethers.getContractFactory('Receiver');
    receiver = await Receiver.deploy();
  });

  before('connect sender and receiver', async () => {
    await sender.setReceiver(receiver.address);
  });

  it('should have connected the contracts', async function() {
    expect(await sender.getReceiver()).to.equal(receiver.address);
  });

  describe('when registering data to be sent', () => {
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

      const tx1 = await sender.setTimestamps(timestamps);
      await tx1.wait();

      const tx2 = await sender.setAmounts(amounts);
      await tx2.wait();
    });

    it('sender should have registered timestamps', async () => {
      const retrievedTimestamps = await sender.getTimestamps();

      for (let i = 0; i < timestamps.length; i++) {
        const timestamp = timestamps[i];
        const retrievedTimestamp = retrievedTimestamps[i];

        expect(timestamp).to.equal(retrievedTimestamp);
      }
    });

    it('sender should have registered amounts', async () => {
      const retrievedAmounts = await sender.getAmounts();

      for (let i = 0; i < amounts.length; i++) {
        const amount = amounts[i];
        const retrievedAmount = retrievedAmounts[i];

        expect(amount).to.equal(retrievedAmount);
      }
    });

    describe('when packing the data', () => {
      before('pack the data', async () => {
        const tx = await sender.packData();
        await tx.wait();
      });

      it('packed the data', async () => {
        const packedData = await sender.getPackedData();

        const expectedBytes =
          4 +       // function selector, 4 bytes
          32 +      // msg.sender, 32 bytes
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
