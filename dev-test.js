const Block = require('./blockchain/block')

const fooBlock = Block.mineBlock(Block.genesis(), 'foo-data')
console.log(fooBlock.toString())