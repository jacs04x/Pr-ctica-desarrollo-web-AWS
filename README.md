<img src="http://drive.google.com/uc?export=view&id=1g1pcyHMPRAb13PgysLl5uDvVv2OhYPBG" align="right" />

# Práctica desarrollo web (AWS)

### 1. Back-end

Empezaré desarrollando la parte del back-end usando AWS **(DynamoBD, Lambda y API Gateway)**

Primero hay que crear una cuenta en AWS Usando este 
[link](https://portal.aws.amazon.com/billing/signup?refid=ps_a134p000003yhp0aai&trkcampaign=acq_paid_search_brand&redirect_url=https%3A%2F%2Faws.amazon.com%2Fregistration-confirmation&language=es_es#/start)

```markdown
Una vez creada la cuenta, accedemos a la misma y veremos la siguiente ventana:
```
![](img/1.jpg)

Teclamos DynamoDB y seleccionamos la primer opción.

![](img/2.jpg)

Tendremos la siguiente pestaña:

![](img/3.jpg)

Ahora presionamos el botón de ***crear tabla***. 

Al presionar el botón nos aparecerán los detalles de la tabla.

![](img/4.jpg)

En mi caso yo ingresé los valores de 

```markdown
1. Nombre de la tabla:
    Candidatos
2. Clave de partición: 
    id : número.

Y los datos posteriores los omitimos.
```
Por ultimo, presionamos ***Crear Tabla***

Una vez creada nos aparecerán las tablas dentro de DynamoDB, y podemos observar que nuestra tabla ***Candidatos*** se creo correctamente.

![](img/5.jpg)

Ahora entraremos a ver más detalles de la tabla, presionando la liga con el nombre de la misma.

![](img/6.jpg)

Aquí es donde podremos ver lo siguiente.

```markdown
> Información general
> Índices 
> Monitorear la tabla
> Copias de seguridad 
> Etc.
``` 

![](img/7.jpg)


Ahora ya teniendo la tabla, comenzaremos a crear funciones lambda para hacer modificaciones en la misma.

En buscador teclearemos ***lambda*** y seleccionamos la primer opción. 

![](img/8.jpg)

Ahora nos aparecerán las opciones para funciones **Lambda**, Presionamos el botón ***Crear una función***

![](img/9.jpg)

Ahora nos aparecerán las opciones para crear una nueva función. 

En mi caso solo ingresé el nombre de la función y lo demás lo deje tal cual estaba. 

```markdown
1. Nombre de la funcion: getCandidatos
``` 

![](img/10.jpg)

Presionamos el botón ***Crear una función*** y esperamos.

![](img/11.jpg)

Una vez lista la función, se nos mostrará información de la misma.

![](img/12.jpg)

Dentro de la sección de **Código fuente** es donde podremos hacer algunos procesos para obtener datos de DynamoDB.

Por ejemplo el siguiente código nos regresa todos los datos dentro de la tabla ***Candidatos***

```javascript
'use strict';
//importamos el sdk de aws
const AWS = require('aws-sdk')

//Creamos un cliente para acceder a DynamoDB, le pasamos como parametro la region en la que nos encontramos
const docClient = new AWS.DynamoDB.DocumentClient({region: "us-east-2"})

//Dentro de exports.handler podemos hacer todas las peticiones a la tabla. 
exports.handler= (e, cta, callback)=> {

    //Los parametros contienen datos que necesitan las peticiones.
    var params = {
        TableName : 'Candidatos'
    }
   /*Hacemos "Scan" de la tabla para obtener todos los datos, si tenemos un error lo regresamos, 
   en caso contrario, regresamos los datos obtenidos de la tabla.*/
   docClient.scan(params,  function(err, data) {
   if (err) 
        callback(err, null);
   else 
        callback(null,data);
   });
};
```
Nota: Hacemos click en la opción de region (que en mi caso es **Ohio**) y asi obtenemos el código de region para el cliente.

![](img/ohio.jpg)

Para probar que efectivamente nos regresa todos los valores dentro de la tabla, haremos un test, 
necesitamos guardar los cambios, esto lo hacemos dando click en *deploy* y despues en test.

![](img/13.jpg)

Al pricipio obtendremos un error, ya que el rol (que por defecto se creo cuando definimos la funcion) no tiene acceso a DynamoDB.

Por lo que tenemos que darle permiso a este rol.

![](img/14.jpg)

Nos dirigimos a la sección de Configuración -> Permisos 

![](img/16.jpg)

y damos click en la liga del nombre de rol.

Al hacer esto se nos abrirá una nueva pestaña y en ella veremos el panel del ***Identity and Access Management (IAM)*** y se nos colocará en la sección de roles. 

Por lo que seremos capaces de ver el resumen del rol. en mi caso ***getCandidatos-role-8j6nberw***

![](img/17.jpg)

Dentro de la sección de Resumen presionamos el botón **Asociar Políticas**

![](img/18.jpg)

Después nos aparecerá un buscador, en el cual teclearemos Dynamo y seleccionamos  

```markdown
> AmazonDynamoDBFullAccess
```

Y presionamos el botón ***Asociar Política***

![](img/19.jpg)

Ahora podemos observar que la política se asoció correctamente. 

![](img/20.jpg)

Ahora si regresamos a la sección del código fuente y hacemos un test podremos ver lo que tenemos en la base de datos. 

![](img/21.jpg)

```markdown
En mi caso aún no tengo datos.
``` 

Ahora lo que tenemos es que hacer es consumir los datos desde una API, para eso usaremos el servicio API Gateway. Tecleamos API en el buscador y seleccionamos API Gateway

![](img/22.jpg)

Veremos una pestaña con la siguiente información.

Hacemos scroll hacia abajo y buscamos la opcion **API REST** (no privada)

![](img/23.jpg)

Presionamos ***Crear***

![](img/24.jpg)

Tedremos algunas configuraciones previas a la creación de la API. 

![](img/25.jpg)

```markdown
> Nuestro Portocolo será de tipo:  REST 
> Seleccionamos la opcion: API nueva
``` 
![](img/26.jpg)

Ingresamos el nombre de la API 

![](img/27.jpg)

En mi caso ***candidatos-api***.

Presionamos ***Crear API***.

Por lo que veremos el panel de Métodos y algunas otras configuraciones.

![](img/28.jpg)

Ahora presionamos el botón ***Acciones***

![](img/29.jpg)

Seleccionamos **Crear Recurso**

![](img/30.jpg)

Este recurso tendrá como nombre ***all***.

Presionamos el botón ***Crear Recurso*** y podrémos observar que ahora el recurso all se encuentra en la sección para recursos.

![](img/31.jpg)

Lo seleccionamos y presionamos el botón de acciones.

![](img/32.jpg)

Seleccionamos la opcion de ***Crear método***, y del menú desplegable seleccionamos **GET** y presionamos el icono de check

![](img/33.jpg)

Al presionar el botón de check, veremos la configuración del método.

```markdown

Seleccionamos en Tipo de integración: Función Lambda
```

![](img/34.jpg)

```markdown
En Función Lambda escribimos el nombre de la función que creamos anteriormente 

En este caso:  getCandidatos 
```

![](img/35.jpg)

Presionamos el botón de ***Guardar***

![](img/36.jpg)

Aceptamos conceder permiso a API Gateway para invocar la función Lambda. Y asi tendremos nuestro primer endpoint de la api, y de hecho podremos ver como es que se ejecutará este método.

![](img/37.jpg)

Para hace runa prueba presionamos el botón de ***PRUEBA***

![](img/38.jpg)

Como no tenemos cosas que mandar simplemente presionamos el botón ***Pruebas***

![](img/39.jpg)

Y obtendremos respuesta de la consulta a DynamoDB usando funciones lambda y desde un endpoint.

![](img/40.jpg)

Ahora haremos un deploy de la API. presionamos la raíz de los recursos y presionamos el botón de ***Acciones***

![](img/41.jpg)

Y seleccionamos **Implementar API**

![](img/42.jpg)
```markdown
Ingresamos en etapa de implementación: [nueva etapa]
y en nombre de la fase el nombre cualquier cosa, por ejemplo: UAT
```
![](img/43.jpg)

Y presionamos el botón ***Implementación***

![](img/44.jpg)

Ahora podremos invocar la url para probar el endpoint, agregando el recurso que creamos (***/all***)

 https://9h4uugy0hj.execute-api.us-east-2.amazonaws.com/UAT/all
 
 Si probamos con postman, obtendremos la siguiente información, la cual es correcta, y nos dice que el endpoint funciona! Ahora tendremos que realizar un endpoint para editar las habilidades de un Candidato.
 
 ![](img/45.jpg)
 
 Los pasos son prácticamente los mismos, solo hay que crear nuevas funciones lambda con diferentes acciones.
 
 ### Con el siguiente código podemos actualizar las habilidades de un Candidato
 
 ```javascript
 
var AWS = require("aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient()
exports.handler =  (event, context, callback) => {

    const params = {
        TableName : "Candidatos",
        Key : {
            'id' : event.id
        },
        UpdateExpression: "set java = :j, elastic = :e, microservicios = :m",
        ExpressionAttributeValues:{
            ":j":event.java,
            ":e":event.elastic,
            ":m":event.microservicios
        },
        ReturnValues:"UPDATED_NEW"
    }
    
    docClient.update(params, function(err, data) {
        if (err){
            callback(err,null)
        }else{
            callback(null, data)
        }
    })
};
 ```
 Agregamos un nuevo endpoint a nuestra API, el cual será, de tipo PATCH (ya que estamos modificando parcialmente el índice)
 
 ![](img/46.jpg)
 
 Implementamos este recurso en la API y consultamos mediante el url resultante.
 
 https://9h4uugy0hj.execute-api.us-east-2.amazonaws.com/UAT3/update
 
 ![](img/47.jpg)
 
 En esta petición pasamos dentro del body un json con los datos del Candidato, ya con modificaciones, en este caso yo cambié la las habilidades elastic y microservicios a true y la respuesta fue un json con los atributos que fueron cambiados, es decir que en un principio todos tenían un valor de false. 
 
 Ahora podemos pasar a desarrollar la parte del Front-end.
 
 ### 2. Front-end
 
 Para desarrollar la parte del Front-end usaré el framework Angular.
 
 
 
 
 
 
 
 
 
 
 











