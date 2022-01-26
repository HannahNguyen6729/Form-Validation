let studentListObj = new StudentList();
let validate = new Validation();
//add properties
Student.prototype.mathGrade = "";
Student.prototype.physicGrade = "";
Student.prototype.chemistryGrade = "";
Student.prototype.GPA = "";
Student.prototype.evaluation = "";
//add methods
Student.prototype.caculateGPA = function () {
  let gpa =
    (Number(this.mathGrade) +
      Number(this.physicGrade) +
      Number(this.chemistryGrade)) /
    3;
  this.GPA = Math.round(gpa * 100) / 100;
  return this.GPA;
};
Student.prototype.evaluateGPA = function () {
  if (this.GPA >= 8 && this.GPA <= 10) {
    this.evaluation = "Good";
  } else if (this.GPA > 6 && this.GPA < 8) {
    this.evaluation = "Average";
  } else {
    this.evaluation = "Weak";
  }
};

function domId(id) {
  let element = document.getElementById(id);
  return element;
}
function checkEmptyInput(id, value) {
  if (validate.isEmpty(value)) {
    domId(id).style.borderColor = "red";
    return true;
  } else {
    domId(id).style.borderColor = "green";
    return false;
  }
}
function addStudent() {
  //get infor form input
  let stCode = domId("studentCode").value;
  let stName = domId("name").value;
  let stPhone = domId("phone").value;
  let stId = domId("studentId").value;
  let stEmail = domId("email").value;
  let stMath = domId("math").value;
  let stPhysic = domId("physic").value;
  let stChemistry = domId("chemistry").value;

  let count = 0;
  //check empty input
  if (checkEmptyInput("studentCode", stCode)) {
    count++;
  }
  if (checkEmptyInput("name", stName)) {
    count++;
  }
  if (checkEmptyInput("phone", stPhone)) {
    count++;
  }
  if (checkEmptyInput("studentId", stId)) {
    count++;
  }
  //validate email
  if (validate.validateEmail(stEmail)) {
    domId("email").style.borderColor = "green";
  } else {
    count++;
    domId("email").style.borderColor = "red";
  }
  //validate phone number
  if (validate.validatePhoneNumber(stPhone)) {
    domId("phone").style.borderColor = "green";
  } else {
    count++;
    domId("phone").style.borderColor = "red";
  }
  //validate grades
  if (validate.validateGrade(stMath)) {
    domId("math").style.borderColor = "green";
  } else {
    count++;
    domId("math").style.borderColor = "red";
  }
  if (validate.validateGrade(stPhysic)) {
    domId("physic").style.borderColor = "green";
  } else {
    count++;
    domId("physic").style.borderColor = "red";
  }
  if (validate.validateGrade(stChemistry)) {
    domId("chemistry").style.borderColor = "green";
  } else {
    count++;
    domId("chemistry").style.borderColor = "red";
  }

  if (count !== 0) {
    return;
  }

  // create a new student
  let st = new Student(stCode, stName, stId, stPhone, stEmail);
  st.mathGrade = stMath;
  st.physicGrade = stPhysic;
  st.chemistryGrade = stChemistry;
  st.caculateGPA();
  st.evaluateGPA();
  console.log(st);
  //add the student into student list
  studentListObj.addStudent(st);
  let studentList = studentListObj.stList;
  // show student list on the table
  showStudentList(studentList);
}
//function show student list on the table
function showStudentList(studentList) {
  //create tr, tr then append to the tbody
  //1 student == 1 row
  let tblBody = domId("tbodyStudent");
  tblBody.innerHTML = "";
  for (let i = 0; i < studentList.length; i++) {
    let st = studentList[i];
    let trStudent = document.createElement("tr");
    trStudent.className = "trStudent";
    trStudent.setAttribute(
      "onclick",
      "editStudentInfo( " + st.studentCode + " )"
    );

    let tdCheckbox = document.createElement("td");
    let checkboxInput = document.createElement("input");
    checkboxInput.setAttribute("id", st.studentCode);
    checkboxInput.setAttribute("type", "checkbox");
    checkboxInput.setAttribute("class", "checkbox");
    tdCheckbox.appendChild(checkboxInput);

    let tdCode = createElement(st.studentCode, "tdCode");
    let tdName = createElement(st.name, "tdName");
    let tdId = createElement(st.id, "tdId");
    let tdPhone = createElement(st.phone, "tdPhone");
    let tdEmail = createElement(st.email, "tdEmail");
    let tdGPA = createElement(st.GPA, "tdGPA");
    let tdEvaluation = createElement(st.evaluation, "tdEvaluation");

    //append td
    trStudent.appendChild(tdCheckbox);

    trStudent.appendChild(tdCode);
    trStudent.appendChild(tdName);
    trStudent.appendChild(tdEmail);
    trStudent.appendChild(tdId);
    trStudent.appendChild(tdPhone);
    trStudent.appendChild(tdGPA);
    trStudent.appendChild(tdEvaluation);

    //append tr
    tblBody.appendChild(trStudent);
  }
}

function createElement(value, className) {
  let td = document.createElement("td");
  td.className = className;
  td.innerHTML = value;
  return td;
}
//save information on LocalStorage
function SetStorage() {
  let listOfStudents = JSON.stringify(studentListObj.stList);
  localStorage.setItem("Student List", listOfStudents);
}
//get information from LocalStorage
function GetStorage() {
  let listOfStudents = localStorage.getItem("Student List");
  let stList = JSON.parse(listOfStudents);
  studentListObj.stList = stList;
  showStudentList(stList);
}
//Delete student
function DeleteStudent() {
  let checkboxArr = document.querySelectorAll(".checkbox");

  let checkedIdArr = [];
  for (let i = 0; i < checkboxArr.length; i++) {
    if (checkboxArr[i].checked) {
      checkedIdArr.push(checkboxArr[i].id);
    }
  }

  let newList = studentListObj.deleteSt(checkedIdArr);
  console.log(newList);
  showStudentList(newList);
}

//search Student
function searchStudent() {
  let keyword = domId("keyword").value;
  let newList = studentListObj.searchStudent(keyword);
  showStudentList(newList);
}
//edit student information
function editStudentInfo(id) {
  let st = studentListObj.searchId(id);
  //show data of student on the input tags
  domId("studentCode").value = st.studentCode;
  domId("name").value = st.name;
  domId("studentId").value = st.id;
  domId("phone").value = st.phone;
  domId("email").value = st.email;
  domId("math").value = st.mathGrade;
  domId("physic").value = st.physicGrade;
  domId("chemistry").value = st.chemistryGrade;
}
function saveEditedInfo() {
  //get infor form input
  let stCode = domId("studentCode").value;
  let stName = domId("name").value;
  let stPhone = domId("phone").value;
  let stId = domId("studentId").value;
  let stEmail = domId("email").value;
  let stMath = domId("math").value;
  let stPhysic = domId("physic").value;
  let stChemistry = domId("chemistry").value;

  let count = 0;
  //check empty input
  if (checkEmptyInput("studentCode", stCode)) {
    count++;
  }
  if (checkEmptyInput("name", stName)) {
    count++;
  }
  if (checkEmptyInput("phone", stPhone)) {
    count++;
  }
  if (checkEmptyInput("studentId", stId)) {
    count++;
  }
  //validate email
  if (validate.validateEmail(stEmail)) {
    domId("email").style.borderColor = "green";
  } else {
    count++;
    domId("email").style.borderColor = "red";
  }
  //validate phone number
  if (validate.validatePhoneNumber(stPhone)) {
    domId("phone").style.borderColor = "green";
  } else {
    count++;
    domId("phone").style.borderColor = "red";
  }
  //validate grades
  if (validate.validateGrade(stMath)) {
    domId("math").style.borderColor = "green";
  } else {
    count++;
    domId("math").style.borderColor = "red";
  }
  if (validate.validateGrade(stPhysic)) {
    domId("physic").style.borderColor = "green";
  } else {
    count++;
    domId("physic").style.borderColor = "red";
  }
  if (validate.validateGrade(stChemistry)) {
    domId("chemistry").style.borderColor = "green";
  } else {
    count++;
    domId("chemistry").style.borderColor = "red";
  }

  if (count !== 0) {
    return;
  }

  // create a new student
  let st = new Student(stCode, stName, stId, stPhone, stEmail);
  st.mathGrade = stMath;
  st.physicGrade = stPhysic;
  st.chemistryGrade = stChemistry;
  st.caculateGPA();
  st.evaluateGPA();

  //update student list
  studentListObj.saveInfor(st);

  // show student list on the table
  showStudentList(studentListObj.stList);
}
