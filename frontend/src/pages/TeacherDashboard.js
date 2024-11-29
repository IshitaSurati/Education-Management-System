import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TeacherDashboard() {
    const [courses, setCourses] = useState([]);
    const [newCourse, setNewCourse] = useState({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        teacherId: '' // Initially empty, will be populated from localStorage
    });

    useEffect(() => {
        // Get teacherId from localStorage
        const teacherId = localStorage.getItem('teacherId');
        if (teacherId) {
            setNewCourse((prevCourse) => ({ ...prevCourse, teacherId }));  // Set teacherId from localStorage
        }
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const { data } = await axios.get('http://localhost:4000/api/courses');
            setCourses(data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const handleAddCourse = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:4000/api/courses', newCourse);
            setCourses([...courses, data]);
            setNewCourse({
                title: '',
                description: '',
                startDate: '',
                endDate: '',
                teacherId: localStorage.getItem('teacherId') // Keep teacherId persistent
            });
        } catch (error) {
            console.error('Error adding course:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Teacher Dashboard</h2>
            <section>
                <h3>Your Courses</h3>
                <ul className="list-group">
                    {courses.map((course) => (
                        <li key={course._id} className="list-group-item">
                            <h5>{course.title}</h5>
                            <p>{course.description}</p>
                            <p><strong>Start Date:</strong> {new Date(course.startDate).toLocaleDateString()}</p>
                            <p><strong>End Date:</strong> {new Date(course.endDate).toLocaleDateString()}</p>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="mt-4">
                <h3>Add a New Course</h3>
                <form onSubmit={handleAddCourse}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            value={newCourse.title}
                            onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea
                            className="form-control"
                            id="description"
                            value={newCourse.description}
                            onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="startDate" className="form-label">Start Date</label>
                        <input
                            type="date"
                            className="form-control"
                            id="startDate"
                            value={newCourse.startDate}
                            onChange={(e) => setNewCourse({ ...newCourse, startDate: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="endDate" className="form-label">End Date</label>
                        <input
                            type="date"
                            className="form-control"
                            id="endDate"
                            value={newCourse.endDate}
                            onChange={(e) => setNewCourse({ ...newCourse, endDate: e.target.value })}
                            required
                        />
                    </div>
                   
                    <button type="submit" className="btn btn-primary">Add Course</button>
                </form>
            </section>
        </div>
    );
}

export default TeacherDashboard;
