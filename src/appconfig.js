module.exports = {

    projectName: "369 Arkives",
    networkId: 4,//80001,
    network: "Ethereum",
    mintCostCurrency: "Eth",
    ownerAddress: "0xAcFC12843Ea5ABC36521B695cE2a405aA588faCb",
    tokens: [
        
        
        {
            tokenSymbol: "LIDX369",
            collectionName: "Lost Index",
            image: 'i1',
            extension: 'mp4',
            CID: 'QmQsKUkLukaB6d4C3RUEJns6o63E1svwHJXzHnajFr7UWX',
            isanim: true,
            idx: 0,
            collectionURL: "https://testnets.opensea.io/collection/lost-index",
            // mintCost:0.0936,
            // totalSupply: 936,
            control: null,
            mintCost:0.0169,
            totalSupply: 963,
            giftStep: 10,
            maxMint: 6,
            maxBalance: 6,
            address: "0x10967222D990CD897fd34E0455FaCc2E19dCF158",
        },
        {
            tokenSymbol: "ARKS369",
            collectionName: "The Arkonauts",
            image: 'i0',
            extension: 'png',
            CID: "QmRMCJHbjNSm2dmXTNtsM6FTJmbPJ1kGzCps6hp2wuMFh4",
            isanim: false,
            idx:1,
            collectionURL: "https://testnets.opensea.io/collection/369-arkives",
            // mintCost: 0.0693,
            // totalSupply: 9963,
            control: null,
            mintCost: 0.0269,
            totalSupply: 9963,
            giftStep: 100,
            maxMint: 6,
            maxBalance: 12,
            address: "0x0292Da50f1dAa1b91345C67Ec733269E4b7358Bb",

        },
        {
            tokenSymbol: "LMEMO369",
            collectionName: "Lost Memories",
            image: 'i2',
            extension: 'mp4',
            CID: 'QmStzPQS7bah48J4hej889SnaKkFUf9ujUepWtwhfCrCpy',
            isanim: true,
            idx: 2,
            collectionURL: "https://testnets.opensea.io/collection/lost-memories",
            // mintCost: 0.963,
            // totalSupply: 263,
            control: ['play', 'mute'],
            mintCost: 0.936,
            totalSupply: 263,
            giftStep: 3,
            maxMint: 3,
            maxBalance: 6,
            address: "0xf287124f23d9781006F3b8986D87C80dAC63379C",
        }
    ]
}