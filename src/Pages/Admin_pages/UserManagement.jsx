import React, { useState } from 'react';
import styles from '../../style/Admin/UserManagement.module.css';
import AddUserModal from '../../components/Admin/AddUserModal';
import EditUserModal from '../../components/Admin/EditUserModal';
import DeleteUserModal from '../../components/Admin/DeleteUserModal';


const dummyUsers = [
    { id: 1, name: 'Asha K.', email: 'asha@example.com', phone: '0712345678', role: 'farmer', isSuspended: false },
    { id: 2, name: 'John Expert', email: 'john@example.com', phone: '0789876543', role: 'expert', isSuspended: false },
    { id: 3, name: 'Musa Officer', email: 'musa@example.com', phone: '0751122334', role: 'officer', isSuspended: false },
    { id: 4, name: 'Admin One', email: 'admin1@example.com', phone: '0700123456', role: 'admin', isSuspended: false },
    { id: 5, name: 'Admin One', email: 'admin1@example.com', phone: '0700123456', role: 'admin', isSuspended: false },
    { id: 6, name: 'Admin One', email: 'admin1@example.com', phone: '0700123456', role: 'admin', isSuspended: false },
    { id: 7, name: 'Admin One', email: 'admin1@example.com', phone: '0700123456', role: 'admin', isSuspended: false },
    { id: 8, name: 'Admin One', email: 'admin1@example.com', phone: '0700123456', role: 'admin', isSuspended: false },
    { id: 9, name: 'Admin One', email: 'admin1@example.com', phone: '0700123456', role: 'admin', isSuspended: false },
    // ongeza zaidi kwa test...
];

const UserManagement = () => {
    const [showModal, setShowModal] = useState(false);
    const [search, setSearch] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [users, setUsers] = useState(dummyUsers);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;

    const [statusFilter, setStatusFilter] = useState('all');

    const filteredUsers = users.filter((user) => {
        const matchesSearch =
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase());
        const matchesRole = roleFilter === 'all' || user.role === roleFilter;
        const matchesStatus = statusFilter === 'active' ? !user.isSuspended : statusFilter === 'suspended'? user.isSuspended : 'all'
        return matchesSearch && matchesRole && matchesStatus;
    });

    const indexOfLast = currentPage * usersPerPage;
    const indexOfFirst = indexOfLast - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
    // #Action button-----------------------------------
    const [editUser, setEditUser] = useState(null);

    const handleAddUser = (newUser) => {
        setUsers((prev) => [...prev, { ...newUser, id: Date.now() }]);
    };
    const handleEdit = (user) => {
        console.log("Edit user:", user);
        setEditUser(user);
        // Hapa unaweza kufungua EditModal au kuweka state ya user wa ku-edit
    };

    // const handleDelete = (id) => {
    //     if (window.confirm('Una uhakika unataka kufuta huyu mtumiaji?')) {
    //         setUsers((prev) => prev.filter((u) => u.id !== id));
    //     }
    // };

    const handleSuspendToggle = (id) => {
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.id === id ? { ...user, isSuspended: !user.isSuspended } : user
            )
        );
    };


    // # Manage EditiModal------------------------------

    const handleUpdateUser = (updatedUser) => {
        setUsers((prev) =>
            prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
        );
    };

    // # Delete Modal------------------------------

    const [deleteUser, setDeleteUser] = useState(null);

    const handleDeleteClick = (user) => {
        setDeleteUser(user);
    };

    const handleConfirmDelete = (id) => {
        setUsers((prev) => prev.filter((u) => u.id !== id));
    };

    // //#Status filter--------------------------------
    
      


    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>Usimamizi wa Watumiaji</h2>
                <button onClick={() => setShowModal(true)}>+ Ongeza Mtumiaji</button>
            </div>

            <div className={styles.filters}>
                <input
                    type="text"
                    placeholder="Tafuta kwa jina au barua pepe..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
                    <option value="all">Aina Zote</option>
                    <option value="farmer">Wakulima</option>
                    <option value="expert">Wataalamu</option>
                    <option value="officer">Maafisa</option>
                    <option value="admin">Admin</option>
                </select>
            </div>
            <div className={styles.filterBar}>
                <label>Status:</label>
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                    <option value="all">Wote</option>
                    <option value="active">Active</option>
                    <option value="suspended">Suspended</option>
                </select>
            </div>


            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Jina</th>
                        <th>Email</th>
                        <th>Simu</th>
                        <th>Jukumu</th>
                        <th style={{textAlign: 'center'}}>Hatua</th>
                        <th style={{textAlign: 'center'}}>Status</th>
                    </tr>
                </thead>

                <tbody>
                    {currentUsers.map((user) => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.role}</td>
                            <td className={styles.actions}>
                                <button onClick={() => handleEdit(user)} className={styles.editBtn}>Edit✏️</button>
                                <button onClick={() => handleDeleteClick(user)} className={styles.deleteBtn}
                                    disabled={user.isSuspended}
                                >Delete 🗑️</button>
                                <button
                                    onClick={() => handleSuspendToggle(user.id)}
                                    className={styles.suspendBtn}
                                >
                                    {user.isSuspended ? 'Activate ✅ ' : 'Suspend ⛔'}
                                </button>
                            </td>
                            <td>
                                <span className={user.isSuspended ? styles.suspended : styles.active}>
                                    {user.isSuspended ? 'Suspended' : 'Active'}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>

            <div className={styles.pagination}>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                    <button
                        key={pg}
                        className={pg === currentPage ? styles.active : ''}
                        onClick={() => setCurrentPage(pg)}
                    >
                        {pg}
                    </button>
                ))}
            </div>

            <AddUserModal isOpen={showModal} onClose={() => setShowModal(false)} onAdd={handleAddUser} />
            <EditUserModal
                isOpen={!!editUser}
                onClose={() => setEditUser(null)}
                user={editUser}
                onUpdate={handleUpdateUser}
            />
            <DeleteUserModal
                isOpen={!!deleteUser}
                onClose={() => setDeleteUser(null)}
                user={deleteUser}
                onDelete={handleConfirmDelete}
            />


        </div>
    );
};

export default UserManagement;
