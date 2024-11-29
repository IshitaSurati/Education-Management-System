import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StudentDashboard() {
    const [courses, setCourses] = useState([]);
    const [submissions, setSubmissions] = useState([]); // Added submissions state
    const [newSubmission, setNewSubmission] = useState("");

    // Fetch courses and submissions when the component mounts
    useEffect(() => {
        fetchCourses();
        fetchSubmissions(); // Added function to fetch submissions
    }, []);

    const fetchCourses = async () => {
        try {
            const { data } = await axios.get('http://localhost:4000/api/courses');
            setCourses(data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    // Fetch submissions for the current student
    const fetchSubmissions = async () => {
        try {
            const studentId = "your-student-id"; // Replace with actual student ID or use authentication
            const { data } = await axios.get(`http://localhost:4000/api/submissions?studentId=${studentId}`);
            setSubmissions(data);
        } catch (error) {
            console.error('Error fetching submissions:', error);
        }
    };

    // Handle the submission of a new assignment
    const handleSubmit = async (courseId) => {
        try {
            const submissionData = { 
                courseId, 
                studentId: "your-student-id", // Replace with actual student ID
                content: newSubmission 
            };
            await axios.post('http://localhost:4000/api/submissions', submissionData);
            setNewSubmission(""); // Clear the submission input
            fetchSubmissions(); // Fetch submissions again to reflect the new submission
        } catch (error) {
            console.error('Error submitting:', error);
        }
    };

    return (
        <div>
            <h1>Student Dashboard</h1>

            <h2>Available Courses</h2>
            <ul>
                {courses.map(course => (
                    <li key={course._id}>
                        {course.title} - {course.description}
                        <textarea 
                            placeholder="Write your submission"
                            value={newSubmission}
                            onChange={e => setNewSubmission(e.target.value)}
                        />
                        <button onClick={() => handleSubmit(course._id)}>Submit</button>
                    </li>
                ))}
            </ul>

            <h2>Your Submissions</h2>
            {submissions.length === 0 ? (
                <p>You have not submitted any assignments yet.</p>
            ) : (
                <ul>
                    {submissions.map(submission => (
                        <li key={submission._id}>
                            <strong>Course:</strong> {submission.courseTitle} <br />
                            <strong>Content:</strong> {submission.content} <br />
                            <strong>Submitted on:</strong> {new Date(submission.createdAt).toLocaleDateString()}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default StudentDashboard;
