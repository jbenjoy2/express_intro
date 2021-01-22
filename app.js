const express = require('express');
const ExpressError = require('./expressError');
const { mean, median, mode, convertToNums } = require('./calcs');

const app = express();

// make sure to check for a query string at all in each one!
app.get('/mean', (req, res, next) => {
	try {
		if (!req.query.nums) {
			throw new ExpressError('Nums are required.', 400);
		}
		let queryNums = req.query.nums.split(',');
		let nums = convertToNums(queryNums);
		if (nums instanceof Error) {
			throw new ExpressError(nums.message);
		}
		let results = {
			response : {
				operation : 'mean',
				value     : mean(nums)
			}
		};
		return res.send(results);
	} catch (error) {
		return next(error);
	}
});

app.get('/median', (req, res, next) => {
	try {
		if (!req.query.nums) {
			throw new ExpressError('Nums are required.', 400);
		}
		let queryNums = req.query.nums.split(',');
		let nums = convertToNums(queryNums);
		if (nums instanceof Error) {
			throw new ExpressError(nums.message);
		}
		let results = {
			response : {
				operation : 'median',
				value     : median(nums)
			}
		};
		return res.send(results);
	} catch (error) {
		return next(error);
	}
});

app.get('/mode', (req, res, next) => {
	try {
		if (!req.query.nums) {
			throw new ExpressError('Nums are required.', 400);
		}
		let queryNums = req.query.nums.split(',');
		let nums = convertToNums(queryNums);
		if (nums instanceof Error) {
			throw new ExpressError(nums.message);
		}
		let results = {
			response : {
				operation : 'mode',
				value     : mode(nums)
			}
		};
		return res.send(results);
	} catch (error) {
		return next(error);
	}
});

// further study
app.get('/all', (req, res, next) => {
	try {
		if (!req.query.nums) {
			throw new ExpressError('Nums are required.', 400);
		}
		let queryNums = req.query.nums.split(',');
		let nums = convertToNums(queryNums);
		if (nums instanceof Error) {
			throw new ExpressError(nums.message);
		}
		let results = {
			response : {
				operation : 'all',
				mean      : mean(nums),
				median    : median(nums),
				mode      : mode(nums)
			}
		};
		return res.send(results);
	} catch (error) {
		return next(error);
	}
});

app.use((req, res, next) => {
	const custom404 = new ExpressError('Not Found', 404);
	return next(custom404);
});

app.use((err, req, res, next) => {
	// the default status is 500 Internal Server Error
	let status = err.status || 500;
	let message = err.message;

	return res.status(status).json({
		error : { message, status }
	});
});

app.listen(3000, function() {
	console.log('Server started on port 3000');
});
