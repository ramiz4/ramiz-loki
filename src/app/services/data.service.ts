import { Injectable } from '@angular/core';
import { ISocialLink } from '../models/social-link.model';
import { ISkill } from '../models/skill.model';
import { IWorkExperience } from '../models/work-experience.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  socialLinks: Array<ISocialLink> = [
    {
      href: 'https://www.linkedin.com/in/ramiz-loki',
      title: 'Linkedin | Ramiz Loki',
      faName: 'linkedin',
      position: 1,
      published: true,
    },
    {
      href: 'https://stackoverflow.com/users/3466032/ramiz4',
      title: 'Stackoverflow | Ramiz Loki',
      faName: 'stack-overflow',
      position: 2,
      published: true,
    },
    {
      href: 'https://github.com/ramiz4',
      title: 'Github | Ramiz Loki',
      faName: 'github',
      position: 3,
      published: true,
    },
  ];

  skills: Array<ISkill> = [
    {
      name: '.NET',
      shortName: 'dot-net-plain',
    },
    {
      name: 'Angular',
      shortName: 'angularjs-plain',
    },
    {
      name: 'Bootstrap',
      shortName: 'bootstrap-plain',
    },
    {
      name: 'C#',
      shortName: 'csharp-plain',
    },
    {
      name: 'CSS3',
      shortName: 'css3-plain',
    },
    {
      name: 'Confluence',
      shortName: 'confluence-plain',
    },
    {
      name: 'Docker',
      shortName: 'docker-plain',
    },
    {
      name: 'Express',
      shortName: 'express-original',
    },
    {
      name: 'Git',
      shortName: 'git-plain',
    },
    {
      name: 'GraphQL',
      shortName: 'graphql-plain',
    },
    {
      name: 'HTML5',
      shortName: 'html5-plain',
    },
    {
      name: 'JQuery',
      shortName: 'jquery-plain',
    },
    {
      name: 'Javascript',
      shortName: 'javascript-plain',
    },
    {
      name: 'Jira',
      shortName: 'jira-plain',
    },
    {
      name: 'MongoDB',
      shortName: 'mongodb-plain',
    },
    {
      name: 'MySQL',
      shortName: 'mysql-plain',
    },
    {
      name: 'Neo4j',
      shortName: 'neo4j-plain',
    },
    {
      name: 'Node.js',
      shortName: 'nodejs-plain',
    },
    {
      name: 'PHP',
      shortName: 'php-plain',
    },
    {
      name: 'Python',
      shortName: 'python-plain',
    },
    {
      name: 'Sass',
      shortName: 'sass-plain',
    },
    {
      name: 'Typescript',
      shortName: 'typescript-plain',
    },
  ];

  workExperiences: Array<IWorkExperience> = [
    {
      company: { name: 'Base-Net Informatik AG', city: 'Sursee' },
      duration: '08/2022 - Present',
      title: 'Senior Full-Stack Software Engineer',
      mainActivities: [],
    },
    {
      company: {
        name: 'Schüco Digital GmbH (Schüco International KG)',
        city: 'Bielefeld',
      },
      duration: '01/2014 - 07/2022',
      title: 'Senior Full-Stack Software Engineer',
      mainActivities: [
        {
          name: 'Follow best practices and participate in code reviews to ensure high quality code',
        },
        { name: 'Experience with Angular, MEAN stack and other frameworks' },
        {
          name: 'Solid understanding of web technologies such as REST, HTTP, JSON',
        },
        { name: 'Experience using Bootstrap or similar responsive framework' },
        {
          name: 'Familiar with development tools such as cross-compilation, source revision control (Perforce), bug tracking (JIRA) and Continuous delivery (Bamboo, Jenkins)',
        },
        {
          name: 'Be part of a team and thought leader to transform our delivery framework to an agile and iterative methodology',
        },
      ],
    },
    {
      company: { name: 'Secunet Security Networks AG', city: 'Essen' },
      duration: '06/2010 - 09/2010',
      title: 'Full-Stack Software Engineer',
      mainActivities: [
        { name: 'Developing a plugin in PHP for the internal MediaWiki page' },
        { name: 'Developing a program in Python to test passwords' },
        {
          name: 'I was allowed to take a look at the implementation of the encryption of the German identity card.',
        },
      ],
    },
    {
      company: { name: 'LoHox IT Service', city: 'Paderborn' },
      duration: '12/2007 - 12/2013',
      title: 'Founder / Full-Stack Software Engineer',
      mainActivities: [
        { name: 'Experience in full-stack web development' },
        {
          name: 'Proficiency in building responsive web applications including JavaScript, HTML5, CSS3, JQuery',
        },
        {
          name: 'Effectively communicate with customers and project stakeholders',
        },
      ],
    },
    {
      company: { name: 'Startup Freunde UG', city: 'Heidelberg' },
      duration: '11/2012 - 09/2013',
      title: 'Full-Stack Software Engineer',
      mainActivities: [
        { name: 'Several activities in the field of web development' },
        { name: 'Planning and implementation of online marketing activities' },
      ],
    },
  ];

  getSocialLinks() {
    return this.socialLinks;
  }

  getSkills() {
    return this.skills;
  }

  getWorkExperience() {
    return this.workExperiences;
  }
}
