/*
	Miki's Common Function Library (JavaScript)
	
	Reusable functions I've written and collected as our 
	class has progressed, along with a few handy functions 
	offered from the textbook.
	
	Author:			Miki Marshall
	Last Updated:	2/29/12
*/

// Cookies! -----------------------------------------------
// Cookie creation, reading, and deleting functions 
// (from "Head First JavaScript", page 118).
// --------------------------------------------------------

//Write a cookie
function writeCookie(name, value, days) 
{
	var expires = "";
			
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = "; expires=" + date.toGMTString();
	}
			
	document.cookie = name + "=" + value + expires + "; path=/";
}

//Read a cookie		
function readCookie(name) 
{
	var searchName = name + "=";
	var cookies = document.cookie.split(';');
	for (var i=0; i < cookies.length; i++) {
		var c = cookies[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1, c.length);
		}

		if (c.indexOf(searchName) == 0) {
			return c.substring(searchName.length, c.length);
		}
	}

	return null;
}

//Erase a cookie		
function eraseCookie(name) 
{
	writeCookie(name, "", -1);
}

// Dates! -------------------------------------------------
// General date manipulation routines.
// --------------------------------------------------------

//Get current date in a nice format
function getNiceDate()
{
	var myDate = new Date();

	//Format the date in to something usable
	var myDay = myDate.getDate();
	var myMonth = myDate.getMonth() + 1;
	var myYear = myDate.getFullYear();
	
	//Format nicely
	var myNiceDate = myMonth + "/" + myDay + "/" + myYear;		
	
	//Return the result
	return myNiceDate;
}

// Fields! ------------------------------------------------
// Simple wrappers for manipulating field values by ID.
// (It's just less typing this way.)
// --------------------------------------------------------

//Set focus on this element
function setFocus(elementId)
{
	//Focus on the given field
	window.document.getElementById(elementId).focus();
	
	//Select the data as if we'd tabbed here
	window.document.getElementById(elementId).select();
}

//Retrieve a form input field value by its ID  
function getFieldValue(elementId)
{
	return window.document.getElementById(elementId).value;
}

//Set a form input field value by its ID
function setFieldValue(elementId, newValue)
{
	window.document.getElementById(elementId).value = newValue;
}

//Set the value of a page element's property 
function setProperty(element, property, newValue)
{
	//Create a command as a string
	var evalString = "window.document.getElementById('" + element + "')." + property + " = '" + newValue + "';";
	
	//And evaluate it ... (This is pretty Cool!, if it works...)
	eval(evalString);
}

//Set the value of a page element's style property 
function setStyle(element, property, newValue)
{
	//Create a command as a string
	var evalString = "window.document.getElementById('" + element + "').style." + property + " = '" + newValue + "';";
	
	//And evaluate it ... (This is pretty Cool!, if it works...)
	eval(evalString);
}

//Set html text (innerHTML), given its ID
function setText(elementId, newText)
{
	window.document.getElementById(elementId).innerHTML = newText;
}

// Forms!- ------------------------------------------------
// Simple wrappers for manipulating form input fields by ID.
// Most especially that problematic radio button (shudder).
// --------------------------------------------------------

//Return a zero-based index of the selected radio button, if any
//(return -1 if none).
function getCheckedRadioButtonIndex(form, group) 
{
	//Local variables
	var value = "";
	var index = -1;
	
	//Retrieve count of buttons in this group
	var count = getRadioButtonCount(form, group);

	//Iterate buttons and find the chosen one
	for (var i = 0; i < count; i++) 
	{
		if (isRadioButtonChecked(form, group, i))
		{
			//Save that index
			index = i;
		}
	}
	
	//Return result
	return index;
}

//Retrieve the number of radio buttons in this group
function getRadioButtonCount(form, group)
{
	//Retrieve count of buttons in group
	return eval("document." + form + "." + group + ".length");
}

//Return a radio button's value
function getRadioButtonValue(form, group, index)
{
	//Retrieve the value of the selected radio button
	return eval("document." + form + "." + group + "[" + index + "].value");
}

//Return whether a radio button has been checked
function isRadioButtonChecked(form, group, index)
{
	//Retrieve the checked property of a given radio button
	return eval("document." + form + "." + group + "[" + index + "].checked");
}

//Set a radio button's style
/* Usage: 	Radio buttons must be nested in a label, as it acts on the 
			parent node (the label) to effect the text in the label. 
			It should look like this:
				<label>
					<input type="radio" name="buttonName" value="my value" />
					Some text to go with the button
				</label>
*/
function setRadioButtonStyle(form, group, index, style, value)
{
	//Set the style of the selected radio button label
	eval("document." + form + "." + group + "[" + index + "].parentNode.style." + style + " = '" + value + "';");
}

//Set a given style for all radio buttons in this group
// (good for clearing an old style)
function setAllRadioButtonStyles(form, group, style, value)
{
	//Retrieve count of buttons in this group
	var count = getRadioButtonCount(form, group);

	//For each button
	for (var i = 0; i < count; i++) 
	{
		//Set the style
		setRadioButtonStyle(form, group, i, style, value);
	}
}


// Events! ------------------------------------------------
// Simplified wrappers to handle events
// --------------------------------------------------------

//Connect event handlers to field events by ID
function setHandler(elementId, event, handler)
{
	var evalString = "document.getElementById('" + elementId + "')." + event + " = " + handler + ";";
	
	eval(evalString);
}

// Math! --------------------------------------------------
// Functions and wrappers that do stuff with numbers.
// --------------------------------------------------------

//Return a random number between "min" and "max" values.
// (Src: Debra Carino, CS133S (CCC), Javascript instructor)
function getRandomNumber(min, max) 
{
	//Generate a random integer between two end points
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Convert any format number into an unformatted numeric value
function toNumber(value)
{
	//Remove everything but numbers and decimal point
	value = value.toString().replace(/\%|\$|\,/g,'');
	
	return value;
}

//Convert a number to currency format
function toCurrency(value)
{
	//Remove any previous formatting
	var aFloat = parseFloat(toNumber(value));

	//Extract any sign
	var sign = (aFloat == (aFloat = Math.abs(aFloat))) ? "" : "-";
	
	//Extract cents, rounded to whole pennies
	aFloat = Math.floor(aFloat * 100 + 0.50000000001);
	var pennyCount = aFloat % 100;
	var cents = pennyCount.toString();
	var dollars = Math.floor(aFloat / 100).toString();
	
	//Fix cents at 2 digits
	if(pennyCount < 10)
	{
		cents = "0" + cents;
	}
	
	//Introduce commas to the dollar portion
	for (var i = 0; i < Math.floor((dollars.length - (1 + i)) / 3); i++)
	{
		dollars = dollars.substring(0, dollars.length - (4 * i + 3)) + ',' +
		dollars.substring(dollars.length - (4 * i + 3));
	}
	
	//Format the pieces into one currency value
	return (sign + '$' + dollars + '.' + cents);
}


// Miscellaneous! -----------------------------------------
// Functions and wrappers that just came to mind...
// --------------------------------------------------------

// The immediate IF ... just cuz I likes it  =)
function iif(test, result1, result2)
{
	if (test)
	{
		return result1;
	}
	else
	{
		return result2;
	}
}
