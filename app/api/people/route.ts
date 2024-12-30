import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid';  // Import UUID
import { User } from '@/app/actions/schemas'
import { addUser, searchUsers } from '@/app/actions/actions'

// Handle GET request for searching users
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('query')

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 })
  }

  try {
    const users: User[] = await searchUsers(query)

    if (users.length === 0) {
      return NextResponse.json({ message: 'No users found' }, { status: 404 })
    }

    return NextResponse.json(users)
  } catch (error) {
    console.error('Error searching users:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Handle POST request for adding a user
export async function POST(request: NextRequest) {
  try {
    const data = await request.json() // Extract data from the request body

    // Add UUID for user ID
    const userWithId = { ...data, id: uuidv4() }  // Add the generated UUID

    // Call the addUser function to add the user
    const newUser = await addUser(userWithId)  // Assuming addUser returns the newly created user

    return NextResponse.json({
      success: true,
      message: `User ${newUser.name} added successfully`,
      data: newUser,
    })
  } catch (error) {
    console.error('Error adding user:', error)
    return NextResponse.json({
      success: false,
      message: 'Failed to add user',
    })
  }
}
