// MobileMenuItems.tsx
import Link from 'next/link';

interface MobileMenuItemsProps {
  closeMobileNav: () => void;
}

const MobileMenuItems: React.FC<MobileMenuItemsProps> = ({ closeMobileNav }) => {
  return (
    <ul className="bg-gray-800 px-4 py-2">
      <li>
      <Link href="/Projects/en" className="flex font-medium w-full text-white-600 hover:text-purple-200 py-2 justify-center" onClick={closeMobileNav}>          Projects
        </Link>
      </li>
      <li>
        <Link href="/Journey/en" className="flex font-medium w-full text-white-600 hover:text-purple-200 py-2 justify-center" onClick={closeMobileNav}>
          Journey
        </Link>
      </li>
      <li>
        <Link href="/Skills/en" className="flex font-medium w-full text-white-600 hover:text-purple-200 py-2 justify-center" onClick={closeMobileNav}>
          Skills
        </Link>
      </li>
      <li>
        <Link href="https://www.linkedin.com/in/emery-dittmer/" className="flex font-medium w-full text-purple-600 hover:text-gray-200 py-2 justify-center" onClick={closeMobileNav}>
          Linkedin
        </Link>
      </li>
      <li>
        <a
          href="mailto:emery.dittmer@gmail.com?subject=Contact Request&body=Hello, I found your website and am interested in talking to you based on your skills and experience with...&attach=assets/docs/Dittmer Emery Resume.pdf"
          className="font-medium w-full inline-flex items-center justify-center border border-transparent px-4 py-2 my-2 rounded-sm text-white bg-purple-600 hover:bg-purple-700 transition duration-150 ease-in-out"
          onClick={closeMobileNav}
        >
          Contact
        </a>
      </li>
    </ul>
  );
};

export default MobileMenuItems;
