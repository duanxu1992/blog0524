import { getAccessToken } from 'utils/auth';
import Util from 'utils/util';
const CHANNEL_CODE = 'kedacom';
export const EVENT_CODE_CLOSE_ALL_APP = 'EVENT_CODE_CLOSE_ALL_APP';
export const EVENT_CODE_CLOSE_LOGIN_APP = 'EVENT_CODE_CLOSE_LOGIN_APP';
export function postMessage (eventCode, message) {
	console.log(`postMessage${eventCode}`);
	let channel = new BroadcastChannel(CHANNEL_CODE);
	let data = {
		timestamp: new Date().getTime(),
		eventCode: eventCode,
		message: message
	};
	if (!Util.isEmpty(getAccessToken())) {
		channel.postMessage(data);
	}
};

export function onMessage (eventCode, callback) {
	console.log(`onMessage${eventCode}`);
	let channel = new BroadcastChannel(CHANNEL_CODE);
	channel.onmessage = function (ev) {
		if (ev.data.eventCode === EVENT_CODE_CLOSE_ALL_APP) {
			Util.isAppClosed(function (result) {
				if (result) {
					window.opener = this;
					window.close();
					localStorage.clear();
				}
			});
		}
		if (ev.data.eventCode === eventCode) {
			if (ev.data.eventCode === eventCode && callback) {
				callback(ev.data.message);
			}
		}
	};
};
