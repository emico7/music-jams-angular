(function() {
     function AlbumCtrl() {
         this.albumData = angular.copy(albumPicasso);
     }

     angular
         .module('musicJams')
         .controller('AlbumCtrl', AlbumCtrl);
 })();
