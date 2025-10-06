import React, { useEffect, useState } from 'react';
import styles from '../../style/Admin/UserManagement.module.css';
import AddUserModal from '../../components/Admin/AddUserModal';
import EditUserModal from '../../components/Admin/EditUserModal';
import DeleteUserModal from '../../components/Admin/DeleteUserModal';
import axiosAuthApi from '../../utils/http';
import UserInfo from '../../components/Admin/UserInfo';


const UserManagement = () => {
    const [showModal, setShowModal] = useState(false);
    const [search, setSearch] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [users, setUsers] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;
    // const [getData, setData] = use

    const [statusFilter, setStatusFilter] = useState('all');

    const filteredUsers = users?.filter((user) => {
        const matchesSearch =
            user?.first_name.toLowerCase().includes(search.toLowerCase()) ||
            user?.email?.toLowerCase().includes(search.toLowerCase());
        const matchesRole = roleFilter === 'all' || user.role_name === roleFilter;
        const matchesStatus = statusFilter === 'active' ? !user.is_suspended : statusFilter === 'suspended' ? user.is_suspended : 'all'
        return matchesSearch && matchesRole && matchesStatus;
    });

    const indexOfLast = currentPage * usersPerPage;
    const indexOfFirst = indexOfLast - usersPerPage;
    const currentUsers = filteredUsers?.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(filteredUsers?.length / usersPerPage);
    // #Action button-----------------------------------
    const [editUser, setEditUser] = useState(null);
    const [showInfo, setShowInfo] = useState(false)
    const [UserInfom, setUserInfom] = useState()

    const [roles, setRole] = useState()

    const handleAddUser = async (newUser) => {
        // setUsers((prev) => [...prev, { ...newUser, id: Date.now() }]);

        console.log(newUser)
        try {
            const resp = await axiosAuthApi.post('/auth/signup/', { ...newUser })

            data()
        } catch (err) {
            console.log(err)
        }

    };


    const get_role = async () => {
        try {
            const resp = await axiosAuthApi.get('/auth/roles/')
            setRole(resp)
            console.log(resp)
        } catch (err) {
            console.log(err)
        }
    }

    const handleEdit = (user) => {
        console.log("Edit user:", user);
        setEditUser(user);
        // Hapa unaweza kufungua EditModal au kuweka state ya user wa ku-edit
    };



    const handleSuspendToggle = async(id) => {
        try{

        }catch(err){
            console.log(err)
        }
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

    const data = async () => {
        try {
            const resp = await axiosAuthApi.get('/details/details/')
            setUsers(resp)
            console.log(resp)
        } catch (err) {
            console.log(err)
        }
    }

    const Userinfo = async (userId) => {
        try {
            const resp = await axiosAuthApi.get(`/details/details/${userId}/`)
            setUserInfom(resp)
            setShowInfo(true)
        } catch (error) {
            console.log(`Error kuchukua taarifa za User: ${error}`)
        }
    }

    useEffect(() => {
        data()
        get_role()
    }, [])




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
                    <option value="Farmer">Wakulima</option>
                    <option value="ExtOfficer">Maafisa</option>
                    <option value="Cadmin">Admin</option>
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
                        <th style={{ textAlign: 'center' }}>Hatua</th>
                        <th style={{ textAlign: 'center' }}>Status</th>
                    </tr>
                </thead>

                <tbody>
                    {currentUsers?.map((user) => (
                        <tr key={user.id}>
                            <td onClick={() => Userinfo(user.id)}>{user.first_name.charAt(0).toUpperCase() + user?.first_name.slice(1).toLowerCase()} .{user.last_name.charAt(0).toUpperCase()}</td>
                            <td onClick={() => Userinfo(user.id)}>{user.email}</td>
                            <td onClick={() => Userinfo(user.id)}>{user.phoneNumber}</td>
                            <td onClick={() => Userinfo(user.id)}>{user.role_name}</td>
                            <td className={styles.actions}>
                                <button onClick={() => handleEdit(user)} className={styles.editBtn}>Edit✏️</button>
                                <button onClick={() => handleDeleteClick(user)} className={styles.deleteBtn}
                                    disabled={user.is_suspended}
                                >Delete 🗑️</button>
                                <button
                                    onClick={() => handleSuspendToggle(user.id)}
                                    className={styles.suspendBtn}
                                >
                                    {user.is_suspended ? 'Activate ✅ ' : 'Suspend ⛔'}
                                </button>
                            </td>
                            <td>
                                <span className={user.is_suspended ? styles.suspended : styles.active}>
                                    {user.is_suspended ? 'Suspended' : 'Active'}
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

            <AddUserModal isOpen={showModal} onClose={() => setShowModal(false)} onAdd={handleAddUser}  is_Role={roles}/>
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
            <UserInfo
                isOpen={showInfo}
                userInfo={UserInfom}
                onClose={() => setShowInfo(false)}
            />

        </div>
    );
};

export default UserManagement;
