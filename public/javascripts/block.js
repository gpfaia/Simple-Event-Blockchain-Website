const crypto = require('crypto');

class Block {
    constructor (index, timeStamp, previousHash, data, nonce) {
        this.index = index;
        this.timeStamp = timeStamp;
        this.previousHash = previousHash;
        this.data = data
        this.nonce = nonce
        this.hash = this.getHash()
    }

    getHash() {
        return createHashFromValues(this.index, this.timeStamp, this.previousHash, this.data, this.nonce);
    }
    
};

function createHashFromValues(index, timeStamp, previousHash, data, nonce) {
    const hashKey = (index + timeStamp + previousHash + data + nonce);
    const hash = crypto.createHash("sha256").update(hashKey).digest("hex");
    return hash;
}

module.exports = {Block, createHashFromValues};


