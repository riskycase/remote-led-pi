import { exec } from "child_process";
import dotenv from "dotenv";
import ws from "ws";

dotenv.config();

const connection = new ws(process.env.SERVER || "");

connection.on('open', () => {
    console.log('Connected');
    connection.send(JSON.stringify({
        type: 'upgrade',
        accessKey: process.env.ACCESS_KEY,
    }));
});

connection.on('message', (rawMessage) => {
    const message = JSON.parse(rawMessage.toString());
    if(message.type === 'command') {
        exec(
			`irsend SEND_ONCE RGB_LED_44_key ${message.code}`,
			(err, stdout, stderr) => {
				if (err) console.error(stderr);
				else console.log(stdout);
			}
		);
    }
})