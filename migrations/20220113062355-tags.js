const tags = [
  { name: 'JavaScript', workCount: 0 },
  { name: 'TypeScript', workCount: 0 },
  { name: 'NodeJS', workCount: 0 },
  { name: 'ExpressJS', workCount: 0 },
  { name: 'React', workCount: 0 },
  { name: 'Styled Components', workCount: 0 },
  { name: 'Redux', workCount: 0 },
  { name: 'Vue', workCount: 0 },
  { name: 'Vuex', workCount: 0 },
  { name: 'PHP', workCount: 0 },
  { name: 'Wordpress', workCount: 0 },
  { name: 'WooCommerce', workCount: 0 },
  { name: 'Sass/Less', workCount: 0 },
  { name: 'MySQL', workCount: 0 },
  { name: 'jQuery', workCount: 0 },
  { name: 'GraphQL', workCount: 0 },
  { name: 'REST', workCount: 0 },
  { name: 'Knex.js', workCount: 0 },
  { name: 'Objection.js', workCount: 0 },
  { name: 'From scratch', workCount: 0 },
  { name: 'Chai', workCount: 0 },
  { name: 'Stylus', workCount: 0 },
];
const tagNames = tags.map(t => t.name);

module.exports = {
  async up(db) {
    await db.collection('tags').insertMany(tags);
  },

  async down(db) {
    await db.collection('tags').deleteMany({ name: { $in: tagNames } });
  },
};
