function Validation() {
  //check empty input
  this.isEmpty = function (value) {
    if (value.trim() == "") {
      return true;
    }
    return false;
  };
  //check email
  this.validateEmail = function (email) {
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(email.toLowerCase());
  };
  //check phone number
  this.validatePhoneNumber = function (phoneNumber) {
    const regex = /^\d+$/;
    if (regex.test(phoneNumber) == true && phoneNumber.length >= 10) {
      return true;
    }
    return false;
  };
  //check grade
  this.validateGrade = function (grade) {
    const pattern = /^\d+$/;
    if (pattern.test(grade) == true && grade <= 10 && grade >= 0) {
      return true;
    }
    return false;
  };
}
