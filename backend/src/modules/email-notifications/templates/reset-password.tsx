// src/templates/reset-password.tsx
import { Button, Link, Section, Text } from '@react-email/components'
import { Base } from './base'

/**
 * The key for the ResetPassword template
 */
export const RESET_PASSWORD = 'reset-password'

/**
 * Props for the ResetPassword 
 */
export interface ResetPasswordProps {
  /** User's email address */
  email: string
  
  resetLink: string
  /** Optional preview text */
  preview?: string
}

/**
 * Type guard for ResetPasswordProps
 * 
 *  * Type guard for checking if the data is of type InviteUserEmailProps
 * @param data - The data to check
 */
export const isResetPasswordData = (
  data: any
): data is ResetPasswordProps =>
  typeof data.email === 'string' &&
  typeof data.resetLink === 'string' &&
  (typeof data.preview === 'string' || !data.preview)

/**
 * Reset password email template
 */
export const ResetPassword = ({
  resetLink,
  email,
  preview = `Restablece tu contraseña en Deuce!`,
}: ResetPasswordProps) => {

  return (
    <Base preview={preview}>
      <Section>
        <Text style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}>
          Restablece tu contraseña
        </Text>
      </Section>

      <Section>
        <Text style={{ margin: '16px 0' }}>
          Hola, para restablecer tu contraseña haz clic en el botón de abajo:
        </Text>
        <Section className="mt-4 mb-8 text-center">
          <Button
            className="bg-black text-white no-underline py-3 px-6 rounded"
            href={resetLink}
          >
            Restablecer contraseña
          </Button>
        </Section>
        <Text style={{ margin: '16px 0' }}>
          Si el botón no funciona, copia y pega este enlace en tu navegador:
        </Text>
        <Text style={{ wordBreak: 'break-all', overflowWrap: 'break-word' }}>
          <Link href={resetLink} className="text-blue-600 no-underline">
            {resetLink}
          </Link>
        </Text>
      </Section>

      <Section>
        <Text style={{ marginTop: '32px', fontSize: '12px', color: '#666666' }}>
          Si no solicitaste este cambio, ignora este correo. El enlace expirará en 24 horas.
        </Text>
      </Section>
    </Base>
  )
}

/* Optional preview props for development
ResetPassword.PreviewProps = {
  email: 'usuario@ejemplo.com',
  resetLink: 'https://example.com/reset-password?token=123456', 
  preview: 'Restablece tu contraseña'
} 
  */

export default ResetPassword
