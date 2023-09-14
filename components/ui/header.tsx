import EmeryLogo from '@/assets/logos/EmeryLogo.svg'
import Link from 'next/link'
import MobileMenu from './mobile-menu'
import Image from 'next/image';

export default function Header() {
  return (
    <header className="fixed top-0 w-full z-30 bg-black shadow-md transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Site branding */}
          <div className="shrink-0 mr-4">
            {/* Logo */}
            <Link href="/" className="block" aria-label="Emery">
              <Image
                src={EmeryLogo}
                alt="Emery Logo"
                className="w-10 h-10"
              />
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow">
            {/* Desktop sign in links */}
            <ul className="flex grow justify-end flex-wrap items-center">
              
              <li>
                <Link 
                  href="/Projects"
                  className="font-medium text-white-600 hover:text-purple-200 px-4 py-3 flex items-center transition duration-150 ease-in-out"
                  >
                  Projects
                </Link>
              </li>

              <li>
                <Link
                  href="/Journey"
                  className="font-medium text-white-600 hover:text-purple-200 px-4 py-3 flex items-center transition duration-150 ease-in-out"
                  >
                  Journey
                </Link>
              </li>

{/*               <li>
                <Link 
                href="/Skills"
                className="font-medium text-white-600 hover:text-purple-200 px-4 py-3 flex items-center transition duration-150 ease-in-out"
                >
                  Skills
                </Link>
              </li> */}

              <li>
                <Link
                  href="https://www.linkedin.com/in/emery-dittmer/"
                  className="font-medium text-purple-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out"
                >
                  Linkedin
                </Link>
              </li>


              <li>
                <a
                  href="mailto:emery.dittmer@gmail.com?subject=Contact Request&body=Hello,
                  I found your website and am interested in talking to you based on your skills and experience with...&attach=assets/docs/Dittmer Emery Resume.pdf"
                  className="btn-sm text-white bg-purple-600 hover:bg-purple-700 ml-3"
                >
                  Contact
                </a>
              </li>

            </ul>
          </nav>

          <MobileMenu />

        </div>
      </div>
    </header>
  )
}

 
