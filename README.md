# apigqlcommerce v.1

### Una API bajo graphql, la cual se conecta a una base de datos de mongodb.

### Ejecucion en docker. especificamente con docker-compose, planificado en modo desarrollo.

```bash
sudo docker-compose up -d
```

#### Ejecucion en modo produccion, debe modificar el archivo Dockerfile

```bash
nano Dockerfile
```

#### luego ubicar y remplazar.

```bash
- old
  CMD ["yarn", "dev"]

- new
  CMD ["yarn", "start"]
```

#### Fechas

```bash
Inicio : 21-Feb-2022
Culminacion Aprox: 05-Marz-2022
```

#### Primero, querrá saber qué proceso está utilizando el puerto 3000

```bash
$ sudo lsof -i :5410
```

#### Esto enumerará todos los PID que escuchan en este puerto, una vez que tenga el PID puede terminarlo:

```bash
$ kill -9 {PID}
```
