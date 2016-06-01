var expect = require('chai').expect;
var Studio = require('studio');
var io = require('socket.io-client');
var socket = io('http://localhost:3000');
describe('The plugin',function(){
	it('Must accept messages for existent services with noargs',function(done){
		var data = JSON.stringify({
			service:'noargs',
			params:[]
		});
		socket.emit('__studio_service_call',data,function(result){
			expect(result.error).to.not.exist;
			expect(result.response).to.equal('noargs');
			done();
		});
	});
	it('Must accept messages for existent services with one arg',function(done){
		var data = JSON.stringify({
			service:'echo',
			params:[1]
		});
		socket.emit('__studio_service_call',data,function(result){
			expect(result.error).to.not.exist;
			expect(result.response).to.equal(1);
			done();
		});
	});
	it('Must accept messages for existent services with two args',function(done){
		var data = JSON.stringify({
			service:'concat',
			params:['a','b']
		});
		socket.emit('__studio_service_call',data,function(result){
			expect(result.error).to.not.exist;
			expect(result.response).to.equal('ab');
			done();
		});
	});
	it('Must support thrown errors',function(done){
		var data = JSON.stringify({
			service:'withError',
			params:[]
		});
		socket.emit('__studio_service_call',data,function(result){
			expect(result.response).to.not.exist;
			expect(result.error.message).to.equal('unexpected');
			done();
		});
	});
	it('Must throw error if route isnt public',function(done){
		var data = JSON.stringify({
			service:'concatPrivate',
			params:['a','b']
		});
		socket.emit('__studio_service_call',data,function(result){
			expect(result.response).to.not.exist;
			expect(result.error.name).to.equal('ROUTE_NOT_FOUND');
			done();
		});
	});
});
