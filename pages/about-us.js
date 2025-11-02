import React from 'react';
import About from '../components/about';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import Testimonial from '../components/testimonials';
import SEOHead from '../components/SEOHead';

const Story = () => {
    return (
        <div>
      <SEOHead
        title="About Wise Numbers LTD | Chartered Accountants in Birmingham, UK"
        description="Led by Farhan Butt, Certified Chartered Accountant. Expert accounting firm with Big 4 experience serving clients across the UK."
        keywords="wise numbers, about wise numbers, chartered accountant Birmingham, accounting firm UK, Big 4 accountant, Farhan Butt"
        path="/about-us"
        schemaTypes={['Organization']}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'About Us', url: '/about-us' }
        ]}
      />
      <Navbar />
      
        <div className="relative bg-cover bg-center h-screen mt-20" style={{ backgroundImage: 'url("/back.jpg")' }}>
            {/* <div className="absolute inset-0 bg-gray-900 opacity-40"></div> */}
            {/* <div className="relative h-full flex flex-col justify-center items-center">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <h1 className="text-white text-4xl md:text-6xl font-bold animate-bounce">
                        Our Story
                    </h1>
                    <p className="text-white mt-4 mb-8 text-lg md:text-2xl">
                        Experience the Best Services with Us
                    </p>
                    
                </div>
            </div> */}
<About/>
<Testimonial/>
<Footer/>
        </div>
       
        </div>
    );
};

export default Story;
