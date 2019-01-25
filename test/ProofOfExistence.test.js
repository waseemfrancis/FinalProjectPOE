/*
This test file has been updated for Truffle version 5.0. If your tests are failing, make sure that you are
using Truffle version 5.0. You can check this by running "trufffle version"  in the terminal. If version 5 is not
installed, you can uninstall the existing version with `npm uninstall -g truffle` and install the latest version (5.0)
with `npm install -g truffle`.
*/

var ProofOfExistence = artifacts.require("./ProofOfExistence.sol");

contract('ProofOfExistence', function(accounts) {

  const owner 	= accounts[0];
  const alice 	= accounts[1];
  const bob 	= accounts[2];
  const charlie = accounts[3];

/*

These tests will create the following picture data in the pictures array containing struct Picture
owner 	will create 	OwnerPic1
alice 	will create	AlicePic1
bob 	will create	HashTest
charlie will create	MickeyMousePic

*/
 

  it("count of pics uploaded", async () => {
    const poe = await ProofOfExistence.deployed();

    await poe.submitPicture("OwnerPic1", "ownerpic1.jpg", {from: owner});
    await poe.submitPicture("AlicePic1", "alicepic1.jpg", {from: alice});

    const pictureCount = await poe.pictureCount();
    assert.equal(pictureCount, 2, 'picture count is correct');

    
  });

  it("picture hash can only be stored once, even for same owner", async () => {
    const poe = await ProofOfExistence.deployed();

    // have to use a try-catch 'cos the expected result is a revert(), which throws an exception.
    try{
      await poe.submitPicture("AlicePic1", "alicepic1.jpg", {from: alice});
    }
    catch(e){
      const pictureCount = await poe.pictureCount();
      assert.equal(pictureCount, 2, 'picture count is still 2, which is correct');
    }
    //const pictureCount = await poe.pictureCount();
    
  });

  it("picture hash can only be stored once, even if different file name", async () => {
    const poe = await ProofOfExistence.deployed();

    // same file upload, different file name...

    // have to use a try-catch 'cos the expected result is a revert(), which throws an exception.
    try{
      await poe.submitPicture("AlicePic1", "differentname.jpg", {from: alice});
    }
    catch(e){
      const pictureCount = await poe.pictureCount();
      assert.equal(pictureCount, 2, 'picture count is still 2, which is correct');
    }

    

  });

  

   it("is the hashing working correctly", async () => {
    const poe = await ProofOfExistence.deployed();

    await poe.submitPicture("HashTest", "HashTest.jpg", {from: bob});

    const picture = await poe.pictures(2);
    assert.equal(picture[0], '0xb6435528803fe7f9ff6da69ced3d10b35e0815b9ec56a7e9fc6ca652d34aca8b', 'hash done correctly');
    assert.equal(picture[1], 'HashTest.jpg', 'owner correctly assigned');

    
  });

  it("owners correctly stored", async () => {
    const poe = await ProofOfExistence.deployed();

    const picture = await poe.pictures(2); //bob's picture of previous test above.
    // in position 2 in picture struct is where the owner is stored.	
    assert.equal(picture[2], bob, 'account of owner correctly stored');

  });

  it("owners correctly assigned to owners array", async () => {
    const poe = await ProofOfExistence.deployed();

    await poe.submitPicture("MickeyMousePic", "MickeyMouse.jpg", {from: charlie});

    const owner = await poe.owners(3); //checking address in owners array at position 3, should be charlie's.
    assert.equal(owner, charlie, 'account of owner correctly stored');

  });

  it("does ownership verification work correctly", async () => {
    const poe = await ProofOfExistence.deployed();

    const verifiedOwner = await poe.verifyOwnership(alice, "AlicePic1", {from: charlie});
    assert.equal(verifiedOwner, 1, 'account of owner correctly stored');

  });


  
});
