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
        description: 'The product is developed for',
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
        description: 'The product is developed for',
      },
      {
        label: 'Kernelchip.ru',
        url: 'https://kernelchip.ru/Laurent-5.php',
        description: 'Check out what Laurent-5 is on',
      },
    ],
  },
];
