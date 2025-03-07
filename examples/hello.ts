// This example must be run before interactive/world, since this serves the
// IPC server the other sockets connect to.
import { setTimeout } from 'node:timers';

import { Server } from '../src/index.js';

// eslint-disable-next-line no-unused-vars
const node = new Server('hello')
	.on('connect', (client) => console.log(`[IPC] Client Connected: ${client.name}`))
	.on('disconnect', (client) => console.log(`[IPC] Client Disconnected: ${client.name}`))
	.on('message', (message) => {
		// console.log(`Received data:`, message.data, typeof message.data);
		// For World.js test
		if (message.data === 'Hello') {
			message.reply('world!');
		} else {
			setTimeout(() => message.reply(`Reply!: ${message.data}`), Math.min(9_000, Math.floor(Math.random() * 1_000)));
		}
	})
	.on('error', (error, client) => console.error(`[IPC] Error from ${client?.name}`, error));

node.listen(8_001).catch((error) => console.error('[IPC] Disconnected!', error));
