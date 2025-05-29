import {
  SubscriberArgs,
  type SubscriberConfig,
} from "@medusajs/medusa"
import { Modules } from "@medusajs/framework/utils"

import { EmailTemplates } from '../modules/email-notifications/templates'
import { BACKEND_URL } from '../lib/constants'



export default async function resetPasswordTokenHandler({
  event: { data: {
    entity_id: email,
    token,
    actor_type,
  } },
  container,
}: SubscriberArgs<{ entity_id: string, token: string, actor_type: string }>) {
  const notificationModuleService = container.resolve(
    Modules.NOTIFICATION
  )

  const urlPrefix = actor_type === "customer" ? 
    "https://maracaibo.deuce.lat" : 
    `${BACKEND_URL}/app`

  const resetLink = `${urlPrefix}/reset-password?token=${token}&email=${encodeURIComponent(email)}`

  try {
  await notificationModuleService.createNotifications({
    to: email,
    channel: "email",
    template: EmailTemplates.RESET_PASSWORD,
    data: {
      emailOptions: {
        replyTo: 'info@deucepadelshop.com',
        subject: "Restablecer contraseña del admin!" 
      },
      // a URL to a frontend application
      resetLink,
      preview: 'Haz clic para recuperar el acceso a tu cuenta',
      email,
    },
  }) 
  } catch (error) {
    console.error(error)
  }
}


export const config: SubscriberConfig = {
  event: "auth.password_reset",
}