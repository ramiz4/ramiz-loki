import {
  AwardIcon,
  BookOpenIcon,
  CalendarIcon,
  GraduationCapIcon,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import '../styles/education.css';

export function Education() {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 },
    );

    const currentRef = sectionRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const educationData = [
    {
      institution: 'University of Applied Sciences FHDW Bielefeld',
      degree: 'Bachelor of Science (B.Sc)',
      field: 'Wirtschaftsinformatik',
      period: '2010 - 2014',
      subjects: [
        'Wirtschaftsinformatik',
        'Wirtschaftsmathematik',
        'Business English',
        'Project Management',
      ],
      color: '#10B981',
      logo: GraduationCapIcon,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-24 px-4 relative overflow-hidden bg-gradient-to-b from-[#0f172a] to-[#0f0f0f] min-h-screen"
      id="education"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-80 h-80 bg-green-500/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-blue-500/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <h2 className="text-4xl font-bold mb-3 text-center">
          <span className="relative inline-block">
            <span className="relative z-10">Educational Background</span>
            <span className="absolute bottom-1 left-0 h-3 w-full bg-green-500/20 rounded-sm"></span>
          </span>
        </h2>
        <p className="text-gray-400 text-center mb-16 max-w-lg mx-auto">
          My academic journey and qualifications that have shaped my expertise
        </p>

        {/* Education Timeline */}
        <div className="space-y-12 relative">
          {/* Timeline line */}
          <div className="absolute left-[22px] top-8 bottom-0 w-1 bg-gradient-to-b from-green-500/80 to-green-600/30 rounded-full hidden md:block"></div>

          {educationData.map((edu, index) => (
            <div
              key={index}
              className={`education-card flex flex-col md:flex-row ${isInView ? 'visible' : 'invisible'}`}
              style={{ animationDelay: `${0.2 * (index + 1)}s` }}
            >
              {/* Icon */}
              <div className="flex-shrink-0 mb-4 md:mb-0">
                <div className="relative">
                  <div className="w-11 h-11 bg-green-500/10 rounded-full flex items-center justify-center z-10 border-2 border-green-500 education-icon">
                    <edu.logo size={20} className="text-green-500" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="md:ml-10 flex-grow">
                <div className="bg-gray-800/80 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-gray-700 hover:border-green-500/50 shadow-lg hover:shadow-green-500/5 transition-all duration-300">
                  {/* Time period */}
                  <div className="inline-flex items-center rounded-full px-4 py-1 mb-4 text-sm bg-green-500/10 text-green-400">
                    <CalendarIcon size={14} className="mr-2" />
                    {edu.period}
                  </div>

                  {/* Institution and degree */}
                  <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-green-400 transition-colors">
                    {edu.institution}
                  </h3>
                  <div className="flex items-center mb-6">
                    <AwardIcon size={16} className="text-green-400 mr-2" />
                    <span className="text-gray-200 font-medium">
                      {edu.degree} in {edu.field}
                    </span>
                  </div>

                  {/* Subjects */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium text-green-400">
                      Key Courses & Subjects
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {edu.subjects.map((subject, idx) => (
                        <div key={idx} className="flex items-center">
                          <div className="p-1 bg-green-500/10 rounded-full mr-3">
                            <BookOpenIcon
                              size={14}
                              className="text-green-400"
                            />
                          </div>
                          <span className="text-gray-300">{subject}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add education quote */}
        <div className="mt-16 text-center">
          <blockquote className="relative max-w-2xl mx-auto px-8 py-6">
            <div className="absolute top-0 left-0 text-5xl text-green-500/20">
              "
            </div>
            <p className="italic text-gray-300 relative z-10 text-lg">
              Education is not the learning of facts, but the training of the
              mind to think.
            </p>
            <footer className="mt-2 text-green-400">- Albert Einstein</footer>
            <div className="absolute bottom-0 right-0 text-5xl text-green-500/20">
              "
            </div>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
