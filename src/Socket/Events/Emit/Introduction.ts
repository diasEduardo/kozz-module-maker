import { HandlerIntroduction, SignaturelessPayload } from 'kozz-types/dist';
import { Socket } from 'socket.io-client';
import { Method, TypeString } from '../../../Schema';
import { signPayload } from 'src/util';

export const introduce = <
	T extends Record<string, Method<Record<string, TypeString>>>
>(
	socket: Socket,
	handlerName: string,
	methods: T,
	signature?: string
) => {
	const payload: SignaturelessPayload<HandlerIntroduction> = {
		methods: Object.keys(methods),
		name: handlerName,
		role: 'handler',
	};

	socket.emit('introduction', signPayload(payload, signature));
};
