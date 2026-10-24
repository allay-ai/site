import { Link } from 'react-router-dom'
import {
  byokLimits,
  plans,
  retention,
  soloOnSale,
  soloPlans,
  soloReleaseDays,
} from '../data/plans.ts'
import { links, modsShipped } from '../data/site.ts'
import { count } from './format.ts'
import type { Copy } from './types.ts'

/** The lowest price among some plans, in Stars. */
const cheapest = (list: { stars: number }[]) => Math.min(...list.map((plan) => plan.stars))

export const es: Copy = {
  htmlLang: 'es',
  meta: {
    title: 'Allay: un asistente con IA para tu servidor de Minecraft',
    description: modsShipped
      ? 'Un jugador escribe /ask y Allay responde según su partida real: inventario, cofres, recetas, los plugins del servidor. Para Spigot, Paper, Fabric y NeoForge, alojado o propio.'
      : 'Un jugador escribe /ask y Allay responde según su partida real: inventario, cofres, recetas, los plugins del servidor. Para Spigot y Paper, alojado o propio.',
  },
  ui: {
    skipToContent: 'Saltar al contenido',
    primaryNav: 'Principal',
    nav: {
      features: 'Funciones',
      pricing: 'Precios',
      install: 'Instalar',
      faq: 'Preguntas',
      wiki: 'Wiki',
    },
    menu: 'Menú',
    closeMenu: 'Cerrar el menú',
    theme: {
      system: 'Tema: el del sistema. Cambiar a claro',
      light: 'Tema: claro. Cambiar a oscuro',
      dark: 'Tema: oscuro. Seguir al sistema',
    },
    language: 'Idioma',
    github: 'Allay en GitHub',
    copy: 'Copiar',
    copied: 'Copiado',
    footer: {
      product: 'Allay',
      docs: 'Documentación',
      code: 'Código fuente',
      legal: 'Legal',
      privacy: 'Política de privacidad (en inglés)',
      terms: 'Condiciones del servicio (en inglés)',
      serverWiki: 'Wiki del servidor (en inglés)',
      pluginWiki: 'Wiki del plugin (en inglés)',
      releases: 'Versiones',
      madeBy: (
        <>
          Hecho por <a href={links.author}>Pavel Erokhin (mairwunnx)</a>. Licencia MIT.
        </>
      ),
      notMojang:
        'No es un producto oficial de Minecraft. No está aprobado por Mojang ni Microsoft ni asociado con ellos.',
    },
  },
  hero: {
    eyebrow: modsShipped
      ? 'Asistente con IA para servidores y mundos de Minecraft'
      : 'Asistente con IA para servidores Spigot y Paper',
    title: (
      <>
        Pregúntale a tu mundo <em>lo que sea</em>
      </>
    ),
    lead: (
      <>
        Allay vive en el chat de tu servidor. Un jugador escribe <code>/ask</code> y Allay mira su
        partida real (el inventario, el bloque al que apunta, los cofres de alrededor, las recetas y
        los plugins de este servidor) antes de responder.
      </>
    ),
    primary: 'Añadir Allay a tu servidor',
    secondary: 'Leer el manual',
    facts: [
      modsShipped ? 'Spigot, Paper, Fabric, NeoForge 26.3' : 'Spigot y Paper 26.3',
      'Gratis con tu propia clave',
      'Respeta las leyes de privacidad de la UE y EE. UU.',
      'Código abierto, MIT',
    ],
  },
  demo: {
    label: 'Un ejemplo de Allay respondiendo en el chat del juego',
    caption: 'Es un ejemplo. Las respuestas reales dependen de la partida del jugador.',
    command: '/ask ¿dónde dejé mi redstone?',
    status: '⠹ Revoloteando sobre los cofres… (3s · ↑ 2184 · ↓ 61 tokens)',
    lines: [
      { kind: 'tool', label: 'Buscando redstone', result: '3 cofres a menos de 32 bloques' },
      { kind: 'tool', label: 'Marcando bloques', result: '3 cofres iluminados 30 segundos' },
      {
        kind: 'answer',
        text: 'Hay 2 stacks en el cofre a la izquierda de tu horno, 6 bloques al norte, y 14 más en el barril bajo la escalera. Te los he iluminado.',
      },
      { kind: 'buttons', labels: ['El camino', 'Receta: repetidor'] },
    ],
  },
  features: {
    kicker: 'Qué reciben los jugadores',
    title: 'Mira antes de responder',
    lead: 'Allay lee el juego con herramientas que ejecuta el plugin, así que sus respuestas encajan con este jugador, este mundo y este servidor.',
    killerTitle: 'Lo más potente',
    killer: [
      {
        icon: 'eye',
        title: 'Respuestas desde la partida real',
        body: 'Allay lee el inventario, el bloque al que apuntas, las estadísticas y los logros, las recetas y reglas de este servidor y los plugins que de verdad tiene instalados, en vez de adivinar.',
        ask: '¿cuál de mis espadas es mejor?',
      },
      {
        icon: 'search',
        title: 'Encuentra tus cosas y las ilumina',
        body: 'Cuenta un objeto en el inventario, el cofre de ender y los cofres a menos de 32 bloques, también dentro de cajas de shulker y bolsas. Los cofres que lo guardan brillan a través de las paredes, con su contenido escrito encima, y solo los ves tú.',
        ask: '¿dónde dejé mi redstone?',
      },
      {
        icon: 'trail',
        title: 'El camino a cualquier sitio',
        body: 'La brújula y un rastro de partículas te llevan al punto donde moriste, a una aldea, a un bosque de cerezos, a un lugar que Allay recuerda o a un amigo de la barra de localización, siguiéndolo mientras corre. Hay una docena de rastros, de llamas a corazones.',
        ask: 'llévame a donde morí',
      },
      {
        icon: 'agent',
        title: 'Agentes que hacen las tareas',
        body: 'Ordenan cofres, guardan tu botín, te traen 64 de hierro de los cofres de alrededor, funden por igual con el combustible justo, preparan pociones por tandas y fabrican en una mesa de verdad, incluida la netherita. Trabajan mientras juegas, pasan pasos a agentes ayudantes y te informan.',
        ask: 'funde todo mi oro en bruto por igual',
      },
      {
        icon: 'redstone',
        title: 'Redstone depurada',
        body: 'Allay lee la máquina que miras: la potencia del polvo, los retrasos de los repetidores, comparadores, pistones y antorchas. Las reglas del juego señalan el fallo, como una antorcha fundida o un pistón atascado, y unas marcas rojas muestran dónde.',
        ask: '¿por qué no se abre mi puerta?',
      },
      {
        icon: 'brain',
        title: 'Te recuerda a ti y tus lugares',
        body: `Hasta ${retention.memoryFacts} recuerdos por jugador: datos, cómo le gustan las respuestas y lugares, guardados por dimensión y encontrados del más cercano al más lejano. La conversación se guarda ${retention.sessionDays} días, así que una pregunta de seguimiento no necesita volver a mirar. Todo cifrado.`,
        ask: 'recuerda que aquí hay un aldeano que vende flechas',
      },
    ],
    otherTitle: 'Y mucho más',
    other: [
      {
        icon: 'grid',
        title: 'Un inventario ordenado',
        body: '«La espada primero, la comida en la última fila». Los stacks se juntan, los huecos fijados reciben el mejor objeto, los cofres entienden las mismas palabras y [Devolver] lo deshace durante 5 minutos.',
      },
      {
        icon: 'window',
        title: 'Botones y ventanas',
        body: 'Recetas, cada paso de una poción, encantamientos y tratos con aldeanos, a un clic bajo la respuesta.',
      },
      {
        icon: 'hammer',
        title: 'El yunque, planificado',
        body: 'El orden más barato para tus libros y objetos, con los niveles por adelantado. Di que sí y un agente lo hace y le pone nombre al objeto.',
      },
      {
        icon: 'bulb',
        title: 'Sin rincones oscuros',
        body: '«¿Dónde pongo antorchas?» coloca antorchas fantasma brillantes en cada sitio donde podrían aparecer monstruos.',
      },
      {
        icon: 'cube',
        title: 'Planos de construcciones',
        body: 'Experimental: una construcción de hasta 20×15×20 en bloques fantasma, capa a capa. Un bloque equivocado se vuelve rojo y dice cuál va ahí.',
      },
      {
        icon: 'sprout',
        title: 'Revisión de granjas',
        body: 'Cultivos por fase, tierra de cultivo, animales y generadores a tu alrededor, de un vistazo.',
      },
      {
        icon: 'flag',
        title: 'Objetivos y recordatorios',
        body: 'Hasta 5 objetivos como barras en lo alto de la pantalla, recordatorios de 1 a 120 minutos y un aviso que todos los de cerca ven y oyen.',
      },
      {
        icon: 'chat',
        title: 'Modo chat y /askall',
        body: 'Habla con Allay sin comandos, o pregunta delante de todos para que tus amigos puedan seguir la conversación.',
      },
      {
        icon: 'terminal',
        title: 'Comandos con palabras',
        body: '/askx convierte una petición en comandos y los ejecuta en tu nombre. Por defecto, solo para operadores, igual que las herramientas que dan objetos o teletransportan.',
      },
      {
        icon: 'calc',
        title: 'Datos frescos, cálculos exactos',
        body: 'Búsqueda en internet cuando una pregunta lo necesita, y cálculos con 64 cifras significativas: stacks, coordenadas del Nether, experiencia.',
      },
      {
        icon: 'chart',
        title: 'Allay Room',
        body: 'Un panel de administración con todos los ajustes, cuentas con roles, preguntas, costes, modelos, herramientas y los jugadores más activos. Nunca lo que alguien preguntó.',
      },
      {
        icon: 'key',
        title: 'Paga como quieras',
        body: 'Tu propia clave, gratis en allay.chat; una suscripción con Telegram Stars; o tu propio backend sin límites.',
      },
    ],
  },
  shots: {
    kicker: 'En el juego',
    title: 'Lo que ven tus jugadores',
    lead: 'Capturas reales de un servidor con Allay: el estado en vivo mientras trabaja, respuestas con botones dentro del texto y las ventanas propias del juego para la memoria y la privacidad.',
    status: {
      label:
        'Allay responde: el estado sobre la barra rápida, las herramientas que usa y la respuesta',
      caption:
        'Mientras Allay trabaja, la línea sobre la barra rápida dice qué hace, y cada herramienta que usa deja una línea en el chat.',
    },
    items: [
      {
        file: 'answer',
        caption:
          'Los botones van dentro de la respuesta: la receta, el camino a la aldea, coordenadas para copiar, una nota, la siguiente pregunta.',
        alt: 'Respuesta de Allay en el chat con los botones Receta, Camino, Copiar, Recordar y Sí en el texto',
      },
      {
        file: 'say',
        caption:
          'Pide a Allay que escriba a los demás por ti. No sale nada hasta que pulsas «Enviar».',
        alt: 'Allay propone un mensaje educado con un botón Enviar, y el mensaje aparece en el chat a nombre del jugador',
      },
      {
        file: 'memory',
        caption:
          'Lo que Allay recuerda, en una ventana: abre un recuerdo para encontrar su lugar u olvidarlo.',
        alt: 'La ventana de memoria con cinco recuerdos y botones para añadir uno u olvidarlos todos',
      },
      {
        file: 'consent',
        caption:
          'Antes de la primera pregunta, cada jugador lee qué envía y guarda Allay, y da su consentimiento.',
        alt: 'La ventana con el aviso de datos de Allay y los botones Acepto, No, gracias y Política de privacidad',
      },
    ],
  },
  ask: {
    kicker: 'Cómo preguntar',
    title: 'Tres comandos y un modo chat',
    lead: (
      <>
        Allay responde en el idioma de la pregunta. Mientras trabaja, la barra de acción muestra qué
        está haciendo, y aparece una línea en el chat por cada herramienta que usa.
      </>
    ),
    commands: [
      {
        command: '/ask <pregunta>',
        what: 'Una pregunta privada: solo tú ves la pregunta y la respuesta.',
      },
      {
        command: '/askall <pregunta>',
        what: 'Todos los conectados ven la pregunta y la respuesta, y tus amigos pueden seguir preguntando.',
      },
      {
        command: '/askx <qué hacer>',
        what: 'Allay convierte una petición en comandos y los ejecuta en tu nombre. Por defecto, solo operadores.',
      },
    ],
    chatTitle: 'Modo chat',
    chatLead: (
      <>
        <code>/allay chat</code> envía a Allay lo que escribes en el chat. El primer carácter decide
        adónde va cada línea:
      </>
    ),
    prefixes: [
      { input: '¿cómo encuentro netherita?', goes: 'A Allay, en privado, como /ask' },
      { input: '! dame un stack de antorchas', goes: 'A Allay como comandos, como /askx' },
      { input: '? ¿dónde está la aldea más cercana?', goes: 'A todos, como /askall' },
      { input: '~ ahora vuelvo', goes: 'Al chat normal' },
    ],
    youWrite: 'Escribes',
    itGoes: 'Va',
  },
  memory: {
    kicker: 'Memoria',
    title: 'Recuerda lo que importa',
    items: [
      {
        title: 'Una conversación con contexto',
        body: `La sesión de cada jugador guarda los intercambios completos, con los resultados de las herramientas, durante ${retention.sessionDays} días tras la última pregunta. «¿Y cuántos había en ese cofre?» no necesita volver a mirar.`,
      },
      {
        title: 'Datos que perduran',
        body: `Hasta ${retention.memoryFacts} datos breves y lugares por jugador: dónde está la base, qué construye, cómo le gustan las respuestas. Allay los guarda solo, lo avisa y los mantiene cifrados.`,
      },
      {
        title: 'Decide el jugador',
        body: (
          <>
            <code>/allay memory</code> muestra los datos, <code>/allay forget</code> los borra y{' '}
            <code>/allay new</code> empieza la conversación de nuevo.
          </>
        ),
      },
    ],
  },
  languages: {
    kicker: 'Idiomas',
    title: 'Cada jugador lee en su idioma',
    lead: (
      <>
        Los textos del plugin vienen en cinco idiomas, elegidos por el país de la IP del jugador y
        luego por el idioma del juego. <code>/allay language</code> elige uno a mano.
      </>
    ),
    names: ['English', 'Русский', 'Español', 'Português', 'Deutsch'],
    note: 'La base de países está en tu servidor: ninguna dirección sale de él para la consulta. Allay responde en el idioma en que se hizo la pregunta.',
  },
  safety: {
    kicker: 'Justo por diseño',
    title: 'Ayuda, nunca trampa',
    lead: 'Allay ve lo que podría ver el jugador que pregunta y no da a los jugadores normales nada que no se hayan ganado.',
    items: [
      {
        title: 'Solo las cosas de quien pregunta',
        body: 'Las herramientas del juego ven al jugador que preguntó y el mundo a su alrededor. Los demás jugadores aparecen solo como los muestra la barra de localización: un nombre, una distancia, una dirección.',
      },
      {
        title: 'Sin objetos para jugadores normales',
        body: 'Las herramientas que dan objetos, teletransportan o cambian el tiempo son solo para operadores, y el plugin lo comprueba tres veces.',
      },
      {
        title: 'Respeta protecciones e invisibilidad',
        body: 'Allay abre solo los contenedores que el jugador podría abrir, respeta las protecciones de GriefPrevention y nunca delata a un jugador oculto con vanish.',
      },
      {
        title: 'Privado por defecto',
        body: 'Lo que dicen los jugadores se guarda cifrado, y el panel de administración muestra números, no conversaciones. Solo un propietario puede abrir una respuesta, con un motivo, y cada vistazo queda registrado. Las claves y las licencias nunca llegan a un registro.',
      },
    ],
  },
  privacy: {
    kicker: 'Privacidad y ley',
    title: 'Respeta las leyes de privacidad de la UE y EE. UU.',
    lead: (
      <>
        allay.chat cumple el RGPD, la LOPDGDD española, la COPPA y la CCPA/CPRA. Esto es lo que hace
        con los datos de los jugadores.
      </>
    ),
    laws: ['RGPD', 'LOPDGDD', 'CCPA/CPRA', 'COPPA'],
    items: [
      {
        title: 'Guardado en la UE',
        body: 'En servidores de Helsinki, Finlandia. Las copias nocturnas, cifradas, se guardan en Cloudflare R2 hasta 12 meses.',
      },
      {
        title: 'Sellado con AES-256-GCM',
        body: 'Las conversaciones, los recuerdos y lugares, las muertes, los ajustes y objetivos y los registros de preguntas se guardan cifrados.',
      },
      {
        title: 'Solo el tiempo necesario',
        body: `Una conversación, ${retention.sessionDays} días; recuerdos, lugares, muertes y ajustes, un año tras la última pregunta del jugador; registros de preguntas, ${retention.traceDays} días; los números y el directorio de jugadores, 2 años.`,
      },
      {
        title: 'Primero la edad y el consentimiento',
        body: 'Antes de la primera pregunta, el jugador dice su edad, que debe llegar a la edad de consentimiento de su país, y acepta un aviso breve. Por debajo de esa edad, Allay no responde nada ni envía nada.',
      },
      {
        title: 'El jugador controla sus datos',
        body: (
          <>
            <code>/allay privacy</code> muestra lo que se guarda, da un enlace de descarga de 24
            horas y lo borra. Retirar el consentimiento borra lo que cubría.
          </>
        ),
      },
      {
        title: 'Sin entrenar con las preguntas',
        body: 'Cada pregunta pasa por OpenRouter, en EE. UU., solo hacia proveedores de IA que no la recogen para entrenar. Un jugador que no aceptó llega a la IA solo como «Jugador 1».',
      },
    ],
    more: (
      <>
        La <Link to="/privacy/">política de privacidad</Link> (en inglés) tiene todos los detalles,
        con <Link to="/privacy/#usa">una sección para residentes en EE. UU.</Link>
      </>
    ),
  },
  install: {
    kicker: 'Instalar',
    title: 'Funcionando en tres pasos',
    lead: (
      <>
        El plugin habla con el backend alojado en <code>allay.chat</code> desde el primer momento.
        También puedes montar el tuyo.
      </>
    ),
    steps: [
      {
        title: 'Copia el jar',
        body: (
          <>
            {modsShipped ? (
              <>
                Pon <code>allay-spigot.jar</code> en <code>plugins/</code> en Spigot o Paper, o el
                jar del mod en <code>mods/</code> en Fabric o NeoForge, y reinicia el servidor.
              </>
            ) : (
              <>
                Pon <code>allay-spigot.jar</code> en <code>plugins/</code> y reinicia el servidor.
              </>
            )}
          </>
        ),
      },
      {
        title: 'Elige quién paga',
        body: (
          <>
            Como operador, o en tu propio mundo, ejecuta <code>/allay link</code> para una
            suscripción, o pon tu propia clave de OpenRouter en <code>provider.byok</code> y ejecuta{' '}
            <code>/allay reload</code>.
          </>
        ),
      },
      {
        title: 'Pregunta',
        body: (
          <>
            Escribe <code>/ask ¿cómo fabrico un faro?</code> Si preguntas «¿qué sabes hacer?», Allay
            te lo explica.
          </>
        ),
      },
    ],
    download: {
      spigot: 'Descargar para Paper y Spigot',
      fabric: 'Descargar para Fabric',
      neoforge: 'Descargar para NeoForge',
    },
    latest: 'Última versión: {version}',
    allReleases: 'Todas las versiones',
    dockerTitle: '¿Usas itzg/minecraft-server?',
    dockerLead: (
      <>
        Pasa a <code>PLUGINS</code>, o a <code>MODS</code> si es un mod, la dirección del jar en
        allay.chat y el contenedor descarga Allay solo.
      </>
    ),
    storesTitle: 'Dónde conseguirlo',
    storesNone: (
      <>
        Por ahora Allay está solo en GitHub. Llegarán páginas en Modrinth y Hangar; hasta entonces,
        descarga el jar de las versiones.
      </>
    ),
    requirementsTitle: 'Necesitas',
    requirements: [
      ...(modsShipped
        ? [
            'Spigot o Paper 26.3, o un fork como Purpur; Fabric 26.3 con Fabric API; o NeoForge 26.3',
            'Java 25',
            'Opcional: GriefPrevention, PlaceholderAPI, Plan; en los mods, Flan, Open Parties and Claims, LuckPerms',
          ]
        : [
            'Spigot o Paper 26.3, o un fork como Purpur',
            'Java 25',
            'Opcional: GriefPrevention, PlaceholderAPI, Plan',
          ]),
    ],
  },
  pricing: {
    kicker: 'Precios',
    title: 'Pagas el modelo y nada más',
    lead: 'Cada respuesta cuesta dinero en el proveedor del modelo. Tu servidor elige quién paga.',
    byok: {
      name: 'Tu propia clave',
      price: 'Gratis',
      tagline: 'En allay.chat, con la factura de tu proveedor.',
      points: [
        'Una clave de OpenRouter o de cualquier API compatible con OpenAI, que pagas directamente al proveedor',
        `Hasta ${byokLimits.perMinute} preguntas por minuto, ${count(byokLimits.perDay, 'es')} al día y ${byokLimits.concurrent} a la vez por servidor`,
        'El modelo debe saber llamar a herramientas',
        'La clave se usa en cada respuesta y nunca se guarda ni se registra',
      ],
    },
    hosted: {
      name: 'Suscripción',
      from: 'desde',
      tagline: 'Nuestra clave y nuestros modelos, pagados con Telegram Stars.',
      plans: { week: 'Semana', month: 'Mes', year: 'Año' },
      period: '{days} días',
      renews: 'se renueva sola',
      budget: '{budget} en costes del modelo',
      budgetMonthly: '{budget} en costes del modelo cada 30 días',
      steps: [
        <>
          Ejecuta <code>/allay link</code> como operador o en tu propio mundo
        </>,
        <>
          Paga en <a href={links.bot}>@AllayChatBot</a> en Telegram
        </>,
        <>
          Mira el plan y su límite en <code>/allay status</code>
        </>,
      ],
      cta: 'Abrir @AllayChatBot',
      more: (
        <>
          ¿Necesitas más? <a href="mailto:personal@mairwunnx.com">Escríbenos</a> para límites más
          altos.
        </>
      ),
    },
    self: {
      name: 'En tu servidor',
      price: 'Gratis',
      tagline: 'Tu backend, tu clave, sin límites.',
      points: [
        'Allay Server con Docker junto a Minecraft',
        'Cada jugador pregunta con tu propia clave',
        'Sin licencia, sin suscripción, sin límites por servidor',
        'Tu propio panel de administración con estadísticas',
      ],
      cta: 'Montarlo tú mismo',
    },
    solo: {
      name: 'Solo',
      from: 'desde',
      tagline: 'Para el mod en tu propio mundo: un jugador, menos límite y menos precio.',
      points: [
        'Un mundo individual, o un mundo LAN que abres tú, con Allay para Fabric o NeoForge',
        <>
          Ejecuta <code>/allay link</code> en tu mundo; no necesitas trucos
        </>,
        `Responde solo a ti. Quien paga puede pasarla a otro jugador en @AllayChatBot una vez cada ${soloReleaseDays} días`,
      ],
      cta: 'Abrir @AllayChatBot',
    },
    howTitle: 'Cómo funciona el límite de la suscripción',
    how: [
      'El límite es dinero, no un número de preguntas: lo que de verdad cuestan las preguntas de tu servidor en el proveedor, contando el modelo, las búsquedas en internet y los resúmenes de las conversaciones largas.',
      'Una pregunta típica con el modelo por defecto cuesta entre 0,001 y 0,003 $, según las búsquedas y la longitud de la conversación. Los agentes dan varios pasos, así que cuestan más.',
      'Los operadores ven el límite en /allay status como un porcentaje y reciben un aviso al pasar del 80 % y del 100 %. Los jugadores solo saben que se ha agotado.',
      'Un pago durante un periodo suma su límite al momento y mueve la fecha de fin. No hay prueba gratuita: un servidor paga antes de su primera pregunta alojada.',
    ],
  },
  selfHost: {
    kicker: 'En tu servidor',
    title: 'Monta tu propio backend',
    lead: (
      <>
        Allay Server es de código abierto y llega como una sola imagen de Docker. Con{' '}
        <code>SELFHOSTED=1</code>, el cobro se apaga y cada pregunta va con tu clave.
      </>
    ),
    steps: [
      <>
        Guarda esto como <code>compose.yaml</code>, da a cada <code>change-me</code> un valor
        aleatorio distinto y ejecuta <code>docker compose up -d</code>.
      </>,
      <>
        Apunta <code>server.url</code> del <code>config.yml</code> de Allay a tu backend, pon en{' '}
        <code>server.token</code> el mismo <code>PLUGIN_TOKEN</code> y ejecuta{' '}
        <code>/allay reload</code>.
      </>,
      <>
        Ejecuta <code>/allay init</code> para obtener un enlace de un solo uso al panel de
        administración y pega allí tu clave de OpenRouter.
      </>,
    ],
    more: 'La guía completa: proxies, contraseñas, actualizaciones (en inglés)',
  },
  faq: {
    kicker: 'Preguntas',
    title: 'Lo que preguntan los dueños de servidores',
    items: [
      {
        question: '¿Dónde funciona Allay?',
        answer: modsShipped
          ? 'Como plugin en Spigot, Paper y sus forks, y como mod en Fabric y NeoForge 26.3, en un servidor dedicado o en tu propio mundo. Quien entra al servidor no necesita instalar nada.'
          : 'Como plugin en Spigot, Paper y sus forks. Quien entra al servidor no necesita instalar nada.',
      },
      {
        question: '¿Cuánto cuesta?',
        answer: (
          <>
            Nada en allay.chat con tu propia clave de IA. La suscripción para un servidor empieza en{' '}
            {cheapest(plans)} ⭐ a la semana
            {soloOnSale && (
              <>, y Solo, para el mod en tu propio mundo, en {cheapest(soloPlans)} ⭐</>
            )}
            . Tu propio backend es gratis. Mira los <Link to="/es/#pricing">precios</Link>.
          </>
        ),
      },
      {
        question: '¿Necesito mi propia clave de IA?',
        answer:
          'No. La suscripción funciona con la clave y el modelo de allay.chat. Con tu propia clave de OpenRouter u otra API compatible con OpenAI, pagas a su proveedor y eliges cualquier modelo que sepa usar herramientas.',
      },
      {
        question: '¿Se puede hacer trampa con él?',
        answer: (
          <>
            No. Las herramientas que dan objetos o cambian el mundo son solo para operadores, y se
            comprueba tres veces. Los agentes solo mueven las cosas del propio jugador y fabrican
            con ingredientes reales. El único regalo es <strong>[Tomar el libro]</strong>: un libro
            escrito con la respuesta larga de Allay, una vez.
          </>
        ),
      },
      {
        question: '¿Puede Allay delatar dónde están otros jugadores?',
        answer:
          'Solo lo que ya muestra la barra de localización de quien pregunta: un nombre, una distancia y una dirección. Quien se esconde de la barra, agachado, con una calabaza o invisible, se esconde también de Allay.',
      },
      {
        question: '¿Qué pasa con los datos de mis jugadores?',
        answer: (
          <>
            En allay.chat, antes de la primera pregunta, Allay muestra a cada jugador qué envía y
            qué guarda, le pregunta la edad y espera un sí. Después guarda la sesión{' '}
            {retention.sessionDays} días y hasta {retention.memoryFacts} datos y lugares, todo
            cifrado, hasta que el jugador lo borre con <code>/allay privacy</code>. La{' '}
            <Link to="/privacy/">política de privacidad</Link> (en inglés) tiene los detalles.
          </>
        ),
      },
      {
        question: '¿Puedo limitar lo que gastan los jugadores?',
        answer: (
          <>
            Sí. Un presupuesto mensual se reparte de forma justa entre los grupos de jugadores que
            das con permisos. Mira{' '}
            <Link to="/wiki/plugin/paying-for-the-model/#limits-per-player">Limits per player</Link>{' '}
            (en inglés).
          </>
        ),
      },
      {
        question: '¿Puedo alojarlo todo yo mismo?',
        answer: (
          <>
            Sí. Allay Server es de código abierto y funciona en Docker junto a Minecraft, sin pagos
            ni límites, y nada pasa por allay.chat. Mira{' '}
            <Link to="/es/#self-hosting">tu propio backend</Link>.
          </>
        ),
      },
      {
        question: '¿Qué idiomas habla?',
        answer:
          'Allay responde en el idioma de la pregunta. Sus botones, ventanas y mensajes vienen en inglés, ruso, español, portugués y alemán, según el país o el idioma del juego del jugador, o con /allay language.',
      },
    ],
  },
  closing: {
    title: 'Míralo en un servidor real',
    body: 'Allay funciona en Moonlands, un servidor de supervivencia difícil entre amigos. Entra y pregúntale algo.',
    cta: 'Visitar Moonlands',
    address: 'minecraft.mairwunnx.com',
  },
}
