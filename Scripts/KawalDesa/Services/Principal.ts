/// <reference path="../../../Scaffold/Scripts/typings/angularjs/angular.d.ts"/>

module KawalDesa {

    //Source: http://stackoverflow.com/questions/22537311/angular-ui-router-login-authentication

    kawaldesa.factory('principal', ['$q', '$http', '$timeout',
        function ($q, $http, $timeout) {
            var _identity = undefined,
                _authenticated = false;

            return {
                isIdentityResolved: function () {
                    return angular.isDefined(_identity);
                },
                isAuthenticated: function () {
                    return _authenticated;
                },
                isInRole: function (role) {
                    if (!_authenticated || !_identity.roles) return false;

                    return _identity.roles.indexOf(role) != -1;
                },
                isInAnyRole: function (roles) {
                    if (!_authenticated || !_identity.roles) return false;

                    for (var i = 0; i < roles.length; i++) {
                        if (this.isInRole(roles[i])) return true;
                    }

                    return false;
                },
                authenticate: function (identity) {                    
                    _identity = identity;
                    _authenticated = identity != null;
                },
                identity: function (force) {
                    var deferred = $q.defer();

                    if (force === true) _identity = undefined;

                    // check and see if we have retrieved the identity data from the server. if we have, reuse it by immediately resolving
                    if (angular.isDefined(_identity)) {
                        deferred.resolve(_identity);

                        return deferred.promise;
                    }

                    // otherwise, retrieve the identity data from the server, update the identity object, and then resolve.
                    //                   $http.get('/svc/account/identity', { ignoreErrors: true })
                    //                        .success(function(data) {
                    //                            _identity = data;
                    //                            _authenticated = true;
                    //                            deferred.resolve(_identity);
                    //                        })
                    //                        .error(function () {
                    //                            _identity = null;
                    //                            _authenticated = false;
                    //                            deferred.resolve(_identity);
                    //                        });

                    // for the sake of the demo, fake the lookup by using a timeout to create a valid
                    // fake identity. in reality,  you'll want something more like the $http request
                    // commented out above. in this example, we fake looking up to find the user is
                    // not logged in
                    $http.get('/api/User/Get')
                        .success(function(data) {
                            _identity = {
                                user: data,
                                roles: data.Roles
                            };
                            _authenticated = true;
                            deferred.resolve(_identity);
                        })
                        .error(function () {
                            _identity = null;
                            _authenticated = false;
                            deferred.resolve(_identity);
                        });

                    return deferred.promise;                    
                }
            };
        }
    ]);

}