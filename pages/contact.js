import React from 'react';
import About from '../components/about';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import Services from '../components/services';
import Logo from '../components/logo';
import Talk from '../components/talk';
import GetIn from '../components/getIn';
import SEOHead from '../components/SEOHead';

const Contact = () => {
  return (
    <div>
      <SEOHead
        title="Contact Wise Numbers | Accounting Firm Birmingham | Get in Touch"
        description="Contact Wise Numbers LTD in Birmingham, UK. Phone: +44 7889 255949. Expert accounting and tax services."
        keywords="contact wise numbers, accounting firm Birmingham contact, accountant contact UK, wise numbers phone number"
        path="/contact"
        schemaTypes={['LocalBusiness', 'Organization']}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Contact Us', url: '/contact' }
        ]}
      />
      <Navbar />

      <div
        className="relative bg-cover bg-center h-screen"
        style={{ backgroundImage: 'url("/back.jpg")' }}
      >
        <div className="absolute inset-0 bg-gray-900 opacity-40"></div>
        {/* <div className="relative h-full flex flex-col justify-center items-center">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h1 className="text-white text-4xl md:text-6xl font-bold animate-bounce">
              Contact us
            </h1>
            <p className="text-white mt-4 mb-8 text-lg md:text-2xl">
              Experience the Best Services with Us
            </p>
          </div>
        </div> */}
        <div className="mt-8">
          <Talk />
        </div>
        {/*
        <div className="bg-white py-4">
          <div className="flex justify-between gap-6 items-center max-w-wrapper mx-auto">

            <div>
              <img
                src="/pcd-logo.jpg"
                alt="acca"
                className="w-[150px] h-auto"
              />
            </div>
            <div>
              <img src="/acca.png" alt="acca" className="w-[100px] h-auto" />
            </div>
          </div>
        </div> */}

        <GetIn />
        <Logo />
        <Services />
        <Footer />
      </div>
    </div>
  );
};

export default Contact;
