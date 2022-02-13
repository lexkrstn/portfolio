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
      'JavaScript', 'NodeJS', 'jQuery', 'REST',
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
];
