// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// Get all the checkbox elements and add click eventlistners 
var checkboxes = document.querySelectorAll("input[type='checkbox']");
checkboxes.forEach(function(element){
	element.addEventListener("click", validateOptions);
});

// Get the password length value and add a change eventlistener 
var passwordLength = document.querySelector('#password-length');
passwordLength.addEventListener("change", validateOptions);
// Add an eventlistener to box so you can put enter and make the password 
// generate
passwordLength.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
    	validateAndTryWrite();
    }
});

// Validate options boxes. Return true if at least one
// of the options are selected, and false if none are selected.
function validateOptions(){
	var validateOptionsSelected = false;
	checkboxes.forEach(function(element){
		if(element.checked && (
			passwordLength.value >= 8  && 
			passwordLength.value <= 128 )
		) 
		validateOptionsSelected = true;
	});
	//console.log(passwordLength.value);
	if(!validateOptionsSelected){
		document.getElementById("generate").disabled = true;
		document.getElementById("error-message").style.display = "block";
	} else {
		document.getElementById("generate").disabled = false;
		document.getElementById("error-message").style.display = "none";
	}
	return validateOptionsSelected;
}

// Return a random string of character from the seleted sets
// of length passwordLength 
function generatePassword(){
	var optionsFunctions = [lowerRange, upperRange, numbersRange, specialCharsRange];
	var options = [];
	checkboxes.forEach(
		function(element, index){
			if(element.checked){
				newOptions = optionsFunctions[index]();
				options = options.concat(newOptions);
			}
		}
	);
	var password = "";
	while (password.length < passwordLength.value){
		//get a random character from the options and add it to the password
		var randomIndex = getRandomInteger(options.length - 1);
		password += options[randomIndex];
	}
	return password;
}

// Validate options boxes and try to write the password to the 
// DOM. Used for hitting enter on the length box.
function validateAndTryWrite() {
	if(validateOptions()){
		writePassword();
	}
}


// Increment a character by adding one to the character code
// like 1 + 1 = 2, 'a' + 1 = 'b';
function incrementCharacter(character){
	return String.fromCharCode(character.charCodeAt(0) + 1);
}

// Return an array of values from an inital value to the end value
function range(start, end){
	if(start === end) return [start];
	return [start, ...range(incrementCharacter(start), end)];
}

var lowerRange = () => {
	return range('a', 'z');
}

var upperRange = () => {
	return range('A', 'Z');
}

var numbersRange = () => {
	return range('0', '9');
}

var specialCharsRange = () => {
	var specialCharacters = range('!', '/');
	return specialCharacters
		.concat(range(':', '@'))
		.concat(range('[', '`'))
		.concat(range('{', '~'));
}

// get a random integer in range
function getRandomInteger(maximum) {
  return Math.floor(Math.random() * Math.floor(maximum));
}

// Fill specChars with specialCharsRange
document.getElementById('specChars').innerHTML = specialCharsRange().join(' '); 
