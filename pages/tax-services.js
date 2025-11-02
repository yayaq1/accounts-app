import React from 'react';
import TaxContent from '../components/taxContent';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import Services from '../components/services';
import Logo from '../components/logo';
import Talk from '../components/talk';
import GetIn from '../components/getIn';
import SEOHead from '../components/SEOHead';

const Tax = () => {
    return (
        <div>
      <SEOHead
        title="Tax Services UK | Expert Tax Planning & Compliance | Wise Numbers"
        description="Professional tax services in the UK. Expert tax planning, compliance, and tax optimization for individuals and businesses."
        keywords="tax services UK, tax planning UK, tax compliance UK, tax advisor Birmingham, chartered tax advisor, tax optimization UK"
        path="/tax-services"
        schemaTypes={['TaxService', 'ProfessionalService', 'Organization']}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Tax Services', url: '/tax-services' }
        ]}
      />
      <Navbar />
      
        <div className="relative bg-cover bg-center h-screen mt-20" style={{ backgroundImage: 'url("/back.jpg")' }}>
            {/* <div className="absolute inset-0 bg-gray-900 opacity-40"></div>
            <div className="relative h-full flex flex-col justify-center items-center">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <h1 className="text-white text-4xl md:text-6xl font-bold animate-bounce">
                        Tax Advisory , Compliance & Planning
                    </h1>
                    <p className="text-white mt-4 mb-8 text-lg md:text-2xl">
                        Experience the Best Services with Us
                    </p>
                    
                </div>
            </div> */}
            <TaxContent/>
            <Logo/>
            
<Services/>
<GetIn/>
<Talk/>
<Footer/>
        </div>
       
        </div>
    );
};

export default Tax;
