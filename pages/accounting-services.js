import React from 'react';
import AccountingServices from '../components/AccountingServices';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import Services from '../components/services';
import Logo from '../components/logo';
import Talk from '../components/talk';
import GetIn from '../components/getIn';
import SEOHead from '../components/SEOHead';

const Train = () => {
    return (
        <div>
      <SEOHead
        title="Accounting Services UK | Professional Bookkeeping & Financial Services"
        description="Comprehensive accounting services in the UK. Expert bookkeeping, financial management, and accounting solutions for businesses across Birmingham and the UK."
        keywords="accounting services UK, bookkeeping services UK, financial management UK, accounting firm Birmingham, professional accounting services, chartered accountant services"
        path="/accounting-services"
        schemaTypes={['AccountingService', 'ProfessionalService', 'Organization']}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Accounting Services', url: '/accounting-services' }
        ]}
      />
      <Navbar />
      
        <div className="relative bg-cover bg-center h-screen mt-20" style={{ backgroundImage: 'url("/back.jpg")' }}>
            {/* <div className="absolute inset-0 bg-gray-900 opacity-40"></div>
            <div className="relative h-full flex flex-col justify-center items-center">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <h1 className="text-white text-4xl md:text-6xl font-bold animate-bounce">
                        Accounting Services
                    </h1>
                    <p className="text-white mt-4 mb-8 text-lg md:text-2xl">
                        Experience the Best Services with Us
                    </p>
                    
                </div>
            </div> */}
            <AccountingServices/>
            <Logo/>
<Services/>
<GetIn/>
<Talk/>
<Footer/>
        </div>
       
        </div>
    );
};

export default Train;
