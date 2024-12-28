async function fetchStudentData(studentid) {
    try {
        const response = await fetch(`${baseUrl}/api/students/${studentid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch student data');
        }

        const feeDetails = await response.json();
        console.log(feeDetails); // Log the entire response

        if (feeDetails) {
            document.getElementById('box1').textContent = `Name: ${feeDetails.name || 'N/A'}`;
            document.getElementById('box2').textContent = `College: ${feeDetails.college_name || 'N/A'}`;
            document.getElementById('mob1').textContent = `Mobile No: ${feeDetails.mobileno || 'N/A'}`;
            document.getElementById('mob2').textContent = `Parent Mobile No: ${feeDetails.parent_mobileno || 'N/A'}`;
            document.getElementById('mob3').textContent = `Student ID: ${feeDetails.studentid || 'N/A'}`;
            document.getElementById('totalFee').textContent = `Total Fee: ${feeDetails.totalFee || 'N/A'}`;
            document.getElementById('paidAmount').textContent = `Paid Amount: ${feeDetails.paidAmount || 'N/A'}`;
            document.getElementById('remainingAmount').textContent = `Remaining Amount: ${feeDetails.remainingAmount || 'N/A'}`;
            document.getElementById('course').textContent = `Course: ${feeDetails.course || 'N/A'}`;
            document.getElementById('nextInstallment').textContent = `Next Installment: ${feeDetails.nextInstallmentAmount || 'N/A'}`;
        } else {
            console.error('No fee details found');
        }
    } catch (error) {
        console.error('Error fetching student data:', error);
    }
}
