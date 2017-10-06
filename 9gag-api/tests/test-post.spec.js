var request = require('supertest');
describe('loading express', function () {
    var server;
        beforeEach(function () {
        server = require('../app');
    });

    afterEach(function () {
        server.close();
    });

    it('responds to get all instagram post', function testSlash(done) {
        request(server)
            .get('/api/post')
            .expect(200, done);
    });

    it('responds to get all instagram post sorted', function testSlash(done) {
        request(server)
            .get('/api/post?page=1&sort=ASC&key=createdTime')
            .expect(200, done);
    });

    it('404 everything else', function testPath(done) {
        request(server)
            .get('/foo/bar')
            .expect(404, done);
    });
});