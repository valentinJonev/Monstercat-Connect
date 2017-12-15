var MobileWrapper;
(function (MobileWrapper) {
    var Services;
    (function (Services) {
        var TemplatingService = (function () {
            function TemplatingService() {
            }
            TemplatingService.prototype.ParseTemplate = function (template, params) {
                Mustache.parse(template);
                return Mustache.render(template, params);
            };
            return TemplatingService;
        }());
        Services.TemplatingService = TemplatingService;
    })(Services = MobileWrapper.Services || (MobileWrapper.Services = {}));
})(MobileWrapper || (MobileWrapper = {}));
