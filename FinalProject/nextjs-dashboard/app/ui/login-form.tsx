'use client';

import { useRouter } from 'next/navigation';
import { Button } from './button';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { lusitana } from '@/app/ui/fonts';

export default function LoginForm() {
  const router = useRouter();

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    router.push('/dashboard');
  }

  return (
    <form onSubmit={handleLogin} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Please log in to continue.
        </h1>
        <Button className="mt-4 w-full">
          Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
      </div>
    </form>
  );
}