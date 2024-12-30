'use client'

import { Suspense, useState } from 'react'
import UserSearch from './components/user-search'
import { UserDialog } from './components/user-dialog'
import { UserEditDialog } from './components/user-edit-dialog'
import { User } from './actions/schemas'

export default function Home() {
  const [userToEdit, setUserToEdit] = useState<User | null>(null)

  const handleEdit = (user: User) => {
    setUserToEdit(user) // Set user to edit
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">User Management</h1>

      {/* Search for users */}
      <Suspense fallback={<div>Loading...</div>}>
        <UserSearch onEdit={handleEdit} />
      </Suspense>

      {/* Open dialog if user is selected for editing */}
      {userToEdit && (
        <UserEditDialog user={userToEdit} />
      )}
      
      {/* Add user dialog */}
      <UserDialog />
    </div>
  )
}
