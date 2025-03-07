import { unpack } from 'msgpackr';

import { read } from '../Util/Header.js';

import type { RawMessage } from './Base/SocketHandler.js';

/**
 * The queue class that manages messages.
 * @since 0.1.0
 */
export class Queue extends Map<number, QueueEntry> {
	/**
	 * The remaining buffer to truncate with other buffers.
	 * @since 0.1.0
	 */
	private _rest: Uint8Array | null = null;

	/**
	 * Returns a new Iterator object that parses each value for this queue.
	 * @since 0.1.0
	 */
	public process(buffer: Uint8Array) {
		if (this._rest) {
			const join = new Uint8Array(this._rest.byteLength + buffer.byteLength);
			join.set(this._rest);
			join.set(buffer, this._rest.byteLength);
			buffer = join;
			this._rest = null;
		}

		const output: RawMessage[] = [];
		while (buffer.byteLength !== 0) {
			// If the header separator was not found, it may be due to an impartial message
			if (buffer.length <= 11) {
				this._rest = buffer;
				break;
			}

			const { id, receptive, byteLength } = read(buffer);

			// If the message is longer than it can read, buffer the content for later
			if (byteLength > buffer.byteLength) {
				this._rest = buffer;
				break;
			}

			try {
				const value = unpack(buffer.subarray(11));
				output.push({ id, receptive, data: value });
			} catch (error) {
				output.push({ id: null, receptive: false, data: error });
			}

			buffer = buffer.subarray(byteLength + 11);
		}

		return output;
	}
}

/**
 * An entry for this queue
 */
interface QueueEntry {
	reject(error: Error): void;
	resolve(value: any): void;
}
