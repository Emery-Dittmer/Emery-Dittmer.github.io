// MobileMenuItems.tsx
import Link from 'next/link';
import { getPathWithLocale } from '@/lib/i18n';

interface MobileMenuItemsProps {
  closeMobileNav: () => void;
  locale: 'en' | 'fr';
  pathname: string;
}

const MobileMenuItems: React.FC<MobileMenuItemsProps> = ({ closeMobileNav, locale, pathname }) => {
  const copy = {
    en: {
      projects: 'Projects',
      journey: 'Journey',
      skills: 'Skills',
      linkedin: 'LinkedIn',
      contact: 'Contact',
      menu: 'Menu',
      contactSubject: 'Contact Request',
      contactBody:
        'Hello, I found your website and am interested in talking to you based on your skills and experience with...',
    },
    fr: {
      projects: 'Projets',
      journey: 'Parcours',
      skills: 'Compétences',
      linkedin: 'LinkedIn',
      contact: 'Contact',
      menu: 'Menu',
      contactSubject: 'Demande de contact',
      contactBody:
        'Bonjour, j’ai trouvé votre site et je souhaite échanger avec vous au sujet de vos compétences et de votre expérience dans...',
    },
  }
  const t = copy[locale]
  const contactHref = `mailto:emery.dittmer@gmail.com?subject=${encodeURIComponent(
    t.contactSubject
  )}&body=${encodeURIComponent(
    t.contactBody
  )}&attach=assets/docs/Dittmer Emery Resume.pdf`

  return (
    <ul className="bg-gray-800 px-4 py-2">
      <li>
      <Link href={`/Projects/${locale}`} className="flex font-medium w-full text-white-600 hover:text-purple-200 py-2 justify-center" onClick={closeMobileNav}>
        {t.projects}
        </Link>
      </li>
      <li>
        <Link href={`/Journey/${locale}`} className="flex font-medium w-full text-white-600 hover:text-purple-200 py-2 justify-center" onClick={closeMobileNav}>
          {t.journey}
        </Link>
      </li>
      <li>
        <Link href={`/Skills/${locale}`} className="flex font-medium w-full text-white-600 hover:text-purple-200 py-2 justify-center" onClick={closeMobileNav}>
          {t.skills}
        </Link>
      </li>
      <li>
        <Link href="https://www.linkedin.com/in/emery-dittmer/" className="flex font-medium w-full text-purple-600 hover:text-gray-200 py-2 justify-center" onClick={closeMobileNav}>
          {t.linkedin}
        </Link>
      </li>
      <li>
        <a
          href={contactHref}
          className="font-medium w-full inline-flex items-center justify-center border border-transparent px-4 py-2 my-2 rounded-sm text-white bg-purple-600 hover:bg-purple-700 transition duration-150 ease-in-out"
          onClick={closeMobileNav}
        >
          {t.contact}
        </a>
      </li>
      <li className="flex justify-center py-2">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide">
          <Link
            href={getPathWithLocale(pathname, 'en')}
            className={locale === 'en' ? 'text-purple-200' : 'text-gray-400 hover:text-purple-200'}
            onClick={closeMobileNav}
          >
            EN
          </Link>
          <span className="text-gray-600">/</span>
          <Link
            href={getPathWithLocale(pathname, 'fr')}
            className={locale === 'fr' ? 'text-purple-200' : 'text-gray-400 hover:text-purple-200'}
            onClick={closeMobileNav}
          >
            FR
          </Link>
        </div>
      </li>
    </ul>
  );
};

export default MobileMenuItems;
