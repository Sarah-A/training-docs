function printRecords(recordIds) {
	recordIds.map(getStudentRecordForId)
		.sort(sortByNameAscending)
		.forEach(printStudentRecord);
}

function sortByNameAscending(record1, record2) {
	if (record1.name < record2.name) {
		return -1;
	} else if (record1.name > record2.name) {
		return 1;
	} else {
		return 0;
	}
}

function paidStudentsToEnroll() {
	var studentsToEnroll = studentRecords
		.filter(shouldEnroll)
		.map(getSudentIdFromRecord);

	return [...currentEnrollment, ...studentsToEnroll];

	function shouldEnroll(student) {
		return (student.paid && !currentEnrollment.includes(student.id));
	}
}

function remindUnpaid(recordIds) {
	var unpaidIds = recordIds.filter(needReminder);
	printRecords(unpaidIds);

	function needReminder(studentId) {
		var student = getStudentRecordForId(studentId);
		return (student && !student.paid);
	}	
}

function getStudentRecordForId(studentId) {
	return studentRecords.find(matchStudentId);

	function matchStudentId(record) {
		return record.id === studentId;
	}
}

function getSudentIdFromRecord(studentRecord) {
	return studentRecord.id;
}

function printStudentRecord(studentRecord) {
	console.log(`name: ${studentRecord.name}, id: ${studentRecord.id}, ${paidStatusString(studentRecord.paid)} `);
}

function paidStatusString(paid) {
	return paid ? "Paid" : "Not Paid";
}

// ********************************

var currentEnrollment = [ 410, 105, 664, 375 ];

var studentRecords = [
	{ id: 313, name: "Frank", paid: true, },
	{ id: 410, name: "Suzy", paid: true, },
	{ id: 709, name: "Brian", paid: false, },
	{ id: 105, name: "Henry", paid: false, },
	{ id: 502, name: "Mary", paid: true, },
	{ id: 664, name: "Bob", paid: false, },
	{ id: 250, name: "Peter", paid: true, },
	{ id: 375, name: "Sarah", paid: true, },
	{ id: 867, name: "Greg", paid: false, },
];

printRecords(currentEnrollment);
console.log("----");
currentEnrollment = paidStudentsToEnroll();
printRecords(currentEnrollment);
console.log("----");
remindUnpaid(currentEnrollment);

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
