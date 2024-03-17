import UsersList from "@/Components/Front/Navbar/Comman/UsersList";
const Admin = ({user, list, isAdminPage}) => {
    return(
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <h1 className="text-center">Hello Admin {user.name} </h1>
                    <h1 className="text-center">Add Roles Here</h1>
                    <div className="p-6 text-gray-900">
                        <UsersList list={list}  isAdminPage={isAdminPage}/>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Admin;