import IterPrototype from "iter-prototype/iter-prototype.js"

export function promiseUnderlie( klass, opt){
	const props= makeProperties( opt)
	Object.defineProperties( klass, props)
	const hasInstance= makeHasInstance( klass, ...(opt.instances||[ ]))
	Object.defineProperty( klass, Symbol.hasInstance,{
		value: hasInstance
	})
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
	for( let o of props){
		props[ o]= {
			value: props[ o],
			configurable: opt.configurable|| false,
			enumerable: opt.enumerable|| false,
			writable: opt.writable|| false,
		}
	}
	return fns
}

export function makeHasInstance( ...klasses){
	return function hasInstance( instance){
		for( let proto of IterPrototype( instance)){
			if( klasses.indexOf( proto)!== -1){
				return true
			}
		}
		return false
	}
}
