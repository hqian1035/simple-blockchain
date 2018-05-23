
const Block = require('./block');

describe('Block', () => {
    let data, lastBlock, block;
    
    beforeEach(function() {
        data = 'bar';
        lastBlock = Block.genesis();
        block = Block.mineBlock(lastBlock, data);
    });
    
    it('sets the `data` to match the input', function() {
        expect(block.data).toEqual(data);
    });
    
    it('sets the `lastHash` to match the hash of the last block', function() {
        expect(block.lastHash).toEqual(lastBlock.hash);
    });
});
