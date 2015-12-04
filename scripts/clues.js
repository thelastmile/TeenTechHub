// set the size of the bg, so I don't go beyond the 
// left/right edges
var bcgSize = 1284;


// clues array contains object indicating where clues
// are located and what information they contain
var clues = [
	{
		image: '<img class="bcg" src="../images/game1.jpg" />',
		top: 142,
		problem: 'Declare a variable named <i><b>myVar</b></i> and assign it the value <i><b>"my first variable"</b></i>',
		solution: 'varmyVar=\"myfirstvariable\"',
		move: [
			{ x: 0, width: bcgSize, y: 142, height: 0, movement: 'run' },
			{ x: -185, width: 20, y: 142, height: 72, movement: 'run' }, 
			{ x: -731, width: 20, y: 142, height: 72, movement: 'run' }, 
			{ x: -1267, width: 20, y: 142, height: 72, movement: 'run' }, 
			{ x: 0, width: bcgSize, y: 214, height: 0, movement: 'run'}
		],
		clues: [
			{ id: 'clue3', left: -659, top: 142, clue: "hmmm...this clue says, \"Have you ever heard of variables? Variables are like buckets, except you fill them with information, not water.\" Not sure what that means yet, but let's keep moving." },
			{ id: 'clue4', left: -953, top: 142, clue: "Hello earthling, listen well. To declare a variable, you must type:<br><i><b>var anyNameIChoose;</b></i><br>Now scram, I have things to do and worlds to explore." },
			{ id: 'clue5', left: -317, top: 214, clue: "Nice, a clue carved into the bottom of the rock. It says, \"variable creation is called declaring a variable, and giving it a value is called assigning a value.\"" },
			{ id: 'clue6', left: -1015, top: 214, clue: "Inside the vase was a clue. It says, \"To create a variable and assign it a value, type:<br><i><b>var myBucket = 'some value';</i></b>" }
		]
	},
	{
		image: '<img class="bcg" src="../images/game2.jpg" />',
		top: 110,
		problem: "Declare a variable named <i><b>num</b></i> and assign it the value <i><b>12</b></i>",
		solution: 'varnum=12',
		move: [
			{ x: 0, width: bcgSize, y: 110, height: 0, movement: 'run' },
			{ x: -312, width: 8, y: 110, height: 40, movement: 'run' }, 
			{ x: 0, width: bcgSize, y: 128, height: 150, movement: 'swim'}
		],
		clues: [
			{ id: 'clue1', left: -465, top: 110, clue: "Nice, a clue. It says, \"Variables can hold many different types of information. Including objects, strings, numbers, and arrays.\"" },
			{ id: 'clue2', left: -550, top: 169, clue: "I can barely understand you in that dogish tongue, but I think you're saying that a string is just text inside quotes, like this: <br><i><b>var str = 'a string';</b></i>" },
			{ id: 'clue3', left: -752, top: 110, clue: "I see a piece of paper, but my hand will barely fit. Got it though. The paper says, \"A number in most programming languages is a number without quotes:<br><i><b>var num = 40;</b></i><br>If you put '40' inside quotes, then it's actually a string." },		
			{ id: 'clue4', left: -1094, top: 110, clue: "Hmmm...the inside of the fireplace has something carved into it. It says, \"Numbers do not have quotes, strings do." }
		]
	},
	{ 
		image: '<img class="bcg" src="../images/game3.jpg" />',
		top: 110,
		problem: "Declare a variable named <i><b>arr</b></i> and assign it the value <i><b>[12,13]</b></i>",
		solution: 'vararr=[12,13]',
		move: [
			{ x: 0, width: bcgSize, y: 110, height: 0, movement: 'run' }
		],
		clues: [
			{ id: 'clue1', left: -160, top: null, clue: "Okay, so I know what strings and numbers are, what are arrays? Well, arrays are like more empty buckets. Let's keep going to learn more." },
			{ id: 'clue2', left: -466, top: null, clue: "So, an array is a container that holds information. I'm imagining a bucket variable holding information, and that information holding more information.<br>Wow...that's a tough one, let me stew on that for a minute." },
			{ id: 'clue3', left: -722, top: null, clue: "Another clue, it says, \"Create an empty array like this: <br>var anyName = [ ]; You'll learn how to put values in it later." },		
			{ id: 'clue4', left: -1228, top: null, clue: "hmmm...weird place for a clue, under a trampoline. The clue says, \"Create an array with data in it, like this:<br>var myArr = [5, 'test', ['an array inside an array'], 7, '12'];<br>An array can contain any value or object.\"" }
		]
	}
];


var deadClues = [
	{
		clues: [
			{ id: 'deadclue0', left: 0, top: 0, clue: "hmmm...maybe I should check the objects laying around, maybe they'll have some clues." },
			{ id: 'deadclue1', left: -643, top: 214, clue: "Disgusting...nothing here but wood and worms." },
			{ id: 'deadclue2', left: -21, top: 214, clue: "Man that rock was heavy, but there's something underneath. It's a piece of paper that says, \"clues may be out of order, so take all the information in, and then piece it back together in order to solve the problem.\"" },
			{ id: 'deadclue3', left: -361, top: 142, clue: "The sign says, \"Jump over the little moving objects, otherwise, you'll die.\"" },
			{ id: 'deadclue3', left: -1283, top: 142, clue: "Man, that's a bunch of gold...hmmm...maybe I have to complete the level before I can get to it." },
			{ id: 'deadclue3', left: -1283, top: 214, clue: "Woooopppyyyy...if I had all that money, maybe daddie would let me buy that cool robot for Christmas!!!" }
		]
	},
	{
		clues: [
			{ id: 'deadclue0', left: 0, top: 0, clue: "Nothing, gotta keep moving." },
			{ id: 'deadclue1', left: -72, top: 110, clue: "Wow...that box was heavy." },
			{ id: 'deadclue2', left: -187, top: 182, clue: "What kind of fish is this? It kind of looks like a dog and a fish...it's a dogish." },
			{ id: 'deadclue3', left: 0, top: 230, clue: "Hey little dogish...Cat got your tongue???" },
			{ id: 'deadclue4', left: -619, top: 202, clue: "I have a dog too, his name is Abe." },
			{ id: 'deadclue5', left: -925, top: 166, clue: "Aren't you a pretty little doggy fish thingy." }
		]
	},
	{
		clues: [
			{ id: 'deadclue0', left: 0, top: 0, clue: "Man...I'm getting tired." },
			{ id: 'deadclue1', left: -423, top: 110, clue: "Locked, I bet there's something good in there...why else would it be locked!" },
			{ id: 'deadclue2', left: -925, top: 110, clue: "Tired body, don't quit on me now." }
		]
	}


]




var enemies = {};
enemies.snake = {
	src: "../images/enemy_snake.png",
	id: 'snake',
	0: 152,
	1: 121,
	2: 121
}
enemies.baby = {
	src: "../images/enemy_baby.png",
	id: 'baby',
	0: 149,
	1: 118,
	2: 118
}
enemies.hardhat = {
	src: "../images/enemy_hardhat.png",
	id: 'hardhat',
	0: 220,
	1: 117,
	2: 117
}
enemies.castle = {
	src: "../images/enemy_castle.png",
	id: 'castle',
	0: 222,
	1: 119,
	2: 119
}
enemies.snake1 = {
	src: "../images/enemy_snake.png",
	id: 'snake1',
	0: 152,
	1: 121,
	2: 121
}
enemies.baby1 = {
	src: "../images/enemy_baby.png",
	id: 'baby1',
	0: 149,
	1: 118,
	2: 118
}
enemies.hardhat1 = {
	src: "../images/enemy_hardhat.png",
	id: 'hardhat1',
	0: 220,
	1: 117,
	2: 117
}
enemies.castle1 = {
	src: "../images/enemy_castle.png",
	id: 'castle1',
	0: 222,
	1: 119,
	2: 119
}