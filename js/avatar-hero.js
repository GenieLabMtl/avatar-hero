/**
 * Copyright GenieMob 2018
 * Propulser la créativité | Ignite creativity
 */


const SAMPLE_PERIOD_MILLISECONDS = 1000;
const DEVICE_IDS = [ '112233445566', 'aabbccddeeff' ];
const RECEIVER_ID = '001bc50940810000';
const INSTANCE_IDS = [ 'ccddeeff', '33445566' ];
const MIN_RSSI = 140;
const MAX_RSSI = 193;
const EVENT_HISTORY = 5;


/**
 * Avatar Hero Module
 */
angular.module('avatar-hero', [])

  // Data Generator factory
  .factory('dataGenerator', function dataGeneratorFactory($interval) {

    var deviceIndex = 0;

    // Generate one sample event
    function generateEvent(callback) {
      var event = {};
      event.time = new Date().getTime();
      event.deviceId = DEVICE_IDS[deviceIndex];
      event.receiverId = RECEIVER_ID;
      event.rssi = MIN_RSSI + Math.round(Math.random() * (MAX_RSSI - MIN_RSSI));
      event.accelerationX = (2 * (Math.random() - 0.5)).toFixed(3);
      event.accelerationY = (2 * (Math.random() - 0.5)).toFixed(3);
      event.accelerationZ = (2 * (Math.random() - 0.5)).toFixed(3);
      event.nearest = [
        { instanceId: INSTANCE_IDS[deviceIndex], rssi: -69 }
      ];

      if(++deviceIndex >= DEVICE_IDS.length) {
        deviceIndex = 0;
      }
      return callback(event);
    }

    // Initiate the generation of sample events
    var generateEvents = function(type, callback) {
      if(!callback || (typeof callback !== 'function')) { 
        return;
      }

      $interval(generateEvent, SAMPLE_PERIOD_MILLISECONDS, 0, true, callback);
    }

    return {
      on: generateEvents
    }
  })

  // Avatar controller
  .controller('AvatarCtrl', function($scope, dataGenerator) {

    $scope.events = [];

    // Listen for sample events
    dataGenerator.on('event', function(event) {
      $scope.events.push(event);
      if($scope.events.length > EVENT_HISTORY) {
        $scope.events.shift();
      }

      /* --------------------------------------------- */
      /* Code for controlling the avatar would go here */
      /* --------------------------------------------- */
    });
  });
