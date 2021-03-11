import { socketWithAuth } from '.'
import { application } from '../../index'

export const chooseColumn = (socket: socketWithAuth, data: any) => {
    application.connect4Service.chooseColumn(socket.handshake.auth.token, data);
}