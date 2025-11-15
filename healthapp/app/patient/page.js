"use client";
import AuthLayout from "../AuthLayout";
import HomeClient from "./_components/HomeClient";
import SidebarLayout from "./_components/Navbar";

export default function PatientPage() {
  return (
    <AuthLayout>
      <SidebarLayout activeSection="Health Profile">
        <HomeClient />
      </SidebarLayout>
    </AuthLayout>
  );
}
