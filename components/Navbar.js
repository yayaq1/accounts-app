import Image from 'next/image';
import Link from 'next/link';
import { Disclosure, Menu } from '@headlessui/react';
import { MenuIcon, XIcon, ChevronRightIcon } from '@heroicons/react/solid';

const navigation = [
  { name: 'Home', href: '/', subItems: [] },
  { name: 'About us', href: '/about-us', subItems: [] },
  { name: 'Sectors We Serve', href: '/sectors-we-serve', subItems: [] },
  { name: 'Tax Services', href: '/tax-services', subItems: [] },
  { name: 'Accounting Services', href: '/accounting-services', subItems: [] },
  { name: 'Contact us', href: '/contact', subItems: [] },
];

export default function Navbar() {
  return (
    <Disclosure
      as="nav"
      className="fixed top-0 px-3 w-full bg-[#3b445f] shadow-sm z-50 h-18"
    >
      {({ open }) => (
        <>
          <div className="mx-auto">
            <div className="flex justify-between items-center h-24">
              {/* Desktop Logo */}
              <div className="hidden lg:block">
                <Link href="/">
                  <a>
                    <img
                      src="/newLogo.png"
                      alt="Logo"
                      className="w-[100px] h-auto"
                      // className="h-[280px] w-[280px] xl:h-[280px] xl:w-[360px]"
                    />
                  </a>
                </Link>
              </div>

              {/* Mobile Logo */}
              <div className="block lg:hidden">
                <Link href="/">
                  <a>
                    <img
                      src="/MobileLogo.png"
                      alt="Mobile Logo"
                      className="h-[80px] w-[70px]"
                    />
                  </a>
                </Link>
              </div>

              <div className="w-full flex-grow  flex justify-center">
                <div className="hidden lg:flex space-x-12 ">
                  {navigation.map(({ name, href, subItems }) => (
                    <div className="relative group" key={name}>
                      <Link href={href}>
                        <a
                          className={`inline-flex items-center py-2 font-medium rounded-md text-white hover:text-[#475374] duration-100
                          ${'text-sm' && 'xl:text-base' && '2xl:text-lg'}`}
                        >
                          {name}
                        </a>
                      </Link>
                      {subItems.length > 0 && (
                        <div className="absolute left-0 hidden group-hover:block bg-white shadow-lg rounded-md">
                          <div className="py-0">
                            {subItems.map((item) => (
                              <Link href={href} key={item}>
                                <a className="block px-8 py-4 text-sm text-gray-700 hover:bg-gray-100">
                                  {item}
                                </a>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center">
                <div className="flex lg:hidden items-center">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md text-white hover:text-blue-900 duration-300">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-7 w-7" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-9 w-9" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="lg:hidden border-t-2 border-white overflow-y-auto max-h-screen">
            <div className="px-10 py-8 space-y-8">
              {navigation.map(({ name, href, subItems }) => (
                <div key={name}>
                  <Link href={href}>
                    <Disclosure.Button
                      as="a"
                      className="group flex justify-between cursor-pointer"
                    >
                      <span className="text-white font-medium group-hover:translate-x-2 duration-300">
                        {name}
                      </span>
                      <ChevronRightIcon className="text-white group-hover:text-blue-900 block h-7 w-7 duration-300" />
                    </Disclosure.Button>
                  </Link>
                  {subItems.length > 0 && (
                    <div className="pl-8 mt-2">
                      {subItems.map((item) => (
                        <Link href={href} key={item}>
                          <a className="block px-4 py-2 text-sm text-white hover:bg-sky-600">
                            {item}
                          </a>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
