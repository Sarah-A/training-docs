var printRecords = (recordIds) => {
	recordIds.map(getStudentRecordForId)
		.sort(sortByNameAscending)
		.forEach(printStudentRecord);
}

var sortByNameAscending = (record1, record2) => {
	if (record1.name < record2.name) {
		return -1;
	} else if (record1.name > record2.name) {
		return 1;
	} else {
		return 0;
	}
}

var paidStudentsToEnroll = () => {
	var studentsToEnroll = studentRecords
		.filter(shouldEnroll)
		.map(studentRecord => studentRecord.id);

	return [...currentEnrollment, ...studentsToEnroll];

	function shouldEnroll(student) {
		return (student.paid && !currentEnrollment.includes(student.id));
	}
}

var remindUnpaid = (recordIds) => {
	var unpaidIds = recordIds.filter(studentId => {
		var student = getStudentRecordForId(studentId => {
			studentRecords.find(record => (record.id === studentId));
		});
		return (student && !student.paid);
	});
	printRecords(unpaidIds);

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
