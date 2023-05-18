import { getUser } from '@/lib/auth'
import Image from 'next/image'

interface IUser {
  name: string
  avatarUrl: string
}

export function Profile() {
  const { name, avatarUrl }: IUser = getUser()

  return (
    <div className="flex items-center gap-3 text-left">
      <Image
        src={avatarUrl}
        width={40}
        height={40}
        alt={name}
        className="h-10 w-10 rounded-full"
      />

      <p className="max-w-[140px] text-sm leading-snug">
        {name}
        <a href="" className="block text-red-400 hover:text-red-300">
          Wanna exit
        </a>
      </p>
    </div>
  )
}
