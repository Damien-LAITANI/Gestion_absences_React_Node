module.exports = {
	apps: [
		{
			script: 'index.js',
			watch: '.',
		},
		{
			script: './service-worker/',
			watch: ['./service-worker'],
		},
	],

	deploy: {
		production: {
			user: 'u350660357',
			host: '37.59.180.217',
			ref: 'origin/main',
			repo: 'git@github.com:Damien-LAITANI/Gestion_absences_React_Node.git',
			path: '/home/u350660357/domains/damienlaitani.com/public_html/respire_api/build',
			'pre-deploy-local': '',
			'post-deploy':
				'npm install && pm2 reload ecosystem.config.js --env production',
			'pre-setup': '',
		},
	},
};
