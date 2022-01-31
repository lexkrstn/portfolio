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
    const workNames = getWorks().map(w => w.name);
    await db.collection('works').deleteMany({ name: { $in: workNames } });
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
];
