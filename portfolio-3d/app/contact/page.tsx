import ContactForm from "../../src/components/contact_form";
import Footer from "../../src/components/footer";
import Navbar from "../../src/components/navbar";
import CTASection from "../../src/components/realisations/cta_section";

export default function ContactPage() {
  return (
    <main className="">
      <Navbar />
      <br />
      <br />
    <ContactForm />
    <CTASection />
    <Footer />
    </main>
  );
}       