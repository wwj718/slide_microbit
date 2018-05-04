var bluetoothDevice;

//chibi:bit BLE UUID
var BUTTON_SERVICE_UUID = 'e95d9882-251d-470a-a062-fa1922dfa9a8';
var BUTTON_A_CHARACTERISTIC_UUID = 'e95dda90-251d-470a-a062-fa1922dfa9a8';
var BUTTON_B_CHARACTERISTIC_UUID = 'e95dda91-251d-470a-a062-fa1922dfa9a8';


document.getElementById("ble_button").addEventListener("click", () => { connect() })

function connect() {

    function handleCharacteristicValueChanged1(event) {
        // 按钮1
        var value = event.currentTarget.value.getInt8(0);
        //console.log(value);
        if (value){
            console.log(value)
            Reveal.prev();
        }
        
        
    }

    function handleCharacteristicValueChanged2(event) {
        var value = event.currentTarget.value.getInt8(0);
        // console.log(value)
        if (value){
            console.log(value);
            Reveal.next();
        }
    }

        navigator.bluetooth.requestDevice({
            filters: [{
                namePrefix: 'BBC micro:bit',
            }],
            optionalServices: ['e95d9882-251d-470a-a062-fa1922dfa9a8'] //BUTTONSERVICE_SERVICE_UUID
        })
            .then(device => {
                console.log('Connecting to GATT Server...');
                return device.gatt.connect();
            })
            .then(server => {
                console.log('> Found GATT server');
                gattServer = server;
                // Get command service
                return gattServer.getPrimaryService('e95d9882-251d-470a-a062-fa1922dfa9a8'); //BUTTONSERVICE_SERVICE_UUID
            })
            .then(service => {
                console.log('> Found command service Button A');
                commandService = service;
                return commandService.getCharacteristic('e95dda90-251d-470a-a062-fa1922dfa9a8'); //BUTTON1STATE_CHARACTERISTIC_UUID
            })
            .then(characteristic => {
                console.log('> Found write characteristic - Start Notification Button 1');
                return characteristic.startNotifications().then(_ => {
                    console.log('> Notifications started');
                    characteristic.addEventListener('characteristicvaluechanged',
                        handleCharacteristicValueChanged1);
                });
            })

            .then(service => {
                console.log('> Found command service Button B');
                return commandService.getCharacteristic('e95dda91-251d-470a-a062-fa1922dfa9a8'); //BUTTON2STATE_CHARACTERISTIC_UUID
            })
            .then(characteristic2 => {
                console.log('> Found write characteristic - Start Notification Button 2');
                return characteristic2.startNotifications().then(_ => {
                    console.log('> Notifications started');
                    characteristic2.addEventListener('characteristicvaluechanged',
                        handleCharacteristicValueChanged2);
                    //progress.hidden = true;
                });
                //progress.hidden = true;
            })
            //.catch(handleError);
    }
