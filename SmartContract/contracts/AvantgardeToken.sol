// SPDX-License-Identifier: UnIdentified
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract AvantgardeToken is ERC20{
    constructor(string memory _name,string memory _ID,uint256 _totalSupply) ERC20(_name,_ID){
        _mint(msg.sender,_totalSupply*10**18);
    }

    function mintForAddress(address _toAddress, uint256 _noOfTokens) public{
        // Maximum mintable tokens at a time is 30 (to replicate a real scenario)
        require(_noOfTokens <= 30*10**18,"Maximum of 30 Tokens can be minted");
        _mint(_toAddress,_noOfTokens);
    }
}