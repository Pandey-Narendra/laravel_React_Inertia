import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Admin from './Profile/Admin';
import User from './Profile/User';

export default function Dashboard({ auth, users }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            {auth.user.role == 'admin' && (
                <Admin user={auth.user} list={users} isAdminPage={true} />
            )}
            {auth.user.role != 'admin' && (
                <User user={auth.user} isAdminPage={false} />
            )}
        </AuthenticatedLayout>
    );
}
