(function() {
     function AlbumCtrl(Fixtures) {
         this.albumData = Fixtures.getAlbum();
     }

     angular
         .module('musicJams')
         .controller('AlbumCtrl', ['Fixtures', AlbumCtrl]);
 })();
