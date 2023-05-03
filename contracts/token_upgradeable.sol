// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";

import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";


contract token_upgradeable is
    ERC20Upgradeable,
    UUPSUpgradeable,
    OwnableUpgradeable {
        function start(uint256 initial_supply) public initializer{
            __ERC20_init("token", "t");

            __Ownable_init_unchained();
            __UUPSUpgradeable_init();

            _mint(msg.sender, initial_supply * (10**decimals()));
        }

        function _authorizeUpgrade(address new_implementatios)
            internal
            override
            onlyOwner{
                
            }
    }