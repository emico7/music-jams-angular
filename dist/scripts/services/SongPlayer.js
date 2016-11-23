(function() {
    function SongPlayer($rootScope, Fixtures) {
        var SongPlayer = {};

        // @desc Object that holds albumPicasso
        // @type {Object}
        var currentAlbum = Fixtures.getAlbum();

        // @desc Buzz object audio file
        // @type {Object}
        var currentBuzzObject = null;

        // @function setSong
        // @desc Stops currently playing song and loads new audio file as currentBuzzObject
        // @param {Object} song

        var setSong = function(song) {
            if (currentBuzzObject) {
                stopSong(SongPlayer.currentSong);
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true,
                volume: SongPlayer.volume
            });

            currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function() {
                    SongPlayer.currentTime = currentBuzzObject.getTime();
                });
            });

            SongPlayer.currentSong = song;
        };

        // @function playSong
        // @desc Starts playing song and sets song state to currently playing
        // @param {Object} song
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        };

        // @function stopSong
        // @desc Stops playing song and sets song state to not playing
        // @param {Object} song
        var stopSong = function(song) {
            currentBuzzObject.stop();
            song.playing = null;
        };

        // @function getSongIndex
        // @desc Finds the index of active song
        // @param {Object} song
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };

        // @desc Song that is currently playing or on pause
        // @type {Object}
        SongPlayer.currentSong = null;

        /**
        @desc Current playback time (in second) of currently playing song
        @type { Number }
        */
        SongPlayer.currentTime = null;

        /**
        @desc Current volume
        @type { Number }
        */
        SongPlayer.volume = 50;

        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }
        };

        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };

        // @function previous
        // @desc Decreases current song index by one
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;

            if (currentSongIndex < 0) {
                stopSong(SongPlayer.currentSong);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };

        // @function next
        // @desc Increases current song index by one
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;

            if (currentSongIndex >= currentAlbum.songs.length) {
                stopSong(SongPlayer.currentSong);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        /**
        @function setCurrentTime
        @desc Set current time (in seconds) of currently playing song
        @param {Number} time
        */
        SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }
        };

        /**
        @function setVolume
        @desc Set volume
        @param {Number} volume
        */
        SongPlayer.setVolume = function(volume) {
            if (currentBuzzObject) {
                currentBuzzObject.setVolume(volume);
            }
            SongPlayer.volume = volume;
        };

        return SongPlayer;
    }

    angular
        .module('musicJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();
