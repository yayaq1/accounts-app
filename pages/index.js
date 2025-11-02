import Navbar from '../components/Navbar';
import About from '../components/about';
import Contact from '../components/contact';
import Content from '../components/content';
import Course from '../components/courses';
import Footer from '../components/footer';
import LogoComponent from '../components/logo';
import GetIn from '../components/getIn';
import Testimonials from '../components/testimonials';
import Talk from '../components/talk';
import Services from '../components/services';
import AnimatedHero from '../components/hero';
import SEOHead from '../components/SEOHead';

export default function Home() {
  return (
    <div>
      <SEOHead
        title="Wise Numbers LTD | Premier Accounting Services in the UK"
        description="Expert-led accounting firm in Birmingham, UK. Chartered accountants providing accounting, tax, and bookkeeping services. Trusted by businesses across the UK."
        keywords="wise numbers, accountant services UK, accounting firm Birmingham, chartered accountant UK, tax services UK, bookkeeping services UK, accounting services in the UK"
        path="/"
        schemaTypes={['Organization', 'LocalBusiness', 'WebSite']}
        breadcrumbs={[
          { name: 'Home', url: '/' }
        ]}
      />
      <Navbar />
      <AnimatedHero />
      <div className="">
        {/* <LogoComponent/> */}
        <About />
        <Course />
        <GetIn />
        <Services />
        <Testimonials />
        <Talk />
      </div>

      <Footer />
    </div>
  );
}
