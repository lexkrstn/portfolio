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
    name: 'Thetre Management System',
    tags: ['JavaScript', 'PHP', 'MySQL', 'jQuery', 'REST', 'ExpressJS', 'NodeJS'],
    thumbnail: '/images/portfolio/tms.jpg',
    screenshots: [
      '/images/portfolio/tms.jpg',
    ],
    description: `
      Open Source web chat platform developed as UI/UX Javascript Specialist
      at Konecty → Rocket.Chat.
    `,
    about: `
      On this Open Source project I was responsible for the initial UI/UX
      architecture, structure, design and animations. The idea was to follow
      the 3 column UX trend of webchats like skype, hipchat, gitter and slack.
      Building upon that an Open Source alternative with similar functionalities.

      The UI/UX was conceived with a mobile first approach. So it would be
      possible to effortlessly launch it into any platform without making
      any changes to the main application.
    `,
    techniques: [
      'UI/UX Design',
      'UI/UX Architecture',
      'CSS3 – preprocessed with LESS + LESSHAT',
      'Blaze',
      'MongoDB',
    ],
    links: [
      {
        label: 'https://rocket.chat',
        url: '#',
        description: 'The project is online at',
      },
      {
        label: 'github',
        url: '#',
        description: 'Access the project\'s source on',
      },
    ],
  },
];