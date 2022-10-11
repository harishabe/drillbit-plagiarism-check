import { useRouter } from 'next/router';

import en from '../locales/en';
import fr from '../locales/fr';

export default function Nav() {
    const router = useRouter();
    const { locale } = router;
    const t = locale === 'en' ? en : fr || no;

    const changeLanguage = (e) => {
        const locale = e.target.value;
        router.push(router.pathname, router.asPath, { locale });
    };

    return (
        <nav>
            {t}
            <select
                onChange={changeLanguage}
                defaultValue={locale}
            >
                <option value="en">EN</option>
                <option value="fr">FR</option>
                <option value="no">NOR</option>
            </select>
        </nav>
    );
}
