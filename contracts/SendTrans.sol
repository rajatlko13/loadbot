// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.4.22 <0.9.0;

contract SendTrans {
    
    function trans(address payable recipient) public payable {
        recipient.transfer(msg.value);
    }
    
    function checkBal(address recipient) public view returns(uint256) {
        return recipient.balance;
    }
    
}