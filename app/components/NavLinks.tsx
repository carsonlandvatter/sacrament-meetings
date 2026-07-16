'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
    const pathname = usePathname();
    
    const links = [
        { href: '/', label: 'Home'},
        { href: '/meetings', label: 'Meetings'},
        { href: '/meetings/current', label: 'Current Meeting'}
    ];

    return (
        <nav>
            <ul className="flex justify-around p-6">
                {links.map((link) => (
                    <li key={link.href}>
                        <Link
                        href={link.href}
                        className={pathname === link.href ? 'font-bold underline' : ''}
                    >
                        {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}