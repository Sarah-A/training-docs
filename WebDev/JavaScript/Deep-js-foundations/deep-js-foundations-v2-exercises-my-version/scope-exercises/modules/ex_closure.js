function DefineWorkshop() {

	var currentEnrollment = [];
	var studentRecords = [];
	
	var publicAPI = {
		addStudent: addStudent,
		enrollStudent: enrollStudent,
		printCurrentEnrollment: printCurrentEnrollment,
		enrollPaidStudents: paidStudentsToEnroll,
		remindUnpaidStudents: remindUnpaidStudents
	};

	return publicAPI;

	function addStudent(id, name, paid) {
		studentRecords.push({ id: id, name: name, paid: paid, });
	}

	function enrollStudent(id) {
		currentEnrollment.push(id);
	}

	function printCurrentEnrollment() {
		// console.log(studentRecords);
		// console.log(currentEnrollment);
		printRecords(currentEnrollment);
	}

	function getStudentFromId(studentId) {
		// console.log('find student: ' + studentId);
		return studentRecords.find(matchId);
	
		// *************************
	
		function matchId(record) {
			return (record.id == studentId);
		}
	}
	
	function printRecords(recordIds) {
		var records = recordIds.map(getStudentFromId);
		console.log(records);
	
		records.sort(sortByNameAsc);
	
		records.forEach(printRecord);
	}
	
	function sortByNameAsc(record1,record2){
		if (record1.name < record2.name) return -1;
		else if (record1.name > record2.name) return 1;
		else return 0;
	}
	
	function printRecord(record) {
		console.log(`${record.name} (${record.id}): ${record.paid ? "Paid" : "Not Paid"}`);
	}
	
	function paidStudentsToEnroll() {
		var recordsToEnroll = studentRecords.filter(needToEnroll);
	
		var idsToEnroll = recordsToEnroll.map(getStudentId);
	
		return [ ...currentEnrollment, ...idsToEnroll ];
	}
	
	function needToEnroll(record) {
		return (record.paid && !currentEnrollment.includes(record.id));
	}
	
	function getStudentId(record) {
		return record.id;
	}

	function remindUnpaidStudents() {
		return remindUnpaid(studentRecords);
	}
	
	function remindUnpaid(recordIds) {
		var unpaidIds = recordIds.filter(notYetPaid);
	
		printRecords(unpaidIds);
	}
	
	function notYetPaid(studentId) {
		var record = getStudentFromId(studentId);
		return !record.paid;
	}
}


var deepJS = DefineWorkshop();

[
	{ id: 313, name: "Frank", paid: true, },
	{ id: 410, name: "Suzy", paid: true, },
	{ id: 709, name: "Brian", paid: false, },
	{ id: 105, name: "Henry", paid: false, },
	{ id: 502, name: "Mary", paid: true, },
	{ id: 664, name: "Bob", paid: false, },
	{ id: 250, name: "Peter", paid: true, },
	{ id: 375, name: "Sarah", paid: true, },
	{ id: 867, name: "Greg", paid: false, },
].forEach( function addStudent(student){
	deepJS.addStudent(student.id, student.name, student.paid);
});

[664, 105, 375, 410].forEach(function enroll(id) {deepJS.enrollStudent(id);});

deepJS.printCurrentEnrollment();
console.log("----");
deepJS.enrollPaidStudents();
deepJS.printCurrentEnrollment();
console.log("----");
deepJS.remindUnpaidStudents();


/*
	Bob (664): Not Paid
	Henry (105): Not Paid
	Sarah (375): Paid
	Suzy (410): Paid
	----
	Bob (664): Not Paid
	Frank (313): Paid
	Henry (105): Not Paid
	Mary (502): Paid
	Peter (250): Paid
	Sarah (375): Paid
	Suzy (410): Paid
	----
	Bob (664): Not Paid
	Henry (105): Not Paid
*/


// ********************************

