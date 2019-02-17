/*
		CS-133S-01 - JavaScript
		Miki Marshall
		02/28/2012
		"On My Own" Project 7B
		
*/

//Global Constants ..................................................


//Global variables ..................................................

//Event Handlers ....................................................
// (in onload event)
window.onload = function()
{
	
	//Button click event handlers
	setHandler("savemorebtn", "onclick", doSaveMore);
	setHandler("calculatebtn", "onclick", doFutureValue);
	
	//Initialize the page itself ..........................
	initPage();
}

//Functions .........................................................
//Initialize the page
function initPage()
{
	//Clear all fields
	clearFields();
	
	//Set focus and select the first field
	setFocus("namefld");
}

//Clear all fields (such as when the page is reloaded)
function clearFields()
{
	//Clear all fields (by setting demo values in some)
	setFieldValue("namefld", "Your Name");
	setFieldValue("yearsfld", "18");
	setFieldValue("investfld", "$250");
	setFieldValue("ratefld", "%5.25");
	setFieldValue("totalfld", "");
	setText("performancefld", "");
}

//Validate the user name
function validateName()
{
	var result = false;
	
	//If blank
	if (getFieldValue("namefld") != "")
	{
		//Return success
		result = true;
	}
	else
	{
		//Display error and refocus on this field
		alert("Please enter your name");
		setFocus("namefld");
	}
	
	return result;
}

//Validate years field
function validateYears()
{
	//Retrieve field value as an unformatted number
	myYears = toNumber(getFieldValue("yearsfld"));
	var result = doValidate(myYears);

	//If valid value
	if (!result)
	{
		//Display error and refocus on this field
		alert("Please enter years as a positive number");
		setFocus("yearsfld");
	}
	
	return result;
}

//Validate monthly investment amount field
function validateInvestment()
{
	//Retrieve field value as an unformatted number
	myInvestment = toNumber(getFieldValue("investfld"));
	var result = doValidate(myInvestment);

	//If valid value
	if (result)
	{
		//Redisplay as pretty dollar amount
		setFieldValue("investfld", toCurrency(myInvestment));
	}
	else
	{
		//Display error and refocus on this field
		alert("Please enter your investment amount as a positive number");
		setFocus("investfld");
	}
	
	return result;
}

function validateRate()
{
	//Retrieve field value as an unformatted number
	myRate = toNumber(getFieldValue("ratefld"));
	var result = doValidate(myRate);

	//If valid value
	if (result)
	{
		//Redisplay as pretty percentage amount
		setFieldValue("ratefld", "%" + myRate);
	}
	else
	{
		//Display error and refocus on this field
		alert("Please enter the rate as a positive percentage amount");
		setFocus("ratefld");
	}
	
	return result;
}

//Compute totals, if possible
function doFutureValue()
{
	//Make sure all fields have been entered and are valid
	if (validateName() &&
		validateYears() &&
		validateInvestment() &&
		validateRate())
	{
		//Compute returns (as list and total)
		var monthlyRate = (myRate / 100) / 12;
		var runningValue = 0;
		var yearlyReturns = "<pre>";
		
		//For each year
		for (y = 0; y < myYears; y++)
		{			
			//Compound monthly interest into running total
			for (m = 0; m < 12; m++)
			{
				myInvestment *= 1;

				runningValue = (runningValue + myInvestment) * (1 + monthlyRate);
			}
			
			//Build a yearly display of returns
			yearlyReturns += "Year " + (y + 1) + ": \t" + toCurrency(runningValue) + "\n";
		}	
		
		//Display tally and total
		setText("performancefld", yearlyReturns + "</pre>");
		setFieldValue("totalfld", toCurrency(runningValue));
	}
	else
	{
		//Clear results display
		setText("performancefld", "");
		setFieldValue("totalfld", "");
	}	
}

function doSaveMore()
{
	//Bump up the investment by $20
	myInvestment += 20;
	setFieldValue("investfld", toCurrency(myInvestment));
	
	//Recompute totals
	doFutureValue();
}

//Validate a field (assuming they validate the same for this exercise)
function doValidate(value)
{
	return (!isNaN(value) && value > 0) ? true : false;
}
