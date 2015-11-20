app.factory('Scopes', function ($rootScope) {
    var ScopeStore = {};
    return {
        set: function (key, value) {
            ScopeStore[key] = value;
        },
        get: function (key) {
            return ScopeStore[key];
        }
    };
});