function get(obj, property) {
	const splitProperty = property.split('.');
	let i = 0;
	let returnValue = obj;

	while(i < splitProperty.length) {
		returnValue = returnValue[splitProperty[i]];
		i++;
	}

	return returnValue;
}

function spy(fnc, track) {
	const ctx = this;
	return (...args) => {
		const res = fnc.apply(ctx, args);

		console.log(`FNC_NAME: ${fnc.name}`);
		console.log('ARGS: ');
		console.log(args);
		console.log('RESULT:');
		console.log(res);

		for (let i = 0; i < track.length; i++) {
			if (!(ctx[track[i]] instanceof Function)) {
				console.log(track[i]);
				console.log(get(ctx, track[i]));
			}
		}

		return res;
	};
}
  
export const ClassLogger = (cls) => class extends cls {
	constructor(...args) {    
		super(...args);

		return (track) => {
			for(let i = 0; i < track.length; i++) {
				if (this[track[i]] instanceof Function) {
					this[track[i]] = spy.call(this, this[track[i]], track);
				}
			}
        
			return this;
		};
	}
};
