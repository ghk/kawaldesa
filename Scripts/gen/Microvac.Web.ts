/// <reference path="../typings/angularjs/angular.d.ts"/>

module Microvac.Web {
    export class AjaxSettings {
        async = true;
        cache = false;
        timeout = -1;

        public build(settings: ng.IRequestConfig): ng.IRequestConfig {
            return {
                cache: this.cache,
                timeout: this.timeout,
                method: settings.method,
                url: settings.url,
                data: settings.data,
                params: settings.params,
            }
        }

    }

    declare var angular;
    export class Multipart {
        forms = {};
        files: any;

        public constructor(data?: any) {
            this.forms = data ? data.forms : {};
            this.files = data ? data.files : null;
        }

        public upload(url): any {
            var $upload = angular.element("html").injector().get("$upload");
            return $upload.upload({
                type: 'POST',
                url: url,
                data: this.forms,
                file: this.files
            });
        }
    }

    export interface IQuery {
        PageLength?: number;
        PageBegin?: number;
        SortField?: string;
        SortOrder?: string;
        [key: string]: any;
    }

    export var $http: ng.IHttpService;
}