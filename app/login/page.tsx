import type { Metadata } from "next";
import LoginForm from '@/app/components/LoginForm';

export const metadata: Metadata = {
    title: 'Sign In',
    description: 'Sign in to manage Seaside Ward sacrement meeting agendas.'
};

export default function LoginPage() {
    return <LoginForm />
}