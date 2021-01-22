const { mean, median, mode } = require('./calcs');
// mean function
describe('find mean', function() {
	test('find mean of empty array', function() {
		expect(mean([])).toEqual(0);
	});
	test('find mean of array of numbers', function() {
		expect(mean([ 1, 5, 3, 6, 3 ])).toEqual(3.6);
	});
});
// median function
describe('find median', function() {
	test('find median of array with odd number of elements', function() {
		expect(median([ 3, 1, 2 ])).toEqual(2);
	});
	test('find median of array with even number of elements', function() {
		expect(median([ 3, 1, 2, 5, 10, 7 ])).toEqual(4);
	});
});
// mode function
describe('find mode', function() {
	test('find mode in array with no mode', function() {
		expect(mode([ 1, 2, 3, 4, 5 ])).toEqual('no mode');
	});
	test('find mode in array with one mode', function() {
		expect(mode([ 1, 2, 2, 3, 4 ])).toEqual(2);
	});
	test('find mode in bimodal dataset', function() {
		expect(mode([ 1, 2, 2, 3, 3, 4 ])).toEqual('bimodal: [2,3]');
	});
	test('declare multimodal dataset', function() {
		expect(mode([ 1, 1, 2, 2, 3, 3, 4, 5 ])).toEqual('multimodal');
	});
});
