# FinalProjectPOE
Final Project for Ethereum Developers course

Proof Of Existence Project: Waseem's Picture Vault

This system enables users to upload picture hashes into a "safety vault"
to an Ethereum network thereby proving ownership and existence.
A transaction takes place that stores the hash and owner's account
The user's existing "pictures" (hashes and datetime stamp) are displayed for viewing and refreshed after an upload.
If an uploaded picture hash is found to already exist on the network, it will be rejected. Ether will be returned to user.
Another feature is the verifying of picture (hash) ownership. The system will verify ownership when requested.

Ether is only required for the uploading of a new picture (hash). None of the other functions require ether.

For DateTimeStamp formatting it uses the DateTime.sol library.
This library was copied from https://github.com/pipermerriam/ethereum-datetime/blob/master/contracts/DateTime.sol

Note: The system is ready to be hooked up to IPFS. When doing so the line of code that converts the input to a hash must be removed.

Public functions:
================

submitPicture()
getPictureHashes()
getPictureDates()
verifyOwnership()

Set up instructions:
====================

Start Ganache on local machine

Install and run MetaMask in browser 

Use Ganache mnemonic as import seed into MetaMask to access ethereum accounts

Connect MetaMask to local RPC: http://127.0.0.1:7545 or use port 8545 if that's your ganache port.

Edit the localhost port in truffle.js in project folder to be in line with the above port, either 7545 or 8545. 

Start new terminal and go to project folder

Enter "truffle migrate --reset" to compile and migrate your contract to the Ganache local network

Enter "npm run dev" to start lite-server and render web app in browser

It runs on: localhost:3000

