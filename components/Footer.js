import { FaGithub, FaLinkedin, FaTwitter, FaCode } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="mt-16">
      <footer className="bg-slate-700 text-white text-center py-8">
        <p className="text-lg">
          &copy;{new Date().getFullYear()} Dish Dive. All rights reserved.
        </p>
        <p className="mt-4 text-md">
          Made with ❤️ & lots of ☕ by{" "}
          <a href="https://github.com/surajit20107" target="_blank">
            <span className="font-semibold text-md text-blue-400">Surajit</span>
          </a>
        </p>
        {/* social links */}
        <div className="mt-6 w-full flex items-center justify-evenly">
          <div>
            <a href="https://github.com/surajit20107" target="_blank">
              <FaGithub style={{ width: "24px", height: "24px" }} />
            </a>
          </div>
          <div>
            <a
              href="https://www.linkedin.com/in/surajit-jana20107"
              target="_blank"
            >
              <FaLinkedin style={{ width: "24px", height: "24px" }} />
            </a>
          </div>
          <div>
            <a href="https://x.com/surajit_20107" target="_blank">
              <FaTwitter style={{ width: "24px", height: "24px" }} />
            </a>
          </div>
          <div>
            <a href="https://surajit-dev.netlify.app" target="_blank">
              <FaCode style={{ width: "24px", height: "24px" }} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
