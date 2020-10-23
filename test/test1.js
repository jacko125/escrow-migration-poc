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
    expect(await sender.receiver()).to.equal(receiver.address);
  });

  describe('when sending data', () => {
    let data;

    function simulateData() {
      const timestamps = [];
      const amounts = [];

      for (let i = 0; i < 52; i++) {
        timestamps.push(Math.floor(Date.now() / 1000) + i);
        amounts.push(Math.floor(5000 * Math.random()));
      }

      return {
        timestamps,
        amounts
      };
    }

    before('send data', async () => {
      const { timestamps, amounts } = simulateData();

      const tx = await sender.sendData(timestamps, amounts);
      await tx.wait();
    });

    it('should have sent data', async () => {
      // TODO
    });
  });
});
