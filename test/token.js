const { expect } = require("chai");
const { ethers } = require("hardhat");

const initial_supply = 100000;
const token_name = "token";
const token_symbol = "T";

describe(" tokens tests", function() {
    before(async function(){
        const available_signers = await ethers.getSigners();
        this.deployer = available_signers[0];

        const token = await ethers.getContractFactory("token");
        this.token = await token.deploy(token_name, token_symbol);
        await this.token.deployed();
    });

    it('should be named token', async function(){
        const fetched_token_name = await this.token.name();
        expect(fetched_token_name).to.be.equal(token_name);
    });

    it('should have symbol "T', async function(){
        const fetched_token_symbol = await this.token.symbol();
        expect(fetched_token_symbol).to.be.equal(token_symbol);
    });

    it('should have total_supply passed in during deploying', async function(){
        const [ fetched_total_supply, decimals] = await Promise.all([
            this.token.total_supply(),
            this.token.decimals(),
        ]);
        const expected_total_supply = ethers.BigNumber.from(initial_supply).mul(ethers.BigNumber.from(10).pow(decimals));
        expect(fetched_total_supply.eq(expected_total_supply)).to.be.true;
    });
})  