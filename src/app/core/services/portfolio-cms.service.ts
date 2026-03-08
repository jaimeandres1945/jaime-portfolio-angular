import { Injectable, computed, signal } from '@angular/core';
import { CertificationItem, EducationItem, Locale, PortfolioData, Translation } from '../models/portfolio.model';

const STORAGE_KEY = 'jaime-portfolio-cms';

const tx = (es: string, en: string): Translation => ({ es, en });

const seedData: PortfolioData = {
  profile: {
    name: 'Jaime Andrés Quiceno González',
    role: tx('Arquitecto de Software · Tech Lead · DevOps', 'Software Architect · Tech Lead · DevOps'),
    location: tx('Barcelona, España', 'Barcelona, Spain'),
    intro: tx(
      'Arquitecto de Software con foco en .NET, Angular, Azure y AWS para entornos enterprise.',
      'Software Architect focused on .NET, Angular, Azure and AWS for enterprise environments.'
    ),
    summary: tx(
      'Más de 15 años construyendo productos, automatizaciones y plataformas escalables en compañías como Knowmad Mood, Conversia, Sportium, Wolters Kluwer, Green Power Monitor y Vueling.',
      '15+ years building products, automations and scalable platforms for companies such as Knowmad Mood, Conversia, Sportium, Wolters Kluwer, Green Power Monitor and Vueling.'
    ),
    linkedinUrl: 'https://www.linkedin.com/in/jaqg-dev',
    email: 'contacto@jaimequiceno.es',
    phone: '+34 656 829 726',
    photoUrl: 'assets/profile/jaime-quiceno-software-architect.png',
    yearsOfExperience: 15,
    pdfPath: 'assets/cv/Jaime-Quiceno-Software-Architect.pdf',
    namePdf: "Jaime-Quiceno-Software-Architect.pdf"
  },
  sectionVisibility: {
    hero: true,
    experience: true,
    skills: true,
    education: true,
    certifications: true,
    portfolio: true,
    contact: true
  },
  skills: [
    { name: 'C# / .NET', level: 10, visible: true },
    { name: 'Angular / TypeScript', level: 8, visible: true },
    { name: 'Azure DevOps', level: 8, visible: true },
    { name: 'AWS', level: 7, visible: true },
    { name: 'Github Enterprise', level: 8, visible: true },
    { name: 'Microservices / DDD', level: 9, visible: true },
    { name: 'Principles SOLID / Patterns Design', level: 7, visible: true },
    { name: 'CI/CD / Terraform / Docker', level: 9, visible: true }
  ],
  experience: [
    {
      id: 'knowmad',
      company: 'Knowmad Mood - Barcelona, España',
      role: tx('Architect Software .NET', 'Software Architect .NET'),
      period: '2025 - Actualidad',
      summary: tx(
        'Análisis, levantamiento de requerimientos, diseño de arquitectura y evolución del framework de arquitectura corporativa.',
        'Requirements analysis, architecture design and framework evolution for the architecture team.'
      ),
      visible: true
    },
    {
      id: 'conversia',
      company: 'Conversia - Barcelona, España',
      role: tx('Architect Software y Tech Lead .NET/Angular', 'Software Architect and Tech Lead .NET/Angular'),
      period: '2023 - 2024',
      summary: tx(
        'Diseño de arquitectura, CI/CD en Azure, SonarQube, Checkmarx, Terraform, Ansible, Docker, AWS y formación transversal técnica.',
        'Architecture design, Azure CI/CD, SonarQube, Checkmarx, Terraform, Ansible, Docker, AWS and cross-company technical enablement.'
      ),
      visible: true
    },
    {
      id: 'sportium',
      company: 'Sportium / Capitole Consulting - Barcelona, España',
      role: tx('FullStack .NET y Angular Developer', 'FullStack .NET and Angular Developer'),
      period: '2022 - 2023',
      summary: tx(
        'Desarrollo de nuevas funcionalidades y apoyo en arquitectura en un contexto de apuestas online con microservicios, Kafka y WebSockets.',
        'Feature delivery and architecture support for an online betting platform using microservices, Kafka and WebSockets.'
      ),
      visible: true
    },
    {
      id: 'vueling',
      company: 'Vueling Airlines - Barcelona, España',
      role: tx('Analista desarrollador .NET', '.NET Software Analyst Developer'),
      period: '2020 - 2022',
      summary: tx(
        'Trabajo en equipos Agile creando nuevas funcionalidades con .NET, AWS, Azure Cloud CI, Docker, Blazor y buenas prácticas de ingeniería.',
        'Worked in Agile teams delivering features with .NET, AWS, Azure Cloud CI, Docker, Blazor and engineering best practices.'
      ),
      visible: true
    },
    {
      id: 'Magnetron',
      company: 'Industrias Electromecánicas Magnetron - Colombia',
      role: tx('Analista desarrollador .NET', '.NET Software Analyst Developer'),
      period: '2015 - 2019',
      summary: tx(
        'Automatización de los procesos de producción a través de códigos de barra logrando pocos pasos para procesar la información.',
        'Automation of production processes through barcodes, achieving few steps to process information.'
      ),
      visible: true
    },
    {
      id: 'Cotecnova',
      company: 'Corporación de Estudios Tecnológicos del Norte del Valle (Cotecnova) - Colombia',
      role: tx('Docente en Formación Web', 'Web Training Instructor'),
      period: '2016 - 2017',
      summary: tx(
        'En esta institución enseñé diversas asignaturas, entre ellas: Estructuras de datos II y Desarrollo de interfaces gráficas.',
        'Taught various subjects at this institution, including Data Structures II and Graphical User Interface Development.'
      ),
      visible: true
    },
    {
      id: 'Sutex',
      company: 'Sutex Internacional - Colombia',
      role: tx('Analista desarrollador .NET y Web', '.NET and Web Analyst Developer'),
      period: '2015 - 2015',
      summary: tx(
        'En esta compañía conocí el ERP EPICOR en su versión 9.0, el cual admite modificaciones directas sobre sus interfaces gráficas a través de lenguaje C# nativo y Visual Basic 6.0.',
        'At this company I became familiar with the EPICOR ERP in its version 9.0, which allows direct modifications to its graphical interfaces through native C# language and Visual Basic 6.0.'
      ),
      visible: true
    },
    {
      id: 'Oceanic',
      company: 'Oceanic Casa de Software - Colombia',
      role: tx('Analista desarrollador .NET y Web', '.NET and Web Analyst Developer'),
      period: '2014 - 2015',
      summary: tx(
        'En esta compañía se logró implementar los estándares de calidad de software y gestión documental con CMMI. Al implementar y lograr la certificación, adoptamos mejores prácticas de desarrollo de software y alcanzamos niveles de estimación de tiempo muy cercanos a los reales.',
        'This company successfully implemented software quality and document management standards using CMMI. By implementing and achieving certification, we adopted best practices in software development and achieved time estimates that closely matched actual time.'
      ),
      visible: true
    },
    {
      id: 'Indra',
      company: 'Indra Software Labs - Colombia',
      role: tx('Ingeniero de Desarrollo de Software Java', 'Java Software Development Engineer'),
      period: '2013 - 2014',
      summary: tx(
        'Análisis, diseño y desarrollo de nuevas funcionalidades en un sistema de geolocaliazción para una empresa de transporte de productos petrolíferos. El sistema se desarrolló con Java, Spring, Hibernate y Oracle.',
        'Analysis, design and development of new features in a geolocation system for a petroleum products transportation company. The system was developed with Java, Spring, Hibernate and Oracle.'
      ),
      visible: true
    },
    {
      id: 'Apolo',
      company: 'Apolo Casa de Software - Colombia',
      role: tx('Agente de Soporte Técnico', 'Technical Support Agent'),
      period: '2011 - 2013',
      summary: tx(
        'El objetivo de este cargo consistía en dar soporte a clientes y apoyar con consultas a la base de datos; además, generar reportes, configurar el software para la generación transaccional contable y capacitar a los clientes en el uso del software.',
        'The objective of this position was to provide support to clients and assist with database queries; additionally, generate reports, configure the software for transactional accounting generation, and train clients on software usage.'
      ),
      visible: true
    }
  ],
  education: [
    {
      id: 'master-devops',
      title: tx('Máster en Desarrollo y Operaciones (DevOps)', 'Master in Development and Operations (DevOps)'),
      institution: tx('Universidad Internacional de la Rioja (UNIR)', 'Universidad Internacional de la Rioja (UNIR)'),
      year: '2025',
      visible: true
    },
    {
      id: 'Sistemas-Telecomunicaciones',
      title: tx('Ingeniero de Sistemas y Telecomunicaciones', 'Engineer in Systems and Telecommunications'),
      institution: tx('Universidad Católica de Pereira - Colombia', 'Catholic University of Pereira - Colombia'),
      year: '2016',
      visible: true
    },
    {
      id: 'Tecnólogo-Informática',
      title: tx('Tecnólogo en Informática Empresarial', 'Technologist in Enterprise Information Technology'),
      institution: tx('Corporación de Estudios Tecnológicos del Norte del Valle (Cotecnova) - Colombia', 'Technological Studies Corporation of the North Valley (Cotecnova) - Colombia'),
      year: '2014',
      visible: true
    },
    {
      id: 'Técnico-Profesional-Construcción',
      title: tx('Técnico Profesional en Construcción (Auxiliar de Ingeniería Civil)', 'Professional Technician in Construction (Civil Engineering Assistant)'),
      institution: tx('Servicio Nacional de Aprendizaje - Colombia', 'National Learning Service - Colombia'),
      year: '2005',
      visible: true
    },
    {
      id: 'Técnico-Gestión-Sistemas',
      title: tx('Técnico en Gestión Integral de Sistemas', 'Technician in Integrated Systems Management'),
      institution: tx('System Plus - Colombia', 'System Plus - Colombia'),
      year: '2004',
      visible: true
    }
  ],
  certifications: [
    {
      id: 'safe-agile-practitioner',
      title: tx('SAFe Agile Practitioner', 'SAFe Agile Practitioner'),
      issuer: tx('Scaled Agile', 'Scaled Agile'),
      year: '2025',
      visible: true
    },
    {
      id: 'az-900',
      title: tx('Microsoft Certified: Azure Fundamentals (AZ-900)', 'Microsoft Certified: Azure Fundamentals (AZ-900)'),
      issuer: tx('Microsoft', 'Microsoft'),
      year: '2025',
      visible: true
    },
    {
      id: 'Arquitectura-Software-Documentación',
      title: tx('Documentación, Principios y Prácticas de Arquitectura de Software', 'Documentation, Principles and Practices of Software Architecture'),
      issuer: tx('Universidad Tecnológica de Pereira - Colombia', 'Pereira Technology University - Colombia'),
      year: '2015',
      visible: true
    }
  ],
  portfolioProjects: [
    {
      id: 'portfolio-site',
      title: tx('Landing personal multidioma', 'Multilingual personal landing page'),
      description: tx(
        'Sitio orientado a marca personal con secciones visibles configurables, SEO y narrativa de contratación fija.',
        'Personal-brand landing page with configurable public sections, SEO and a narrative focused on permanent hiring.'
      ),
      stack: ['Angular', 'Signals', 'Standalone Components', 'Responsive UI'],
      visible: true
    },
    {
      id: 'portfolio-admin',
      title: tx('Backoffice de portafolio', 'Portfolio backoffice'),
      description: tx(
        'Panel interno para activar o desactivar experiencia, skills y proyectos sin tocar código.',
        'Internal panel to toggle experience, skills and projects without touching code.'
      ),
      stack: ['Angular Router', 'Guards', 'localStorage CMS'],
      visible: true
    },
    {
      id: 'cloud-modernization',
      title: tx('Modernización cloud enterprise', 'Enterprise cloud modernization'),
      description: tx(
        'Caso de uso de arquitectura para pipelines, automatización de despliegues y adopción de prácticas DevOps.',
        'Architecture use case around pipelines, deployment automation and DevOps adoption.'
      ),
      stack: ['Azure DevOps', 'AWS', 'Terraform', 'Docker'],
      visible: false
    }
  ]
};

@Injectable({ providedIn: 'root' })
export class PortfolioCmsService {
  readonly data = signal<PortfolioData>(this.load());

  readonly visibleSkills = computed(() => this.data().skills.filter((skill) => skill.visible));
  readonly visibleExperience = computed(() => this.data().experience.filter((item) => item.visible));
  readonly visibleEducation = computed(() => this.data().education.filter((item) => item.visible));
  readonly visibleCertifications = computed(() => this.data().certifications.filter((item) => item.visible));
  readonly visibleProjects = computed(() => this.data().portfolioProjects.filter((item) => item.visible));

  private load(): PortfolioData {
    const fromStorage = localStorage.getItem(STORAGE_KEY);
    if (!fromStorage) {
      return seedData;
    }

    const parsed = JSON.parse(fromStorage) as Partial<PortfolioData>;
    return {
      ...seedData,
      ...parsed,
      sectionVisibility: {
        ...seedData.sectionVisibility,
        ...(parsed.sectionVisibility ?? {})
      },
      education: (parsed.education as EducationItem[] | undefined) ?? seedData.education,
      certifications: (parsed.certifications as CertificationItem[] | undefined) ?? seedData.certifications,
      skills: parsed.skills ?? seedData.skills,
      experience: parsed.experience ?? seedData.experience,
      portfolioProjects: parsed.portfolioProjects ?? seedData.portfolioProjects,
      profile: {
        ...seedData.profile,
        ...(parsed.profile ?? {})
      }
    };
  }

  private persist(next: PortfolioData): void {
    this.data.set(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  textByLocale(text: Translation, locale: Locale): string {
    return text[locale] ?? text.es;
  }

  updateProfileSummary(locale: Locale, value: string): void {
    const current = this.data();
    this.persist({
      ...current,
      profile: {
        ...current.profile,
        summary: {
          ...current.profile.summary,
          [locale]: value
        }
      }
    });
  }

  updateProfileRole(locale: Locale, value: string): void {
    const current = this.data();
    this.persist({
      ...current,
      profile: {
        ...current.profile,
        role: {
          ...current.profile.role,
          [locale]: value
        }
      }
    });
  }

  toggleSection(section: keyof PortfolioData['sectionVisibility']): void {
    const current = this.data();
    this.persist({
      ...current,
      sectionVisibility: {
        ...current.sectionVisibility,
        [section]: !current.sectionVisibility[section]
      }
    });
  }

  toggleSkill(name: string): void {
    const current = this.data();
    this.persist({
      ...current,
      skills: current.skills.map((skill) =>
        skill.name === name ? { ...skill, visible: !skill.visible } : skill
      )
    });
  }

  toggleExperience(id: string): void {
    const current = this.data();
    this.persist({
      ...current,
      experience: current.experience.map((item) =>
        item.id === id ? { ...item, visible: !item.visible } : item
      )
    });
  }

  toggleEducation(id: string): void {
    const current = this.data();
    this.persist({
      ...current,
      education: current.education.map((item) =>
        item.id === id ? { ...item, visible: !item.visible } : item
      )
    });
  }

  toggleCertification(id: string): void {
    const current = this.data();
    this.persist({
      ...current,
      certifications: current.certifications.map((item) =>
        item.id === id ? { ...item, visible: !item.visible } : item
      )
    });
  }

  toggleProject(id: string): void {
    const current = this.data();
    this.persist({
      ...current,
      portfolioProjects: current.portfolioProjects.map((item) =>
        item.id === id ? { ...item, visible: !item.visible } : item
      )
    });
  }
}
