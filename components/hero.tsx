import Image from 'next/image';
{/* import EmeryHeadshot from '@/assets/images/emery_dittmer alt.jpg';
import EmeryHeadshot from '@/assets/images/emery_dittmer_headshot_full.jpg';
import EmeryHeadshot from '@/assets/images/MMAGraduationDinner-65.jpg'; 
import EmeryHeadshot from '@/assets/images/Emery_dittmer_headshot.jpg'; */}
import EmeryHeadshot from '@/assets/images/emery_dittmer alt.jpg';
import { Github, Twitter, Project, Resume, Linkedin } from '@/assets/icons/';

export default function Hero() {
  return (
    <section>
      <div className="max-w-6xl mx-auto pb-16 px-4 md:pb-16 relative wrapper">
        {/* Wrap the entire content in a div with a class */}
        <div className="flex flex-col md:flex-row items-center justify-center mt-16">
          {/* Headshot of Emery */}
          <div className="flex items-center justify-center max-w-[40%] md:max-w-md md:h-auto md:mr-8">
            <Image
              src={EmeryHeadshot}
              alt="Headshot of Emery"
              width={400}
              height={400}
              className="w-full h-auto max-h-80 rounded-full overflow-hidden"
              data-aos="fade-up"
            />
          </div>

          {/* Text */}
          <div className="max-w-md md:w-1/2 text-center md:text-left">
            <h1 className="h1 mb-4" data-aos="fade-up">
              Hello I'm Emery
            </h1>
            <p className="text-xl text-gray-400 mb-8" data-aos="fade-up" data-aos-delay="200">
              A Data Scientist, strategist and UI/UX specialist. Merging the best of data strategy and insights.
            </p>
            <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center" data-aos="fade-up" data-aos-delay="400">
              <div className="grid grid-cols-2 gap-4">
                <a className="btn text-white bg-purple-600 hover:bg-purple-700 w-full sm:w-auto" href="Projects">
                  <div className="flex items-center space-x-2">
                    <Project/>
                    <span className="ml-2">Projects</span>
                  </div>
                </a>
                <a className="btn text-white bg-gray-700 hover:bg-gray-800 w-full sm:w-auto" href="https://github.com/Emery-Dittmer/Emery-Dittmer.github.io/blob/main/assets/docs/Dittmer%20Emery%20Resume.pdf" download="Dittmer Emery Resume.pdf">
                  <div className="flex items-center space-x-2">
                    <Resume/>
                    <span className="ml-2">Resume</span>
                  </div>
                </a>
                <a className="btn text-white bg-gray-700 hover:bg-gray-800 w-full sm:w-auto" href="https://github.com/Emery-Dittmer" download="Dittmer Emery Resume.pdf">
                  <div className="flex items-center space-x-2">
                    <Github/>
                    <span className="ml-2">Github</span>
                  </div>
                </a>
                <a className="btn text-white bg-purple-600 hover:bg-purple-700 w-full sm:w-auto" href="https://www.linkedin.com/in/emery-dittmer/">
                  <div className="flex items-center space-x-2">
                    <Linkedin/>
                    <span className="ml-2">Linkedin</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* End of wrapping div */}
      </div>
    </section>
  );
}