
$("#user-input-form").submit(function(e) {
  e.preventDefault();
});

document.getElementById("submit").addEventListener("click", () => {
    let desiredCourses = document.getElementsByTagName("input")[0].value;
    let exemptCourses = document.getElementsByTagName("input")[1].value;

    console.log(desiredCourses);
    console.log(exemptCourses);

    let parsedDesiredCourses = parser(desiredCourses);
    let parsedExemptCourses = parser(exemptCourses);
    
    let link = `https://course-map.api.tianshome.com/?courses=${parsedDesiredCourses}&courses_excluded=${parsedExemptCourses}`;
    console.log(link);
    let cm_iframe = document.getElementById("course-map-iframe")
    cm_iframe.setAttribute("src", link);
    cm_iframe.add("display-course-map-iframe").remove("no-display");
});

// function that parses user input into right format --> 
// COURSE_PREFIX+NUMBER,
function parser(userInput) {
  tokenList = [];
  userInputList = userInput.split(" ");
  len = userInputList.length - 1;
  userInputList.forEach((val, index) => {
    if (index == len) {
      // end
      tokenList.push(val);
    } else if (val == " ") {
      // space
      tokenList.push("+")
    } else {
      let isComma = val.slice(val.length - 1); // returns the last character of the string
      if (isComma == ",") {
        // case where val = course number with command, ex: "202,"
        tokenList.push(val);
        tokenList.push("+");
      } else {
        if (isNaN(val)) {
          // case where val = course prefix (ex: MATH)
          tokenList.push(val);
          tokenList.push("+");
        } else {
          // case where val = number without comma at end (ex: 240)
          tokenList.push(val);
        }
      }
    }
  });
  return tokenList.join("");
}