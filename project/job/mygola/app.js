(function() {
    var app = angular.module('mygola', ['ui.bootstrap']);



    app.controller('HomeController', function($scope, $uibModal, $window) {
        var self = this;


        // Get notes from local storage
        this.notes = JSON.parse($window.localStorage.getItem('mygolaNotes'));
        if(!this.notes) {
            this.notes = [];
        }

        this.addNote = function() {
            self.selectedNote = {};
            $uibModal.open({
                animation: true,
                templateUrl: 'views/note.html',
                backdrop: 'static',
                controller: 'NoteController as nc'
            });
        };

        this.removeNote = function(index) {
            self.notes.splice(index, 1);
            self.persist();
        };

        // Persist the data to local storage
        this.persist = function () {
            $window.localStorage.setItem('mygolaNotes', JSON.stringify(self.notes));
        };

        this.editNote = function(index) {
            self.selectedNote = angular.copy(self.notes[index]);
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'views/note.html',
                backdrop: 'static',
                controller: 'NoteController as nc',
            });
        };

        this.setStatus = function(index, setDone) {
            if(setDone) {
                self.notes[index].isDone = true;
            }
            else {
                self.notes[index].isDone = false;
            }
            self.persist();
        }
    });

    app.controller('NoteController', function($scope, $uibModalInstance) {
        var selfNc = this;
        var hc = $scope.$parent.$$childHead.hc;
        this.note = hc.selectedNote || {};

        this.saveNote = function() {
            for(var i=0;i<hc.notes.length;i++) {
                if(hc.notes[i].id === selfNc.note.id) {
                    hc.notes.splice(i, 1);
                    break;
                }
            }
            selfNc.note.id = hc.notes.length + 1;
            hc.notes.push(selfNc.note);
            $uibModalInstance.dismiss('cancel');
            // $window.localStorage.setItem('mygolaNotes', JSON.stringify(hc.notes));
            hc.persist();
        };

        this.cancelNote = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });
})();