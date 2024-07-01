import LogoClinica from "../../assets/images/logoClinica.png";

const contactInfo = {
  title: "ClinicaX",
  description: "Strada Panseluțelor 3, Bucureşti, Sector 3, România",
  email: " Bucureşti, Sector 3, România",
  phone: "021.318.03.23",
  phoneLink: "tel:+0213180323",
  mail: "office@clinicax.ro",
  mailLink: "mailto:office@clinicax.ro", // Changed phoneLink to tel: URI
};
const navigation = {
  social: [
    {
      name: "Facebook",
      href: "https://www.facebook.com/profile.php?viewas=100000686899395&id=61561879374860",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ],
};

export default function Footer() {
  const getCurrentYear = () => {
    return new Date().getFullYear();
  };
  return (
    <footer className="bg-gray-900" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-16 lg:px-8 lg:pt-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8" data-aos="fade-right">
          <div className="space-y-8">
            <img className="w-1/2 my-12" src={LogoClinica} alt="Clinica X" />
            <p className="text-sm leading-6 text-gray-300">
              Urmărește-ne pe platformele sociale
            </p>
            <div className="flex space-x-6">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-500 hover:text-gray-400"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-16 grid grid-cols-1 xl:mt-0 col-span-2 content-center items-end justify-items-end">
            <div className="mt-6 pt-6 sm:pr-4" data-aos="fade-right">
              <dt className="font-semibold text-white">{contactInfo.title}</dt>
              <dd className="mt-2 text-gray-500">
                <span className="font-medium">{contactInfo.description}</span>
                <br />
                <a href={contactInfo.phoneLink}>{contactInfo.phone}</a>
                <br />
                <a href={contactInfo.mailLink}>{contactInfo.mail}</a>
              </dd>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
          <p
            className="text-xs leading-5 text-gray-400"
            data-aos="fade-left"
            data-aos-offset="0"
          >
            &copy; {getCurrentYear()}{" "}
            <a
              href="https://www.primarie3.ro"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white"
            >
              Clinica X
            </a>{" "}
            - Toate drepturile rezervate
          </p>
        </div>
      </div>
    </footer>
  );
}
