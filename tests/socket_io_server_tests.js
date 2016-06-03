var expect = require('chai').expect;
var Studio = require('studio');
var io = require('socket.io-client');

describe('The server',function(){
	it('Must accept messages for existent services',function(done){
		var socket = io('http://localhost:3002');
		var data = JSON.stringify({
			service:'multiply',
			params:[2,3]
		});
		socket.emit('call',data,function(result){
			var a = expect(result.error).to.not.exist;
			expect(result.response).to.equal(2*3);
			done();
		});
	});
	it('Must reject messages for inexistent services',function(done){
		var socket = io('http://localhost:3002');
		var data = JSON.stringify({
			service:'multiply2',
			params:[2,3]
		});
		socket.emit('call',data,function(result){
			var a = expect(result.response).to.not.exist;
			expect(result.error.name).to.equal('ROUTE_NOT_FOUND');
			done();
		});
	});
});
