import { socketWithAuth } from '.'
import { application } from '../../index'

export const move = (socket: socketWithAuth, data: any) => {
    application.hanoiService.move(socket.handshake.auth.token, data?.from, data?.to);
}