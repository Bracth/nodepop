paso 1: npm install para instalar dependencias necesarias.

paso 2: npm run initdb para inicializar base de datos.

paso 3: npm run dev para iniciar en modo desarrollador.

paso 4: ejecutar en otra terminal npm run microservice para inciar el microservicio de thumbnail (sin este no se podrian crear nuevos anuncios)

ir a http://localhost:3000/ para ver la pagina principal del sitio donde se encuentra toda la lista de anuncios.

si se desea utilizar el api ir a esta direccion http://localhost:3000/api/anuncios para poder pedir los anuncios del api o crear anuncios nuevos se debe estar logeado antes, ir a la direccion http://localhost:3000/api/login y enviar una peticion tipo post con {email: user@example.com, password: 1234} este usuario fue creado al iniciar la base de datos en el paso 2. Al logarse te devolvera un token JWT que deberas colocar en la cabezera de las peteciones en la API tal que asi {Authorization : TokenJWT} Tambien es posible pasar el token por query param http://localhost:3000/api/anuncios?token=TokenJWT o en el body del request bajo la key de token (token: TokenJWT) formato form-unlencoded

para ver toda la documentacion especifica del api visitar http://localhost:3000/api-docs alli podras revisar todos los metodos disponibles (tambien puedes usarlos en la pagina principal para filtrar en la lista de anuncios)

Bonus: ir a https://www.npmjs.com/package/npm-cuenta-caracteres en donde subi un modulo en NPM

URL practica de node.js http://ec2-3-232-155-214.compute-1.amazonaws.com/

URL practica react http://3.232.155.214/