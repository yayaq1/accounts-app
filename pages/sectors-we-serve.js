import React from 'react';
import ServicesContent from '../components/ServicesContent';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import Services from '../components/services';
import Logo from '../components/logo';
import Talk from '../components/talk';
import GetIn from '../components/getIn';
import SEOHead from '../components/SEOHead';

const Business = () => {
  return (
    <div>
      <SEOHead
        title="Sectors We Serve | Accounting Services for All Industries UK"
        description="Wise Numbers provides expert accounting and tax services across multiple sectors in the UK including healthcare, construction, retail, hospitality, and more."
        keywords="accounting services healthcare, construction accounting, retail accounting UK, hospitality accounting, professional services accounting UK"
        path="/sectors-we-serve"
        schemaTypes={['ProfessionalService', 'Organization']}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Sectors We Serve', url: '/sectors-we-serve' }
        ]}
      />
      <Navbar />

      <div
        className="relative bg-cover bg-center h-screen mt-20"
        style={{ backgroundImage: 'url("/back.jpg")' }}
      >
        {/* <div className="absolute inset-0 bg-gray-900 opacity-40"></div>
        <div className="relative h-full flex flex-col justify-center items-center">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h1 className="text-white text-4xl md:text-6xl font-bold animate-bounce">
              Business Strategy & Solutions
            </h1>
            <p className="text-white mt-4 mb-8 text-lg md:text-2xl">
              Experience the Best Services with Us
            </p>
          </div>
        </div> */}
        <ServicesContent />
        <Logo />
        <Services />
        <GetIn />
        <Talk />
        <Footer />
      </div>
    </div>
  );
};

export default Business;
