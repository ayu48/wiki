
var expect = require('chai').expect;

var UserFactory = require('../../src/domain/user-factory');

describe('domain', function () {

    describe('user-factory', function () {

        it('creates user from google profile', function () {
            var user = UserFactory.createUserModelFromGoogleProfile({_json: '{"dummy":"data"}'})

            expect(user).to.exist;
            expect(user.provider).to.equal('google');
            expect(user.google).to.equal('{"dummy":"data"}');
        });
    });

});
