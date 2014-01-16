angular.module('<%= appname %>').factory('<%= _.camelize(name) %>',function ($resource, SETTINGS) {
    return $resource(SETTINGS.servicesApiUrl + '/api/<%= _.camelize(name) %>/:id', { id: '@id' },
    {
        query: { method: 'GET', isArray: false },
        create: { method: 'POST' },
        update: { method: 'PUT' },
    });
});
