import { SerialPort } from 'serialport';

export const port = new SerialPort({
	path: `COM4`,
	baudRate: 9600,
	autoOpen: false,
});
