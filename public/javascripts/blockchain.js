const Block = require("./block.js");

class BlockChain {
    constructor () {
        const genesisBlock = new Block.Block(0, "0", "0", "Starter Block", 0);
        this.blockArray = [genesisBlock];
        this.target = 3;
    }

    getLastBlock() {
        return this.blockArray[this.blockArray.length - 1];
    };

    isBlockChainValid(givenBlock) {
        return this.getLastBlock().getHash() === givenBlock.previousHash;
    }

    isHashTargetMet(hash){
        let hashArray = toArray(hash).slice(0, this.target);
        return hashArray.every(zeroCheck) && hashArray.length == this.target;
    }

    generateNextBlock(data, timestamp){
        const nextBlockIndex = this.getLastBlock().index + 1;
        const nextBlockTimeStamp = timestamp;
        const nextBlockPreviousHash = this.getLastBlock().getHash();
        const nextBlockData = data

        // Only Check 1 million records
        const nonceArray = [...Array(1000000).keys()]

        const nonce = nonceArray.map(nonce => Block
                          .createHashFromValues(nextBlockIndex, nextBlockTimeStamp, nextBlockPreviousHash, nextBlockData, nonce))
                          .findIndex(a => this.isHashTargetMet(a))
        //console.debug(nextBlockIndex, nextBlockTimeStamp, nextBlockPreviousHash, nextBlockData, nonce)
        return new Block.Block(nextBlockIndex, nextBlockTimeStamp, nextBlockPreviousHash, nextBlockData, nonce);
    }

    addBlockToChain(nextBlock){
        
        this.blockArray.push(nextBlock)
    }
}

function toArray(string) {
    const stringArray = string.split('')
    return string.split('')
};

function zeroCheck(element) {
    // checks whether an element is 0
    return element === "0";
};

module.exports = BlockChain;