var expect = require('chai').expect;

var PageFactory = require('../../src/domain/page-factory');

describe('domain', function() {
    describe('page-factory', function() {
        it('creates new page', function() {
            var page = PageFactory.createPageModel('Title', 'Author', 'Body Content', 'abc123');

            expect(page).to.exist;
            expect(page.title).to.equal('Title');
            expect(page.author).to.equal('Author');
            expect(page.body).to.equal('Body Content');
            expect(page.parent_id).to.equal('abc123');
            expect(page.mtime).to.be.number;
            expect(page.mtime).to.equal(page.ctime);
        });
    });
})