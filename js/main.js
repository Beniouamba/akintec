// =============================================
// AKINTEC - Main JavaScript
// =============================================

document.addEventListener('DOMContentLoaded', () => {

  // ===== PRELOADER =====
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('hidden');
      setTimeout(() => preloader.remove(), 500);
    }, 1600);
  }

  // ===== CURSOR =====
  const cursor = document.querySelector('.cursor');
  const follower = document.querySelector('.cursor-follower');
  if (cursor && follower) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      setTimeout(() => {
        follower.style.left = e.clientX + 'px';
        follower.style.top = e.clientY + 'px';
      }, 80);
    });

    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        follower.style.transform = 'scale(1.5)';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        follower.style.transform = 'scale(1)';
      });
    });
  }

  // ===== HEADER SCROLL =====
  const header = document.querySelector('.site-header');
  const handleScroll = () => {
    if (window.scrollY > 80) header?.classList.add('scrolled');
    else header?.classList.remove('scrolled');

    // Back to top
    const btt = document.querySelector('.back-to-top');
    if (btt) {
      if (window.scrollY > 500) btt.classList.add('visible');
      else btt.classList.remove('visible');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ===== BACK TO TOP =====
  const btt = document.querySelector('.back-to-top');
  btt?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // ===== MOBILE MENU =====
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const overlay = document.querySelector('.mobile-menu-overlay');
  const closeBtn = document.querySelector('.mobile-menu-close');

  const openMenu = () => {
    mobileMenu?.classList.add('open');
    overlay?.classList.add('show');
    hamburger?.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    mobileMenu?.classList.remove('open');
    overlay?.classList.remove('show');
    hamburger?.classList.remove('active');
    document.body.style.overflow = '';
  };

  hamburger?.addEventListener('click', openMenu);
  closeBtn?.addEventListener('click', closeMenu);
  overlay?.addEventListener('click', closeMenu);

  // Mobile sub-nav toggles
  document.querySelectorAll('.mobile-nav .has-sub > a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const sub = link.nextElementSibling;
      sub?.classList.toggle('open');
      const icon = link.querySelector('.toggle-icon');
      if (icon) icon.style.transform = sub?.classList.contains('open') ? 'rotate(180deg)' : '';
    });
  });

  // ===== SCROLL ANIMATIONS =====
  const animateEls = document.querySelectorAll('.animate-fade-up');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('animated'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  animateEls.forEach(el => observer.observe(el));

  // ===== COUNTER ANIMATION =====
  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => counterObserver.observe(el));

  function animateCounter(el) {
    const target = parseInt(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current) + suffix;
    }, 16);
  }

  // ===== MULTILINGUAL SYSTEM =====
  const translations = {
    fr: {
      // Header
      'nav.home': 'Accueil',
      'nav.about': 'Qui sommes-nous ?',
      'nav.services': 'Nos Services',
      'nav.join': 'Nous rejoindre',
      'nav.contact': 'Contact',
      'nav.contact_btn': 'Nous contacter',
      'nav.portfolio': 'Nos projets',
      // Services dropdown
      'nav.services.software': 'Développement Logiciel',
      'nav.services.data': 'Data Engineering & Science',
      'nav.services.cloud': 'Cloud & DevOps',
      'nav.services.consulting': 'Conseil IT & Transformation',
      'nav.services.recruitment': 'Recrutement & Sous-traitance',
      // Hero
      'hero.badge': 'Votre partenaire tech en France',
      'hero.titl': 'Accélérez vos projets digitaux avec AKINTEC.',
      'hero.descr': 'Cabinet de conseil et ingénierie spécialisé dans le développement, la data et la transformation digitale.',
      'hero.feature1': 'Innovation',
      'hero.feature2': 'Expertise',
      'hero.feature3': 'Réactivité',
      'hero.feature4': 'Proximité',
      'hero.cta1': 'Découvrir nos services',
      'hero.cta2': 'Nous contacter',
      'hero.stat1': 'Projets réalisés',
      'hero.stat2': 'Clients satisfaits',
      'hero.stat3': 'Experts tech',
      'hero.stat4': 'Années d\'expérience',
      // Services
      'services.tag': 'Nos services',
      'services.title': 'Expertise à votre service',
      'services.desc': 'Découvrez nos domaines d\'expertise, au cœur de la transformation digitale de nos clients.',
      'services.software.title': 'Développement Logiciel & Web',

      'services.software.desc': 'Nous concevons et développons des applications web, mobiles et des logiciels sur mesure, en utilisant les frameworks et technologies les plus performants du marché. Du cahier des charges à la mise en production, nous vous accompagnons à chaque étape.',
      'services.software.offer': 'Ce que nous offrons', 
      'services.software.prestations': 'Nos prestations en détail', 
      'services.software.offer1': 'Des solutions complètes adaptées à vos besoins spécifiques.',
      'services.software.appweb': 'Applications Web Full-Stack',
      'services.software.appmobile': 'Applications Mobiles iOS & Android',
      'services.software.appmobile.desc': 'Développement natif iOS/Android et cross-platform avec React Native ou Flutter.',
      'services.software.api': 'API REST & Microservices',
      'services.software.api.desc': 'Architecture moderne REST/GraphQL, microservices scalables et documentés.',
      'services.software.ecom': 'E-commerce & CMS',
      'services.software.ecom.desc': 'Solutions e-commerce sur mesure, Shopify, WooCommerce, Strapi, WordPress.',
      'services.software.maint': 'Maintenance & Évolution',
      'services.software.maint.desc': 'Support et maintenance évolutive de vos applications existantes.',
      'services.software.h2': 'Notre méthode de travail',
      'services.software.process1': 'Découverte',
      'services.software.process1.desc': 'Analyse de vos besoins et définition du périmètre projet.',
      'services.software.process2': 'Conception',
      'services.software.process2.desc': 'Architecture technique et validation des choix technologiques.',
      'services.software.process3': 'Réalisation',
      'services.software.process3.desc': 'Développement agile avec des livraisons régulières et du feedback continu.',
      'services.software.process4': 'Support',
      'services.software.process4.desc': 'Maintenance évolutive et accompagnement long terme.',
      'services.software.explor': 'Explorez l\'ensemble de nos domaines d\'expertise.',
      'services.software.autreServ': 'Autres services',
      'services.software.deco': 'Découvrez aussi',

      'services.data.title': 'Data Engineering & Data Science',
      'services.data.desc': 'Transformez vos données brutes en actifs stratégiques. Nos experts en data engineering et data science conçoivent des pipelines robustes, des modèles prédictifs et des tableaux de bord analytiques pour éclairer vos décisions.',
      'services.data.offer': 'Ce que nous offrons',
      'services.data.h2': 'Nos prestations en détail',
      'services.data.p': 'Des solutions complètes adaptées à vos besoins spécifiques.',
      'services.data.feature1': 'Data Pipelines & ETL',
      'services.data.feature1.desc': 'Conception de pipelines de données robustes avec Apache Spark, Airflow, dbt.',
      'services.data.feature2': 'Data Warehousing',
      'services.data.feature2.desc': 'Architecture Lakehouse, BigQuery, Snowflake, Redshift optimisés pour l\'analyse.',
      'services.data.feature3': 'Machine Learning & IA',
      'services.data.feature3.desc': 'Modèles prédictifs, NLP, computer vision, MLOps et déploiement en production.',
      'services.data.feature4': 'Business Intelligence',
      'services.data.feature4.desc': 'Tableaux de bord Power BI, Tableau, Metabase pour piloter votre activité.',
      'services.data.feature5': 'Data Governance',
      'services.data.feature5.desc': 'Mise en conformité RGPD, catalogues de données, qualité et sécurité des données.',
      'services.data.process.title': 'Notre méthode de travail',
      'services.data.process1': 'Découverte',
      'services.data.process1.desc': 'Analyse de vos besoins et définition du périmètre projet.',
      'services.data.process2': 'Conception',
      'services.data.process2.desc': 'Architecture technique et validation des choix technologiques.',
      'services.data.process3': 'Réalisation',
      'services.data.process3.desc': 'Développement agile avec des livraisons régulières et du feedback continu.',
      'services.data.process4': 'Support',
      'services.data.process4.desc': 'Maintenance évolutive et accompagnement long terme.',
      'services.data.explor': 'Explorez l\'ensemble de nos domaines d\'expertise.',
      'services.data.autreServ': 'Autres services',
      'services.data.deco': 'Découvrez aussi',
      'services.cloud.title': 'Cloud & DevOps',
      'services.cloud.desc': 'Accélérez votre time-to-market avec des infrastructures cloud modernes et des pratiques DevOps éprouvées. Nous automatisons vos déploiements, optimisons vos coûts cloud et garantissons la haute disponibilité de vos systèmes.',
      'services.cloud.feature1': 'Infrastructure Cloud',
      'services.cloud.feature1.desc': 'Migration et architecture sur AWS, Azure, GCP avec les meilleures pratiques.',
      'services.cloud.feature2': 'CI/CD & Automatisation',
      'services.cloud.feature2.desc': 'Pipelines Jenkins, GitLab CI, GitHub Actions pour des livraisons continues et fiables.',
      'services.cloud.feature3': 'Containerisation',
      'services.cloud.feature3.desc': 'Docker, Kubernetes pour le déploiement et la gestion de vos applications conteneurisées.',
      'services.cloud.feature4': 'Infrastructure as Code',
      'services.cloud.feature4.desc': 'Terraform, Ansible, Pulumi pour une infrastructure versionnée et reproductible.',
      'services.cloud.feature5': 'Monitoring & Sécurité',
      'services.cloud.feature5.desc': 'Observabilité complète, alerting, sécurité cloud et conformité.',

      'services.consulting.title': 'Conseil IT & Transformation Digitale',
      'services.consulting.desc': 'Nos consultants expérimentés vous accompagnent dans la définition et l\'exécution de votre stratégie digitale. De l\'audit technologique à la conduite du changement, nous vous aidons à maximiser la valeur de vos investissements IT.',
      'services.consulting.feature1': 'Audit & Stratégie IT',
      'services.consulting.feature1.desc': 'Évaluation de votre SI, identification des opportunités d\'optimisation et roadmap digitale.',
      'services.consulting.feature2': 'Architecture & Design',
      'services.consulting.feature2.desc': 'Conception d\'architectures évolutives, microservices, event-driven, domain-driven design.',
      'services.consulting.feature3': 'Conduite du changement',
      'services.consulting.feature3.desc': 'Accompagnement des équipes, formation et gestion de la transformation culturelle.',
      'services.consulting.feature4': 'Optimisation des processus',
      'services.consulting.feature4.desc': 'Analyse et refonte des processus métiers pour gagner en efficacité et compétitivité.',
      'services.consulting.feature5': 'Conformité & Sécurité',
      'services.consulting.feature5.desc': 'RGPD, ISO 27001, audits de sécurité et mise en conformité réglementaire.',

      'services.recruitment.title': 'Recrutement & Sous-traitance',
      'services.recruitment.desc': 'Accédez à un vivier de talents tech qualifiés et disponibles. Que vous ayez besoin de renforcer vos équipes en régie, de trouver des profils rares ou d\'externaliser un projet complet, AKINTEC vous propose la solution adaptée.',
      'services.recruitment.talent1':'Développeurs',
      'services.recruitment.feature1':'Chasse de talents IT',
      'services.recruitment.feature1.desc':'Identification et approche des profils rares sur le marché : dev senior, data, cloud, CTO.',
      'services.recruitment.feature2':'Recrutement permanent',
      'services.recruitment.feature2.desc':'Processus de sélection rigoureux pour des recrutements CDI durables et pertinents.',
      'services.recruitment.feature3':'Régie & freelance',
      'services.recruitment.feature3.desc':'Mise à disposition de consultants experts pour renforcer vos équipes en mission.',
      'services.recruitment.feature4':'Outsourcing projet',
      'services.recruitment.feature4.desc':'Prise en charge complète de projets IT avec engagement sur les résultats.',
      'services.recruitment.feature5':'Évaluation technique',
      'services.recruitment.feature5.desc':'Tests techniques, entretiens structurés et évaluation des soft skills.',
      
      'services.cta': 'En savoir plus',
      // Why us
      'why.tag': 'Pourquoi nous ?',
      'why.title': 'Ce qui nous distingue',
      'why.desc': 'Chez AKINTEC, expertise technique, innovation et proximité humaine se combinent pour accompagner durablement la transformation digitale.',
      'why.1.title': 'Expertise technique reconnue',
      'why.1.desc': 'Nos ingénieurs maîtrisent les technologies modernes web, cloud et data science.',
      'why.2.title': 'Accompagnement sur mesure',
      'why.2.desc': 'Chaque projet est conçu pour s\'adapter à vos défis métiers, avec une approche agile et transparente.',
      'why.3.title': 'Réseau de talents qualifiés',
      'why.3.desc': 'Nous sélectionnons des profils qualifiés, passionnés et disponibles pour renforcer vos équipes.',
      'why.4.title': 'Innovation & proximité',
      'why.4.desc': 'Basés en France, nous combinons rigueur technique et culture de l\'innovation.',
      // Testimonials
      'testimonials.tag': 'Témoignages',
      'testimonials.title': 'Ce que disent nos clients',
      // Brands
      'brands.title': 'Ils nous font confiance',
      // CTA
      'cta.title': 'Besoin d\'un partenaire tech fiable ?',
      'cta.desc': 'Discutons de votre projet et trouvons ensemble la meilleure solution pour vos besoins.',
      'cta.btn': 'Démarrer un projet',
      // Footer
      'footer.tagline': '"Notre génération croit en un monde numérique plus responsable, au service des entreprises et de la planète."',
      'footer.useful': 'Liens utiles',
      'footer.company': 'Notre entreprise',
      'footer.contact': 'Nos contacts',
      'footer.legal': 'Mentions légales',
      'footer.privacy': 'Politique de confidentialité',
      'footer.partners': 'Partenaires',
      'footer.about': 'À propos',
      'footer.services': 'Nos services',
      'footer.recruitment': 'Recrutement',
      'footer.copyright': 'Tous droits réservés.',
      // About
      'about.tag': 'Qui sommes-nous',
      'about.title': 'AKINTEC, votre partenaire de confiance',
      'about.desc1': 'Fondée avec la conviction qu\'une nouvelle génération de cabinets tech peut faire mieux, AKINTEC accompagne entreprises et institutions dans leur transformation digitale.',
      'about.desc2': 'Notre approche combine expertise technique de haut niveau, agilité et proximité humaine pour livrer des solutions qui créent de la valeur durable.',
      'about.': 'Notre Mission',
      'about.mission.desc': 'Accélérer la transformation digitale',
      'about.vision.title': 'Notre Vision',
      'about.vision.desc': 'Un numérique plus responsable',
      'about.innovation.title': 'Innovation',
      'about.innovation.desc': 'Technologies de pointe',
      'about.excellence.title': 'Excellence',
      'about.excellence.desc': 'Standards élevés',
      'about.p1': 'Fondée avec la conviction qu\'une nouvelle génération de cabinets tech peut faire mieux, AKINTEC accompagne entreprises et institutions dans leur transformation digitale.',
      'about.p2': 'Notre approche combine expertise technique de haut niveau, agilité et proximité humaine pour livrer des solutions qui créent de la valeur durable.',
      'about.p3': 'AKINTEC s\'appuie sur une nouvelle génération d\'ingénieurs et de consultants qui souhaitent redéfinir les codes du numérique : plus vert, plus éthique et plus inclusif.',
      'about.author': '— L’équipe AKINTEC',
      'about.quote': '“Notre génération croit en un numérique plus responsable, au service des entreprises et de la planète.”',
      'about.projects': 'Projets livrés',
      'about.experience': 'D\'expérience',
      'about.years': '5 ans',
      'about.domains.title': 'Domaines',
      'about.domains.heading': 'Nos domaines d’expertise',
      'about.domains.desc': 'Alliant innovation, agilité et responsabilité, nos équipes mettent le numérique au service de la performance et de la durabilité.',
      'about.domains.software.title': 'Développement & Ingénierie logicielle',
      'about.domains.software.desc': 'Conception d’applications performantes, web et mobiles, adaptées à vos besoins métiers.',
      'about.domains.data.title': 'Data & Intelligence artificielle',
      'about.domains.data.desc': 'Exploitation des données pour la prise de décision et l’optimisation des performances.',
      'about.domains.cloud.title': 'Cloud & DevOps',
      'about.domains.cloud.desc': 'Infrastructure moderne, automatisation et sécurité pour une agilité maximale.',
      'about.domains.consulting.title': 'Conseil IT & Transformation digitale',
      'about.domains.consulting.desc': 'Accompagnement stratégique pour aligner vos systèmes d’information avec vos ambitions de croissance et d’innovation.',
      'about.domains.recruitment.title': 'Recrutement & Sous-traitance IT',
      'about.domains.recruitment.desc': 'Mise à disposition de profils techniques qualifiés et flexibles pour renforcer vos équipes et projets digitaux.',
      'about.values.innovation': 'Innovation durable',
      'about.values.innovation.desc': 'Innover, oui, mais dans le respect de la planète et des ressources.',
      'about.values.excellence': 'Excellence technologique',
      'about.values.excellence.desc': 'Offrir le meilleur de la technologie avec agilité et précision.',
      'about.values.responsibility': 'Responsabilité',
      'about.values.responsibility.desc': 'Favoriser des pratiques numériques éthiques et respectueuses de l’environnement.',
      'about.values.engagement': 'Engagement humain',
      'about.values.engagement.desc': 'Travailler avec nos clients dans une logique de partenariat et de confiance.',
      'about.values.heading': 'Ce en quoi nous croyons',
      'about.values.desc': 'Nos valeurs guident chacune de nos décisions et interactions.',
      'about.values.title': 'valeurs',
      'about.mission.title': 'Notre approche',
      'about.mission.desc': 'Un processus structuré pour garantir des résultats exceptionnels à chaque étape.',
      'about.mission.heading': 'Comment nous travaillons',
      'about.mission.step1.title': 'analyse',
      'about.mission.step1.desc': 'Compréhension approfondie de vos besoins et objectifs métiers.',
      'about.mission.step2.title': 'Conception',
      'about.mission.step2.desc': 'Architecture technique et planification rigoureuse du projet.',
      'about.mission.step3.title': 'Développement',
      'about.mission.step3.desc': 'Livraisons itératives avec revues régulières et feedback continu.',
      'about.mission.step4.title': 'Déploiement',
      'about.mission.step4.desc': 'Mise en production soignée, formation et support continu.',
      'about.team.title': 'Une équipe passionnée et engagée.',
      'about.team.desc': 'Derrière chaque projet AKINTEC, une équipe de consultants, ingénieurs et data experts partageant la même passion pour la technologie et l’innovation.',



      // Contact
      'contact.tag': 'Contact',
      'contact.title': 'Parlons de votre projet',
      'contact.desc': 'Notre équipe est disponible pour répondre à toutes vos questions et vous accompagner.',
      'contact.form.title': 'Envoyez-nous un message',
      'contact.form.subtitle': 'Nous vous répondons dans les 24h',
      'contact.form.firstname': 'Prénom',
      'contact.form.lastname': 'Nom',
      'contact.form.email': 'Email',
      'contact.form.phone': 'Téléphone',
      'contact.form.subject': 'Sujet',
      'contact.form.message': 'Votre message',
      'contact.form.send': 'Envoyer le message',
      'contact.address': 'Adresse',
      'contact.phone': 'Téléphone',
      'contact.email_lbl': 'Email',
      // Join us
      'join.tag': 'Rejoignez-nous',
      'join.title': 'Construisez l\'avenir avec nous',
      'join.desc': 'Vous êtes passionné par la tech et souhaitez rejoindre une équipe dynamique ? AKINTEC recrute des talents !',
      'join.apply': 'Postuler maintenant',
    },
    en: {
      'nav.home': 'Home',
      'nav.about': 'Who are we?',
      'nav.services': 'Our Services',
      'nav.join': 'Join us',
      'nav.portfolio': 'Our projects',
      'nav.contact': 'Contact',
      'nav.contact_btn': 'Contact us',
      'nav.services.software': 'Software Development',
      'nav.services.data': 'Data Engineering & Science',
      'nav.services.cloud': 'Cloud & DevOps',
      'nav.services.consulting': 'IT Consulting & Transformation',
      'nav.services.recruitment': 'Recruitment & Outsourcing',
      'hero.badge': 'Your tech partner in France',
      'hero.titl': 'Accelerate your digital projects with AKINTEC.',
      'hero.descr': 'Consulting and engineering firm specializing in development, data and digital transformation.',
      'hero.feature1': 'Innovation',
      'hero.feature2': 'Expertise',
      'hero.feature3': 'Reactivity',
      'hero.feature4': 'Proximity',
      'hero.cta1': 'Discover our services',
      'hero.cta2': 'Contact us',
      'hero.stat1': 'Projects delivered',
      'hero.stat2': 'Happy clients',
      'hero.stat3': 'Tech experts',
      'hero.stat4': 'Years of experience',
      'services.tag': 'Our Services',
      'services.title': 'Expertise at your service',
      'services.desc': 'Discover our areas of expertise, at the heart of our clients\' digital transformation.',
      'services.software.title': 'Software & Web Development',
      

      'services.software.desc': 'We design and develop custom web, mobile applications and software, using the most efficient frameworks and technologies on the market. From requirements to production, we support you at every step.',
      'services.software.offer': 'What we offer', 
      'services.software.prestations': 'Our services in detail', 
      'services.software.offer1': 'Complete solutions tailored to your specific needs.',
      'services.software.appweb': 'Full-Stack Web Applications',
      'services.software.appmobile': 'iOS & Android Mobile Applications',
      'services.software.appmobile.desc': 'Native iOS/Android development and cross-platform with React Native or Flutter.',
      'services.software.api': 'API REST & Microservices',
      'services.software.api.desc': 'Modern REST/GraphQL architecture, scalable and documented microservices.',
      'services.software.ecom': 'E-commerce & CMS',
      'services.software.ecom.desc': 'Custom e-commerce solutions, Shopify, WooCommerce, Strapi, WordPress.',
      'services.software.maint': 'Maintenance & Evolution',
      'services.software.maint.desc': 'Support and evolutionary maintenance of your existing applications.',
      'services.software.h2': 'Our work method',
      'services.software.process1': 'Discovery',
      'services.software.process1.desc': 'Analysis of your needs and definition of the project scope.',
      'services.software.process2': 'Design',
      'services.software.process2.desc': 'Technical architecture and validation of technological choices.',
      'services.software.process3': 'Development',
      'services.software.process3.desc': 'Agile development with regular deliveries and continuous feedback.',
      'services.software.process4': 'Support',
      'services.software.process4.desc': 'Evolutionary maintenance and long-term accompaniment.',
      'services.software.explor': 'Explore the full range of our expertise areas.',
      'services.software.autreServ': 'Other services',
      'services.software.deco': 'Discover also',


      'services.data.title': 'Data Engineering & Data Science',
      'services.data.desc': 'Turn your raw data into strategic assets. Our data engineering and data science experts design robust pipelines, predictive models and analytical dashboards to inform your decisions.',
      'services.data.offer': 'What we offer',
      'services.data.h2': 'Our services in detail',
      'services.data.p': 'Complete solutions tailored to your specific needs.',
      'services.data.feature1': 'Data Pipelines & ETL',
      'services.data.feature1.desc': 'Design of robust data pipelines with Apache Spark, Airflow, dbt.',
      'services.data.feature2': 'Data Warehousing',
      'services.data.feature2.desc': 'Lakehouse architecture, BigQuery, Snowflake, Redshift optimized for analysis.',
      'services.data.feature3': 'Machine Learning & IA',
      'services.data.feature3.desc': 'Predictive models, NLP, computer vision, MLOps and production deployment.',
      'services.data.feature4': 'Business Intelligence',
      'services.data.feature4.desc': 'Power BI, Tableau, Metabase dashboards to drive your business.',
      'services.data.feature5.desc': 'GDPR compliance, data catalogues, data quality and security.',
      'services.data.process.title': 'Our work method',
      'services.data.process1': 'Discovery',
      'services.data.process1.desc': 'Analysis of your needs and definition of the project scope.',
      'services.data.process2': 'Design',
      'services.data.process2.desc': 'Technical architecture and validation of technological choices.',
      'services.data.process3': 'Development',
      'services.data.process3.desc': 'Agile development with regular deliveries and continuous feedback.',
      'services.data.process4': 'Support',
      'services.data.process4.desc': 'Evolutionary maintenance and long-term accompaniment.',
      'services.data.explor': 'Explore the full range of our expertise areas.',
      'services.data.autreServ': 'Other services',
      'services.data.deco': 'Discover also',
      'services.cloud.title': 'Cloud & DevOps',
      'services.cloud.desc': 'Accelerate your time-to-market with modern cloud infrastructures and proven DevOps practices. We automate your deployments, optimize your cloud costs and ensure the high availability of your systems.',
      'services.cloud.feature1': 'Cloud Infrastructure',
      'services.cloud.feature1.desc': 'Migration and architecture on AWS, Azure, GCP with best practices.',
      'services.cloud.feature2': 'CI/CD & Automation',
      'services.cloud.feature2.desc': 'Pipelines Jenkins, GitLab CI, GitHub Actions for continuous and reliable deliveries.',
      'services.cloud.feature3': 'Containerisation',
      'services.cloud.feature3.desc': 'Docker, Kubernetes for deploying and managing your containerized applications.',
      'services.cloud.feature4': 'Infrastructure as Code',
      'services.cloud.feature4.desc': 'Terraform, Ansible, Pulumi for versioned and reproducible infrastructure.',
      'services.cloud.feature5': 'Monitoring & Security',
      'services.cloud.feature5.desc': 'Complete observability, alerting, cloud security and compliance.',


      'services.consulting.title': 'IT Consulting & Digital Transformation',
      'services.consulting.desc': 'Our experienced consultants support you in defining and executing your digital strategy. From technological audit to change management, we help you maximize the value of your IT investments.',
      'services.consulting.feature1': 'Audit & IT Strategy',
      'services.consulting.feature1.desc': 'Evaluation of your IS, identification of optimization opportunities and digital roadmap.',
      'services.consulting.feature2': 'Architecture & Design',
      'services.consulting.feature2.desc': 'Design of scalable architectures, microservices, event-driven, domain-driven design.',
      'services.consulting.feature3': 'Change Management',
      'services.consulting.feature3.desc': 'Support for teams, training and management of cultural transformation.',
      'services.consulting.feature4': 'Process Optimization',
      'services.consulting.feature4.desc': 'Analysis and redesign of business processes to improve efficiency and competitiveness.',
      'services.consulting.feature5': 'Compliance & Security',
      'services.consulting.feature5.desc': 'GDPR, ISO 27001, security audits and regulatory compliance.',
      'services.recruitment.title': 'Recruitment & Outsourcing',
      'services.recruitment.desc': 'Access a pool of qualified and available tech talents. Whether you need to strengthen your teams with outsourcing, find rare profiles or outsource a complete project, AKINTEC offers you the right solution.',
      'services.recruitment.talent1':'Developers',
      'services.recruitment.feature1':'IT Talent Hunting',
      'services.recruitment.feature1.desc':'Identification and approach of rare profiles on the market: senior dev, data, cloud, CTO.',
      'services.recruitment.feature2':'Permanent Recruitment',
      'services.recruitment.feature2.desc':'Rigorous selection process for sustainable and relevant CDI placements.',
      'services.recruitment.feature3':'Staffing & Freelance',
      'services.recruitment.feature3.desc':'Deployment of expert consultants to strengthen your teams for missions.',
      'services.recruitment.feature4':'Project Outsourcing',
      'services.recruitment.feature4.desc':'Complete project management for IT projects with commitment to results.',
      'services.recruitment.feature5':'Technical Evaluation',
      'services.recruitment.feature5.desc':'Technical tests, structured interviews and evaluation of soft skills.',
      
      

      'services.cta': 'Learn more',
      'why.tag': 'Why us?',
      'why.title': 'What sets us apart',
      'why.desc': 'At AKINTEC, we combine technical expertise, innovation and human proximity to sustainably support digital transformation.',
      'why.1.title': 'Recognized technical expertise',
      'why.1.desc': 'Our engineers master modern web, cloud and data science technologies.',
      'why.2.title': 'Tailored support',
      'why.2.desc': 'Each project is designed to adapt to your business challenges, with an agile and transparent approach.',
      'why.3.title': 'Network of qualified talent',
      'why.3.desc': 'We select qualified, passionate and available profiles to strengthen your technical teams.',
      'why.4.title': 'Innovation & proximity',
      'why.4.desc': 'Based in France, we combine technical rigor with a culture of innovation.',
      'testimonials.tag': 'Testimonials',
      'testimonials.title': 'What our clients say',
      'brands.title': 'They trust us',
      'cta.title': 'Need a reliable tech partner?',
      'cta.desc': "Let's discuss your project and find together the best solution for your needs.",
      'cta.btn': 'Start a project',
      'footer.tagline': '"Our generation believes in a more responsible digital world, serving businesses and the planet."',
      'footer.useful': 'Useful Links',
      'footer.company': 'Our Company',
      'footer.contact': 'Our Contacts',
      'footer.legal': 'Legal notice',
      'footer.privacy': 'Privacy Policy',
      'footer.partners': 'Partners',
      'footer.about': 'About',
      'footer.services': 'Our Services',
      'footer.recruitment': 'Recruitment',
      'footer.copyright': 'All rights reserved.',
      'about.tag': 'Who we are',
      'about.title': 'AKINTEC, your trusted partner',
      'about.desc1': 'Founded with the conviction that a new generation of tech firms can do better, AKINTEC supports companies and institutions in their digital transformation.',
      'about.desc2': 'Our approach combines high-level technical expertise, agility and human proximity to deliver solutions that create lasting value.',
      'about.mission.title': 'Our Mission',
      'about.mission.desc': 'Accelerate digital transformation',
      'about.vision.title': 'Our Vision',
      'about.vision.desc': 'A more responsible digital world',
      'about.innovation.title': 'Innovation',
      'about.innovation.desc': 'Cutting-edge technologies',
      'about.excellence.title': 'Excellence',
      'about.excellence.desc': 'High standards',
      'about.p1': 'Founded on the belief that a new generation of tech firms can do better, AKINTEC supports companies and institutions in their digital transformation.',
      'about.p2': 'Our approach combines high-level technical expertise, agility and human connection to deliver solutions that create lasting value.',
      'about.p3': 'AKINTEC relies on a new generation of engineers and consultants who want to redefine the codes of digital technology: greener, more ethical and more inclusive.',
      'about.author': '— AKINTEC team',
      'about.quote': '“Our generation believes in a more responsible digital world, serving businesses and the planet.”',
      'about.projects': 'Projects delivered',
      'about.experience': 'Years of experience',
      'about.years': '5 years',
      'about.domains.title': 'Domains',
      'about.domains.heading': 'Our areas of expertise',
      'about.domains.desc': 'Combining innovation, agility and responsibility, our teams put digital technology at the service of performance and sustainability.',
      'about.domains.software.title': 'Development & Software Engineering',
      'about.domains.software.desc': 'Design of high-performance web and mobile applications tailored to your business needs.',
      'about.domains.data.title': 'Data & Artificial Intelligence',
      'about.domains.data.desc': 'Unlocking the value of data for decision-making and performance optimization.',
      'about.domains.cloud.title': 'Cloud & DevOps',
      'about.domains.cloud.desc': 'Modern infrastructure, automation and security for maximum agility.',
      'about.domains.consulting.title': 'IT Consulting & Digital Transformation',
      'about.domains.consulting.desc': 'Strategic guidance to align your information systems with your growth and innovation ambitions.',
      'about.domains.recruitment.title': 'Recruitment & IT Outsourcing',
      'about.domains.recruitment.desc': 'Provision of qualified and flexible technical profiles to strengthen your teams and digital projects.',
      'about.values.innovation': 'Sustainable Innovation',
      'about.values.innovation.desc': 'Innovate, yes, but within the respect of the planet and its resources.',
      'about.values.excellence': 'Technological Excellence',
      'about.values.excellence.desc': 'Delivering the best of technology with agility and precision.',
      'about.values.responsibility': 'Responsibility',
      'about.values.responsibility.desc': 'Promoting ethical digital practices and environmentally conscious approaches.',
      'about.values.engagement': 'Human Engagement',
      'about.values.engagement.desc': 'Working with our clients in a partnership and trust-based logic.',
      'about.values.heading': 'What we believe in',
      'about.values.desc': 'Our values guide each of our decisions and interactions.',
      'about.values.title': 'values',
      'about.mission.title': 'Our approach',
      'about.mission.desc': 'A structured process to ensure exceptional results at every step.',
      'about.mission.heading': 'How we work',
      'about.mission.step1.title': 'analyse',
      'about.mission.step1.desc': 'In-depth understanding of your needs and business objectives.',
      'about.mission.step2.title': 'Design',
      'about.mission.step2.desc': 'Technical architecture and rigorous project planning.',
      'about.mission.step3.title': 'Development',
      'about.mission.step3.desc': 'Implementation of technical solutions.',
      'about.mission.step4.title': 'Deployment',
      'about.mission.step4.desc': 'Careful production deployment, training and continuous support.',
      'about.team.title': 'A passionate and committed team.',
      'about.team.desc': 'Behind every AKINTEC project, a team of consultants, engineers and data experts share the same passion for technology and innovation.',
      'contact.tag': 'Contact',
      'contact.title': "Let's talk about your project",
      'contact.desc': 'Our team is available to answer all your questions and support you.',
      'contact.form.title': 'Send us a message',
      'contact.form.subtitle': 'We respond within 24 hours',
      'contact.form.firstname': 'First name',
      'contact.form.lastname': 'Last name',
      'contact.form.email': 'Email',
      'contact.form.phone': 'Phone',
      'contact.form.subject': 'Subject',
      'contact.form.message': 'Your message',
      'contact.form.send': 'Send message',
      'contact.address': 'Address',
      'contact.phone': 'Phone',
      'contact.email_lbl': 'Email',
      'join.tag': 'Join us',
      'join.title': 'Build the future with us',
      'join.desc': 'Are you passionate about tech and want to join a dynamic team? AKINTEC is hiring!',
      'join.apply': 'Apply now',
    },
    es: {
      'nav.home': 'Inicio',
      'nav.about': '¿Quiénes somos?',
      'nav.services': 'Nuestros Servicios',
      'nav.join': 'Únete a nosotros',
      'nav.portfolio': 'Nuestros Proyectos',
      'nav.contact': 'Contacto',
      'nav.contact_btn': 'Contáctenos',
      'nav.services.software': 'Desarrollo de Software',
      'nav.services.data': 'Ingeniería de Datos & IA',
      'nav.services.cloud': 'Cloud & DevOps',
      'nav.services.consulting': 'Consultoría IT',
      'nav.services.recruitment': 'Reclutamiento & Outsourcing',
      'hero.badge': 'Tu socio tecnológico en Francia',
      'hero.titl': 'Acelera tus proyectosdigitales con AKINTEC.',
      'hero.descr': 'Firma de consultoría e ingeniería especializada en desarrollo, datos y transformación digital.',
      'hero.feature1': 'Innovación',
      'hero.feature2': 'Experiencia',
      'hero.feature3': 'Reactividad',
      'hero.feature4': 'Proximidad',
      'hero.cta1': 'Descubrir nuestros servicios',
      'hero.cta2': 'Contáctenos',
      'hero.stat1': 'Proyectos entregados',
      'hero.stat2': 'Clientes satisfechos',
      'hero.stat3': 'Expertos técnicos',
      'hero.stat4': 'Años de experiencia',
      'services.tag': 'Nuestros Servicios',
      'services.title': 'Experiencia a su servicio',
      'services.desc': 'Descubra nuestras áreas de especialización en el corazón de la transformación digital.',
      'services.software.title': 'Desarrollo de Software & Web',


      'services.software.desc': 'Diseñamos y desarrollamos aplicaciones web, móviles y software a medida, utilizando los marcos y tecnologías más eficientes del mercado. Desde los requisitos hasta la producción, lo acompañamos en cada paso.',
      'services.software.offer': 'Lo que ofrecemos', 
      'services.software.prestations': 'Nuestros servicios en detalle', 
      'services.software.offer1': 'Soluciones completas adaptadas a sus necesidades específicas.',
      'services.software.appweb': 'Aplicaciones Web Full-Stack',
      'services.software.appmobile': 'Aplicaciones Móviles iOS & Android',
      'services.software.appmobile.desc': 'Desarrollo nativo para iOS/Android y multiplataforma con React Native o Flutter.',
      'services.software.api': 'API REST & Microservices',
      'services.software.api.desc': 'Arquitectura moderna REST/GraphQL, microservicios escalables y documentados.',
      'services.software.ecom': 'E-commerce & CMS',
      'services.software.ecom.desc': 'Soluciones de e-commerce personalizadas, Shopify, WooCommerce, Strapi, WordPress.',
      'services.software.maint': 'Maintenance & Evolution',
      'services.software.maint.desc': 'Soporte y mantenimiento evolutivo de sus aplicaciones existentes.',
      'services.software.h2': 'Nuestro método de trabajo',
      'services.software.process1': 'Descubrimiento',
      'services.software.process1.desc': 'Análisis de sus necesidades y definición del alcance del proyecto.',
      'services.software.process2': 'Diseño',
      'services.software.process2.desc': 'Arquitectura técnica y validación de las elecciones tecnológicas.',
      'services.software.process3': 'Desarrollo',
      'services.software.process3.desc': 'Desarrollo ágil con entregas regulares y retroalimentación continua.',
      'services.software.process4': 'Soporte',
      'services.software.process4.desc': 'Mantenimiento evolutivo y acompañamiento a largo plazo.',
      'services.software.explor': 'Explore toda nuestra gama de áreas de especialización.',
      'services.software.autreServ': 'Otros servicios',
      'services.software.deco': 'Descubra también',
      'services.data.title': 'Ingeniería de Datos & Ciencia de Datos',
      'services.data.desc': 'Transforme sus datos brutos en activos estratégicos. Nuestros expertos en ingeniería de datos y ciencia de datos diseñan pipelines robustos, modelos predictivos y dashboards analíticos para informar sus decisiones.',
      'services.data.offer': 'Lo que ofrecemos',
      'services.data.h2': 'Nuestros servicios en detalle',
      'services.data.p': 'Soluciones completas adaptadas a sus necesidades específicas.',
      'services.data.feature1': 'Pipelines de Datos & ETL',
      'services.data.feature1.desc': 'Diseño de pipelines de datos robustos con Apache Spark, Airflow, dbt.',
      'services.data.feature2': 'Almacén de Datos',
      'services.data.feature2.desc': 'Arquitectura Lakehouse, BigQuery, Snowflake, Redshift optimizados para el análisis.',
      'services.data.feature3': 'Machine Learning & IA',
      'services.data.feature3.desc': 'Modelos predictivos, NLP, visión por computadora, MLOps y despliegue en producción.',
      'services.data.feature4': 'Inteligencia de Negocio',
      'services.data.feature4.desc': 'Power BI, Tableau, Metabase dashboards para impulsar su negocio.',
      'services.data.feature5.desc': 'Cumplimiento de GDPR, catálogos de datos, calidad y seguridad de datos.',
      'services.data.process.title': 'Nuestro método de trabajo',
      'services.data.process1': 'Descubrimiento',
      'services.data.process1.desc': 'Análisis de sus necesidades y definición del alcance del proyecto.',
      'services.data.process2': 'Diseño',
      'services.data.process2.desc': 'Arquitectura técnica y validación de las elecciones tecnológicas.',
      'services.data.process3': 'Desarrollo',
      'services.data.process3.desc': 'Desarrollo ágil con entregas regulares y retroalimentación continua.',
      'services.data.process4': 'Soporte',
      'services.data.process4.desc': 'Mantenimiento evolutivo y acompañamiento a largo plazo.',
      'services.data.explor': 'Explore toda nuestra gama de áreas de especialización.',
      'services.data.autreServ': 'Otros servicios',
      'services.data.deco': 'Descubra también',


      'services.cloud.title': 'Cloud & DevOps',
      'services.cloud.desc': 'Acelere su time-to-market con infraestructuras cloud modernas y prácticas DevOps probadas. Automatizamos sus despliegues, optimizamos sus costos en la nube y garantizamos la alta disponibilidad de sus sistemas.',
      'services.cloud.feature1': 'Infraestructura Cloud',
      'services.cloud.feature1.desc': 'Migración y arquitectura en AWS, Azure, GCP con las mejores prácticas.',
      'services.cloud.feature2': 'CI/CD & Automatización',
      'services.cloud.feature2.desc': 'Pipelines Jenkins, GitLab CI, GitHub Actions para entregas continuas y fiables.',
      'services.cloud.feature3': 'Containerización',
      'services.cloud.feature3.desc': 'Docker, Kubernetes para el despliegue y gestión de sus aplicaciones contenerizadas.',
      'services.cloud.feature4': 'Infraestructura como Código',
      'services.cloud.feature4.desc': 'Terraform, Ansible, Pulumi para una infraestructura versionada y reproducible.',
      'services.cloud.feature5': 'Monitoreo & Seguridad',
      'services.cloud.feature5.desc': 'Observabilidad completa, alerting, seguridad cloud y conformidad.',


      'services.consulting.title': 'Consultoría IT & Transformación Digital',
      'services.consulting.desc': 'Nuestros consultores experimentados lo apoyan en la definición y ejecución de su estrategia digital. Desde la auditoría tecnológica hasta la gestión del cambio, lo ayudamos a maximizar el valor de sus inversiones en TI.',
      'services.consulting.feature1': 'Auditoría & Estrategia IT',
      'services.consulting.feature1.desc': 'Evaluación de su SI, identificación de oportunidades de optimización y roadmap digital.',
      'services.consulting.feature2': 'Arquitectura & Diseño',
      'services.consulting.feature2.desc': 'Diseño de arquitecturas escalables, microservicios, event-driven, domain-driven design.',
      'services.consulting.feature3': 'Gestión del Cambio',
      'services.consulting.feature3.desc': 'Apoyo a las equipos, formación y gestión de la transformación cultural.',
      'services.consulting.feature4': 'Optimización de Procesos',
      'services.consulting.feature4.desc': 'Análisis y reingeniería de procesos empresariales para ganar en eficiencia y competitividad.',
      'services.consulting.feature5': 'Conformidad & Seguridad',
      'services.consulting.feature5.desc': 'GDPR, ISO 27001, auditorías de seguridad y conformidad regulatoria.',
      'services.recruitment.title': 'Reclutamiento & Outsourcing',
      'services.recruitment.desc': 'Acceda a un pool de talentos técnicos calificados y disponibles. Ya sea que necesite reforzar sus equipos con outsourcing, encontrar perfiles raros o externalizar un proyecto completo, AKINTEC le ofrece la solución adecuada.',
      'services.recruitment.talent1':'Desarrolladores',
      'services.recruitment.feature1':'Caza de Talentos IT',
      'services.recruitment.feature1.desc':'Identificación y abordaje de perfiles raros en el mercado: senior dev, data, cloud, CTO.',
      'services.recruitment.feature2':'Reclutamiento Permanente',
      'services.recruitment.feature2.desc':'Proceso de selección riguroso para colocaciones CDI duraderas y relevantes.',
      'services.recruitment.feature3':'Staffing & Freelance',
      'services.recruitment.feature3.desc':'Despliegue de consultores expertos para reforzar sus equipos por misiones.',
      'services.recruitment.feature4':'Outsourcing de Proyectos',
      'services.recruitment.feature4.desc':'Gestión completa de proyectos para proyectos IT con compromiso de resultados.',
      'services.recruitment.feature5':'Evaluación Técnica',
      'services.recruitment.feature5.desc':'Pruebas técnicas, entrevistas estructuradas y evaluación de soft skills.',


      'services.cta': 'Saber más',
      'why.tag': '¿Por qué nosotros?',
      'why.title': 'Lo que nos distingue',
      'why.desc': 'En AKINTEC combinamos experiencia técnica, innovación y proximidad humana.',
      'why.1.title': 'Experiencia técnica reconocida',
      'why.1.desc': 'Nuestros ingenieros dominan tecnologías modernas web, cloud y data science.',
      'why.2.title': 'Acompañamiento personalizado',
      'why.2.desc': 'Cada proyecto se diseña para adaptarse a sus desafíos empresariales.',
      'why.3.title': 'Red de talentos cualificados',
      'why.3.desc': 'Seleccionamos perfiles cualificados y apasionados para reforzar sus equipos.',
      'why.4.title': 'Innovación y proximidad',
      'why.4.desc': 'Basados en Francia, combinamos rigor técnico y cultura de innovación.',
      'testimonials.tag': 'Testimonios',
      'testimonials.title': 'Lo que dicen nuestros clientes',
      'brands.title': 'Confían en nosotros',
      'cta.title': '¿Necesita un socio tecnológico fiable?',
      'cta.desc': 'Hablemos de su proyecto y encontremos juntos la mejor solución.',
      'cta.btn': 'Iniciar un proyecto',
      'footer.tagline': '"Nuestra generación cree en un mundo digital más responsable."',
      'footer.useful': 'Enlaces útiles',
      'footer.company': 'Nuestra empresa',
      'footer.contact': 'Contacto',
      'footer.legal': 'Aviso legal',
      'footer.privacy': 'Política de privacidad',
      'footer.partners': 'Socios',
      'footer.about': 'Acerca de',
      'footer.services': 'Nuestros servicios',
      'footer.recruitment': 'Reclutamiento',
      'footer.copyright': 'Todos los derechos reservados.',
      'about.tag': 'Quiénes somos',
      'about.title': 'AKINTEC, su socio de confianza',
      'about.desc1': 'Fundada con la convicción de que una nueva generación de empresas tech puede hacerlo mejor.',
      'about.desc2': 'Nuestra combinación de experiencia técnica, agilidad y proximidad humana entrega soluciones de valor duradero.',
      'about.mission.title': 'Nuestra Misión',
      'about.mission.desc': 'Acelerar la transformación digital',
      'about.vision.title': 'Nuestra Visión',
      'about.vision.desc': 'Un digital más responsable',
      'about.innovation.title': 'Innovación',
      'about.innovation.desc': 'Tecnologías de vanguardia',
      'about.excellence.title': 'Excelencia',
      'about.excellence.desc': 'Altos estándares',
      'about.team.title': 'Una équipe passionnée et engagée.',
      'about.team.desc': 'Derrière chaque projet AKINTEC, une équipe de consultants, ingénieurs et data experts partageant la même passion pour la technologie et l’innovation.',
      'about.p1': 'Fundada con la convicción de que una nueva generación de empresas tech puede hacerlo mejor, AKINTEC apoya a empresas e instituciones en su transformación digital.',
      'about.p2': 'Nuestra combinación de experiencia técnica, agilidad y proximidad humana entrega soluciones de valor duradero.',
      'about.p3': 'AKINTEC se apoya en una nueva generación de ingenieros y consultores que quieren redefinir los códigos del digital: más verde, más ético y más inclusivo.',
      'about.author': '— El equipo de AKINTEC',
      'about.quote': '“Nuestra generación cree en un digital más responsable, al servicio de las empresas y del planeta.”',
      'about.projects': 'Proyectos entregados',
      'about.experience': 'Años de experiencia',
      'about.years': '5 años',
      'about.domains.title': 'Dominios',
      'about.domains.heading': 'Nuestros dominios de especialización',
      'about.domains.desc': 'Combinando innovación, agilidad y responsabilidad, nuestros equipos ponen el digital al servicio del rendimiento y la sostenibilidad.',
      'about.domains.software.title': 'Desarrollo & Ingeniería de Software',
      'about.domains.software.desc': 'Diseño de aplicaciones web y móviles de alto rendimiento adaptadas a sus necesidades empresariales.',
      'about.domains.data.title': 'Datos & Inteligencia Artificial',
      'about.domains.data.desc': 'Descubriendo el valor de los datos para la toma de decisiones y la optimización del rendimiento.',
      'about.domains.cloud.title': 'Nube & DevOps',
      'about.domains.cloud.desc': 'Infraestructura moderna, automatización y seguridad para una agilidad máxima.',
      'about.domains.consulting.title': 'Consultoría IT & Transformación digital',
      'about.domains.consulting.desc': 'Acompañamiento estratégico para alinear sus sistemas de información con sus ambiciones de crecimiento e innovación.',
      'about.domains.recruitment.title': 'Reclutamiento & Outsourcing IT',
      'about.domains.recruitment.desc': 'Provisión de perfiles técnicos calificados y flexibles para fortalecer sus equipos y proyectos digitales.',
      'about.values.innovation': 'Innovación Sostenible',
      'about.values.innovation.desc': 'Innovar, sí, pero dentro del respeto por el planeta y sus recursos.',
      'about.values.excellence': 'Excelencia Tecnológica',
      'about.values.excellence.desc': 'Entregando lo mejor de la tecnología con agilidad y precisión.',
      'about.values.responsibility': 'Responsabilidad',
      'about.values.responsibility.desc': 'Promoviendo prácticas digitales éticas y enfoques conscientes del medio ambiente.',
      'about.values.engagement': 'Compromiso Humano',
      'about.values.engagement.desc': 'Trabajando con nuestros clientes en una lógica de asociación y confianza.',
      'about.values.heading': 'Lo que creemos',
      'about.values.desc': 'Nuestros valores guían cada una de nuestras decisiones e interacciones.',
      'about.values.title': 'valores',
      'about.mission.title': 'Nuestra aproximación',
      'about.mission.desc': 'Un proceso estructurado para garantizar resultados excepcionales en cada etapa.',
      'about.mission.heading': 'Cómo trabajamos',
      'about.mission.step1.title': 'Análisis',
      'about.mission.step1.desc': 'Comprensión profunda de sus necesidades y objetivos empresariales.',
      'about.mission.step2.title': 'Diseño',
      'about.mission.step2.desc': 'Arquitectura técnica y planificación rigurosa del proyecto.',
      'about.mission.step3.title': 'Desarrollo',
      'about.mission.step3.desc': 'Implementación de soluciones técnicas.',
      'about.mission.step4.title': 'Despliegue',
      'about.mission.step4.desc': 'Despliegue productivo cuidadoso, capacitación y soporte continuo.',
      'contact.tag': 'Contacto',
      'contact.title': 'Hablemos de su proyecto',
      'contact.desc': 'Nuestro equipo está disponible para responder a todas sus preguntas.',
      'contact.form.title': 'Envíenos un mensaje',
      'contact.form.subtitle': 'Respondemos en 24 horas',
      'contact.form.firstname': 'Nombre',
      'contact.form.lastname': 'Apellido',
      'contact.form.email': 'Correo electrónico',
      'contact.form.phone': 'Teléfono',
      'contact.form.subject': 'Asunto',
      'contact.form.message': 'Su mensaje',
      'contact.form.send': 'Enviar mensaje',
      'contact.address': 'Dirección',
      'contact.phone': 'Teléfono',
      'contact.email_lbl': 'Correo',
      'join.tag': 'Únete',
      'join.title': 'Construye el futuro con nosotros',
      'join.desc': '¿Apasionado por la tecnología? ¡AKINTEC está contratando!',
      'join.apply': 'Aplicar ahora',
    },
    de: {
      'nav.home': 'Startseite',
      'nav.about': 'Wer sind wir?',
      'nav.services': 'Unsere Leistungen',
      'nav.join': 'Bewerben',
      'nav.portfolio': 'Unsere Projekte',
      'nav.contact': 'Kontakt',
      'nav.contact_btn': 'Kontakt aufnehmen',
      'nav.services.software': 'Softwareentwicklung',
      'nav.services.data': 'Data Engineering & Science',
      'nav.services.cloud': 'Cloud & DevOps',
      'nav.services.consulting': 'IT-Beratung',
      'nav.services.recruitment': 'Recruiting & Outsourcing',
      'hero.badge': 'Ihr Tech-Partner in Frankreich',
      'hero.titl': 'Beschleunigen Sie Ihre digitalen Projekte mit AKINTEC.',
      'hero.descr': 'Beratungs- und Ingenieurbüro mit Spezialisierung auf Entwicklung, Daten und digitale Transformation.',
      'hero.feature1': 'Innovation',
      'hero.feature2': 'Expertise',
      'hero.feature3': 'Reaktivität',
      'hero.feature4': 'Nähe',
      'hero.cta1': 'Unsere Leistungen entdecken',
      'hero.cta2': 'Kontakt aufnehmen',
      'hero.stat1': 'Abgeschlossene Projekte',
      'hero.stat2': 'Zufriedene Kunden',
      'hero.stat3': 'Tech-Experten',
      'hero.stat4': 'Jahre Erfahrung',
      'services.tag': 'Unsere Leistungen',
      'services.title': 'Expertise für Sie',
      'services.desc': 'Entdecken Sie unsere Kompetenzbereiche im Herzen der digitalen Transformation.',
      'services.software.title': 'Software- & Webentwicklung',



      'services.software.desc': 'Wir entwerfen und entwickeln maßgeschneiderte Web-, Mobile- und Softwareanwendungen unter Verwendung der effizientesten Frameworks und Technologien auf dem Markt. Von den Anforderungen bis zur Produktion begleiten wir Sie bei jedem Schritt.',
      'services.software.offer': 'Was wir bieten', 
      'services.software.prestations': 'Unsere Leistungen im Detail', 
      'services.software.offer1': 'Komplette Lösungen, die auf Ihre spezifischen Bedürfnisse zugeschnitten sind.',
      'services.software.appweb': 'Full-Stack-Webanwendungen',
      'services.software.appmobile': 'iOS- & Android-Mobile-Anwendungen',
      'services.software.appmobile.desc': 'Native iOS/Android-Entwicklung und plattformübergreifend mit React Native oder Flutter.',
      'services.software.api': 'API REST & Microservices',
      'services.software.api.desc': 'Moderne REST/GraphQL-Architektur, skalierbare und dokumentierte Microservices.',
      'services.software.ecom': 'E-commerce & CMS',
      'services.software.ecom.desc': 'Maßgeschneiderte E-Commerce-Lösungen, Shopify, WooCommerce, Strapi, WordPress.',
      'services.software.maint': 'Wartung & Evolution',
      'services.software.maint.desc': 'Support und evolutionäre Wartung Ihrer bestehenden Anwendungen.',
      'services.software.h2': 'Unsere Arbeitsweise',
      'services.software.process1': 'Entdeckung',
      'services.software.process1.desc': 'Analyse Ihrer Bedürfnisse und Definition des Projektumfangs.',
      'services.software.process2': 'Design',
      'services.software.process2.desc': 'Technische Architektur und Validierung der technologischen Auswahl.',
      'services.software.process3': 'Entwicklung',
      'services.software.process3.desc': 'Agile Entwicklung mit regelmäßigen Deliverables und kontinuierlicher Feedbackschleife.',
      'services.software.process4': 'Support',
      'services.software.process4.desc': 'Evolutionärer Wartung und Begleitung über einen längeren Zeitraum.',
      'services.software.explor': 'Entdecken Sie unsere gesamte Palette an Spezialgebieten.',
      'services.software.autreServ': 'Andere Dienstleistungen',
      'services.software.deco': 'Entdecken Sie auch',


      'services.data.title': 'Data Engineering & Data Science',
      'services.data.desc': ' Verwandeln Sie Ihre Rohdaten in strategische Vermögenswerte. Unsere Experten für Data Engineering und Data Science entwerfen robuste Pipelines, prädiktive Modelle und analytische Dashboards, um Ihre Entscheidungen zu informieren.',
      'services.data.offer': 'Was wir bieten',
      'services.data.h2': 'Unsere Leistungen im Detail',
      'services.data.p': 'Komplette Lösungen, die auf Ihre spezifischen Bedürfnisse zugeschnitten sind.',
      'services.data.feature1': 'Data Pipelines & ETL',
      'services.data.feature1.desc': 'Entwurf robuster Datenpipelines mit Apache Spark, Airflow, dbt.',
      'services.data.feature2': 'Data Warehousing',
      'services.data.feature2.desc': 'Lakehouse-Architektur, BigQuery, Snowflake, Redshift optimiert für Analyse.',
      'services.data.feature3': 'Machine Learning & IA',
      'services.data.feature3.desc': 'Prädiktive Modelle, NLP, Computer Vision, MLOps und Produktionseinbindung.',
      'services.data.feature4': 'Business Intelligence',
      'services.data.feature4.desc': 'Power BI, Tableau, Metabase Dashboards zur Unterstützung Ihres Geschäfts.',
      'services.data.feature5.desc': 'GDPR-Konformität, Datenkataloge, Datenqualität und Sicherheit.',
      'services.data.process.title': 'Unsere Arbeitsweise',
      'services.data.process1': 'Entdeckung',
      'services.data.process1.desc': 'Analyse Ihrer Bedürfnisse und Definition des Projektumfangs.',
      'services.data.process2': 'Design',
      'services.data.process2.desc': 'Technische Architektur und Validierung der technologischen Auswahl.',
      'services.data.process3': 'Entwicklung',
      'services.data.process3.desc': 'Agile Entwicklung mit regelmäßigen Deliverables und kontinuierlicher Feedbackschleife.',
      'services.data.process4': 'Support',
      'services.data.process4.desc': 'Evolutionärer Wartung und Begleitung über einen längeren Zeitraum.',
      'services.data.explor': 'Entdecken Sie unsere gesamte Palette an Spezialgebieten.',
      'services.data.autreServ': 'Andere Dienstleistungen',
      'services.data.deco': 'Entdecken Sie auch',
      'services.cloud.title': 'Cloud & DevOps',
      'services.cloud.desc': 'Beschleunigen Sie Ihre Time-to-Market mit moderner Cloud-Infrastruktur und bewährten DevOps-Praktiken. Wir automatisieren Ihre Deployments, optimieren Ihre Cloud-Kosten und gewährleisten die hohe Verfügbarkeit Ihrer Systeme.',
      'services.cloud.feature1': 'Cloud-Infrastruktur',
      'services.cloud.feature1.desc': 'Migration und Architektur auf AWS, Azure, GCP mit Best Practices.',
      'services.cloud.feature2': 'CI/CD & Automatisierung',
      'services.cloud.feature2.desc': 'Jenkins, GitLab CI, GitHub Actions Pipelines für kontinuierliche und zuverlässige Lieferungen.',
      'services.cloud.feature3': 'Containerisierung',
      'services.cloud.feature3.desc': 'Docker, Kubernetes für die Bereitstellung und Verwaltung Ihrer containerisierten Anwendungen.',
      'services.cloud.feature4': 'Infrastructure as Code',
      'services.cloud.feature4.desc': 'Terraform, Ansible, Pulumi für eine versionierte und reproduzierbare Infrastruktur.',
      'services.cloud.feature5': 'Monitoring & Sicherheit',
      'services.cloud.feature5.desc': 'Umfassende Observability, Alerting, Cloud-Sicherheit und Compliance.',     
      'services.consulting.title': 'IT-Beratung & Digitale Transformation',
      'services.consulting.desc': 'Unsere erfahrenen Berater unterstützen Sie bei der Definition und Umsetzung Ihrer digitalen Strategie. Von der Technologie-Audit bis zum Change Management helfen wir Ihnen, den Wert Ihrer IT-Investitionen zu maximieren.',
      'services.consulting.feature1': 'Audit & IT-Strategie',
      'services.consulting.feature1.desc': 'Bewertung Ihres IS, Identifizierung von Optimierungsmöglichkeiten und digitaler Fahrplan.',
      'services.consulting.feature2': 'Architektur & Design',
      'services.consulting.feature2.desc': 'Entwurf skalierbarer Architekturen, Microservices, Event-Driven, Domain-Driven Design.',
      'services.consulting.feature3': 'Change Management',
      'services.consulting.feature3.desc': 'Unterstützung der Teams, Schulung und Management der kulturellen Transformation.',
      'services.consulting.feature4': 'Prozessoptimierung',
      'services.consulting.feature4.desc': 'Analyse und Reengineering von Geschäftsprozessen zur Steigerung der Effizienz und Wettbewerbsfähigkeit.',
      'services.consulting.feature5': 'Compliance & Sicherheit',
      'services.consulting.feature5.desc': 'GDPR, ISO 27001, Sicherheits- und Compliance-Audits.',
      'services.recruitment.title': 'Recruiting & Outsourcing',
      'services.recruitment.desc': 'Zugang zu einem Pool qualifizierter und verfügbarer technischer Talente. Ob Sie Ihre Teams mit Outsourcing verstärken, seltene Profile finden oder ein komplettes Projekt auslagern möchten, AKINTEC bietet Ihnen die passende Lösung.',
      'services.recruitment.talent1':'Entwickler',
      'services.recruitment.feature1':'IT-Talent-Scouting',
      'services.recruitment.feature1.desc':'Identifizierung und Ansprache seltener Profile auf dem Markt: Senior Dev, Data, Cloud, CTO.',
      'services.recruitment.feature2':'Festanstellung',
      'services.recruitment.feature2.desc':'Strenger Auswahlprozess für dauerhafte und relevante CDI-Platzierungen.',
      'services.recruitment.feature3':'Staffing & Freelance',
      'services.recruitment.feature3.desc':'Bereitstellung von Expertenberatern zur Verstärkung Ihrer Teams für Projekteinsätze.',
      'services.recruitment.feature4':'Projekt-Outsourcing',
      'services.recruitment.feature4.desc':'Komplette Projektleitung für IT-Projekte mit Ergebnisverpflichtung.',
      'services.recruitment.feature5':'Technische Bewertung',
      'services.recruitment.feature5.desc':'Technische Tests, strukturierte Interviews und Bewertung von Soft Skills.',


      'services.cta': 'Mehr erfahren',
      'why.tag': 'Warum wir?',
      'why.title': 'Was uns auszeichnet',
      'why.desc': 'Bei AKINTEC verbinden wir technisches Know-how, Innovation und menschliche Nähe.',
      'why.1.title': 'Anerkannte technische Expertise',
      'why.1.desc': 'Unsere Ingenieure beherrschen moderne Web-, Cloud- und Data-Science-Technologien.',
      'why.2.title': 'Individuelle Begleitung',
      'why.2.desc': 'Jedes Projekt wird an Ihre geschäftlichen Herausforderungen angepasst.',
      'why.3.title': 'Netzwerk qualifizierter Talente',
      'why.3.desc': 'Wir wählen qualifizierte und engagierte Profile zur Stärkung Ihrer Teams aus.',
      'why.4.title': 'Innovation & Nähe',
      'why.4.desc': 'In Frankreich ansässig, verbinden wir technische Präzision mit Innovationskultur.',
      'testimonials.tag': 'Referenzen',
      'testimonials.title': 'Was unsere Kunden sagen',
      'brands.title': 'Sie vertrauen uns',
      'cta.title': 'Brauchen Sie einen zuverlässigen Tech-Partner?',
      'cta.desc': 'Lassen Sie uns über Ihr Projekt sprechen und gemeinsam die beste Lösung finden.',
      'cta.btn': 'Projekt starten',
      'footer.tagline': '"Unsere Generation glaubt an eine verantwortungsvollere digitale Welt."',
      'footer.useful': 'Nützliche Links',
      'footer.company': 'Unser Unternehmen',
      'footer.contact': 'Kontakt',
      'footer.legal': 'Impressum',
      'footer.privacy': 'Datenschutz',
      'footer.partners': 'Partner',
      'footer.about': 'Über uns',
      'footer.services': 'Unsere Leistungen',
      'footer.recruitment': 'Recruiting',
      'footer.copyright': 'Alle Rechte vorbehalten.',
      'about.tag': 'Wer wir sind',
      'about.title': 'AKINTEC, Ihr vertrauenswürdiger Partner',
      'about.desc1': 'Gegründet mit der Überzeugung, dass eine neue Generation von Tech-Unternehmen es besser machen kann.',
      'about.desc2': 'Unsere Kombination aus technischer Expertise, Agilität und menschlicher Nähe liefert langfristig wertvolle Lösungen.',
      'about.mission.title': 'Unsere Mission',
      'about.mission.desc': 'Digitale Transformation beschleunigen',
      'about.vision.title': 'Unsere Vision',
      'about.vision.desc': 'Eine verantwortungsvollere digitale Welt',
      'about.innovation.title': 'Innovation',
      'about.innovation.desc': 'Modernste Technologien',
      'about.excellence.title': 'Exzellenz',
      'about.excellence.desc': 'Hohe Standards',
      'about.p1': 'Gegründet mit der Überzeugung, dass eine neue Generation von Tech-Unternehmen es besser machen kann, unterstützt AKINTEC Unternehmen und Institutionen bei ihrer digitalen Transformation.',
      'about.p2': 'Unsere Kombination aus technischer Expertise, Agilität und menschlicher Nähe liefert langfristig wertvolle Lösungen.',
      'about.p3': 'AKINTEC stützt sich auf eine neue Generation von Ingenieuren und Beratern, die die Codes der digitalen Welt neu definieren wollen: grüner, ethischer und inklusiver.',
      'about.author': '— Das AKINTEC-Team',
      'about.quote': '“Unsere Generation glaubt an eine verantwortungsvollere digitale Welt, die Unternehmen und dem Planeten dient.”',
      'about.projects': 'Abgeschlossene Projekte',
      'about.experience': 'Jahre Erfahrung',
      'about.years': '5 Jahre',
      'about.domains.title': 'Domänen',
      'about.domains.heading': 'Unsere Fachgebiete',
      'about.domains.desc': 'Kombiniert mit Innovation, Agilität und Verantwortung setzen unsere Teams digitale Technologien für Leistung und Nachhaltigkeit ein.',
      'about.domains.software.title': 'Entwicklung & Software Engineering',
      'about.domains.software.desc': 'Design von hochleistungsorientierten Web- und Mobile-Anwendungen, die auf Ihre Geschäftsanforderungen zugeschnitten sind.',
      'about.domains.data.title': 'Data & Artificial Intelligence',
      'about.domains.data.desc': 'Entsperren des Werts von Daten für Entscheidungsfindung und Leistungs-Optimierung.',
      'about.domains.cloud.title': 'Cloud & DevOps',
      'about.domains.cloud.desc': 'Moderne Infrastruktur, Automatisierung und Sicherheit für maximale Agilität.',
      'about.domains.consulting.title': 'IT-Beratung & Digitale Transformation',
      'about.domains.consulting.desc': 'Strategische Begleitung, um Ihre Informationssysteme mit Ihren Wachstums- und Innovationsambitionen in Einklang zu bringen.',
      'about.domains.recruitment.title': 'Recruiting & IT-Outsourcing',
      'about.domains.recruitment.desc': 'Bereitstellung von qualifizierten und flexiblen technischen Profilen zur Stärkung Ihrer Teams und digitalen Projekte.',
      'about.values.innovation': 'Nachhaltige Innovation',
      'about.values.innovation.desc': 'Innovieren, ja, aber im Respekt vor dem Planeten und seinen Ressourcen.',
      'about.values.excellence': 'Technologische Exzellenz',
      'about.values.excellence.desc': 'Das Beste der Technologie mit Agilität und Präzision liefern.',
      'about.values.responsibility': 'Verantwortung',
      'about.values.responsibility.desc': 'Förderung ethischer digitale Praktiken und umweltbewusste Ansätze.',
      'about.values.engagement': 'Menschliches Engagement',
      'about.values.engagement.desc': 'Arbeiten mit unseren Kunden in einer Logik der Partnerschaft und des Vertrauens.',
      'about.values.heading': 'Woran wir glauben',
      'about.values.desc': 'Unsere Werte leiten jede unserer Entscheidungen und Interaktionen.',
      'about.values.title': 'Werte',
      'about.mission.title': 'Unsere Herangehensweise',
      'about.mission.desc': 'Ein strukturierter Prozess, um außergewöhnliche Ergebnisse in jedem Schritt zu gewährleisten.',
      'about.mission.heading': 'Wie wir arbeiten',
      'about.mission.step1.title': 'Analyse',
      'about.mission.step1.desc': 'Tiefes Verständnis Ihrer Bedürfnisse und Geschäftsziele.',
      'about.mission.step2.title': 'Design',
      'about.mission.step2.desc': 'Technische Architektur und rigorose Projektplanung.',
      'about.mission.step3.title': 'Entwicklung',
      'about.mission.step3.desc': 'Implementierung technischer Lösungen.',
      'about.mission.step4.title': 'Bereitstellung',
      'about.mission.step4.desc': 'Sorgfältige Produktionsbereitstellung, Schulung und kontinuierliche Unterstützung.',
      'about.team.title': 'Ein leidenschaftliches und engagiertes Team.',
      'about.team.desc': 'Hinter jedem AKINTEC-Projekt steht ein Team von Beratern, Ingenieuren und Datenexperten, die die gleiche Leidenschaft für Technologie und Innovation teilen.',
      'contact.tag': 'Kontakt',
      'contact.title': 'Sprechen wir über Ihr Projekt',
      'contact.desc': 'Unser Team steht Ihnen für alle Fragen zur Verfügung.',
      'contact.form.title': 'Senden Sie uns eine Nachricht',
      'contact.form.subtitle': 'Wir antworten innerhalb von 24 Stunden',
      'contact.form.firstname': 'Vorname',
      'contact.form.lastname': 'Nachname',
      'contact.form.email': 'E-Mail',
      'contact.form.phone': 'Telefon',
      'contact.form.subject': 'Betreff',
      'contact.form.message': 'Ihre Nachricht',
      'contact.form.send': 'Nachricht senden',
      'contact.address': 'Adresse',
      'contact.phone': 'Telefon',
      'contact.email_lbl': 'E-Mail',
      'join.tag': 'Bewerben',
      'join.title': 'Bauen Sie mit uns die Zukunft',
      'join.desc': 'Leidenschaftlich für Technologie? AKINTEC sucht Talente!',
      'join.apply': 'Jetzt bewerben',
    },
    it: {
      'nav.home': 'Home',
      'nav.about': 'Chi siamo?',
      'nav.services': 'I Nostri Servizi',
      'nav.join': 'Unisciti a noi',
      'nav.portfolio': 'I Nostri Progetti',
      'nav.contact': 'Contatto',
      'nav.contact_btn': 'Contattaci',
      'nav.services.software': 'Sviluppo Software',
      'nav.services.data': 'Data Engineering & Science',
      'nav.services.cloud': 'Cloud & DevOps',
      'nav.services.consulting': 'Consulenza IT',
      'nav.services.recruitment': 'Reclutamento & Outsourcing',
      'hero.badge': 'Il tuo partner tech in Francia',
      'hero.titl': 'Accelera i tuoi progetti digitali con AKINTEC.',
      'hero.descr': 'Società di consulenza e ingegneria specializzata in sviluppo, dati e trasformazione digitale.',
      'hero.feature1': 'Innovazione',
      'hero.feature2': 'Competenza',
      'hero.feature3': 'Reattività',
      'hero.feature4': 'Prossimità',
      'hero.cta1': 'Scopri i nostri servizi',
      'hero.cta2': 'Contattaci',
      'hero.stat1': 'Progetti consegnati',
      'hero.stat2': 'Clienti soddisfatti',
      'hero.stat3': 'Esperti tech',
      'hero.stat4': 'Anni di esperienza',
      'services.tag': 'I Nostri Servizi',
      'services.title': 'Competenza al vostro servizio',
      'services.desc': 'Scopri le nostre aree di competenza al cuore della trasformazione digitale.',
      'services.software.title': 'Sviluppo Software & Web',

      'services.software.desc': 'Progettiamo e sviluppiamo applicazioni web, mobili e software su misura, utilizzando i framework e le tecnologie più efficienti del mercato. Dalla definizione dei requisiti alla produzione, ti accompagniamo in ogni fase.',
      'services.software.offer': 'Cosa offriamo', 
      'services.software.prestations': 'I nostri servizi nel dettaglio', 
      'services.software.offer1': 'Soluzioni complete adattate alle tue esigenze specifiche.',
      'services.software.appweb': 'Applicazioni Web Full-Stack',
      'services.software.appmobile': 'Applicazioni Móviles iOS & Android',
      'services.software.appmobile.desc': 'Sviluppo nativo per iOS/Android e multi-piattaforma con React Native o Flutter.',
      'services.software.api': 'API REST & Microservices',
      'services.software.api.desc': 'Architettura moderna REST/GraphQL, microservizi scalabili e documentati.',
      'services.software.ecom': 'E-commerce & CMS',
      'services.software.ecom.desc': 'Soluzioni di e-commerce personalizzate, Shopify, WooCommerce, Strapi, WordPress.',
      'services.software.maint': 'Maintenance & Evolution',
      'services.software.maint.desc': 'Supporto e mantenimento evolutivo delle tue applicazioni esistenti.',
      'services.software.h2': 'Il nostro metodo di lavoro',
      'services.software.process1': 'Scoperta',
      'services.software.process1.desc': 'Analisi delle tue necessità e definizione dell\'ambito del progetto.',
      'services.software.process2': 'Design',
      'services.software.process2.desc': 'Architettura tecnica e validazione delle scelte tecnologiche.',
      'services.software.process3': 'Sviluppo',
      'services.software.process3.desc': 'Sviluppo agile con consegne regolari e feedback continuo.',
      'services.software.process4': 'Supporto',
      'services.software.process4.desc': 'Mantenimento evolutivo e accompagnamento a lungo termine.',
      'services.software.explor': 'Esplora tutta la nostra gamma di aree di specializzazione.',
      'services.software.autreServ': 'Altri servizi',
      'services.software.deco': 'Scopri anche',


      'services.data.title': 'Data Engineering & Data Science',
      'services.data.desc': 'Trasforma i tuoi dati grezzi in asset strategici. I nostri esperti di data engineering e data science progettano pipeline robuste, modelli predittivi e dashboard analitici per informare le tue decisioni.',
      'services.data.offer': 'Cosa offriamo',
      'services.data.h2': 'I nostri servizi nel dettaglio',
      'services.data.p': 'Soluzioni complete adattate alle tue esigenze specifiche.',
      'services.data.feature1': 'Data Pipelines & ETL',
      'services.data.feature1.desc': 'Progettazione di pipeline di dati robuste con Apache Spark, Airflow, dbt.',
      'services.data.feature2': 'Data Warehousing',
      'services.data.feature2.desc': 'Architettura Lakehouse, BigQuery, Snowflake, Redshift ottimizzati per l\'analisi.',
      'services.data.feature3': 'Machine Learning & IA',
      'services.data.feature3.desc': 'Modelli predittivi, NLP, visione artificiale, MLOps e distribuzione in produzione.',
      'services.data.feature4': 'Intelligenza di Business',
      'services.data.feature4.desc': 'Power BI, Tableau, Metabase dashboard per potenziare il tuo business.',
      'services.data.feature5.desc': 'Conformità GDPR, cataloghi di dati, qualità e sicurezza dei dati.',
      'services.data.process.title': 'Il nostro metodo di lavoro',
      'services.data.process1': 'Scoperta',
      'services.data.process1.desc': 'Analisi delle tue necessità e definizione dell\'ambito del progetto.',
      'services.data.process2': 'Design',
      'services.data.process2.desc': 'Architettura tecnica e validazione delle scelte tecnologiche.',
      'services.data.process3': 'Sviluppo',
      'services.data.process3.desc': 'Sviluppo agile con consegne regolari e feedback continuo.',
      'services.data.process4': 'Supporto',
      'services.data.process4.desc': 'Manutenzione evolutiva e accompagnamento a lungo termine.',
      'services.data.explor': 'Esplora tutta la nostra gamma di aree di specializzazione.',
      'services.data.autreServ': 'Altri servizi',
      'services.data.deco': 'Scopri anche',

    
      'services.cloud.title': 'Cloud & DevOps',
      'services.cloud.desc': 'Accelera il tuo time-to-market con infrastruttura cloud moderna e pratiche DevOps collaudate. Automatizziamo i tuoi deployment, ottimizziamo i costi cloud e garantiamo l\'alta disponibilità dei tuoi sistemi.',
      'services.cloud.feature1': 'Infrastruttura Cloud',
      'services.cloud.feature1.desc': 'Migrazione e architettura su AWS, Azure, GCP con best practices.',
      'services.cloud.feature2': 'CI/CD & Automazione',
      'services.cloud.feature2.desc': 'Jenkins, GitLab CI, GitHub Actions pipelines per consegne continue e affidabili.',
      'services.cloud.feature3': 'Containerizzazione',
      'services.cloud.feature3.desc': 'Docker, Kubernetes per il deployment e la gestione delle tue applicazioni containerizzate.',
      'services.cloud.feature4': 'Infrastructure as Code',
      'services.cloud.feature4.desc': 'Terraform, Ansible, Pulumi per un\'infrastruttura versionata e riproducibile.',
      'services.cloud.feature5': 'Monitoring & Sicurezza',
      'services.cloud.feature5.desc': 'Osservabilità completa, alerting, sicurezza cloud e conformità.',
      'services.consulting.title': 'Consulenza IT & Trasformazione digitale',
      'services.consulting.desc': 'I nostri consulenti esperti ti accompagnano nella definizione e implementazione della tua strategia digitale. Dalla revisione tecnologica al change management, ti aiutiamo a massimizzare il valore dei tuoi investimenti IT.',
      'services.consulting.feature1': 'Audit & Strategia IT',
      'services.consulting.feature1.desc': 'Valutazione del tuo SI, identificazione delle opportunità di ottimizzazione e roadmap digitale.',
      'services.consulting.feature2': 'Architettura & Design',
      'services.consulting.feature2.desc': 'Progettazione di architetture scalabili, microservizi, event-driven, domain-driven design.',
      'services.consulting.feature3': 'Change Management',
      'services.consulting.feature3.desc': 'Supporto alle squadre, formazione e gestione della trasformazione culturale.',
      'services.consulting.feature4': 'Ottimizzazione dei processi',
      'services.consulting.feature4.desc': 'Valutazione e miglioramento dei processi aziendali per aumentare l\'efficacia e la competitività.',
      'services.consulting.feature5': 'Conformità & Sicurezza',
      'services.consulting.feature5.desc': 'RGPD, ISO 27001, audit di sicurezza e conformità normativa.',
      'services.recruitment.title': 'Reclutamento & Outsourcing',
      'services.recruitment.desc': 'Accesso a un pool di talenti tecnici qualificati e disponibili. Che tu voglia rafforzare i tuoi team con l\'outsourcing, trovare profili rari o esternalizzare un progetto completo, AKINTEC ti offre la soluzione giusta.',
      'services.recruitment.talent1':'Sviluppatori',
      'services.recruitment.feature1':'Scouting di talenti IT',
      'services.recruitment.feature1.desc':'Identificazione e approccio a profili rari sul mercato: Senior Dev, Data, Cloud, CTO.',
      'services.recruitment.feature2':'Reclutamento permanente',
      'services.recruitment.feature2.desc':'Rigoroso processo di selezione per un reclutamento permanente sostenibile e pertinente.',
      'services.recruitment.feature3':'Management e libero professionista',
      'services.recruitment.feature3.desc':'Fornitura di consulenti esperti per rafforzare i vostri team in missione.',
      'services.recruitment.feature4':'Esternalizzazione del progetto',
      'services.recruitment.feature4.desc':'Gestione completa di progetti IT con un impegno orientato ai risultati.',
      'services.recruitment.feature5':'Valutazione tecnica',
      'services.recruitment.feature5.desc':'Test tecnici, colloqui strutturati e valutazione delle competenze trasversali.',

      
      'services.cta': 'Scopri di più',
      'why.tag': 'Perché noi?',
      'why.title': 'Cosa ci distingue',
      'why.desc': 'In AKINTEC combiniamo competenza tecnica, innovazione e prossimità umana.',
      'why.1.title': 'Competenza tecnica riconosciuta',
      'why.1.desc': 'I nostri ingegneri padroneggiano tecnologie moderne web, cloud e data science.',
      'why.2.title': 'Supporto su misura',
      'why.2.desc': 'Ogni progetto è progettato per adattarsi alle sfide aziendali, con approccio agile.',
      'why.3.title': 'Rete di talenti qualificati',
      'why.3.desc': 'Selezioniamo profili qualificati e appassionati per rafforzare i tuoi team.',
      'why.4.title': 'Innovazione & prossimità',
      'why.4.desc': 'Con sede in Francia, combiniamo rigore tecnico e cultura dell\'innovazione.',
      'testimonials.tag': 'Testimonianze',
      'testimonials.title': 'Cosa dicono i nostri clienti',
      'brands.title': 'Si fidano di noi',
      'cta.title': 'Hai bisogno di un partner tecnologico affidabile?',
      'cta.desc': 'Parliamo del tuo progetto e troviamo insieme la soluzione migliore.',
      'cta.btn': 'Avvia un progetto',
      'footer.tagline': '"La nostra generazione crede in un mondo digitale più responsabile."',
      'footer.useful': 'Link utili',
      'footer.company': 'La nostra azienda',
      'footer.contact': 'Contatti',
      'footer.legal': 'Note legali',
      'footer.privacy': 'Privacy Policy',
      'footer.partners': 'Partner',
      'footer.about': 'Chi siamo',
      'footer.services': 'I nostri servizi',
      'footer.recruitment': 'Reclutamento',
      'footer.copyright': 'Tutti i diritti riservati.',
      'about.tag': 'Chi siamo',
      'about.title': 'AKINTEC, il tuo partner di fiducia',
      'about.desc1': 'Fondata con la convinzione che una nuova generazione di aziende tech possa fare di meglio.',
      'about.desc2': 'Il nostro approccio combina competenza tecnica, agilità e prossimità umana.',
      'about.mission.title': 'La Nostra Missione',
      'about.mission.desc': 'Accelerare la trasformazione digitale',
      'about.vision.title': 'La Nostra Visione',
      'about.vision.desc': 'Un digitale più responsabile',
      'about.innovation.title': 'Innovazione',
      'about.innovation.desc': 'Tecnologie all\'avanguardia',
      'about.excellence.title': 'Eccellenza',
      'about.excellence.desc': 'Standard elevati',
      'about.p1': 'Fondata con la convinzione che una nuova generazione di aziende tech possa fare di meglio, AKINTEC supporta aziende e istituzioni nella loro trasformazione digitale.',
      'about.p2': 'Il nostro approccio combina competenza tecnica, agilità e prossimità umana per fornire soluzioni che creano valore duraturo.',
      'about.p3': 'AKINTEC si basa su una nuova generazione di ingegneri e consulenti che vogliono ridefinire i codici del digitale: più verde, più etico e più inclusivo.',
      'about.author': '— Il team di AKINTEC',
      'about.quote': '“La nostra generazione crede in un digitale più responsabile, al servizio delle aziende e del pianeta.”',
      'about.projects': 'Progetti consegnati',
      'about.experience': 'Anni di esperienza',
      'about.years': '5 anni',
       'about.domains.title': 'Domini',
      'about.domains.heading': 'I nostri domini di specializzazione',
      'about.domains.desc': 'Combinando innovazione, agilità e responsabilità, i nostri team mettono il digitale al servizio della performance e della sostenibilità.',
      'about.domains.software.title': 'Sviluppo & Ingegneria del Software',
      'about.domains.software.desc': 'Progettazione di applicazioni web e mobile ad alte prestazioni, su misura per le esigenze della tua azienda.',
      'about.domains.data.title': 'Dati & Intelligenza Artificiale',
      'about.domains.data.desc': 'Sbloccare il valore dei dati per il processo decisionale e l\'ottimizzazione delle prestazioni.',
      'about.domains.cloud.title': 'Cloud & DevOps',
      'about.domains.cloud.desc': 'Infrastruttura moderna, automazione e sicurezza per un\'agilità massima.',
      'about.domains.consulting.title': 'Consulenza IT & Trasformazione digitale',
      'about.domains.consulting.desc': 'Accompagnamento strategico per allineare i tuoi sistemi informativi con le tue ambizioni di crescita e innovazione.',
      'about.domains.recruitment.title': 'Reclutamento & Outsourcing IT',
      'about.domains.recruitment.desc': 'Fornitura di profili tecnici qualificati e flessibili per rafforzare i tuoi team e i tuoi progetti digitali.',
      'about.values.innovation': 'Innovazione Sostenibile',
      'about.values.innovation.desc': 'Innovare, sì, ma entro i limiti del rispetto del pianeta e delle sue risorse.',
      'about.values.excellence': 'Eccellenza Tecnologica',
      'about.values.excellence.desc': 'Consegna del meglio della tecnologia con agilità e precisione.',
      'about.values.responsibility': 'Responsabilità',
      'about.values.responsibility.desc': 'Promozione di pratiche digitali etiche e approcci consapevoli dell\'ambiente.',
      'about.values.engagement': 'Impegno Umano',
      'about.values.engagement.desc': 'Lavorare con i nostri clienti in una logica di partnership e fiducia.',
      'about.values.heading': 'Cosa crediamo',
      'about.values.desc': 'I nostri valori guidano ogni decisione e interazione.',
      'about.values.title': 'valori',
      'about.mission.title': 'La nostra approccio',
      'about.mission.desc': 'Un processo strutturato per garantire risultati eccezionali in ogni fase.',
      'about.mission.heading': 'Come lavoriamo',
      'about.mission.step1.title': 'Analisi',
      'about.mission.step1.desc': 'Comprensione approfondita delle tue esigenze e degli obiettivi aziendali.',
      'about.mission.step2.title': 'Design',
      'about.mission.step2.desc': 'Architettura tecnica e pianificazione rigorosa del progetto.',
      'about.mission.step3.title': 'Sviluppo',
      'about.mission.step3.desc': 'Implementazione delle soluzioni tecniche.',
      'about.mission.step4.title': 'Deployment',
      'about.mission.step4.desc': 'Deployment produttivo attento, formazione e supporto continuo.',
      'about.team.title': 'Un team appassionato e impegnato.',
      'about.team.desc': 'Dietro ogni progetto AKINTEC, un team di consulenti, ingegneri e data expert condivide la stessa passione per la tecnologia e l\'innovazione.',
      'contact.tag': 'Contatto',
      'contact.title': 'Parliamo del tuo progetto',
      'contact.desc': 'Il nostro team è disponibile per rispondere a tutte le tue domande.',
      'contact.form.title': 'Inviaci un messaggio',
      'contact.form.subtitle': 'Rispondiamo entro 24 ore',
      'contact.form.firstname': 'Nome',
      'contact.form.lastname': 'Cognome',
      'contact.form.email': 'Email',
      'contact.form.phone': 'Telefono',
      'contact.form.subject': 'Oggetto',
      'contact.form.message': 'Il tuo messaggio',
      'contact.form.send': 'Invia messaggio',
      'contact.address': 'Indirizzo',
      'contact.phone': 'Telefono',
      'contact.email_lbl': 'Email',
      'join.tag': 'Unisciti',
      'join.title': 'Costruisci il futuro con noi',
      'join.desc': 'Appassionato di tecnologia? AKINTEC sta assumendo!',
      'join.apply': 'Candidati ora',
    }
  };

  let currentLang = localStorage.getItem('akintec_lang') || 'fr';

  function t(key) {
    return translations[currentLang]?.[key] || translations['fr'][key] || key;
  }

  function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      const text = t(key);
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = text;
      } else if (key.includes('.title') || key.includes('.title') || key === 'hero.title') {
        el.innerHTML = text;
      } else {
        el.textContent = text;
      }
    });

    // Update lang switcher display
    const langNames = { fr: '🇫🇷 Français', en: '🇬🇧 English', es: '🇪🇸 Español', de: '🇩🇪 Deutsch', it: '🇮🇹 Italiano' };
    document.querySelectorAll('.lang-display').forEach(el => {
      el.textContent = langNames[currentLang] || 'Français';
    });

    document.documentElement.lang = currentLang;
  }

  function setLang(lang) {
    currentLang = lang;
    localStorage.setItem('akintec_lang', lang);
    applyTranslations();

    // Close any open dropdowns
    document.querySelectorAll('.lang-dropdown').forEach(d => {
      d.style.opacity = '0';
      d.style.visibility = 'hidden';
    });
  }

  // Language switcher clicks
  document.querySelectorAll('[data-lang]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      setLang(btn.dataset.lang);
    });
  });

  applyTranslations();

  // ===== CONTACT FORM =====
  document.querySelectorAll('.js-contact-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('[type=submit]');
      btn.disabled = true;
      btn.textContent = '...';

      setTimeout(() => {
        showNotification('✓', 'Message envoyé !', 'Nous vous répondrons dans les 24h.');
        form.reset();
        btn.disabled = false;
        btn.textContent = t('contact.form.send');
      }, 1500);
    });
  });

  function showNotification(icon, title, msg) {
    let notif = document.querySelector('.notification');
    if (!notif) {
      notif = document.createElement('div');
      notif.className = 'notification';
      notif.innerHTML = `
        <div class="notification-icon success">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20,6 9,17 4,12"/></svg>
        </div>
        <div class="notification-text">
          <p class="notif-title"></p>
          <span class="notif-msg"></span>
        </div>`;
      document.body.appendChild(notif);
    }
    notif.querySelector('.notif-title').textContent = title;
    notif.querySelector('.notif-msg').textContent = msg;
    notif.classList.add('show');
    setTimeout(() => notif.classList.remove('show'), 4000);
  }

  // ===== PARTICLES =====
  const particlesContainer = document.querySelector('.hero-particles');
  if (particlesContainer) {
    for (let i = 0; i < 15; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const size = Math.random() * 6 + 2;
      p.style.cssText = `
        width: ${size}px; height: ${size}px;
        background: rgba(78, 202, 90, ${Math.random() * 0.4 + 0.1});
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation-delay: ${Math.random() * 8}s;
        animation-duration: ${Math.random() * 6 + 6}s;
      `;
      particlesContainer.appendChild(p);
    }
  }

  // ===== ACTIVE NAV =====
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav a, .mobile-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.closest('li')?.classList.add('active');
    }
  });

});

// ============================================================
// ADDITIONAL TRANSLATIONS — Blog, Portfolio, Partners, Services
// ============================================================
(function() {
  const extraKeys = {
    fr: {
      'nav.blog': 'Blog',
      'nav.portfolio': 'Références',
      'nav.services_all': 'Tous nos services',
      'portfolio.tag': 'Portfolio',
      'portfolio.title': 'Nos références clients',
      'blog.tag': 'Blog',
      'blog.title': 'Actualités & Insights',
      'partners.tag': 'Partenaires',
      'partners.title': 'Notre écosystème de partenaires',
      'services.overview.tag': 'Nos services',
      'services.overview.title': 'Une expertise à 360°',
    },
    en: {
      'nav.blog': 'Blog',
      'nav.portfolio': 'References',
      'nav.services_all': 'All our services',
      'portfolio.tag': 'Portfolio',
      'portfolio.title': 'Our client references',
      'blog.tag': 'Blog',
      'blog.title': 'News & Insights',
      'partners.tag': 'Partners',
      'partners.title': 'Our partner ecosystem',
      'services.overview.tag': 'Our services',
      'services.overview.title': '360° expertise',
    },
    es: {
      'nav.blog': 'Blog',
      'nav.portfolio': 'Referencias',
      'nav.services_all': 'Todos nuestros servicios',
      'portfolio.tag': 'Portafolio',
      'portfolio.title': 'Nuestras referencias de clientes',
      'blog.tag': 'Blog',
      'blog.title': 'Noticias e Ideas',
      'partners.tag': 'Socios',
      'partners.title': 'Nuestro ecosistema de socios',
    },
    de: {
      'nav.blog': 'Blog',
      'nav.portfolio': 'Referenzen',
      'nav.services_all': 'Alle unsere Dienste',
      'portfolio.tag': 'Portfolio',
      'portfolio.title': 'Unsere Kundenreferenzen',
      'blog.tag': 'Blog',
      'blog.title': 'Neuigkeiten & Einblicke',
      'partners.tag': 'Partner',
      'partners.title': 'Unser Partner-Ökosystem',
    },
    it: {
      'nav.blog': 'Blog',
      'nav.portfolio': 'Riferimenti',
      'nav.services_all': 'Tutti i nostri servizi',
      'portfolio.tag': 'Portfolio',
      'portfolio.title': 'I nostri riferimenti clienti',
      'blog.tag': 'Blog',
      'blog.title': 'Notizie & Approfondimenti',
      'partners.tag': 'Partner',
      'partners.title': 'Il nostro ecosistema di partner',
    },
  };

  // Merge extra keys into existing translations once window is loaded
  document.addEventListener('DOMContentLoaded', function() {
    if (window.AKINTEC_translations) {
      Object.keys(extraKeys).forEach(lang => {
        if (window.AKINTEC_translations[lang]) {
          Object.assign(window.AKINTEC_translations[lang], extraKeys[lang]);
        }
      });
    }
  });
})();
