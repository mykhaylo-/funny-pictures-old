var funnyPicturesApp = angular.module("mainModule", [ "ngResource", "ui.bootstrap", "ngRoute", "funnyControllers", "ngMaterial", "wu.masonry" ]);

funnyPicturesApp.factory("Pictures", function($resource, SharedProperties) {
    return $resource(SharedProperties.getApiUrl() + "/pictures/:id", {}, {
        query: {
            method: "GET",
            isArray: !1
        }
    });
}), funnyPicturesApp.factory("PicturesThumbnails", function($resource, SharedProperties) {
    return $resource(SharedProperties.getApiUrl() + "/picturesthumb/:id", {}, {
        query: {
            method: "GET",
            isArray: !1
        }
    });
}), funnyPicturesApp.factory("Funnies", function($resource, SharedProperties) {
    return $resource(SharedProperties.getApiUrl() + "/funnies/:id", {}, {
        query: {
            method: "GET",
            isArray: !1
        }
    });
}), funnyPicturesApp.factory("FunnyPicturesThumbnails", function($resource, SharedProperties) {
    return $resource(SharedProperties.getApiUrl() + "/funniesthumb/:id", {}, {
        query: {
            method: "GET",
            isArray: !1
        }
    });
}), funnyPicturesApp.factory("Feedback", function($resource, SharedProperties) {
    return $resource(SharedProperties.getApiUrl() + "/feedbacks/:id", {}, {
        query: {
            method: "GET",
            isArray: !1
        }
    });
}), funnyPicturesApp.service("FileUpload", [ "$http", function($http) {
    function handleError(response) {
        return response.data.message;
    }
    function handleSuccess(response) {
        return response.data;
    }
    this.uploadFileToUrl = function(file, uploadUrl) {
        var fd = new FormData();
        fd.append("content", file);
        var request = $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {
                "Content-Type": void 0
            }
        });
        return request.then(handleSuccess, handleError);
    };
} ]), funnyPicturesApp.config([ "$routeProvider", function($routeProvider) {
    $routeProvider.when("/home", {
        templateUrl: "html/home.html",
        controller: "HomeController"
    }).when("/createTemplate", {
        templateUrl: "html/createPicture.html",
        controller: "CreatePictureController"
    }).when("/createFunnyPicture", {
        templateUrl: "html/createFunnyPicture.html",
        controller: "CreateFunnyPictureController"
    }).when("/preview", {
        templateUrl: "html/funnyPicturePreview.html",
        controller: "PreviewFunnyController"
    }).when("/funnies", {
        templateUrl: "html/funnies.html",
        controller: "FunniesController"
    }).when("/contact", {
        templateUrl: "html/contact.html",
        controller: "ContactController"
    }).otherwise({
        redirectTo: "/home"
    });
} ]), funnyPicturesApp.directive("fileModel", [ "$parse", function($parse) {
    return {
        restrict: "A",
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel), modelSetter = model.assign;
            element.bind("change", function() {
                var reader = new FileReader();
                reader.onload = function(e) {
                    var image = $("#image-preview");
                    image.fadeOut("fast", function() {
                        image.attr("src", e.target.result), image.removeClass("hidden"), image.fadeIn("fast");
                    });
                }, reader.readAsDataURL(element[0].files[0]), scope.$apply(function() {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
} ]), funnyPicturesApp.directive("header", function() {
    return {
        restrict: "E",
        templateUrl: "html/directives/header.html"
    };
}), funnyPicturesApp.directive("footer", function() {
    return {
        restrict: "E",
        templateUrl: "html/directives/footer.html"
    };
}), funnyPicturesApp.service("SharedProperties", function() {
    var generatedFunny = {}, apiUrl = "http://localhost:8080/funny-pictures-rest-api/api", templateId = 0;
    return {
        getApiUrl: function() {
            return apiUrl;
        },
        getGeneratedFunny: function() {
            return generatedFunny;
        },
        setGeneratedFunny: function(value) {
            generatedFunny = value;
        },
        setTemplateId: function(id) {
            templateId = id;
        },
        getTemplateId: function() {
            return templateId;
        }
    };
});