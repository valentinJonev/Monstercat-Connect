module MobileWrapper.Directives {
  'use strict';

  export class DynamicHtml implements ng.IDirective{

    private comp: ng.ICompileService;

    constructor($compile: ng.ICompileService) {
      this.comp = $compile;
    }

    public link = (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
      scope.$watch(attrs.dynamic, (html) => {
        element.html(html as string);
        this.comp(element.contents())(scope);
      });
    }

    public static Factory(): ng.IDirectiveFactory{
      var directive = ($compile: ng.ICompileService) => new DynamicHtml($compile);
      directive.$inject = ['$compile'];

      return directive;
    }
  }
}