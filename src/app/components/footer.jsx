import { FaInstagram, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6 mt-10">
      
        <h2 className="text-xl font-semibold text-red-500">DebSoc NSUT</h2>
        <p className="text-gray-400">The official debating society of NSUT</p>
        <div className="flex space-x-6">
          <a
            href="mailto:contact@debsocnsut.com"
            className="text-white hover:text-red-500 transition"
            aria-label="Email"
          >
            <FaEnvelope size={24} />
          </a>
          <a
            href="https://www.instagram.com/debsocnsut"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-red-500 transition"
            aria-label="Instagram"
          >
            <FaInstagram size={24} />
          </a>
          <a
            href="https://www.linkedin.com/company/debsoc-nsut"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-red-500 transition"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={24} />
          </a>
        </div>
        <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} DebSoc NSUT. All rights reserved.</p>
      
    </footer>
  );
};

export default Footer;
