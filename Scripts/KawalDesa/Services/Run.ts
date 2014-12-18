/// <reference path="../../../Scaffold/Scripts/typings/angularjs/angular.d.ts"/>

module KawalDesa {

    //Source: http://stackoverflow.com/questions/22537311/angular-ui-router-login-authentication

    kawaldesa.run(['$rootScope', '$state', '$stateParams', 'authorization', 'principal',
        function ($rootScope, $state, $stateParams, authorization, principal) {
            $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {
                // track the state the user wants to go to; authorization service needs this
                $rootScope.toState = toState;
                $rootScope.toStateParams = toStateParams;
                // if the principal is resolved, do an authorization check immediately. otherwise,
                // it'll be done when the state it resolved.
               
                if (principal.isIdentityResolved()) authorization.authorize();
            });
        }
    ]);

}