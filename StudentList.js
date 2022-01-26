function StudentList() {
  this.stList = [];
  //Add student method
  this.addStudent = function (newStudent) {
    this.stList.push(newStudent);
  };
  //delete student
  this.deleteSt = function (idList) {
    for (let i = 0; i < idList.length; i++) {
      for (let j = 0; j < this.stList.length; j++) {
        let st = this.stList[j];
        if (idList[i] === st.studentCode) {
          this.stList.splice(j, 1);
        }
      }
    }
    return this.stList;
  };

  //search student/
  this.searchStudent = function (keyword) {
    let newList = [];
    for (let i = 0; i < this.stList.length; i++) {
      let st = this.stList[i];
      if (st.name.search(keyword) !== -1) {
        newList.push(st);
      }
    }
    return newList;
  };
  //search student based on the ID
  this.searchId = function (id) {
    for (let i = 0; i < this.stList.length; i++) {
      let st = this.stList[i];
      if (id == st.studentCode) {
        return st;
      }
    }
    return null;
  };
  //edit information
  this.saveInfor = function (editedStudent) {
    for (let i = 0; i < this.stList.length; i++) {
      //let previourSt = this.stList[i];
      // if (previourSt.studentCode == editedStudent.studentCode) {
      //   previourSt.id = editedStudent.id;
      //   previourSt.phone = editedStudent.phone;
      //   previourSt.name = editedStudent.name;
      //   previourSt.email = editedStudent.email;
      //   previourSt.mathGrade = editedStudent.mathGrade;
      //   previourSt.physicGrade = editedStudent.physicGrade;
      //   previourSt.chemistryGrade = editedStudent.chemistryGrade;
      //   previourSt.GPA = editedStudent.GPA;
      //   previourSt.evaluation = editedStudent.evaluation;
      // }
      if (this.stList[i].studentCode == editedStudent.studentCode) {
        this.stList[i] = editedStudent;
      }
    }
  };
}
