module.exports = {

    projectName: "369 Arkives",
    networkId: 80001,
    network: "Polygon (MATIC)",
    mintCostCurrency: "MATIC",
    ownerAddress: "0xAcFC12843Ea5ABC36521B695cE2a405aA588faCb",
    tokens: [
        
        {
            tokenSymbol: "ARKS369",
            collectionName: "The Arkonauts",
            image: 'i0',
            extension: 'png',
            CID: "QmRMCJHbjNSm2dmXTNtsM6FTJmbPJ1kGzCps6hp2wuMFh4",
            isanim: false,
            idx:0,
            collectionURL: "https://testnets.opensea.io/collection/369-arkives",
            // mintCost: 0.0693,
            // totalSupply: 9963,
            control: null,
            mintCost: 1,
            totalSupply: 36,
            giftStep: 9,
            maxMint: 9,
            maxBalance: 13,
            address: "0x3892Eb11CC880C916e3d11A7A25e2F0FB2670Fe4",

        },
        {
            tokenSymbol: "LIDX369",
            collectionName: "Lost Index",
            image: 'i1',
            extension: 'mp4',
            CID: 'QmReWVt3WHCV6xvWN41Er49dTqZFxSoiFW8gaVRQv2rp67',
            isanim: true,
            idx: 1,
            collectionURL: "https://testnets.opensea.io/collection/lost-index",
            // mintCost:0.0936,
            // totalSupply: 936,
            control: null,
            mintCost:2,
            totalSupply: 16,
            giftStep: 3,
            maxMint: 6,
            maxBalance: 9,
            address: "0xa0d049b73B1AEA50d4631C24DA7bC5e37a18Eb7B",
        },
        {
            tokenSymbol: "LMEMO369",
            collectionName: "Lost Memories",
            image: 'i2',
            extension: 'mp4',
            CID: 'QmRFw68ir6UcQn8dJ6zjDgxqXSW2VvjnYwFYxiA3Pzc8Sr',
            isanim: true,
            idx: 2,
            collectionURL: "https://testnets.opensea.io/collection/lost-memories",
            // mintCost: 0.963,
            // totalSupply: 263,
            control: ['play', 'mute'],
            mintCost: 23,
            totalSupply: 13,
            giftStep: 3,
            maxMint: 3,
            maxBalance: 6,
            address: "0x29f41D9C2e4ff1eB8041a7296688DcB98fd551a1",
        }
    ]
}