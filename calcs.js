// this file holds all the necessary math logic for the routes

// mean- average (sum of all numbers, divided by length)
// median- midpoint (average of middle two numbers if even quantity of numbers, or center point otherwise)
// mode- most frequent number

// must also make sure to convert all numbers to strings
// all calculations will operate on numbers only, not on strings, in iterable format (Array or object)

// mean
function mean(arr) {
	if (arr.length === 0) return 0;
	let sum = arr.reduce((acc, curr_val) => {
		return acc + curr_val;
	});
	return sum / arr.length;
}

// mode
// need to track the frequency of every single item in the query string so long as it's in the numbers array; can do this with object of syntax {array_value:frequency}
function getFrequency(arr) {
	return arr.reduce((obj, next_val) => {
		// set value of key"next val" to either the value that's there +1, or 1
		obj[next_val] = (obj[next_val] || 0) + 1;
		return obj;
		// start obj as empty object, so next_val will start at the first array index
	}, {});
}

// once the frequency is tracked, we can iterate over it to determine what the most frequent one is and what the frequency of it is. Will also keep track of any ties
function mode(arr) {
	let freqObj = getFrequency(arr);
	// track most frequent item and its frequency
	let freqCount = 0;
	let winner = [];

	for (let num in freqObj) {
		// compare value at num to to the count and either update with new freq/val, or go to the next
		if (freqObj[num] > freqCount) {
			freqCount = freqObj[num];
			winner = [];
			winner.push(num);
		} else if (freqObj[num] === freqCount) {
			winner.push(num);
		}
	}

	// one winner
	if (winner.length === 1) {
		return +winner[0];
	} else if (winner.length === 2) {
		winnerNums = winner.map((num) => +num);
		return `bimodal: [${winnerNums}]`; // for two-way ties
	} else return 'No absolute mode';
}

// median
// need to first sort the nums array, then can determine what centerpoint is
function median(arr) {
	// sort array in ascending order
	arr.sort((a, b) => a - b); // using comparison function

	// find 'midpoint' index and round down since length is one more than final index
	let midptIdx = Math.floor(arr.length / 2);
	let median;

	// median depends on whether there is even or odd number of elements...deal with that accordingly using the mod operator

	if (arr.length % 2 === 0) {
		median = (arr[midptIdx] + arr[midptIdx - 1]) / 2; // even number of elements = avg of two middle indices
	} else {
		median = arr[midptIdx]; //odd number of elements, median is at middle index
	}
	return median;
}

// extra helper function, not a calc function but will help to convert query params list into nums
function convertToNums(arr) {
	let numsArr = [];

	// iterate over arr and try to convert to num. if result is NaN, throw an error
	for (let i = 0; i < arr.length; i++) {
		let num = Number(arr[i]);
		if (Number.isNaN(num)) {
			return new Error(`'${arr[i]}' is not a valid number`);
		}
		numsArr.push(num);
	}
	return numsArr;
}

module.exports = { getFrequency, mode, mean, median, convertToNums };
