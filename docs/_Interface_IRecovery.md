---
title: IRecovery
section: Interface
order: 6
---

  
## Interface Methods

### `approveExitRecovery`

Indicate approval to exit recovery mode. Can only be called by user with recovery role.




### `checkNotAdditionalProtectedVariable`

Check whether the supplied slot is a protected variable specific to this contract

*Note: No return value, but should throw if protected.*

**Parameters**

|Name|Type|Description|
|---|---|---|
|_slot|uint256|The storage slot number to check.


### `enterRecoveryMode`

Put colony network mining into recovery mode. Can only be called by user with recovery role.




### `exitRecoveryMode`

Exit recovery mode, can be called by anyone if enough whitelist approvals are given.




### `isInRecoveryMode`

Is colony network in recovery mode.



**Return Parameters**

|Name|Type|Description|
|---|---|---|
|inRecoveryMode|bool|Return true if recovery mode is active, false otherwise

### `numRecoveryRoles`

Return number of recovery roles.



**Return Parameters**

|Name|Type|Description|
|---|---|---|
|numRoles|uint64|Number of users with the recovery role.

### `removeRecoveryRole`

Remove colony recovery role. Can only be called by root role.


**Parameters**

|Name|Type|Description|
|---|---|---|
|_user|address|User we want to remove recovery role from


### `setRecoveryRole`

Set new colony recovery role. Can be called by root.


**Parameters**

|Name|Type|Description|
|---|---|---|
|_user|address|User we want to give a recovery role to


### `setStorageSlotRecovery`

Update value of arbitrary storage variable. Can only be called by user with recovery role.

*Note: certain critical variables are protected from editing in this function*

**Parameters**

|Name|Type|Description|
|---|---|---|
|_slot|uint256|Uint address of storage slot to be updated
|_value|bytes32|word of data to be set