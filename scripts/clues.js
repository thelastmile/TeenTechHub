// set the size of the bg, so I don't go beyond the 
// left/right edges
var bcgSize = 1284;


// clues array contains object indicating where clues
// are located and what information they contain
var clues = [
	{ 
		image: '<img class="bcg" src="../images/game1.jpg" />',
		top: 110,
		problem: 'Declare a variable named <i>myVar</i> and assign it the value <i>my first variable</i>',
		solution: 'varmyVar=\"myfirstvariable\"',
		move: [
			{ x: 0, width: bcgSize, y: 110, height: 0, movement: 'run' }
		],
		clues: [
			{ id: 'clue1', left: -160, top: null, clue: "Have you ever heard of variables? Well, variables are like buckets, except you fill them with information, not water." },
			{ id: 'clue2', left: -424, top: null, clue: "Creation of a variable is called declaring a variable. And giving it information is called assigning a value." },
			{ id: 'clue3', left: -722, top: null, clue: "To declare a variable, type:<br><br>var anyNameIChoose;" },		
			{ id: 'clue4', left: -1228, top: null, clue: "To assign a string value to a variable, type:<br><br>var myBucket = 'some value';" }
		]
	},  
	{
		image: '<img class="bcg" src="../images/game2.jpg" />',
		top: 110,
		problem: "Declare a variable named <i>num</i> and assign it the value <i>12</i>",
		solution: 'varnum=12',
		move: [
			{ x: 0, width: bcgSize, y: 110, height: 0, movement: 'run' },
			{ x: -312, width: 8, y: 110, height: 40, movement: 'run' }, 
			{ x: 0, width: bcgSize, y: 128, height: 150, movement: 'swim'}
		],
		clues: [
			{ id: 'clue1', left: -464, top: 110, clue: "Variables can hold many different types of information. Including objects, strings, numbers, and arrays." },
			{ id: 'clue2', left: -550, top: 169, clue: "A string is simply a piece of text inside quotes:<br><br>var str = 'a string';" },
			{ id: 'clue3', left: -752, top: 110, clue: "A number is simply a number without quotes:<br><br>var num = 40;" },		
			{ id: 'clue4', left: -1094, top: 110, clue: "Objects and arrays are bit more difficult to understand, so we'll get into it later." }
		]
	},
		{
		image: '<img class="bcg" src="../images/game3.jpg" />',
		top: 142,
		problem: "Declare a variable named <i>num</i> and assign it the value <i>12</i>",
		solution: 'varnum=12',
		move: [
			{ x: 0, width: bcgSize, y: 142, height: 0, movement: 'run' },
			{ x: -186, width: 24, y: 142, height: 72, movement: 'run' }, 
			{ x: 0, width: bcgSize, y: 214, height: 0, movement: 'run'}
		],
		clues: [
			{ id: 'clue1', left: -393, top: 142, clue: "Variables can hold many different types of information. Including objects, strings, numbers, and arrays." },
			{ id: 'clue2', left: -377, top: 214, clue: "A string is simply a piece of text inside quotes:<br><br>var str = 'a string';" },
			{ id: 'clue3', left: -948, top: 214, clue: "A number is simply a number without quotes:<br><br>var num = 40;" },		
			{ id: 'clue4', left: -1071, top: 142, clue: "Objects and arrays are bit more difficult to understand, so we'll get into it later." }
		]
	}
]
