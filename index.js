// prevents the form from refreshing the page when user clicks on submit button
$("#user-input-form").submit(function(e) {
  e.preventDefault();
});

// when user clicks on submit, parse the input and update src attribute of the iframe
$("#submit").click(() => {
    // get the user inputs
    let desiredCourses = $("input")[0].value;
    let exemptCourses = $("input")[1].value;
    // parse the user inputs
    let parsedDesiredCourses = parser(desiredCourses);
    let parsedExemptCourses = parser(exemptCourses);
    // format the url/src attribute of the iframe
    let link = `https://course-map.api.tianshome.com/?courses=${parsedDesiredCourses}&courses_excluded=${parsedExemptCourses}`;
    // update the attribute, add the "display-course-map-iframe" class, and remove the "no-border" class
    $("#course-map-iframe").attr("src", link).addClass("display-course-map-iframe").removeClass("no-border");
});

// function that parses user input into right format for the link --> 
// example 1: MATH 236, COMP 302
// output 1:  MATH+236,+COMP+302
// example 2: MATH 139
// output 2: MATH+139
function parser(userInput) {
  tokenList = []; // collects/inserts tokens
  userInputList = userInput.split(" "); // seperate user input by space
  len = userInputList.length - 1;
  userInputList.forEach((val, index) => {
    if (index == len) { // end
      tokenList.push(val);
    } else if (val == " ") {// space: add "+" token
      tokenList.push("+")
    } else {
      let isComma = val.slice(val.length - 1); // returns the last character of the string
      if (isComma == ",") {
        // case where val = course number with command, ex: "202,"
        tokenList.push(val);
        tokenList.push("+");
      } else {
        if (isNaN(val)) {// case where the token is a letter => val = course prefix (ex: MATH)
          tokenList.push(val);
          tokenList.push("+");
        } else {// case where val = number without comma at end (ex: 240)
          tokenList.push(val);
        }
      }
    }
  });
  return tokenList.join("");
}