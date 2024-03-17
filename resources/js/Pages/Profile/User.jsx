const User = ({user}) => {
    return(
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900">
                        <h1 className="text-center">User Component</h1>
                        <h1 className="text-center">Hello User {user.name}</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default User;