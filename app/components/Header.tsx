import Nav from './NavLinks';

export default function Header() {
    const today = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return <header>
        <Nav />
        <h1 className='m-6'>Seaside Ward - {today}</h1>
    </header>
}