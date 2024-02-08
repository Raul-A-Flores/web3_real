const { expect } = require('chai');
const { ethers } = require('hardhat');

const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe('Escrow', () => {

    let buyer, seller, inspector, lender
    let realEstate, escrow 

    it('saves the addresses', async() =>{


        // Set up accounts 
        [buyer, seller, inspector, lender] = await ethers.getSigners()

        /*const signers  = await ethers.getSigners()
        const buyer = signers[0]
        const seller = signers[1]
         */


        // console.log(signers)
        
        //Deploy
        const RealEstate = await ethers.getContractFactory('RealEstate')
        realEstate = await RealEstate.deploy()

        //console.log(realEstate.address)

        // Mint 
        let transaction = await realEstate.connect(seller).mint("https://ipfs.io/ipfs/QmQJc3tWrenPYqqHHWFVTTNxBww3Zagyr2udhPGCYn6mze")
        await transaction.wait()

        const Escrow = await ethers.getContractFactory('Escrow')
        escrow = await Escrow.deploy(
            realEstate.address, 
            seller.address, 
            inspector.address, 
            lender.address
        )

        let result = await escrow.nftAddress()
        expect(result).to.be.equal(realEstate.address)

        result = await escrow.seller()
        expect(result).to.be.equal(seller.address)

    })
})
