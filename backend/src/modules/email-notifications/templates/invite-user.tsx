import { Button, Link, Section, Text, Img, Hr } from '@react-email/components'
import { Base } from './base'

/**
 * The key for the InviteUserEmail template, used to identify it
 */
export const INVITE_USER = 'invite-user'

/**
 * The props for the InviteUserEmail template
 */
export interface InviteUserEmailProps {
  /**
   * The link that the user can click to accept the invitation
   */
  inviteLink: string
  /**
   * The preview text for the email, appears next to the subject
   * in mail providers like Gmail
   */
  preview?: string

  logoUrl: string 
}

/**
 * Type guard for checking if the data is of type InviteUserEmailProps
 * @param data - The data to check
 */
export const isInviteUserData = (data: any): data is InviteUserEmailProps =>
  typeof data.inviteLink === 'string' && (typeof data.preview === 'string' || !data.preview) && typeof data.logoUrl === 'string'

/**
 * The InviteUserEmail template component built with react-email
 */
export const InviteUserEmail = ({
  inviteLink,
  preview = `Invitación para panel de admin de Deuce!`,
  logoUrl,
}: InviteUserEmailProps) => {
  
  return (
    <Base preview={preview}>
      <Section className="mt-[32px]">
        <Img
          src={logoUrl}
          alt="Deuce"
          className="mx-auto w-28"
        />
      </Section>
      <Section className="text-center">
        <Text className="text-black text-[14px] leading-[24px]">
          Te han invitado a ser administrador en <strong>Deuce</strong>.
        </Text>
        <Section className="mt-4 mb-[32px]">
          <Button
            className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline px-5 py-3"
            href={inviteLink}
          >
            Aceptar invitación
          </Button>
        </Section>
        <Text className="text-black text-[14px] leading-[24px]">
          o copia y pega el siguiente enlace en tu navegador:
        </Text>
        <Text style={{
          maxWidth: '100%',
          wordBreak: 'break-all',
          overflowWrap: 'break-word'
        }}>
          <Link
            href={inviteLink}
            className="text-blue-600 no-underline"
          >
            {inviteLink}
          </Link>
        </Text>
      </Section>
      <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
      <Text className="text-[#666666] text-[12px] leading-[24px]">
       Si no esperabas esta invitación, puedes ignorar este correo electrónico, ya que la invitación expirará en 24 horas. 
       Si te preocupa la seguridad de tu cuenta, responde a este correo para ponerte en contacto con nosotros.
      </Text>
    </Base>
  )
}

InviteUserEmail.PreviewProps = {
  inviteLink: '`${BACKEND_URL}/app/invite?token=${invite.token}`',
  preview: 'Invitación para panel de admin de Deuce desde el preview!',
  logoUrl: 'https://bucket-production-f8f9.up.railway.app/medusa-media/static-assets/logo.svg',

} as InviteUserEmailProps


export default InviteUserEmail
