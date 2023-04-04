export const randomInteger = (min, max) =>
	Math.floor(Math.random() * (max - min) + min);

/**
 * @references https://stackoverflow.com/a/32544026
 *
 */
export const combinations = (arr=[], offset=0) => {
	var length = arr.length + offset
	var data = Array(length),
		results = []; // Array of results
	(function f(pos, start) {
		// Recursive function
		if (pos === length) {
			// End reached
			results.push(data.slice()); // Add a copy of data to results
			return;
		}
		for (var i = start; i < length; ++i) {
			let temp = i % arr.length
			data[pos] = arr[temp]; // Update data
			f(pos + 1, temp); // Call f recursively
		}
	})(0, 0);
	return results;
};
