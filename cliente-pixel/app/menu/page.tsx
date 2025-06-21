import Link from 'next/link';


const SubMenuComum =({urls}: any)=>{
    const BASE_COMPONENT = '/api1';
    return (
             <ul style={{ listStyle: 'none', paddingLeft: '1rem', marginTop: '0.5rem' }}>
                        
                                    {Array.isArray(urls) && urls.map((url: { href: string; label: string }, idx: number) => (
                                        <div key={idx} style={{ marginTop: '0.5rem' }}>
                                            <Link href={url.href} style={{ textDecoration: 'none', color: '#333' }}>
                                                {url.label}
                                            </Link>
                                        </div>
                                    ))}
                              
                            </ul>
    )
}
export default function MenuLateral() {
    return (
        <aside style={{
            width: '220px',
            height: '100vh',
            background: '#f4f4f4',
            padding: '2rem 1rem',
            boxSizing: 'border-box'
        }}>
            <nav>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li style={{ marginBottom: '1rem' }}>
                        <details>
                            <summary style={{ cursor: 'pointer', color: '#333', textDecoration: 'none' }}>
                                Dado Climatico
                            </summary>
                             <SubMenuComum urls={[{ href: '/api1/list', label: 'Listar' }, { href: '/api1/create', label: 'Cadastrar' }]} />
                        </details>
                    </li>
                    <li>
                           <details>
                            <summary style={{ cursor: 'pointer', color: '#333', textDecoration: 'none' }}>
                                API2
                            </summary>
                             <SubMenuComum urls={[{ href: '/api2/user/list', label: 'Listar' }, { href: '/api2/user/create', label: 'Cadastrar' }]} />
                        </details>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}