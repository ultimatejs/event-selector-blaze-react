Package.describe({
	name: "ultimatejs:event-selector-blaze-react",
	summary: "Blaze style event selectors",
	version: '0.0.1',
	documentation: 'README.md',
	git: 'https://github.com/ultimatejs/event-selector-blaze-react'
});

Package.onUse(function (api) {
	api.versionsFrom('METEOR@1.2.1');
	api.use('ecmascript@0.1.5');
	api.use('underscore');
	api.use('ultimatejs:underscore-mixin@0.0.1');
	
	api.addFiles([
		'event-selector-mixin.js',
	]);
	api.export('EventSelectorBlazeReact');
});

