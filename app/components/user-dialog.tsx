// app/components/user-dialog.tsx
'use client'

import { addUser } from '@/app/actions/actions'
import { userFormSchema, UserFormData } from '@/app/actions/schemas'  // Ensure 'User' is imported here
import { UserForm } from './user-form'
import MutableDialog from '@/components/mutable-dialog' // Adjusted import

// Define the UserDialog component
export function UserDialog() {
  // Handle user addition logic
  const handleAddUser = async (data: UserFormData): Promise<{ success: boolean; message: string }> => {
    try {
      const newUser = await addUser(data); // Assuming addUser returns the created user
      return {
        success: true,
        message: `User ${newUser.name} added successfully`, // Return success message
      }
    } catch (error) {
      return {
        success: false,
        message: 'Failed to add user', // Return error message
      }
    }
  }

  return (
    <MutableDialog<UserFormData>  // Use your dialog component here
      formSchema={userFormSchema}  // Pass the form schema
      FormComponent={UserForm}     // Pass the form component
      action={handleAddUser}       // Pass the action to handle user addition
      triggerButtonLabel="Add User" // Label for the button to open dialog
      addDialogTitle="Add New User"  // Title of the dialog
      dialogDescription="Fill out the form below to add a new user." // Description for the dialog
      submitButtonLabel="Add User"  // Submit button label
    />
  )
}
