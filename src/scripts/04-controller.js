var bzUploaderController = ['$scope', 'FileUploader', '$parse', '$window', function($scope, FileUploader, $parse, $window) {
    $scope.autoupload = $scope.autoupload || false;
    $scope.text = angular.extend({
        'choose': 'Choose files',
        'upload': 'Upload',
        'cancel': 'Cancel'
    }, $parse($scope.translates || '')($scope) || {});

    $scope.limit = $scope.limit || 10;
    $scope.errors = [];

    var token = $window.localStorage['token'] || $window.localStorage['ngStorage-token'];
    token = token || $window.localStorage['ngStorage2-token'];
    token = token || $window.localStorage['satellizer_token'];
    var headers = {};
    if (token) {
        headers['Authorization'] = 'Bearer ' + token;
    }

    // create a uploader with options
    var uploader = new FileUploader({
        scope: $scope,                          // to automatically update the html. Default: $rootScope
        headers: headers,
        url: $scope.url.replace('\\:', ':')    // replace \: -> : when port number
    });
    if ($scope.maxFileSize && $scope.maxFileSize != '') {
        // console.log('O_O', $scope.maxFileSize);
        uploader.filters.unshift({
            name: 'maxFileSize', fn: function (file) {
                var maxFileSize = $scope.maxFileSize * 1024 * 1024;
                // console.log('maxFileSize this', maxFileSize, file.size);
                var res = file.size <= maxFileSize;
                $scope.errors = $scope.errors || [];
                if(!res) {
                    $scope.errors.push({
                        message: 'Overflow max file size',
                        code: 1
                    });
                }
                return res;
            }
        });
    }
    $scope.uploader = uploader;

    uploader.onAfterAddingFile = function (items) {
        if ($scope.autoupload) {
            uploader.loading = true;
            uploader.uploadAll();
        }
    };

    uploader.onSuccessItem = function (item, response, status, headers) {
        uploader.loading = false;

        if(typeof response == 'string') {
            try {
                response = JSON.parse(response);
            } catch (er) {
                response = decodeURIComponent(response);
            }
        }
        console.log('Success: ', response);

        $scope.errors = [];
        if($scope.limit == 1) {
            $scope.files = $scope.files || '';
            $scope.files = response;
        } else {
            $scope.files = $scope.files || [];
            $scope.files.push(response);
        }

        angular.forEach(uploader.queue, function(file, n) {
            if (file == item) {
                uploader.queue.splice(n, 1);
            }
        });
    };

    uploader.onErrorItem = function (item, response, status, headers) {
        item.remove();
        item.progress = 100;

        $scope.errors = $scope.errors || [];
        $scope.errors.push(response);
    };

    uploader.onProgressAll = function (progress) {
        uploader.progress = progress;
    };

    uploader.onCompleteAll = function () {
        uploader.progress = 100;
    };

    $scope.deleteFiles = function() {
        $scope.files = [];
    };
    $scope.deleteFile = function(file) {
        angular.forEach($scope.files, function(item, i){
            if (item == file) {
                $scope.files.splice(i, 1);
            }
        });
    };
}];