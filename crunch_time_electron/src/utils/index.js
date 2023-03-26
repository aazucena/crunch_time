export const randomInteger = (min, max) =>
	Math.floor(Math.random() * (max - min) + min);

/**
 * @references https://stackoverflow.com/a/32544026
 *
 */
export const combinations = (arr=[]) => {
	var data = Array(arr.length),
		results = []; // Array of results
	(function f(pos, start) {
		// Recursive function
		if (pos === arr.length) {
			// End reached
			results.push(data.slice()); // Add a copy of data to results
			return;
		}
		for (var i = start; i < arr.length; ++i) {
			data[pos] = arr[i]; // Update data
			f(pos + 1, i); // Call f recursively
		}
	})(0, 0);
	return results;
};
