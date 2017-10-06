var request = require('supertest');
describe('loading express', function () {
    var server;
        beforeEach(function () {
        server = require('../app');
    });

    afterEach(function () {
        server.close();
    });

    it('responds to get all featured instagram post', function testSlash(done) {
        request(server)
            .get('/api/post?page=1&sort=ASC&key=id&featured=true')
            .expect(200, done);
    });
});