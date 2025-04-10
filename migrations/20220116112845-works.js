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
    await db.collection('works').deleteMany({});
  },
};

const getWorks = () => [
  {
    name: 'ShipNEXT',
    slug: 'shipnext',
    tags: ['TypeScript', 'PostgreSQL', 'NodeJS', 'NestJS', 'ExpressJS', 'RabbitMQ', 'Redis', 'Mongo', 'REST'],
    thumbnail: 'shipnext/thumbnail.jpg',
    screenshots: [
      'shipnext/fleet.png',
      'shipnext/market.png',
      'shipnext/trading.png',
    ],
    description: `
      An AI-powered shipping platform that automates freight and cargo transportation by sea.
    `,
    about: `
      ShipNEXT is an AI-powered platform designed for instant cargo-to-ship
      matching, shipping solution discovery, and freight negotiations. It
      leverages Large Language Models (LLMs) to extract cargo and vessel request
      data from email correspondence, providing shippers, brokers, and charterers
      with a high level of automation throughout the shipping process.

      From a technical standpoint, the application is built using dozens of
      microservices and a central API service on the back end. I was responsible
      for developing the server-side of the application as a Principal Software
      Engineer. I independently designed and implemented some of the most
      critical subsystems and microservices, including the route planner and
      market monitor. Additionally, I contributed to the development of the
      trading subsystem and an AI-driven contact book that automatically
      extracts contact information from emails, working alongside my team.

      The ShipNEXT application is the flagship product of ShipNEXT B.V., a
      Belgian company specializing in IT solutions for the maritime industry.
    `,
    techniques: [
      'NodeJS / Express / Mongo — old API',
      'NodeJS / NestJS / PostgreSQL — new API',
      'TypeORM',
      'Mongoose',
      'RabbitMQ – message bus for microservices',
      'Redis – pub/sub',
      'Python - a few AI-driven microservices',
    ],
    links: [
      {
        label: 'ShipNEXT',
        url: 'https://shipnext.com',
        description: 'The product\'s website',
      },
      {
        label: 'Shipnext B.V.',
        url: 'https://www.linkedin.com/company/ship-next/posts/?feedView=all',
        description: 'The company\'s LinkedIn page',
      },
    ],
  },
  {
    name: 'Route Planner',
    slug: 'shipnext',
    tags: ['Go', 'PostgreSQL', 'REST'],
    thumbnail: 'route-planner/thumbnail.jpg',
    screenshots: [
      'route-planner/density.png',
      'route-planner/test.png',
    ],
    description: `
      A vessel route planner and freight cost calculator for maritime logistics.
    `,
    about: `
      The Route Planner is one of the most critical services within ShipNEXT.
      It calculates optimal routes between ports as well as custom land and sea
      points. The service leverages historical vessel position data from the
      Automatic Identification System (AIS) — an automated tracking system using
      shipborne transceivers — to extract waypoint data and construct a maritime
      transportation graph.

      The Route Planner is capable of minimizing shipping costs, sulfur emissions,
      and transportation risks by intelligently avoiding SECA (Sulfur Emission
      Control Areas) and pirate zones, while constructing the most efficient
      route possible based on weather conditions and vessel parameters, such as
      deadweight, speed and emission characteristics.

      I single-handedly designed and developed this service from the ground up.
      The development process involved extensive research, during which I
      studied dozens of scientific papers and created original algorithms to
      extract meaningful insights from historical data. Some of the peripheral
      findings (which did not fall under NDA or disclose any commercial secrets)
      were published in peer-reviewed scientific journals.
    `,
    techniques: [
      'Go – API, graph traversal',
      'Python - waypoint extraction from historic data',
      'PostGIS (PostgreSQL extension) - to handle geographic / geometric data',
      'pgRouting (PostgreSQL extension) - for optimal route extraction from historic data',
      'PostgreSQL – complex queries for mining graph from AIS data',
    ],
    links: [
      {
        label: 'ShipNEXT',
        url: 'https://shipnext.com',
        description: 'The product\'s website',
      },
      {
        label: 'Shipnext B.V.',
        url: 'https://www.linkedin.com/company/ship-next/posts/?feedView=all',
        description: 'The company\'s LinkedIn page',
      },
    ],
  },
  {
    name: 'Theatre Management System',
    slug: 'tms',
    tags: ['JavaScript', 'PHP', 'MySQL', 'jQuery', 'REST', 'ExpressJS', 'NodeJS'],
    thumbnail: 'tms/thumbnail.png',
    screenshots: [
      'tms/schedule.png',
      'tms/dashboard.png',
      'tms/schedule-import.png',
      'tms/schedule-shift.png',
      'tms/servers.png',
      'tms/spl.png',
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
      side of the application. Some of the most important subsystems
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
    slug: 'tmv',
    tags: [
      'TypeScript', 'JavaScript', 'MySQL', 'Vue', 'Vuex', 'REST', 'ExpressJS',
      'NodeJS', 'Stylus', 'Knex.js', 'Objection.js',
    ],
    thumbnail: 'tmv/thumbnail.jpg',
    screenshots: [
      'tmv/schedule.jpg',
      'tmv/dashboard.png',
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
    slug: 'vpnmgr',
    tags: [
      'JavaScript', 'Vue', 'Vuex', 'REST', 'ExpressJS',
      'NodeJS', 'Stylus', 'Knex.js', 'Objection.js', 'MySQL',
    ],
    thumbnail: 'vpnmgr/thumbnail.png',
    screenshots: [
      'vpnmgr/dashboard.png',
      'vpnmgr/peer-view.png',
      'vpnmgr/peer-edit.png',
      'vpnmgr/client.png',
    ],
    description: `
      A system program with web interface for managing WireGuard VPN connections.
    `,
    about: `
      A web tool to help manage VPN client configurations on Linux servers
      with WireGuard on board. The tool was developed by myself from scratch.

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
    slug: 'socket',
    tags: [
      'TypeScript', 'Vue', 'Vuex', 'Stylus',
    ],
    thumbnail: 'socket/thumbnail.png',
    screenshots: [
      'https://www.youtube.com/embed/qBhHPsEVCHI',
      'socket/dashboard.png',
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
    slug: 'sp-proxy',
    tags: [
      'JavaScript', 'NodeJS', 'ExpressJS', 'jQuery', 'REST',
    ],
    thumbnail: 'sp-proxy/thumbnail.png',
    screenshots: [
      'sp-proxy/dashboard.png',
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
    slug: 'aggregator',
    tags: [
      'JavaScript', 'NodeJS', 'MySQL', 'jQuery', 'REST', 'Knex.js', 'Objection.js',
      'ExpressJS',
    ],
    thumbnail: 'aggregator/thumbnail.png',
    screenshots: [
      'aggregator/dashboard.png',
      'aggregator/release.png',
      'aggregator/distributor.png',
      'aggregator/release-edit.png',
      'aggregator/releases.png',
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
    slug: 'replanner',
    tags: [
      'JavaScript', 'NodeJS', 'MySQL', 'Knex.js', 'Objection.js',
      'Vue', 'Vuex', 'Stylus', 'GraphQL', 'ExpressJS',
    ],
    thumbnail: 'replanner/thumbnail.png',
    screenshots: [
      'replanner/schedule.png',
      'replanner/release-dialog.png',
      'replanner/dashboard.png',
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
    slug: 'hallplan',
    tags: [
      'TypeScript', 'JavaScript', 'Sass/Less',
    ],
    thumbnail: 'hallplan/thumbnail.png',
    screenshots: [
      'hallplan/demo.png',
      'hallplan/demo2.png',
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
        description: 'Check out the',
      },
      {
        label: 'GitHub',
        url: 'https://github.com/lexkrstn/hall-plan',
        description: 'The sources are available on',
      },
    ],
  },
  {
    name: 'React Styled Modal',
    slug: 'react-styled-modal',
    tags: [
      'TypeScript', 'React', 'Styled Components',
    ],
    thumbnail: 'react-styled-modal/thumbnail.png',
    screenshots: [
      'react-styled-modal/demo.png',
      'react-styled-modal/demo2.png',
    ],
    description: `
      A React library that allows you to display popup modals and dialogs.
    `,
    about: `
      React Styled Modal is a library that gives you the ability to display
      popup modals and dialogs in your React application using Styled Components.

      The component is fully customizable via styled-components themes and/or
      subcomponent style overriding. It's responsive, supports stacking and
      does NOT depend on any external library like jQuery or Bootstrap.
    `,
    techniques: [
      'React',
      'TypeScript',
      'Styled Components',
    ],
    links: [
      {
        label: 'DEMO',
        url: 'https://lexkrstn.github.io/react-styled-modal/',
        description: 'Check out the',
      },
      {
        label: 'GitHub',
        url: 'https://github.com/lexkrstn/react-styled-modal',
        description: 'The sources are available on',
      },
    ],
  },
  {
    name: 'React Styled Collapser',
    slug: 'react-styled-collapser',
    tags: [
      'JavaScript', 'React', 'Styled Components',
    ],
    thumbnail: 'react-styled-collapser/thumbnail.png',
    screenshots: [
      'react-styled-collapser/demo.png',
      'react-styled-collapser/demo2.png',
    ],
    description: `
      A React library that allows you to display collapsable content.
    `,
    about: `
      React Styled Modal is a library that gives you the ability to display
      "collapsable" content in your React application using Styled Components.

      The effect is similar to jQuery's slideUp() / slideDown() but the library
      DOES NOT use any external dependency like jQuery for this purpose.
      Instead, it make use of React's built-in means and CSS3 transitions to
      create similar effect. Because of this, the animation runs smoothly and fast.
    `,
    techniques: [
      'React',
      'JavaScript',
      'Styled Components',
    ],
    links: [
      {
        label: 'DEMO',
        url: 'https://lexkrstn.github.io/react-styled-collapser/',
        description: 'Check out the',
      },
      {
        label: 'GitHub',
        url: 'https://github.com/lexkrstn/react-styled-collapser',
        description: 'The sources are available on',
      },
    ],
  },
  {
    name: 'jQuery.skedTape',
    slug: 'jquery-sked-tape',
    tags: [
      'JavaScript', 'jQuery', 'Sass/Less',
    ],
    thumbnail: 'jquery-sked-tape/thumbnail.png',
    screenshots: [
      'jquery-sked-tape/demo.png',
      'jquery-sked-tape/modal.png',
    ],
    description: `
      A jQuery library that allows you to display an interactive schedule component.
    `,
    about: `
      jQuery.skedTape is a library that gives you the ability to display
      interactive schedule widget in your JavaScript application using jQuery.

      The library provides custom date/time formatting and internalization.
      You can change the HTML layout of the sidebar and timeline events
      using hooks. It's also possible to programmatically turn
      drag-and-drop mode on and off. While the mode is on you can prohibit
      the event from being dropped into a particular row by using the
      appropriate callback.
    `,
    techniques: [
      'JavaScript',
      'jQuery',
      'Sass',
    ],
    links: [
      {
        label: 'DEMO',
        url: 'https://lexkrstn.github.io/jquery-sked-tape/',
        description: 'Check out the',
      },
      {
        label: 'GitHub',
        url: 'https://github.com/lexkrstn/jquery-sked-tape',
        description: 'The sources are available on',
      },
    ],
  },
  {
    name: 'Portfolio',
    slug: 'portfolio',
    tags: [
      'TypeScript', 'NodeJS', 'Mongo', 'NestJS', 'ExpressJS',
      'React', 'Redux', 'Styled Components', 'REST',
    ],
    thumbnail: 'portfolio/thumbnail.jpg',
    screenshots: [
      'portfolio/home.jpg',
      'portfolio/works.jpg',
      'portfolio/about.jpg',
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
  {
    name: 'Mari store',
    slug: 'mari',
    tags: [
      'PHP', 'WordPress', 'MySQL', 'jQuery',
    ],
    thumbnail: 'old/mari/thumbnail.jpg',
    screenshots: [
      'old/mari/main.jpg',
      'https://www.youtube.com/embed/5XmdxfKMaYk',
      'old/mari/events.jpg',
      'old/mari/about.png',
    ],
    description: `
      A WordPress website for a shopping and entertainment center in Moscow.
    `,
    about: `
      A WordPress website for a shopping and entertainment center in Moscow.
      Please note, that this is not my design, I was responsible for coding only.
    `,
    techniques: [
      'PHP',
      'MySQL',
      'WordPress',
      'JavaScript / jQuery',
      'Sass',
    ],
    links: [
      {
        label: 'trk-mari.ru',
        url: 'https://trk-mari.ru',
        description: 'Check it out on',
      },
    ],
  },
  {
    name: 'Interma store',
    slug: 'interma',
    tags: [
      'PHP', 'WordPress', 'WooCommerce', 'MySQL', 'jQuery', 'Sass/Less',
    ],
    thumbnail: 'old/interma/thumbnail.jpg',
    screenshots: [
      'old/interma/main.jpg',
      'old/interma/products.jpg',
      'old/interma/product.jpg',
      'old/interma/objects.jpg',
      'old/interma/academy.jpg',
    ],
    description: `
      Online store of heating systems.
    `,
    about: `
      Online store of heating systems. The e-commerce part is
      based on WooCommerce, an open-source plugin for WordPress.

      Please note, that this is not my design, I was responsible for coding only.
    `,
    techniques: [
      'PHP',
      'MySQL',
      'WordPress',
      'WooCommerce',
      'JavaScript / jQuery',
      'Sass',
    ],
    links: [
      {
        label: 'interma.ru',
        url: 'https://interma.ru',
        description: 'Check it out on',
      },
    ],
  },
  {
    name: 'BaseRelief store',
    slug: 'baserelief',
    tags: [
      'PHP', 'WordPress', 'WooCommerce', 'MySQL', 'jQuery', 'Sass/Less',
    ],
    thumbnail: 'old/baserelief/thumbnail.jpg',
    screenshots: [
      'old/baserelief/main.jpg',
      'old/baserelief/products.jpg',
      'old/baserelief/portfolio.jpg',
    ],
    description: `
      Online store for a landscape design studio.
    `,
    about: `
      Online store for a landscape design studio. The e-commerce part is
      based on WooCommerce, an open-source plugin for WordPress.

      Please note, that this is not my design, I was responsible for coding only.
    `,
    techniques: [
      'PHP',
      'MySQL',
      'WordPress',
      'WooCommerce',
      'JavaScript / jQuery',
      'Sass',
    ],
    links: [
      {
        label: 'baserelief.ru',
        url: 'https://baserelief.ru/',
        description: 'Check it out on',
      },
    ],
  },
  {
    name: 'Beauty of lake',
    slug: 'beauty-of-lake',
    tags: [
      'PHP', 'WordPress', 'MySQL', 'jQuery', 'Sass/Less',
    ],
    thumbnail: 'old/beauty-of-lake/thumbnail.jpg',
    screenshots: [
      'old/beauty-of-lake/main.jpg',
      'old/beauty-of-lake/main2.jpg',
    ],
    description: `
      Website for a beauty saloon.
    `,
    about: `
      One of my old WordPress jobs, a beauty salon website.

      Please note, that this is not my design, I was responsible for coding only.
    `,
    techniques: [
      'PHP',
      'MySQL',
      'WordPress',
      'JavaScript / jQuery',
      'Sass',
    ],
    links: [
      {
        label: 'beautyoflake.ru',
        url: 'https://beautyoflake.ru/',
        description: 'Check it out on',
      },
    ],
  },
  {
    name: 'LogoShar store',
    slug: 'logoshar',
    tags: [
      'PHP', 'WordPress', 'WooCommerce', 'MySQL', 'jQuery', 'Sass/Less',
    ],
    thumbnail: 'old/logoshar/thumbnail.png',
    screenshots: [
      'old/logoshar/main.png',
      'old/logoshar/products.png',
      'old/logoshar/price.png',
    ],
    description: `
      Online store of helium balloons.
    `,
    about: `
      Online store of helium balloons. The e-commerce part is
      based on WooCommerce, an open-source plugin for WordPress.

      Please note, that this is not my design, I was responsible for coding only.
    `,
    techniques: [
      'PHP',
      'MySQL',
      'WordPress',
      'WooCommerce',
      'JavaScript / jQuery',
      'Sass',
    ],
    links: [
      {
        label: 'logoshar.ru',
        url: 'https://logoshar.ru',
        description: 'Check it out on',
      },
    ],
  },
  {
    name: 'MedConsulting',
    slug: 'ur-kons',
    tags: [
      'PHP', 'WordPress', 'MySQL', 'jQuery', 'Sass/Less',
    ],
    thumbnail: 'old/ur-kons/thumbnail.jpg',
    screenshots: [
      'old/ur-kons/main.jpg',
      'old/ur-kons/article.jpg',
    ],
    description: `
      Website for a medical activities licensing center.
    `,
    about: `
      One of my old WordPress jobs, a website for a medical activities licensing center.

      Please note, that this is not my design, I was responsible for coding only.
    `,
    techniques: [
      'PHP',
      'MySQL',
      'WordPress',
      'JavaScript / jQuery',
      'Sass',
    ],
    links: [
      {
        label: 'ur-kons.ru',
        url: 'https://ur-kons.ru/',
        description: 'Check it out on',
      },
    ],
  },
];
