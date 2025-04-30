'use client';

import { useAuthStore } from '@/features/auth/utils/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function ProfileViewPage() {
  const user = useAuthStore((state) => state.user);

  if (!user) return null;

  return (
    <div className='flex w-full flex-col p-4'>
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex items-center space-x-4'>
            <Avatar className='h-20 w-20'>
              <AvatarImage
                src={`https://avatar.vercel.sh/${user?.email}`}
                alt={user?.firstName}
              />
              <AvatarFallback>
                {user?.firstName.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className='text-2xl font-bold'>{user?.firstName}</h2>
              <p className='text-muted-foreground'>{user?.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
