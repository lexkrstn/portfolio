module.exports = {
  async up(db) {
    const tags = await db.collection('tags').find().toArray();
    const works = getWorks()
      .map(work => ({
        ...work,
        tags: work.tags.map(tagName => tags.find(t => t.name == tagName)._id),
      }));
    await db.collection('works').insertMany(works);
  },

  async down(db) {
    await db.collection('works').deleteMany();
  },
};

const getWorks = () => [
  {
    name: 'Theatre Management System',
    tags: ['JavaScript', 'PHP', 'MySQL', 'jQuery', 'REST', 'ExpressJS', 'NodeJS'],
    thumbnail: '/images/portfolio/tms/thumbnail.png',
    screenshots: [
      '/images/portfolio/tms/schedule.png',
      '/images/portfolio/tms/dashboard.png',
      '/images/portfolio/tms/schedule-import.png',
      '/images/portfolio/tms/schedule-shift.png',
      '/images/portfolio/tms/servers.png',
      '/images/portfolio/tms/spl.png',
    ],
    description: `
      A software program for managing the essential operations of cinema theatres.
    `,
    about: `
      Theater management system (TMS) is a centralized system for managing film
      screenings in one application and from any device, be it a smartphone,
      laptop or desktop computer. It maximises operating efficiency by providing
      reliable centralised control and automation of multi-screen cinema
      complexes. In addition to its principal functions of centralised monitoring
      of the screening status of all auditoriums, schedule creation, and
      centralised screening content management, TMS includes convenient
      functions to synchronise schedules with ticketing (POS) systems.

      I was involved in the development of both the server side and the browser
      side of the application as a freelancer. Some of the most important subsystems
      (e.g. scheduling system) were created by myself from scratch.

      The TMS application is one of the products of Krisberg, a Russian
      distributor of cinema equipment based in St. Peterburg. It is now
      available for order via the link below. Still, the app continues to evolve.
    `,
    techniques: [
      'PHP — the old backend',
      'NodeJS — the new backend',
      'MySQL',
      'ExpressJS',
      'jQuery & Bootstrap',
    ],
    links: [
      {
        label: 'Krisberg services',
        url: 'https://krisberg.ru/services/development-of-blowers-tms/',
        description: 'The product is part of',
      },
    ],
  },
  {
    name: 'Theatre Management Media',
    tags: [
      'TypeScript', 'JavaScript', 'MySQL', 'Vue', 'Vuex', 'REST', 'ExpressJS',
      'NodeJS', 'Stylus', 'Knex.js', 'Objection.js',
    ],
    thumbnail: '/images/portfolio/tmv/thumbnail.jpg',
    screenshots: [
      '/images/portfolio/tmv/schedule.jpg',
      '/images/portfolio/tmv/dashboard.png',
    ],
    description: `
      A software program for managing Android Smart TV advertising screens in cinemas.
    `,
    about: `
      The NodeJS application running on a Raspberry Pi server to manage the
      display of promotional video slides and other similar content on Android
      Smart TV boxes connected to demo screens in cinemas.

      I started writing the application on top of the developments that the
      company already had since the days of io.js, and in the end there was not
      a single line of legacy code left =)
    `,
    techniques: [
      'NodeJS, ExpressJS, MySQL — server',
      'Vue, Vuex, Stylus — admin panel frontend',
      'REST',
      'TypeScript',
      'Pure JavaScript — templates for WebView on Android devices'
    ],
    links: [
      {
        label: 'Krisberg TMS',
        url: 'https://krisberg.ru/services/development-of-blowers-tms/',
        description: 'The product is part of',
      },
    ],
  },
  {
    name: 'WireGuard VPN Manager',
    tags: [
      'JavaScript', 'Vue', 'Vuex', 'REST', 'ExpressJS',
      'NodeJS', 'Stylus', 'Knex.js', 'Objection.js', 'MySQL',
    ],
    thumbnail: '/images/portfolio/vpnmgr/thumbnail.png',
    screenshots: [
      '/images/portfolio/vpnmgr/dashboard.png',
      '/images/portfolio/vpnmgr/peer-view.png',
      '/images/portfolio/vpnmgr/peer-edit.png',
      '/images/portfolio/vpnmgr/client.png',
    ],
    description: `
      A system program with web interface for managing WireGuard VPN connections.
    `,
    about: `
      A web tool to help manage VPN client configurations on a Linux server
      with WireGuard installed on it.

      WireGuard itself does not provide out-of-the-box methods for restricting
      unwanted access to internal network, so the tool uses iptables chains for
      this purpose. VPN manager stores the client data in a MySQL database and
      synchronizes WireGuard and iptables configurations with it.
    `,
    techniques: [
      'NodeJS, ExpressJS, MySQL — server application',
      'Vue, Vuex, Stylus — browser application',
      'Objection, Knex — ORM and query builder libraries',
      'REST',
      'JavaScript — both server side and browser side',
    ],
    links: [
      {
        label: 'Krisberg.ru',
        url: 'https://krisberg.ru',
        description: 'The product has been developed for',
      },
    ],
  },
  {
    name: 'Smart Socket Dashboard',
    tags: [
      'TypeScript', 'Vue', 'Vuex', 'Stylus',
    ],
    thumbnail: '/images/portfolio/socket/thumbnail.png',
    screenshots: [
      'https://www.youtube.com/embed/qBhHPsEVCHI',
      '/images/portfolio/socket/dashboard.png',
    ],
    description: `
      The web interface for remote control of Krisberg's smart power outlet.
    `,
    about: `
      The Smart Socket is a device offered by Krisberg to its customers. It
      intergrates into the TMS (Theatre Managment System - an application for
      managing cinema equipment) and provides mechanisms to automate turning on
      and off the devices connected to its outlets.

      The Smart Socket is based on a multifunction network controller Laurent-5
      (you can check it out from the links below) which has internal memory
      for running custom web applications. Memory for the browser application
      (including all pictures, icons, etc) is limited to 256Kb after
      minification and archiving, so the admin panel has been made as simple as
      it was possible in terms of using any external frameworks. The controller
      also provides web API which the application uses under the hood to control
      power to the outlets, manage turning on/off schedule, and things like that.
    `,
    techniques: [
      'Vue / Vuex / Stylus',
      'TypeScript',
    ],
    links: [
      {
        label: 'Krisberg.ru',
        url: 'https://krisberg.ru',
        description: 'The product has been developed for',
      },
      {
        label: 'Kernelchip.ru',
        url: 'https://kernelchip.ru/Laurent-5.php',
        description: 'Check out what Laurent-5 is on',
      },
    ],
  },
  {
    name: 'Sound Processors Proxy',
    tags: [
      'JavaScript', 'NodeJS', 'ExpressJS', 'jQuery', 'REST',
    ],
    thumbnail: '/images/portfolio/sp-proxy/thumbnail.png',
    screenshots: [
      '/images/portfolio/sp-proxy/dashboard.png',
      'https://www.youtube.com/embed/hNJ3R1kJLFk',
    ],
    description: `
      A reverse proxy server enabling communication over multiple connections
      to sound processors that do not support it.
    `,
    about: `
      Some cinema sound processors, such as Dolby CP650 and USL JSD80, are
      limited to communicating over TCP/IP channel with only one client at a time.
      This is not enough if you want to control a sound processor
      with a third-party Theatre Management Systems such as Krisberg TMS.

      This reverse proxy is designed to overcome this limitation by listening for
      incoming connections on specific ports and passing commands to the
      appropriate processors in the correct order. The proxy knows which
      commands can be executed in parallel and which only in sequential order
      to execute them as fast as possible. To determine which instruction the
      processor's response belongs to, the proxy server keeps a record of the
      instructions in vendor-specific pipelines.

      The proxy is represented by a NodeJS service which connects to
      sound processors and listens for incoming connections on pre-configured
      ports. It has also a simple web interface that allows system administrators
      to make sure everything is working properly. All proxy server configuration
      is managed by the Theater Management System application through a REST
      API running on a service TCP port.
    `,
    techniques: [
      'NodeJS — TCP/IP sockets',
      'ExpressJS — maintenance web interface and REST API',
      'Bootstrap — some UI elements',
    ],
    links: [
      {
        label: 'Krisberg.ru',
        url: 'https://krisberg.ru',
        description: 'The product has been developed for',
      },
    ],
  },
  {
    name: 'Release Aggregator',
    tags: [
      'JavaScript', 'NodeJS', 'MySQL', 'jQuery', 'REST', 'Knex.js', 'Objection.js',
      'ExpressJS',
    ],
    thumbnail: '/images/portfolio/aggregator/thumbnail.png',
    screenshots: [
      '/images/portfolio/aggregator/dashboard.png',
      '/images/portfolio/aggregator/release.png',
      '/images/portfolio/aggregator/distributor.png',
      '/images/portfolio/aggregator/release-edit.png',
      '/images/portfolio/aggregator/releases.png',
    ],
    description: `
      A grabber service that collects movie release information and provides
      a REST API for clients.
    `,
    about: `
      The Release Aggregator service is part of Krisberg application ecosystem.
      It collects film distribution and licensing data from official sources,
      such as the website of ministry of culture, and stores it in the database.
      Its clients (other applications in the ecosystem) can then use the service's
      REST API to get additional information about releases, such as alternative
      names, licenses, available distributors, show formats, genres, etc. One of
      its greatest features is the use of a large number of heuristics to decide
      which data of which data source is the best fit.

      The software itself is represented by a NodeJS application with web UI
      written with the help of ExpressJS templates. The GUI can be used to
      modify the release data manually, or configure the application.
    `,
    techniques: [
      'ExpressJS — admin panel and REST API',
      'MySQL — storing release information',
      'Knex.js — SQL query builder',
      'Objection.js — ORM library',
      'Bootstrap / jQuery — some UI elements',
      'REST — API for getting releases, distributors and other info',
      'Pug — template engine',
    ],
    links: [
      {
        label: 'Krisberg.ru',
        url: 'https://krisberg.ru',
        description: 'The product has been developed for',
      },
    ],
  },
  {
    name: 'Repertory Planner',
    tags: [
      'JavaScript', 'NodeJS', 'MySQL', 'Knex.js', 'Objection.js',
      'Vue', 'Vuex', 'Stylus', 'GraphQL', 'ExpressJS',
    ],
    thumbnail: '/images/portfolio/replanner/thumbnail.png',
    screenshots: [
      '/images/portfolio/replanner/schedule.png',
      '/images/portfolio/replanner/release-dialog.png',
      '/images/portfolio/replanner/dashboard.png',
    ],
    description: `
      A service that allows bookers (cinema employees) to make a repertory
      booking plan.
    `,
    about: `
      The Repertory Planner allows the booker (special cinema employee)
      to create repertoire plans.

      A cinema repertoire plan provides information on booking film releases.
      The thing is, the cinemas can show only those films, the licenses for
      which they have rented for a certain period of time. Moreover, film
      releases come in a variaty of audio and video formats, subtitles and
      support of cinema features like 4DX, which incorporates on-screen
      visuals with synchronized motion seats and environmental effects. And
      each of these effects or formats can be rented separately and used only
      a certain number of times. So the repertoire plan is an essential part of
      the cinema's workflow since it keeps records of film release formats
      that need to be rented in advance.

      The Repertory Planner service is part of Krisberg application ecosystem.
      It's represented as a NodeJS server application with an in-browser SPA
      front-end. The application uses other Krisberg services, such as
      Release Aggregator and Authorizer (both also developed by me), to get
      the information about available releases and authenticate in the system.
    `,
    techniques: [
      'Vue / Vuex — SPA frontend',
      'Vuetify — GUI components library',
      'GraphQL — browser-server communication',
      'Node / ExpressJS — server framework',
      'MySQL — persistence',
      'Knex.js — SQL query builder',
      'Objection.js — ORM library',
    ],
    links: [
      {
        label: 'Krisberg.ru',
        url: 'https://krisberg.ru',
        description: 'The product has been developed for',
      },
    ],
  },
  {
    name: 'HallPlan Widget',
    tags: [
      'TypeScript', 'JavaScript', 'Sass/Less',
    ],
    thumbnail: '/images/portfolio/hallplan/thumbnail.png',
    screenshots: [
      '/images/portfolio/hallplan/demo.png',
      '/images/portfolio/hallplan/demo2.png',
    ],
    description: `
      An interactive TypeScript widget that represents the cinema's seating layout.
    `,
    about: `
      HallPlan is an interactive TypeScript / JavaScript component that
      represents the seating layout in the cinema.
      The seating arrangement is fully customizable via JSON schema. With this
      component it's also possible to control the state of seats, e.g. by
      marking some of them as reserved or vip.
      The component is designed to be used with Vue / React frameworks as well
      as the traditional jQuery frontend, so it doesn't depend on any
      third-party library.
    `,
    techniques: [
      'TypeScript — widget component',
      'Sass — styling',
    ],
    links: [
      {
        label: 'DEMO',
        url: 'https://lexkrstn.github.io/hall-plan/media/demo.html',
        description: 'Checkout the',
      },
      {
        label: 'GitHub',
        url: 'https://github.com/lexkrstn/hall-plan',
        description: 'The sources is available on',
      },
    ],
  },
  {
    name: 'Portfolio',
    tags: [
      'TypeScript', 'NodeJS', 'Mongo', 'NestJS', 'ExpressJS',
      'React', 'Redux', 'Styled Components', 'REST',
    ],
    thumbnail: '/images/portfolio/portfolio/thumbnail.jpg',
    screenshots: [
      '/images/portfolio/portfolio/home.jpg',
      '/images/portfolio/portfolio/works.jpg',
      '/images/portfolio/portfolio/about.jpg',
    ],
    description: `
      My personal webpage describing my professional skills, the services I
      provide and showing examples of my work.
    `,
    about: `
      The latest version of my personal webpage describing my professional
      skills, the services I provide and showing examples of my work.
      The software consists of 3 TypeScript applications: API server, SSR server
      and SPA.
    `,
    techniques: [
      'TypeScript — both server and browser side',
      'React / Redux — SPA frontend',
      'Emotion — styled components',
      'Mui — GUI components library',
      'NestJS — API server framework',
      'ExpressJS — SSR server framework',
      'Mongo — persistence',
      'Docker — simplifies deployment to AWS EC2',
      'REST — browser-server communication',
    ],
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/lexkrstn/portfolio',
        description: 'The sources are available on',
      },
    ],
  },
];
