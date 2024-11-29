import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [loadingCourses, setLoadingCourses] = useState(true);
    const [editUser, setEditUser] = useState(null);
    const [editCourse, setEditCourse] = useState(null);
    const [newUserData, setNewUserData] = useState({
        name: '',
        email: '',
        role: ''
    });
    const [newCourseData, setNewCourseData] = useState({
        title: '',
        description: ''
    });

    // Get token from localStorage
    const token = localStorage.getItem('JWT_TOKEN');

    // Fetch Users
    const fetchUsers = useCallback(async () => {
        if (!token) {
            console.error('Token is missing');
            return;
        }

        try {
            const { data } = await axios.get('http://localhost:4000/api/auth/users', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(data);
            setLoadingUsers(false);
        } catch (error) {
            setLoadingUsers(false);
            console.error('Error fetching users:', error.response ? error.response.data : error);
        }
    }, [token]);

    // Fetch Courses
    const fetchCourses = useCallback(async () => {
        if (!token) {
            console.error('Token is missing');
            return;
        }

        try {
            const { data } = await axios.get('http://localhost:4000/api/courses', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCourses(data);
            setLoadingCourses(false);
        } catch (error) {
            setLoadingCourses(false);
            console.error('Error fetching courses:', error.response ? error.response.data : error);
        }
    }, [token]);

    useEffect(() => {
        if (token) {
            fetchUsers();
            fetchCourses();
        } else {
            console.log('No token found');
        }
    }, [token, fetchUsers, fetchCourses]);

    const handleDeleteCourse = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/api/courses/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCourses(courses.filter(course => course._id !== id));
        } catch (error) {
            console.error('Error deleting course:', error.response ? error.response.data : error);
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/api/auth/users/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(users.filter(user => user._id !== id));
        } catch (error) {
            console.error('Error deleting user:', error.response ? error.response.data : error);
        }
    };

    const handleUpdateUser = async () => {
        if (!newUserData.name || !newUserData.email || !newUserData.role) {
            console.log('Please fill in all fields');
            return;
        }

        try {
            const { data } = await axios.put(`http://localhost:4000/api/auth/users/${editUser._id}`, newUserData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(users.map(user => user._id === editUser._id ? data : user));
            setEditUser(null);
            setNewUserData({ name: '', email: '', role: '' }); // Reset form
        } catch (error) {
            console.error('Error updating user:', error.response ? error.response.data : error);
        }
    };

    const handleUpdateCourse = async () => {
        if (!newCourseData.title || !newCourseData.description) {
            console.log('Please fill in all fields');
            return;
        }

        try {
            const { data } = await axios.put(`http://localhost:4000/api/courses/${editCourse._id}`, newCourseData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCourses(courses.map(course => course._id === editCourse._id ? data : course));
            setEditCourse(null);
            setNewCourseData({ title: '', description: '' }); // Reset form
        } catch (error) {
            console.error('Error updating course:', error.response ? error.response.data : error);
        }
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>

            {/* Users Section */}
            <h2>Users</h2>
            {loadingUsers ? (
                <p>Loading users...</p>
            ) : (
                <ul>
                    {users.map(user => (
                        <li key={user._id}>
                            {user.name} ({user.email}) - {user.role}
                            <button onClick={() => {
                                setEditUser(user);
                                setNewUserData({ name: user.name, email: user.email, role: user.role });
                            }}>Edit</button>
                            <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}

            {/* Edit User Form */}
            {editUser && (
                <div>
                    <h3>Edit User</h3>
                    <input
                        type="text"
                        placeholder="Name"
                        value={newUserData.name}
                        onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={newUserData.email}
                        onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Role"
                        value={newUserData.role}
                        onChange={(e) => setNewUserData({ ...newUserData, role: e.target.value })}
                    />
                    <button onClick={handleUpdateUser}>Update User</button>
                    <button onClick={() => setEditUser(null)}>Cancel</button>
                </div>
            )}

            {/* Courses Section */}
            <h2>Courses</h2>
            {loadingCourses ? (
                <p>Loading courses...</p>
            ) : (
                <ul>
                    {courses.map(course => (
                        <li key={course._id}>
                            {course.title} - {course.description}
                            <button onClick={() => {
                                setEditCourse(course);
                                setNewCourseData({ title: course.title, description: course.description });
                            }}>Edit</button>
                            <button onClick={() => handleDeleteCourse(course._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}

            {/* Edit Course Form */}
            {editCourse && (
                <div>
                    <h3>Edit Course</h3>
                    <input
                        type="text"
                        placeholder="Title"
                        value={newCourseData.title}
                        onChange={(e) => setNewCourseData({ ...newCourseData, title: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={newCourseData.description}
                        onChange={(e) => setNewCourseData({ ...newCourseData, description: e.target.value })}
                    />
                    <button onClick={handleUpdateCourse}>Update Course</button>
                    <button onClick={() => setEditCourse(null)}>Cancel</button>
                </div>
            )}
        </div>
    );
}

export default AdminDashboard;
