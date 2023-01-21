const {ethers} = require("hardhat")

async function main(){

    // Creating an instance of the smart contract
    const avantGardeTokenFactory = await ethers.getContractFactory("AvantgardeToken");

    //Deploying smart contract with args as AvantGarde,AG and total of 30 coins
    const deployedAvantGardeToken = await avantGardeTokenFactory.deploy("Avantgarde","AG",30);

    //Waiting for deployement
    await deployedAvantGardeToken.deployed();


    // Printing the addres of the token
    console.log("Contract address:",deployedAvantGardeToken.address);

}


main()
    .then(()=> process.exit(0))
    .catch(err=>{
        console.log(err)
        process.exit(1)
    })


//Smart Contract address : 0x6F555B64e6BbFE9a3Ed490817D8aA3443B1eD45f