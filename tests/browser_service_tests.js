var expect = require('chai').expect;
var Studio = require('studio');
var browserServiceFactory = require('../src/browser_service_factory');

Studio(function sum(a,b){
	return a+b;
});
var browserServiceModule = Studio.module('browserServiceTest');

browserServiceModule(function dummy(a){
	return a;
});

describe('The service factory',function(){
	it('Must create services with the given prefix name',function(){
		browserServiceFactory('test',Studio)({id:'sum'});
		return Studio.module('test')('sum')(1,2).then(function(res){
			expect(res).to.equal(3);
		});
	});
	it('Must create services with the given prefix name on module',function(){
		browserServiceFactory('other',Studio)({id:'browserServiceTest/dummy'});
		return Studio.module('other')('browserServiceTest/dummy')(1).then(function(res){
			expect(res).to.equal(1);
		});
	});
	it('Must throw ROUTE_NOT_FOUND if service dont exists',function(){
		browserServiceFactory('test',Studio)({id:'absent'});
		return Studio.module('test')('absent')(1,2).then(function(){
			throw new Error('Must throws an error');
		}).catch(function(err){
			expect(err.name).to.equal('ROUTE_NOT_FOUND');
		});
	});
	it('Must throw ROUTE_NOT_FOUND if service dont exists on module',function(){
		browserServiceFactory('test',Studio)({id:'browserServiceTest/absent'});
		return Studio.module('test')('browserServiceTest/absent')(1,2).then(function(){
			throw new Error('Must throws an error');
		}).catch(function(err){
			expect(err.name).to.equal('ROUTE_NOT_FOUND');
		});
	});
});
