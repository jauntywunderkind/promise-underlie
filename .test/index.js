#!/usr/bin/env node
import tape from "tape"
import PromiseUnderlie from "../promise-underlie.js"
import Fixture42 from "./_fixture_42.js"

tape( "then", async function( t){
	t.plan( 1)
	const f42= new Fixture42()
	f42.then( function( value){
		t.equal( value, 42, "value=42")
		t.end()
	})
})

tape( "finally", async function( t){
	t.plan( 1)
	const f42= new Fixture42()
	f42.finally( function( value){
		t.ok( "finally")
		t.end()
	})
})

tape( "instanceof Promise", async function( t){
	t.plan( 1)
	const f42= new Fixture42()
	t.ok( f42 instanceof Promise, "promise")
	t.end()
})

tape( "instanceof Fixture42", async function( t){
	t.plan( 1)
	const f42= new Fixture42()
	t.ok( f42 instanceof Fixture42, "fixture")
	t.end()
})
