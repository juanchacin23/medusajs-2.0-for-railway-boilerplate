import { Html, Body, Container, Preview, Tailwind, Head, Img} from '@react-email/components'
import * as React from 'react'

interface BaseProps {
  preview?: string
  children: React.ReactNode
}

export const Base: React.FC<BaseProps> = ({ preview, children }) => {
  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px] w-full overflow-hidden">
            
                {/* Logo en el header de todos los correos */}
            <div className="text-center mb-6">
              <Img
                src={process.env.BACKEND_LOGO_URL!}
                alt="Deuce Logo"
                className="mx-auto w-28"
              />
            </div>
            
            <div className="max-w-full break-words">
              {children}
            </div>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
