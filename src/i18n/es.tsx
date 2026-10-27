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
    title: 'Pregúntale a tu mundo lo que sea',
    lead: (
      <>
        Escribe <code>/ask</code> y Allay mira tu partida real antes de responder.
      </>
    ),
    platforms: 'Allay {version} para Minecraft 26.3, en un servidor o en tu propio mundo.',
    manual: 'Leer el manual',
  },
  video: {
    label:
      'Allay responde: el estado sobre la barra rápida, las herramientas que usa y la respuesta',
    caption:
      'Mientras Allay trabaja, la línea sobre la barra rápida dice qué hace, y cada herramienta que usa deja una línea en el chat.',
    pause: 'Pausa',
    play: 'Reproducir',
  },
  features: {
    title: 'Mira antes de responder',
    lead: 'Allay lee el juego con herramientas que ejecuta el plugin, así que sus respuestas encajan con este jugador, este mundo y este servidor.',
    moments: [
      {
        ask: '¿cuál de mis espadas es mejor?',
        title: 'Respuestas desde la partida real',
        body: 'Allay lee el inventario, el bloque al que apuntas, las estadísticas y los logros en vez de adivinar.',
      },
      {
        ask: '¿cómo pongo una casa aquí?',
        title: 'Conoce este servidor',
        body: 'Los objetos de los mods, las recetas de los data packs, los plugins que de verdad tiene y los comandos que puedes usar aquí.',
      },
      {
        ask: '¿dónde dejé mi redstone?',
        title: 'Encuentra tus cosas y las ilumina',
        body: 'Cuenta un objeto en los cofres a menos de 32 bloques, y los cofres que lo guardan brillan solo para ti.',
      },
      {
        ask: 'llévame a donde morí',
        title: 'El camino a cualquier sitio',
        body: 'La brújula y un rastro de partículas te llevan al punto donde moriste, a una aldea o a un amigo de la barra de localización.',
      },
      {
        ask: 'funde todo mi oro en bruto por igual',
        title: 'Agentes que hacen las tareas',
        body: 'Ordenan cofres, funden, preparan pociones por tandas y fabrican en una mesa de verdad mientras juegas.',
      },
      {
        ask: '¿por qué no se abre mi puerta?',
        title: 'Redstone depurada',
        body: 'Allay lee la máquina que miras, y unas marcas rojas muestran dónde está el fallo.',
      },
      {
        ask: 'recuerda que aquí hay un aldeano que vende flechas',
        title: 'Te recuerda a ti y tus lugares',
        body: `Hasta ${retention.memoryFacts} recuerdos por jugador, lugares guardados por dimensión, todo cifrado. /allay memory los muestra.`,
      },
    ],
    more: (
      <>
        Y hay más: un inventario ordenado, botones y ventanas, el yunque planificado, antorchas
        fantasma para los rincones oscuros, planos de construcciones, revisión de granjas, objetivos
        y recordatorios, búsqueda en internet y cálculos exactos, cinco idiomas y Allay Room, el
        panel de administración.{' '}
        <Link to="/wiki/plugin/what-allay-can-do/">Todo lo que sabe hacer Allay (en inglés)</Link>
      </>
    ),
  },
  shots: {
    title: 'Lo que ven tus jugadores',
    lead: 'Capturas reales de un servidor con Allay.',
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
    title: 'Tres comandos y un modo chat',
    lead: 'Allay responde en el idioma de la pregunta.',
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
  privacy: {
    title: 'Ayuda, nunca trampa',
    lead: (
      <>
        Allay ve lo que podría ver el jugador que pregunta. allay.chat cumple el RGPD, la LOPDGDD
        española, la COPPA y la CCPA/CPRA.
      </>
    ),
    items: [
      {
        title: 'Solo las cosas de quien pregunta',
        body: 'Los demás jugadores aparecen solo como los muestra la barra de localización: un nombre, una distancia, una dirección.',
      },
      {
        title: 'Sin objetos para jugadores normales',
        body: 'Las herramientas que dan objetos o teletransportan son solo para operadores, y el plugin lo comprueba tres veces.',
      },
      {
        title: 'Respeta protecciones e invisibilidad',
        body: 'Allay abre solo los contenedores que el jugador podría abrir y nunca delata a un jugador oculto con vanish.',
      },
      {
        title: 'Primero la edad y el consentimiento',
        body: 'Por debajo de la edad de consentimiento de su país, Allay no responde nada ni envía nada.',
      },
      {
        title: 'Guardado en la UE, sellado',
        body: 'En servidores de Helsinki, Finlandia. Las conversaciones y los recuerdos van sellados con AES-256-GCM.',
      },
      {
        title: 'El jugador controla sus datos',
        body: (
          <>
            <code>/allay privacy</code> muestra lo que se guarda, da un enlace de descarga de 24
            horas y lo borra.
          </>
        ),
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
    title: 'Tres pasos hasta la primera respuesta',
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
    title: 'Pagas el modelo y nada más',
    lead: 'Cada respuesta cuesta dinero en el proveedor del modelo. Tu servidor elige quién paga.',
    routes: {
      byok: {
        name: 'Tu propia clave',
        price: 'Gratis',
        line: (
          <>
            En allay.chat, con una clave de <a href={links.openRouter}>OpenRouter</a> o de cualquier
            API compatible con OpenAI: hasta {byokLimits.perMinute} preguntas por minuto,{' '}
            {count(byokLimits.perDay, 'es')} al día y {byokLimits.concurrent} a la vez.
          </>
        ),
      },
      hosted: {
        name: 'Suscripción',
        line: 'Nuestra clave y nuestros modelos, pagados con Telegram Stars.',
      },
      solo: {
        name: 'Solo',
        line: 'Para el mod en tu propio mundo: un jugador, menos límite y menos precio.',
      },
      self: {
        name: 'En tu servidor',
        price: 'Gratis',
        line: 'Allay Server con Docker junto a Minecraft: tu clave, sin licencia, sin límites.',
        cta: 'Montarlo tú mismo',
      },
    },
    from: 'desde',
    serverTitle: 'Para un servidor',
    soloTitle: 'Solo, para tu propio mundo',
    plans: { week: 'Semana', month: 'Mes', year: 'Año' },
    period: '{days} días',
    renews: 'se renueva sola',
    budget: '{budget} en costes del modelo',
    budgetMonthly: '{budget} en costes del modelo cada 30 días',
    soloNote: `Un mundo individual o LAN con el mod para Fabric o NeoForge, sin trucos. Responde solo a ti; quien paga puede pasarla a otro jugador una vez cada ${soloReleaseDays} días.`,
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
    how: [
      'El límite es dinero, no un número de preguntas: lo que de verdad cuestan las preguntas de tu servidor en el proveedor.',
      'Una pregunta típica con el modelo por defecto cuesta entre 0,001 y 0,003 $. No hay prueba gratuita.',
    ],
  },
  faq: {
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
