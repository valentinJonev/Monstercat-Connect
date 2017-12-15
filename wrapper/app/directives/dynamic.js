var MobileWrapper;
(function (MobileWrapper) {
    var Directives;
    (function (Directives) {
        'use strict';
        var DynamicHtml = (function () {
            function DynamicHtml($compile) {
                var _this = this;
                this.link = function (scope, element, attrs) {
                    scope.$watch(attrs.dynamic, function (html) {
                        element.html(html);
                        _this.comp(element.contents())(scope);
                    });
                };
                this.comp = $compile;
            }
            DynamicHtml.Factory = function () {
                var directive = function ($compile) { return new DynamicHtml($compile); };
                directive.$inject = ['$compile'];
                return directive;
            };
            return DynamicHtml;
        }());
        Directives.DynamicHtml = DynamicHtml;
    })(Directives = MobileWrapper.Directives || (MobileWrapper.Directives = {}));
})(MobileWrapper || (MobileWrapper = {}));
