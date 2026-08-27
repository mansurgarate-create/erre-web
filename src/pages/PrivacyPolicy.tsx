import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import FadeIn from '../components/ui/FadeIn'

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <header className="px-6 pt-10 pb-6 md:pt-14 md:pb-8">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/"
            className="font-heading text-xl md:text-2xl font-medium text-black no-underline hover:text-muted transition-colors duration-300"
          >
            erre
          </Link>
        </div>
      </header>

      <main className="px-6 pb-24 md:pb-32">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <h1 className="font-heading text-3xl md:text-5xl font-medium text-black leading-tight tracking-tight mb-6 md:mb-8">
              Aviso de privacidad
            </h1>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="space-y-8 text-muted text-sm md:text-base leading-relaxed">
              <p>
                Erre, con domicilio en Palestina 110, Interior 7, Colonia Roma, 64700, Monterrey, Nuevo León, México, opera una página web y una aplicación móvil, y tiene el firme compromiso de cumplir con el debido manejo de los datos personales, siendo responsable de aquéllos que recabe de sus titulares o de terceros particulares, incluyendo su correcto uso y protección.
              </p>

              <div>
                <h2 className="font-heading text-xl md:text-2xl font-medium text-black mb-4">
                  Datos personales que recabamos
                </h2>
                <p className="mb-4">
                  A través de nuestra página web y aplicación móvil, Erre recaba los siguientes datos personales:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li><strong>Identificador de Apple (Apple ID):</strong> utilizado para autenticación y vinculación de su cuenta en la aplicación iOS mediante "Iniciar sesión con Apple".</li>
                  <li><strong>Identificador de Google:</strong> utilizado para autenticación y vinculación de su cuenta en la página web y en Android mediante "Continuar con Google".</li>
                  <li><strong>Nombre:</strong> proporcionado opcionalmente al crear su cuenta.</li>
                  <li><strong>Correo electrónico:</strong> proporcionado opcionalmente al crear su cuenta.</li>
                  <li><strong>Historial de transacciones:</strong> registros de renta y devolución de vasos, incluyendo la cafetería y la fecha de cada operación.</li>
                  <li><strong>Ubicación del dispositivo:</strong> se accede a la ubicación para mostrar cafeterías cercanas en el mapa. Esta información no se almacena en nuestros servidores.</li>
                </ul>
                <p className="mb-4">
                  Adicionalmente, a través del formulario de contacto en la página web o por correo electrónico, podemos recabar nombre, teléfono y correo electrónico con la finalidad de atender sus consultas.
                </p>
                <h2 className="font-heading text-xl md:text-2xl font-medium text-black mb-4 mt-8">
                  Uso de los datos personales
                </h2>
                <p className="mb-4">
                  Los datos personales recabados serán utilizados para las siguientes finalidades primarias: (i) creación y administración de su cuenta de usuario; (ii) registro de transacciones de renta y devolución de vasos reutilizables; (iii) visualización de cafeterías cercanas; y (iv) contacto en caso de que así se hubiese solicitado.
                </p>
                <p className="mb-4">
                  Los datos personales recopilados serán proporcionados por el Usuario de forma voluntaria. Se informa que no se recabarán datos personales sensibles.
                </p>
                <p className="mb-4">
                  Erre se compromete a que los datos proporcionados por cualquier vía o medio sean tratados bajo las más estrictas medidas de seguridad que garanticen su confidencialidad, así como a no divulgar la información proporcionada salvo las excepciones legales y bajo los procedimientos correspondientes, o en caso de que así sea solicitado por las autoridades competentes.
                </p>
                <p className="mb-4">
                  De manera adicional, Erre puede utilizar su información personal para finalidades secundarias, como pueden ser fines estadísticos, los cuales no serán transferidos salvo las excepciones y a través de los procedimientos previstos en los ordenamientos legales aplicables.
                </p>
                <p>
                  En caso que usted no desee que sus datos personales sean tratados para estos fines secundarios, desde este momento usted nos puede comunicar lo anterior a la siguiente cuenta de correo electrónico: <a href="mailto:reusoconerre@gmail.com" className="text-black underline hover:text-muted transition-colors duration-300">reusoconerre@gmail.com</a>, en donde será atendido y recibirá la respuesta correspondiente por parte de nuestros encargados del tratamiento y protección de sus datos.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-xl md:text-2xl font-medium text-black mb-4">
                  Transferencia de datos personales
                </h2>
                <p>
                  No se realizarán transferencias de datos personales, salvo aquéllas que sean necesarias para atender requerimientos de información de una autoridad competente, que esté debidamente fundados y motivados.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-xl md:text-2xl font-medium text-black mb-4">
                  Uso de cookies, web beacons y otras tecnologías de rastreo
                </h2>
                <p className="mb-4">
                  Al navegar por esta página Web pudieran recabarse datos que no son percibidos tales como cookies, web beacons o similares que informan sobre el tipo de navegador, sistema operativo, páginas visitadas, vínculos o dirección IP, entre otras. Esta información puede ser recabada para saber más sobre las áreas de la página que son de mayor interés para los visitantes, o para saber quién visita la página.
                </p>
                <p className="mb-4">
                  Podemos emplear a terceros para manejar estas medidas de ejecución. Sin embargo, en ningún caso obtenemos información sobre la identidad individual de cualquier visitante. Dichos terceros deberán observar nuestros estándares de privacidad y proporcionarnos únicamente la información en su totalidad, para utilizarla sólo para los propósitos para los que el tercero fue contratado, y después destruir dicha información.
                </p>
                <p>
                  No obstante, si usted así lo desea, las cookies, los web beacons o similares pueden ser deshabilitados o borrados, para lo cual se recomienda leer el manual o la leyenda de "ayuda" de su navegador.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-xl md:text-2xl font-medium text-black mb-4">
                  Medios para limitar el uso y divulgación de los datos personales
                </h2>
                <p className="mb-4">
                  En cualquier momento y a solicitud expresa de usted, eliminaremos o modificaremos la información personal que previamente nos haya proporcionado. Si usted desea revisar, actualizar o eliminar sus datos personales, favor de ingresar a la página para efectos de realizar los cambios deseados.
                </p>
                <p className="mb-4">
                  Utilizaremos su información personal únicamente para los efectos que le sean indicados al proporcionarla. No podremos divulgar, vender, rentar o intercambiar dicha información con ninguna otra organización o entidad, salvo que usted sea previamente notificado y lo autorice expresamente.
                </p>
                <p>
                  Para cualquier información adicional, también podrá contactarse a través del correo electrónico indicado. Para la debida atención de cualquier solicitud, se solicita se indiquen los datos de contacto que nos permitan identificarlo (tales como nombre completo, dirección de correo electrónico y domicilio).
                </p>
              </div>

              <div>
                <h2 className="font-heading text-xl md:text-2xl font-medium text-black mb-4">
                  Cambios al aviso de privacidad
                </h2>
                <p>
                  Erre se reserva el derecho de modificar o actualizar el aviso de privacidad, en caso de que ello resulte necesario de conformidad con la normatividad vigente o como consecuencia de una mejora en nuestras políticas. Cualquier modificación o actualización, en su caso, será efectuada y hecha del conocimiento a través de este mismo medio.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-xl md:text-2xl font-medium text-black mb-4">
                  Procedimiento para ejercer sus derechos de acceso, modificación, cancelación u oposición
                </h2>
                <p className="mb-4">
                  En caso de que requiera ejercer sus derechos de acceso, modificación, cancelación u oposición respecto de los datos proporcionados o recabados, Erre pone a disposición la siguiente cuenta de correo electrónico: <a href="mailto:reusoconerre@gmail.com" className="text-black underline hover:text-muted transition-colors duration-300">reusoconerre@gmail.com</a> en donde será atendido y recibirá la respuesta por parte del encargado del tratamiento y protección de los datos personales. También podrá en cualquier momento revocar su consentimiento de manera gratuita.
                </p>
                <p className="mb-4">
                  Para ejercer sus derechos, será necesario que envíe su solicitud al correo electrónico indicado, proporcionando los datos de contacto que nos permitan identificarlo (tales como nombre completo, teléfono, dirección de correo electrónico y domicilio) debiendo indicar la forma en que prefiere sea contactado, es decir, por medio de correo ordinario o mediante correo electrónico.
                </p>
                <p>
                  De estimarse procedente su petición, Erre tiene el firme compromiso de hacer efectiva la misma dentro de los 30 días hábiles siguientes a la fecha en que reciba la respuesta a su solicitud.
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="border-t border-border mt-16 pt-10 text-center">
              <p className="font-heading text-lg md:text-xl font-medium text-black mb-2">
                erre
              </p>
              <p className="text-muted text-sm italic">
                de mano en mano.
              </p>
              <a
                href="https://holaerre.com"
                className="inline-block mt-4 text-muted text-xs tracking-widest hover:text-black transition-colors duration-300 no-underline"
              >
                holaerre.com
              </a>
            </div>
          </FadeIn>
        </div>
      </main>
    </div>
  )
}
