'use client';
import AuthLayout from "../AuthLayout";
import SidebarLayout from "../patient/_components/Navbar";
import RecordsPage from "../components/RecordsPage";

export default function Records() {
    return (
        <AuthLayout>
            <SidebarLayout activeSection="Medical Records">
                <RecordsPage />
            </SidebarLayout>
        </AuthLayout>
    );
}