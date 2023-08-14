import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from "typeorm"
import { Usuario } from "../../entity/Usuario"
import * as bcrypt from 'bcrypt';

@EventSubscriber()
export class UsuarioSubscriber implements EntitySubscriberInterface<Usuario> {
  /**
   * Indicates that this subscriber only listen to Post events.
   */
  listenTo() {
      return Usuario
  }

  /**
   * Called before post insertion.
   */
  async beforeInsert(event: InsertEvent<Usuario>): Promise<void> {
    const { entity } = event;
    entity.senha = bcrypt.hashSync(entity.senha, parseInt(process.env.SALT_PASSWD));
  }
  beforeUpdate(event: UpdateEvent<Usuario>) {
    const { entity } = event;
    if (entity.senha) {
      entity.senha = bcrypt.hashSync(entity.senha, parseInt(process.env.SALT_PASSWD));
    }
  }
}