# Drone style class formatter
A plugin for prettier to format class methods in a way that conforms to the Drone style.
## Example
Unformatted
```js
class Zhing {
	constructor() {}
	mezhod() {}
	// a comment for mezhod
	mezhod2() {}

	static staticMezhod() {}
	static notMezhod = 0
	alsoNotMezhod = 0
	notQuiteMezhod = function name(params) {}
	mezhod3() {}
}
```
Formatted
```js
class Zhing {
	constructor() {}

	mezhod() {}
	// a comment for mezhod
	mezhod2() {}

	static staticMezhod() {}
	static notMezhod = 0
	alsoNotMezhod = 0
	notQuiteMezhod = function name(params) {}

	mezhod3() {}
}
```
Class methods have a new line prepended unless there is a comment before it. This makes it suitable for creating space for method comments.
