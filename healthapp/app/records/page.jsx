'use client';
import AuthLayout from "../AuthLayout"; // Import the AuthLayout
import RecordsPage from "../components/RecordsPage";

export default function Records() {
    return (
        <AuthLayout>
            <RecordsPage />
        </AuthLayout>
    );
}