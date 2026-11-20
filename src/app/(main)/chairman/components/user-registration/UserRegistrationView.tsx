"use client"

import { useState } from "react"
import UserRegistrationTable from "./UserRegistrationTable"
import RegisterUserScreen from "./RegisterUserScreen"
import { INITIAL_REGISTERED_USERS, RegisteredUser } from "./UserRegistrationData"

export default function UserRegistrationView() {
  const [users, setUsers] = useState<RegisteredUser[]>(INITIAL_REGISTERED_USERS)
  const [currentView, setCurrentView] = useState<"table" | "register">("table")

  const handleOpenRegister = () => {
    setCurrentView("register")
  }

  const handleRegisterUser = (newUser: RegisteredUser) => {
    setUsers((prev) => [
      ...prev,
      { ...newUser, id: prev.length ? Math.max(...prev.map((u) => u.id)) + 1 : 1 },
    ])
  }

  const handleUpdateUser = (updated: RegisteredUser) => {
    setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)))
  }

  return (
    <div className="w-full max-w-[1600px] mx-auto p-4 sm:p-6 flex flex-col gap-4 pb-12">
      {currentView === "register" ? (
        <RegisterUserScreen
          onCancel={() => setCurrentView("table")}
          onRegister={handleRegisterUser}
        />
      ) : (
        <UserRegistrationTable
          users={users}
          onOpenRegister={handleOpenRegister}
          onUpdateUser={handleUpdateUser}
        />
      )}
    </div>
  )
}
