module MobileWrapper.Controllers {
    interface LoginScope extends ng.IScope{
        html: string | null,
        username: string,
        password: string,
        errorMessage: string,
        logo: string,
        showLogo: boolean,
        pageName: string
    }

    export class LoginController {
        private scope: LoginScope;
        private commonService: Services.CommonService;
        private templateConstants: Constants.TemplateConstants;
        private authService: Services.AuthService;
        private commonConstants: Constants.CommonConstants;
        private state: ng.ui.IStateService;

        static $inject = ['$scope', 'commonService', 'templateConstants', 'authService', '$state', 'commonConstants'];

        constructor($scope: LoginScope, commonService: Services.CommonService, templateConstants: Constants.TemplateConstants, 
                    authService: Services.AuthService, $state: ng.ui.IStateService, 
                    commonConstants: Constants.CommonConstants) {
            this.scope = $scope;
            this.commonService = commonService;
            this.authService = authService;
            this.templateConstants = templateConstants;
            this.commonConstants = commonConstants;
            this.state = $state;
            this.commonService.SetMenuVisibility(false);
            this.Setup();

            $('.icon').hover(function () {
                $('#password').attr('type', 'text');
            }, function () {
                $('#password').attr('type', 'password');
            });
        }

        private Setup(){
            if(this.commonConstants.APP_LOGO != ''){
                this.scope.logo = this.commonConstants.APP_LOGO;
                this.scope.showLogo = true;
            }
            else{
                this.scope.pageName = 'Login'
            }
        }

        public back(){
            this.commonService.NavigateToPage('loading', this.state, this.scope);
        }

        public Login(){
            this.authService.Login(this.scope.username, this.scope.password)
            .then((success) => {
                this.commonService.ReloadMenu();
                this.commonService.NavigateToPage('home', this.state, this.scope);
            }, (error) => {
                if(error){
                    $('.login-form-main-message').addClass('show');
                    $('.login-form-main-message').addClass('error');
                    $('.login-button').addClass('error');
                    this.scope.errorMessage = error;
                    console.log(error);
                }
            })
        }
    }
}