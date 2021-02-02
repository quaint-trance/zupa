import { socketWithAuth } from '.'
import { domain } from '../../index'

export const chooseCards = (socket: socketWithAuth, data: any) => {
    domain.setService.chooseCards(socket.handshake.auth.token, data);
}