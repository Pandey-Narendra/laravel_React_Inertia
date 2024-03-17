import AssignRoles from '@/Components/Back/Profile/AssignRoles';
import React, { useState } from 'react';

const UsersList = ({ list, isAdminPage }) => {
    const [showRoleComponent, setShowRoleComponent] = useState(null);

    function handleClick(userId) {
        setShowRoleComponent(userId);
        console.log(userId);
    }

    return (
        <div className="mx-auto bg-gray-100 py-8 px-4">
            <h1 className="text-2xl font-bold mb-4">Users</h1>
            <div className="grid grid-cols-2 gap-4">
                {list.map(user => (
                    <div key={user.id} className="border p-4 rounded-lg shadow-md bg-white">
                        <img src={`/storage/images/${user.image}`} alt="User Image" className="w-16 h-16 rounded-full mb-2" />
                        <p className="font-bold">{user.name}</p>
                        <p className="text-gray-600">{user.email}</p>

                        {isAdminPage && (
                            <button onClick={() => handleClick(user.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Role</button>
                        )}

                        {showRoleComponent === user.id && (
                            <AssignRoles id={user.id} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UsersList;
