Design Pattern Decisions:
========================

Curcuit Breaker (Emergency Stop):

This contract inherits from standard zeppelin Pausable and Ownable contracts. Only the owner of the contract can pause the contract and restrict any further state mutation.

Upgradability:

Not catered for.


Restricting Access:

Only required functions are made public, all others are internal.
 

Upfront Validation / Gaurd Check Pattern:

The design of the contract is to check all inputs at the beginning of each public function with a modifier, or require() and revert().
Only proceed with contract function logic when conditions are as expected. Saving user gas on erroneous submissions.
Checks are made for empty input strings.

Immortal:

With the emergency stop and upgradability, there is no particular reason why this contracts has to expire at a certain moment in time. Therefore the mortality design pattern is not applied.

Push vs Pull Payments:

No payment transactions or ether transfers are made in this contract and therefore this does not apply.

State Machine:

This contract has the same state throughout it's life. No state changes. 

Memory Array Building (Optimizing Gas):

This contract uses the lookup of picture hashes to refresh the UI quite alot. At start up and each time an upload happens.
Building into and retrieving lists from storage uses alot of gas.
For this reason each time this is needed the contract uses a view function to build arrays in memory, which gets returned to the UI.
