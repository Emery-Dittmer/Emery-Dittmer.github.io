import Image from 'next/image'

import Andrea from '@/assets/recomentations/Adrea.jpg';
import Max from '@/assets/recomentations/Max.jpg';
import Chris from '@/assets/recomentations/Chris.jpg';
import Alex from '@/assets/recomentations/Alex.jpg';


export default function Testimonials() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20 border-t border-gray-800">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2 mb-4">Don't take my word for it</h2>
            <p className="text-xl text-gray-400">Some of my colleauges have some great feedback</p>
          </div>

          {/* Testimonials */}
          <div className="max-w-sm mx-auto grid gap-8 lg:grid-cols-2 lg:gap-6 items-start lg:max-w-none">

            {/* 1st testimonial */}
            <div className="flex flex-col h-full p-6 bg-gray-800" data-aos="fade-up">
              <div>
                <div className="relative inline-flex flex-col mb-4">
                  <Image className="rounded-full" src={Andrea} width={48} height={48} alt="Testimonial 01" />
                  <svg className="absolute top-0 right-0 -mr-3 w-6 h-5 fill-current text-purple-600" viewBox="0 0 24 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 13.517c0-2.346.611-4.774 1.833-7.283C3.056 3.726 4.733 1.648 6.865 0L11 2.696C9.726 4.393 8.777 6.109 8.152 7.844c-.624 1.735-.936 3.589-.936 5.56v4.644H0v-4.531zm13 0c0-2.346.611-4.774 1.833-7.283 1.223-2.508 2.9-4.586 5.032-6.234L24 2.696c-1.274 1.697-2.223 3.413-2.848 5.148-.624 1.735-.936 3.589-.936 5.56v4.644H13v-4.531z" />
                  </svg>
                </div>
              </div>
              <blockquote className="text-lg text-gray-400 grow">I had the opportunity to work with Emery for the past 10 months. Over that time he proved to be a brilliant individual, a great leader and colleague. Emery has excellent organization, communication and analytical skills. I enjoyed working with Emery and learnt a great deal from him. I believe his go-getter attitude and genuine support for his colleagues brings out the best in everyone on his team resulting in high quality end results. Emery is highly skilled and excels at everything he does and I fully recommend him no matter the position he chooses. He will be a valued asset to any team he works with. </blockquote>
              <div className="text-gray-700 font-medium mt-6 pt-5 border-t border-gray-700">
                <cite className="text-gray-200 not-italic">Adrea Young</cite> - <a className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out" href="https://www.linkedin.com/in/andreayoung11/">Linkedin</a>
              </div>
            </div>

            {/* 2nd testimonial */}
            <div className="flex flex-col h-full p-6 bg-gray-800" data-aos="fade-up" data-aos-delay="200">
              <div>
                <div className="relative inline-flex flex-col mb-4">
                  <Image className="rounded-full" src={Max} width={48} height={48} alt="Testimonial 02" />
                  <svg className="absolute top-0 right-0 -mr-3 w-6 h-5 fill-current text-purple-600" viewBox="0 0 24 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 13.517c0-2.346.611-4.774 1.833-7.283C3.056 3.726 4.733 1.648 6.865 0L11 2.696C9.726 4.393 8.777 6.109 8.152 7.844c-.624 1.735-.936 3.589-.936 5.56v4.644H0v-4.531zm13 0c0-2.346.611-4.774 1.833-7.283 1.223-2.508 2.9-4.586 5.032-6.234L24 2.696c-1.274 1.697-2.223 3.413-2.848 5.148-.624 1.735-.936 3.589-.936 5.56v4.644H13v-4.531z" />
                  </svg>
                </div>
              </div>
              <blockquote className="text-lg text-gray-400 grow">Emery is a collaborative leader who took on the role with diversity and inclusion in mind. I worked with Emery as he led one of the most engaging RBC Connect teams in the history of the program. Emery was able to bring out the best in his teammates by encouraging them to share their voices and listen to other voices. His leadership nudged the entire team to take on leadership roles by leading meetings, setting agendas, and building presentations. I would recommend Emery to any team!</blockquote>
              <div className="text-gray-700 font-medium mt-6 pt-5 border-t border-gray-700">
                <cite className="text-gray-200 not-italic">Max Hum</cite> - <a className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out" href="https://www.linkedin.com/in/maxhum/">Linkedin</a>
              </div>
            </div>

            {/* 3rd testimonial */}
            <div className="flex flex-col h-full p-6 bg-gray-800" data-aos="fade-up" data-aos-delay="400">
              <div>
                <div className="relative inline-flex flex-col mb-4">
                  <Image className="rounded-full" src={Chris} width={48} height={48} alt="Testimonial 03" />
                  <svg className="absolute top-0 right-0 -mr-3 w-6 h-5 fill-current text-purple-600" viewBox="0 0 24 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 13.517c0-2.346.611-4.774 1.833-7.283C3.056 3.726 4.733 1.648 6.865 0L11 2.696C9.726 4.393 8.777 6.109 8.152 7.844c-.624 1.735-.936 3.589-.936 5.56v4.644H0v-4.531zm13 0c0-2.346.611-4.774 1.833-7.283 1.223-2.508 2.9-4.586 5.032-6.234L24 2.696c-1.274 1.697-2.223 3.413-2.848 5.148-.624 1.735-.936 3.589-.936 5.56v4.644H13v-4.531z" />
                  </svg>
                </div>
              </div>
              <blockquote className="text-lg text-gray-400 grow">Emery is an organized leader who cares about the members reporting under him. His facilitating and communication skills created a cohesive and supportive team, keeping us on track with meetings and deliverables for the Connect Community. His abilities to facilitate meetings encouraged everyone to participate and provide feedback, with a perfect balance of taking lead on the topic at hand to create discussions while never dominating a conversation to give everyone a chance to be heard.
Emery portrays a professional and calm demeanor, which was beneficial when the team experienced conflict. He resolved any conflict by being transparent with everyone on his reason of thinking, which always considered all perspectives for a fair conclusion. 
I would gladly work with Emery again because of the proactive and positive attitude he brings to any team. </blockquote>
              <div className="text-gray-700 font-medium mt-6 pt-5 border-t border-gray-700">
                <cite className="text-gray-200 not-italic">Chris Cole</cite> - <a className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out" href="https://www.linkedin.com/in/chris-cole3/">Linkedin</a>
              </div>
            </div>

            {/* 4th testimonial */}
            <div className="flex flex-col h-full p-6 bg-gray-800" data-aos="fade-up" data-aos-delay="400">
              <div>
                <div className="relative inline-flex flex-col mb-4">
                  <Image className="rounded-full" src={Alex} width={48} height={48} alt="Testimonial 03" />
                  <svg className="absolute top-0 right-0 -mr-3 w-6 h-5 fill-current text-purple-600" viewBox="0 0 24 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 13.517c0-2.346.611-4.774 1.833-7.283C3.056 3.726 4.733 1.648 6.865 0L11 2.696C9.726 4.393 8.777 6.109 8.152 7.844c-.624 1.735-.936 3.589-.936 5.56v4.644H0v-4.531zm13 0c0-2.346.611-4.774 1.833-7.283 1.223-2.508 2.9-4.586 5.032-6.234L24 2.696c-1.274 1.697-2.223 3.413-2.848 5.148-.624 1.735-.936 3.589-.936 5.56v4.644H13v-4.531z" />
                  </svg>
                </div>
              </div>
              <blockquote className="text-lg text-gray-400 grow">In my time working with Emery, I observed a drive to elevate internal processes and to increase the efficiencies of the supply chain through predictive analytics and database mining. Enthusiastic and always looking to learn more to make a difference at Iridian, Emery proved valuable in establishing strong standards, data analysis and leadership in our supply chain </blockquote>
              <div className="text-gray-700 font-medium mt-6 pt-5 border-t border-gray-700">
                <cite className="text-gray-200 not-italic">Alex Miles</cite> - <a className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out" href="https://www.linkedin.com/in/alex-m-miles/">Linkedin</a>
              </div>
            </div>


            {/* 5th testimonial */}
           {/*  <div className="flex flex-col h-full p-6 bg-gray-800" data-aos="fade-up" data-aos-delay="400">
                          <div>
                            <div className="relative inline-flex flex-col mb-4">
                              <Image className="rounded-full" src={Chris} width={48} height={48} alt="Testimonial 03" />
                              <svg className="absolute top-0 right-0 -mr-3 w-6 h-5 fill-current text-purple-600" viewBox="0 0 24 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 13.517c0-2.346.611-4.774 1.833-7.283C3.056 3.726 4.733 1.648 6.865 0L11 2.696C9.726 4.393 8.777 6.109 8.152 7.844c-.624 1.735-.936 3.589-.936 5.56v4.644H0v-4.531zm13 0c0-2.346.611-4.774 1.833-7.283 1.223-2.508 2.9-4.586 5.032-6.234L24 2.696c-1.274 1.697-2.223 3.413-2.848 5.148-.624 1.735-.936 3.589-.936 5.56v4.644H13v-4.531z" />
                              </svg>
                            </div>
                          </div>
                          <blockquote className="text-lg text-gray-400 grow">rec here </blockquote>
                          <div className="text-gray-700 font-medium mt-6 pt-5 border-t border-gray-700">
                            <cite className="text-gray-200 not-italic">Name here</cite> - <a className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out" href="https://www.linkedin.com/in/chris-cole3/">Linkedin</a>
                          </div>
                        </div> */}


          </div>

        </div>
      </div>
    </section>
  )
}
