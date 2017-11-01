// Even characters in a word -> Lowercase, Odd characters in a word -> Uppercase
(function() {
  console.log('hi');


  function CaPiTaLiZe(str) {
    var newString = '';
    str.split(' ');
    for (var i=0;i<str.length;i++) {
      if ((i+1)%2 === 0) {
        // even
        if (isAlphabet(str[i])) {
          newString += str[i].toLowerCase();
        } else {
          newString += str[i];
        }
      } else {
        // odd
        if (isAlphabet(str[i])) {
          newString += str[i].toUpperCase();
        } else {
          newString += str[i];
        }
      }
    }
    return newString;
  }
  function isAlphabet(char) {
    var alphabetRegex = /^[a-zA-Z ]+$/;
    // var numberRegex = /^[0-9]+$/;
    if (char.match(alphabetRegex)) {
      // alphabet
      return true;
    } else {
      return false;
    }
  }
  console.log(CaPiTaLiZe('hello world  testing  123'));
})();

// Issue in above
// 1. 'hello    world' First letter of each word should be capitalized ignoring spaces