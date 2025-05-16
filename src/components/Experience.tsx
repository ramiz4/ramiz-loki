import {
  BriefcaseIcon,
  CalendarIcon,
  CheckIcon,
  MapPinIcon,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import '../styles/experience.css';

export function Experience() {
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

  const experiences = [
    {
      period: '08/2022 - Present',
      title: 'Senior Full-Stack Software Engineer',
      company: 'Base-Net Informatik AG, Sursee',
      details: [],
      color: '#00E5FF',
      tags: ['Angular', 'TypeScript', 'Node.js', 'MongoDB'],
    },
    {
      period: '01/2014 - 07/2022',
      title: 'Senior Full-Stack Software Engineer',
      company: 'Schuco Digital GmbH (Schuco International KG), Bielefeld',
      details: [
        'Follow best practices and participate in code reviews to ensure high-quality code',
        'Experience with Angular, MEAN stack and other frameworks',
        'Solid understanding of web technologies such as REST, HTTP, JSON',
        'Experience using Bootstrap or similar responsive frameworks',
        'Familiar with development tools such as cross-compilation, source revision control, Profiling, Bug tracking (JIRA) and Continuous delivery (Bamboo, Jenkins)',
        'Part of a team and thought leader to transform our delivery framework to an agile and iterative methodology',
      ],
      color: '#00FF9D',
      tags: ['Angular', 'MEAN Stack', 'REST', 'JIRA', 'CI/CD'],
    },
    {
      period: '06/2010 - 09/2010',
      title: 'Full-Stack Software Engineer',
      company: 'Secunet Security Networks AG, Essen',
      details: [
        'Developing a plugin in PHP for the internal MediaWiki page',
        'Developing a program in Python to test passwords',
        'I was allowed to take a look at the implementation of the encryption of the German identity card',
      ],
      color: '#FF5722',
      tags: ['PHP', 'Python', 'Security'],
    },
    {
      period: '12/2007 - 12/2013',
      title: 'Founder / Full-Stack Software Engineer',
      company: 'LoHox IT Service, Paderborn',
      details: [
        'Experience in full-stack web development',
        'Proficiency in building responsive web applications including JavaScript, HTML5, CSS3, jQuery',
        'Effectively communicate with customers and project stakeholders',
      ],
      color: '#FFD700',
      tags: ['JavaScript', 'HTML5', 'CSS3', 'jQuery'],
    },
    {
      period: '11/2012 - 09/2013',
      title: 'Full-Stack Software Engineer',
      company: 'Startup Freunde UG, Heidelberg',
      details: [
        'Several activities in the field of web development',
        'Planning and implementation of online marketing activities',
      ],
      color: '#8C43FF',
      tags: ['Web Development', 'Online Marketing'],
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-24 px-4 relative overflow-hidden bg-gradient-to-b from-[#1d1d1d] to-[#0f0f0f] min-h-screen"
      id="experience"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-10 left-10 w-96 h-96 bg-[#00ff9d]/5 rounded-full blur-[100px] transition-all duration-1000 ${isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
        ></div>
        <div
          className={`absolute bottom-10 right-10 w-80 h-80 bg-[#0088ff]/5 rounded-full blur-[100px] transition-all duration-1000 delay-300 ${isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
        ></div>
      </div>

      <div
        className={`max-w-5xl mx-auto relative z-10 transition-all duration-1000 ${isInView ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}
      >
        <h2 className="text-4xl font-bold mb-3 text-center">
          <span className="relative inline-block">
            <span className="relative z-10">Professional Experience</span>
            <span
              className={`absolute bottom-1 left-0 h-3 w-full bg-[#00ff9d]/20 rounded-sm transition-all duration-1000 delay-500 ${isInView ? 'w-full' : 'w-0'}`}
            ></span>
          </span>
        </h2>
        <p
          className={`text-gray-400 text-center mb-16 max-w-lg mx-auto transition-all duration-700 delay-300 ${isInView ? 'opacity-100' : 'opacity-0'}`}
        >
          My professional journey as a software engineer across different
          companies and roles
        </p>

        {/* Vertical Timeline */}
        <div className="hidden lg:block relative">
          {/* Timeline center line */}
          <div
            className={`absolute left-1/2 top-0 h-full w-1 bg-gradient-to-b from-[#00E5FF] via-[#00FF9D] to-[#8C43FF] transform -translate-x-1/2 rounded-full transition-all duration-2000 ${isInView ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'} origin-top`}
          ></div>

          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`relative flex items-start mb-16 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} transition-all duration-700 ${isInView ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}
              style={{ transitionDelay: `${300 + index * 150}ms` }}
            >
              {/* Timeline node */}
              <div
                className={`absolute left-1/2 w-10 h-10 bg-[#121212] rounded-full border-4 flex items-center justify-center z-10 transform -translate-x-1/2 transition-all duration-500 ${isInView ? 'scale-100' : 'scale-0'}`}
                style={{
                  borderColor: exp.color,
                  transitionDelay: `${500 + index * 100}ms`,
                }}
              >
                <BriefcaseIcon size={16} style={{ color: exp.color }} />
              </div>

              {/* Content card */}
              <div className={`w-5/12 ${index % 2 === 0 ? 'pr-12' : 'pl-12'}`}>
                <div
                  className={`bg-[#1a1a1a]/80 backdrop-blur-md p-6 rounded-xl border border-gray-800 shadow-lg hover:shadow-2xl transition-all duration-500 ${isInView ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform ' + (index % 2 === 0 ? '-translate-x-10' : 'translate-x-10')}`}
                  style={{ transitionDelay: `${600 + index * 100}ms` }}
                >
                  {/* Date badge */}
                  <div
                    className="inline-flex items-center rounded-full px-4 py-1 mb-4 text-sm"
                    style={{
                      backgroundColor: `${exp.color}20`,
                      color: exp.color,
                    }}
                  >
                    <CalendarIcon size={14} className="mr-2" />
                    {exp.period}
                  </div>

                  {/* Title & company */}
                  <h3
                    className="text-xl md:text-2xl font-bold mb-2"
                    style={{ color: exp.color }}
                  >
                    {exp.title}
                  </h3>
                  <div className="flex items-center mb-4">
                    <MapPinIcon size={16} className="text-gray-400 mr-2" />
                    <span className="text-gray-300">{exp.company}</span>
                  </div>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {exp.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: `${exp.color}15`,
                          color: exp.color,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Details */}
                  {exp.details.length > 0 && (
                    <ul className="space-y-3">
                      {exp.details.map((detail, i) => (
                        <li key={i} className="flex items-start">
                          <div
                            className="p-1 rounded-full mr-3 mt-1 flex-shrink-0"
                            style={{ backgroundColor: `${exp.color}20` }}
                          >
                            <CheckIcon size={12} style={{ color: exp.color }} />
                          </div>
                          <span className="text-gray-300 text-sm leading-relaxed">
                            {detail}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {exp.details.length === 0 && (
                    <div className="text-gray-400 italic">
                      Currently working in this position. More details to
                      come...
                    </div>
                  )}
                </div>
              </div>

              {/* Empty space for the opposite side */}
              <div className="w-5/12"></div>
            </div>
          ))}

          {/* Final node */}
          <div className="absolute bottom-0 left-1/2 w-6 h-6 bg-[#8C43FF] rounded-full transform -translate-x-1/2 translate-y-3"></div>
        </div>

        {/* Mobile view - stacked timeline */}
        <div className="lg:hidden mt-10">
          <div className="relative">
            {/* Side timeline line */}
            <div className="absolute left-7 top-0 h-full w-1 bg-gradient-to-b from-[#00E5FF] via-[#00FF9D] to-[#8C43FF] rounded-full"></div>

            {experiences.map((exp, index) => (
              <div key={index} className="relative mb-12 pl-16">
                {/* Timeline node */}
                <div
                  className="absolute left-0 w-14 h-14 rounded-full border-4 flex items-center justify-center z-10"
                  style={{ backgroundColor: '#121212', borderColor: exp.color }}
                >
                  <BriefcaseIcon size={18} style={{ color: exp.color }} />
                </div>

                {/* Content */}
                <div className="bg-[#1a1a1a]/80 backdrop-blur-md p-5 rounded-xl border border-gray-800 shadow-lg">
                  <div
                    className="inline-flex items-center rounded-full px-3 py-1 mb-3 text-xs font-medium"
                    style={{
                      backgroundColor: `${exp.color}20`,
                      color: exp.color,
                    }}
                  >
                    <CalendarIcon size={12} className="mr-1" />
                    {exp.period}
                  </div>

                  <h3
                    className="text-lg font-bold mb-1"
                    style={{ color: exp.color }}
                  >
                    {exp.title}
                  </h3>

                  <div className="flex items-center mb-3">
                    <MapPinIcon size={14} className="text-gray-400 mr-1.5" />
                    <span className="text-gray-300 text-sm">{exp.company}</span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {exp.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-full text-xs"
                        style={{
                          backgroundColor: `${exp.color}15`,
                          color: exp.color,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {exp.details.length > 0 && (
                    <ul className="space-y-2">
                      {exp.details.map((detail, i) => (
                        <li key={i} className="flex items-start">
                          <div
                            className="p-1 rounded-full mr-2 mt-0.5 flex-shrink-0"
                            style={{ backgroundColor: `${exp.color}20` }}
                          >
                            <CheckIcon size={10} style={{ color: exp.color }} />
                          </div>
                          <span className="text-gray-300 text-xs">
                            {detail}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {exp.details.length === 0 && (
                    <div className="text-gray-400 italic text-xs">
                      Currently working in this position. More details to
                      come...
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Final node */}
            <div className="absolute bottom-0 left-7 w-4 h-4 bg-[#8C43FF] rounded-full transform -translate-x-1/2 translate-y-2"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
