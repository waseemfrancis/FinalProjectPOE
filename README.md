# FinalProjectPOE
Final Project for Ethereum Developers course

Proof Of Existence Project: Waseem's Picture Vault

This system enables users to upload picture hashes (into a safety vault)
to an Ethereum network thereby proving ownership and existence.
A transaction takes place that stores the hash and owner's account
The user's existing "pictures" (hashes and datetime stamp) are displayed for viewing and refreshed after an upload.
If an uploaded picture hash is found to already exist on the network, it will be rejected. Ether will be returned to user.
Another feature is the verifying of picture (hash) ownership. The system will verify ownership when requested.

Ether is only required for the uploading of a new picture (hash). None of the other functions require ether.

Public functions:
submitPicture()
getPictureHashes()
getPictureDates()
verifyOwnership()
