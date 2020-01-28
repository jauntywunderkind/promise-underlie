import PromiseUnderlie from "../promise-underlie.js"

export class FixtureClass{
	constructor( value= 42){
		this.promise= Promise.resolve( value)
	}
}
PromiseUnderlie( FixtureClass)
export default FixtureClass
