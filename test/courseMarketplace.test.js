const CourseMarketplace = artifacts.require("CourseMarketplace");
const { catchRevert } = require("./utils/exceptions");

const getBalance = async (address) => web3.eth.getBalance(address);
const toBN = (value) => web3.utils.toBN(value);

const getGas = async (result) => {
  const tx = await web3.eth.getTransaction(result.tx);
  const gasUsed = toBN(result.receipt.gasUsed);
  const gasPrice = toBN(tx.gasPrice);
  const gas = gasUsed.mul(gasPrice);
  return gas;
};

contract("CourseMarketplace", (accounts) => {
  let _contract = null;
  let contractOwner = null;
  let buyer = null;
  let courseHash = null;

  const courseId = "0x00000000000000000000000000003130";
  const proof =
    "0x0000000000000000000000000000313000000000000000000000000000003130";
  const value = "900000000";

  const courseId2 = "0x00000000000000000000000000002130";
  const proof2 =
    "0x0000000000000000000000000000213000000000000000000000000000002130";

  before(async () => {
    _contract = await CourseMarketplace.deployed();
    contractOwner = accounts[0];
    buyer = accounts[1];

    console.log(_contract);
    console.log(contractOwner);
    console.log(buyer);
  });

  describe("Purchase the new course", () => {
    before(async () => {
      await _contract.purchaseCourse(courseId, proof, {
        from: buyer,
        value,
      });
    });

    it("should not allowed to repurchase already owned course", async () => {
      await catchRevert(
        _contract.purchaseCourse(courseId, proof, {
          from: buyer,
          value,
        })
      );
    });

    it("can get the purchased course hash by index", async () => {
      const index = 0;
      courseHash = await _contract.getCourseHashAtIndex(index);

      const expectedHash = web3.utils.soliditySha3(
        {
          type: "bytes16",
          value: courseId,
        },
        {
          type: "address",
          value: buyer,
        }
      );
      assert.equal(
        courseHash,
        expectedHash,
        "Course hash is not matching the purchased course!"
      );
    });
    it("should match the data of the course purchased by buyer", async () => {
      const expectedIndex = 0;
      const expectedState = 0;
      const course = await _contract.getCourseByHash(courseHash);

      assert.equal(course.id, expectedIndex, "course index should be 0!");
      assert.equal(course.price, value, `course price should be ${value}!`);
      assert.equal(course.proof, proof, `course index should be ${proof}!`);
      assert.equal(course.owner, buyer, `course buyer should be ${buyer}!`);
      assert.equal(
        course.state,
        expectedState,
        `course index should be ${expectedState}!`
      );
    });
  });

  describe("activate the purchased course", async () => {
    it("should not be able to activate course by nonowner", async () => {
      await catchRevert(_contract.activateCourse(courseHash, { from: buyer }));
    });

    it("should have 'activated' state", async () => {
      await _contract.activateCourse(courseHash, { from: contractOwner });
      const course = await _contract.getCourseByHash(courseHash);
      const expectedState = 1;

      assert.equal(
        course.state,
        expectedState,
        "course should have 'activated' state"
      );
    });

    describe("transfer ownership", async () => {
      let currentOwner = null;

      before(async () => {
        currentOwner = await _contract.getContractOwner();
      });

      it("getContractOwner should return deployer address ", async () => {
        assert.equal(
          contractOwner,
          currentOwner,
          "contract owner is not matching the returned one"
        );
      });
      it("should not transfer ownership when contract owner is not sending TX", async () => {
        await catchRevert(
          _contract.transferOwnership(accounts[3], { from: accounts[4] })
        );
      });
      it("should transfer ownership to 3rd address from 'accounts'", async () => {
        await _contract.transferOwnership(accounts[2], { from: currentOwner });
        const owner = await _contract.getContractOwner();
        assert.equal(
          owner,
          accounts[2],
          "contract owner is not the second account"
        );
      });
      it("should transfer ownership back to initial contract owner", async () => {
        await _contract.transferOwnership(contractOwner, { from: accounts[2] });
        const owner = await _contract.getContractOwner();
        assert.equal(owner, contractOwner, "contract owner is not set");
      });
    });
  });
  describe("Deactivate course", () => {
    let courseHash2 = null;
    let currentOwner = null;

    before(async () => {
      await _contract.purchaseCourse(courseId2, proof2, { from: buyer, value });
      courseHash2 = await _contract.getCourseHashAtIndex(1);
      currentOwner = await _contract.getContractOwner();
    });
    it("should not be able to deactivate the course by nonowner", async () => {
      await catchRevert(
        _contract.deactivateCourse(courseHash2, { from: buyer })
      );
    });

    it("should have a state of deactivated and price 0", async () => {
      await _contract.deactivateCourse(courseHash2, { from: contractOwner });

      const beforeTxBuyerBalance = await getBalance(buyer);
      const beforeTxContractBalance = await getBalance(_contract.address);
      const beforeTxOwnerBalance = await getBalance(currentOwner);

      const result = await _contract.deactivateCourse(courseHash2, {
        from: contractOwner,
      });

      const afterTxBuyerBalance = await getBalance(buyer);
      const afterTxContractBalance = await getBalance(_contract.address);
      const afterTxOwnerBalance = await getBalance(currentOwner);

      const course = await _contract.getCourseByHash(courseHash2);
      const expectedState = 2;
      const expectedPrice = 0;

      assert.equal(course.state, expectedState, "course is not deactivated");
      assert.equal(course.price, expectedPrice, "course price is not 0");

      assert.equal(
        toBN(beforeTxOwnerBalance).sub(gas).toString(),
        afterTxOwnerBalance,
        "Contract owner ballance is not correct"
      );

      assert.equal(
        toBN(beforeTxBuyerBalance).add(toBN(value)).toString(),
        afterTxBuyerBalance,
        "Buyer ballance is not correct"
      );

      assert.equal(
        toBN(beforeTxContractBalance).sub(toBN(value)).toString(),
        afterTxContractBalance,
        "Contract ballance is not correct"
      );
    });

    it("should not be able to activate the deactivated course", async () => {
      await catchRevert(
        _contract.activateCourse(courseHash2, { from: contractOwner })
      );
    });
  });
  describe("Repurchase course", () => {
    let courseHash2 = null;
    before(async () => {
      courseHash2 = await _contract.getCourseHashAtIndex(1);
    });
    it("should NOT repurchase when the course doesn't exist", async () => {
      const notExistingHash =
        "0x5ceb3f8075c3dbb5d490c8d1e6c950302ed065e1a9031750ad2c6513069e3fc3";
      await catchRevert(
        _contract.repurchaseCourse(notExistingHash, { from: buyer })
      );
    });
    it("should NOT repurchase with NOT course owner", async () => {
      const notOwnerAddress = accounts[2];
      await catchRevert(
        _contract.repurchaseCourse(courseHash2, { from: notOwnerAddress })
      );
    });

    it("should be able repurchase with the original buyer", async () => {
      const beforeTxBuyerBalance = await getBalance(buyer);
      const beforeTxContractBalance = await getBalance(_contract.address);

      const result = await _contract.repurchaseCourse(courseHash2, {
        from: buyer,
        value,
      });

      const afterTxBuyerBalance = await getBalance(buyer);
      const afterTxContractBalance = await getBalance(_contract.address);

      const course = await _contract.getCourseByHash(courseHash2);
      const expectedState = 0;

      const gas = await getGas(result);

      assert.equal(
        course.state,
        expectedState,
        "The course is not in purchased state"
      );
      assert.equal(
        course.price,
        value,
        `The course price is not equal to ${value}`
      );

      assert.equal(
        toBN(beforeTxBuyerBalance).sub(toBN(value)).sub(gas).toString(),
        afterTxBuyerBalance,
        "Client balance is not correct!"
      );

      assert.equal(
        toBN(beforeTxContractBalance).add(toBN(value)).toString(),
        afterTxContractBalance,
        "Contract balance is not correct!"
      );
    });

    it("should NOT be able to repurchase purchased course", async () => {
      await catchRevert(
        _contract.repurchaseCourse(courseHash2, { from: buyer })
      );
    });
  });
});

// Mocha - testing framework
// Chai - assertion JSlib
