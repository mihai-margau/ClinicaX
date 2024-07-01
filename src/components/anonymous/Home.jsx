import Footer from "./Footer";
import Gallery from "./Gallery";
import Hero from "./Hero";
import Programare from "./ProgramareForm";

export const Home = () => {
  return (
    <>
      <div className="banner-wrapper main-banner-wrapper relative banner-style-one">
        <Hero />
      </div>
      <Gallery />
      <Programare />
      <Footer />
    </>
  );
};
