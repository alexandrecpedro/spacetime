import { cookies } from 'next/headers'
import decode from 'jwt-decode'

interface IUser {
  sub: string
  name: string
  avatarUrl: string
}

export function getUser(): IUser {
  const token: string | undefined = cookies().get('token')?.value

  if (!token) {
    throw new Error('Unauthenticated.')
  }

  const user: IUser = decode(token)

  return user
}
