  import Link from 'next/link'
  import Image from 'next/image'
  import { Phone, Mail, Globe, MapPin } from 'lucide-react'

  const footerLinks = [
    { name: 'Sectors We Serve', href: '/sectors-we-serve' },
    { name: 'Tax Services', href: '/tax-services' },
    { name: 'Accounting Services', href: '/accounting-services' },
    { name: 'Contact Us', href: '/contact' },
  ]

  export default function Footer() {
    return (
      <footer className="bg-[#3b445f] shadow-sm">
        <div className="px-8 lg:px-12 py-12 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
            {/* Contact Information */}
            <div className="text-white space-y-4">
              <h3 className="font-semibold text-xl mb-6 border-b border-gray-500 pb-2">Contact Us</h3>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <p>+44 7889 255949</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <a href="mailto:info@wisenumbers.co.uk" className="hover:underline">info@wisenumbers.co.uk</a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                <p>Apex House, Calthorpe Road<br />Birmingham. B15 1TR</p>
              </div>
            </div>

            {/* Logos */}
            <div className="flex flex-col items-center justify-center space-y-6">
              <div className="relative w-[180px] h-[90px]">
                <Image src="/acca.png" alt="ACCA - Association of Chartered Certified Accountants accreditation logo for Wise Numbers LTD" layout="fill" objectFit="contain" className="rounded-lg shadow-lg" />
              </div>
              <div className="relative w-[180px] h-[90px]">
                <Image src="/pcd-logo.jpg" alt="PCD - Professional certification logo for Wise Numbers LTD accounting services" layout="fill" objectFit="contain" className="rounded-lg shadow-lg" />
              </div>
            </div>


            {/* Services */}
            <div className="text-white">
              <h3 className="font-semibold text-xl mb-6 border-b border-gray-500 pb-2">Our Services</h3>
              <ul className="space-y-3">
                {footerLinks.map((link) => (
                  <li key={link.name}>
                  <Link href={link.href} className="hover:underline flex items-center">
                    <span className="flex items-center">
                      <span className="mr-2">•</span>
                      {link.name}
                    </span>
                  </Link>

                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-600 mt-12 pt-8 text-center text-white text-sm">
            <p>&copy; {new Date().getFullYear()} WiseNumbers. All rights reserved.</p>
          </div>
        </div>
      </footer>
    )
  }