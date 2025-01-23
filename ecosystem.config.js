module.exports = {
  apps: [{
    script: 'index.js',
    watch: '.',
    env: {
      "NODE_ENV": "development",
      "PORT": "6000" // Set the port for development
    },
    env_production: {
      "NODE_ENV": "production",
      "PORT": "5900" // Set the port for production
    }
  }, {
    script: 'index.js',
    watch: ['.']
  }],

  deploy: {
    production: {
      user: 'SSH_USERNAME',
      host: 'SSH_HOSTMACHINE',
      ref: 'origin/master',
      repo: 'GIT_REPOSITORY',
      path: 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
