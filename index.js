const { Pool } = require('pg')

const config = {
    database: process.env.DATABASE,
    host: process.env.HOST,
    user: process.env.USERDB,
    password: process.env.PASSWORD,
    port: process.env.PORT
}

const pool = new Pool(config)

const nuevo = async () => {

    const text = 'INSERT INTO users (nombre, rut, curso, nivel) VALUES ($1, $2, $3, $4) RETURNING *'
    const values = [process.argv[3], process.argv[4], process.argv[5], Number(process.argv[6])]

    const result = await pool.query(text, values)
    console.log(`Estudiante ${process.argv[3]} agregado con éxito`)
}

const editar = async () => {

    const text = 'UPDATE users SET nombre = $2 , curso = $3 , nivel = $4 WHERE rut = $1'
    const values = [process.argv[4], process.argv[3], process.argv[5], process.argv[6]]

    const result = await pool.query(text, values)
    console.log(`Estudiante ${values[1]} editado con éxito`)

}

const rut = async () => {

    const text = 'SELECT * FROM users WHERE rut = $1'
    const values = [process.argv[4]]

    const result = await pool.query(text, values)
    console.log(result.rows)
}


const eliminar = async () => {

    const text = 'DELETE FROM users WHERE rut = $1'
    const values = [process.argv[4]]

    const result = await pool.query(text, values)
    console.log(`Registro de estudiante con rut ${process.argv[4]} eliminado con éxito`)
}

const consulta = async () => {

    const text = 'SELECT * FROM users'

    const result = await pool.query(text)
    console.log(result.rows)
}


const inpt = process.argv[2];

switch (inpt) {
    case 'nuevo':
        nuevo()
        break;
    case 'rut':
        rut()
        break;
    case 'consulta':
        consulta()
        break;
    case 'editar':
        editar();
        break;
    case 'eliminar':
        eliminar();
        break;

    default:
        break;
}

// node --env-file=.env index.js nuevo 'Juan Sku' '12.123.321-3' canto 9