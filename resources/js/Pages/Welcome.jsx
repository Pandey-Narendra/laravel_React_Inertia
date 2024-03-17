import { Link, Head } from '@inertiajs/react';
import Navbar from '@/Components/Front/Navbar/Navbar';
import Slider from '@/Components/Front/Navbar/Home/Slider';
import UsersList from '@/Components/Front/Navbar/Comman/UsersList';

export default function Welcome({ auth, users, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Home" />
            
            <Navbar isLogin={auth} />
            <Slider />
            <UsersList list={users} isAdminPage={false} />
        </>
    );
}
