// import { SparklesIcon } from "@heroicons/react/24/solid";
import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Poza1 from "../../assets/images/clinica/1.jpg";
import Poza2 from "../../assets/images/clinica/2.jpg";
import Poza3 from "../../assets/images/clinica/3.jpg";
import Poza4 from "../../assets/images/clinica/4.jpg";
import Poza5 from "../../assets/images/clinica/5.jpg";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";

SwiperCore.use([Autoplay]);

const Gallery = () => {
  const sliderItems = [
    {
      id: 1,
      image: Poza1,
    },
    {
      id: 2,
      image: Poza2,
    },
    {
      id: 3,
      image: Poza3,
    },
    {
      id: 4,
      image: Poza4,
    },
    {
      id: 5,
      image: Poza5,
    },
  ];
  // const features = [
  //   {
  //     id: 1,
  //     name: "Piscine de interior",
  //     icon: SparklesIcon,
  //     description: "Distrează-te alături de cei dragi",
  //   },
  //   {
  //     id: 4,
  //     name: "Tobogane",
  //     icon: SparklesIcon,
  //     description: "Trăiește aventura",
  //   },
  //   {
  //     id: 2,
  //     name: "Zone de SPA, saune si jacuzzi",
  //     icon: SparklesIcon,
  //     description: "Alege momente de răsfăț",
  //   },
  //   {
  //     id: 3,
  //     name: "Piscine dedicate copiilor",
  //     icon: SparklesIcon,
  //     description: "Trăiește momente unice",
  //   },
  //   {
  //     id: 5,
  //     name: "Piscine exterioare",
  //     icon: SparklesIcon,
  //     description: "Relaxează-te la soare sau răcorește-te în piscină",
  //   },
  // ];
  return (
    <section className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl md:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-11 gap-y-16 sm:gap-y-20 lg:grid-cols-1 lg:items-center">
          {/* <div className="px-6 md:px-0 lg:pr-4 lg:pt-4" data-aos="fade-right">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">
                Atracții
              </h2>
              <p className="mt-2 text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
                Lasă-te purtat de valul distracției!
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.id} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      <feature.icon
                        className="absolute left-1 top-1 h-5 w-5 text-indigo-600"
                        aria-hidden="true"
                      />
                      {feature.name}
                    </dt>{" "}
                    <dd className="block">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div> */}
          <div className="sm:px-6 lg:px-0" data-aos="fade-left">
            <div className="relative isolate overflow-hidden  sm:mx-auto sm:max-w-2xl sm:rounded-3xl  lg:mx-0 lg:max-w-none ">
              <div className="rounded-arrow arrow-with-border flex d-position justify-center align-middle w-full">
                <button className="hero9-prev__active swiper_button _prev">
                  <BsChevronLeft />
                </button>
                {/* End prev */}

                <button className="hero9-next__active swiper_button _next">
                  <BsChevronRight />
                </button>
                {/* End Next */}
              </div>
              <Swiper
                pagination={true}
                effect="coverflow"
                coverflowEffect={{
                  rotate: 50,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                  slideShadows: true,
                }}
                // direction="horizontal" // Set the direction to vertical
                // spaceBetween={0}
                centeredSlides={true}
                slidesPerView={2}
                speed={1400} // Set the slide transition speed in milliseconds
                autoplay={{ delay: 6000, disableOnInteraction: false }}
                loop={true}
                modules={[Navigation, EffectCoverflow]}
                // pagination={{
                //   el: ".swiper-pagination",
                // }}
                // navigation={{
                //   nextEl: ".swiper-button-next",
                //   prevEl: ".swiper-button-prev",
                // }}
                navigation={{
                  nextEl: ".hero9-next__active",
                  prevEl: ".hero9-prev__active",
                }}
                // className="hero_9"
              >
                {sliderItems.map((item) => {
                  return (
                    <SwiperSlide key={item.id}>
                      <img src={item.image} />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
