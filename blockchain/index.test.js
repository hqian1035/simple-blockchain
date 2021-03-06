
const Blockchain = require('./index');
const Block = require('./block');

describe('Blockchain', function() {
    let bc, bc2;
    
    beforeEach(function() {
        bc = new Blockchain();
        bc2 = new Blockchain();
    });
    
    it('start with genesis block', function() {
        expect(bc.chain[0]).toEqual(Block.genesis());
    });
    
    it('add a new block', function() {
        const data = 'foo';
        bc.addBlock(data);
        
        expect(bc.chain[bc.chain.length - 1].data).toEqual(data);
    });
    
    it('validates a valid chain', function() {
        bc2.addBlock('foo');
        
        expect(bc.isValidChain(bc2.chain)).toBe(true);
    });
    
    it('invalidates a chain with a corrupt genesis block', function() {
        bc2.chain[0].data = 'Bad data';
        
        expect(bc.isValidChain(bc2.chain)).toBe(false);
    });
    
    it('invalidates a corrupt chain', function() {
        bc2.addBlock('foo');
        bc2.chain[1].data = 'Not foo';
        
        expect(bc.isValidChain(bc2.chain)).toBe(false);
    });
    
    it('replaces the chain with a valid chain', function() {
        bc2.addBlock('goo');
        bc.replaceChain(bc2.chain);
        
        expect(bc.chain).toEqual(bc2.chain);
    });
    
    it('does not replace the chain with one of less than or equal to length', function() {
        bc.addBlock('foo');
        bc.replaceChain(bc2.chain);
        
        expect(bc.chain).not.toEqual(bc2.chain);
    });
});
