export function promiseUnderlie( klass, opt= {}){
	const props= makeProperties( opt)
	Object.defineProperties( klass.prototype, props)
	_promiseClasses.push( klass)
	return klass
}
export default promiseUnderlie

export function makeFunctions( opt= {}){
	const
		underlying= opt.underlying|| "promise",
		catchName= "catch",
		finallyName= "finally",
		wrapper= {
			...(opt.then=== undefined&& {then: function( onFulfilled, onRejected){
				return this[ underlying].then( onFulfilled, onRejected)
			}}),
			...(opt.catch=== undefined&& {[ catchName]: function( onRejected){
				return this[ underlying].catch( onRejected)
			}}),
			...(opt.finally=== undefined&& {[ finallyName]: function( onFinally){
				return this[ underlying].finally( onFinally)
			}})
		}
	return wrapper
}

export function makeProperties( opt= {}){
	const props= makeFunctions( opt)
	for( let o in props){
		props[ o]= {
			value: props[ o],
			configurable: opt.configurable|| false,
			enumerable: opt.enumerable|| false,
			writable: opt.writable|| false,
		}
	}
	return props
}


const
	_promiseClasses=[ ],
	_promiseHasInstance= Promise[ Symbol.hasInstance]
export function hasInstance( instance){
	if( _promiseHasInstance.call( Promise, instance)){
		return true
	}
	for( let klass of _promiseClasses){
		if( Object[ Symbol.hasInstance].call( klass, instance)){
			return true
		}
	}
	return false
}
// monkeypatch Promise
Object.defineProperty( Promise, Symbol.hasInstance, {
	value: hasInstance
})
