module.exports = {
  // contracts_build_directory: '../dist/ethereum', // TODO: Not compatible with migrations.
  networks: {
    development: {
      host: '127.0.0.1',
      network_id: '*',
      port: 9545,
    },
  },
};
