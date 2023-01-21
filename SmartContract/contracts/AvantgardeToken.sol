// SPDX-License-Identifier: UnIdentified
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract AvantgardeToken is ERC20{
    constructor(string memory _name,string memory _ID,uint256 _totalSupply) ERC20(_name,_ID){
        _mint(msg.sender,_totalSupply*10**18);
    }
}