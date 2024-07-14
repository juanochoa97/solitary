// script.js

// Configuración de la conexión a MySQL
const config = {
    host: 'root@127.0.0.1:3306',
    user: 'root',
    password: 'root',
    database: 'tienda'
};

// Función para realizar una consulta SQL genérica
async function queryDatabase(query) {
    try {
        const response = await fetch('http://localhost:3000/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query })
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al ejecutar la consulta:', error);
        return { error: error.message };
    }
}

// Función para obtener todos los productos
async function getProducts() {
    const query = 'SELECT * FROM productos';
    return await queryDatabase(query);
}

// Función para agregar un nuevo producto
async function addProduct(nombre, precio, descripcion, stock) {
    const query = `INSERT INTO productos (nombre, precio, descripcion, stock) VALUES ('${nombre}', ${precio}, '${descripcion}', ${stock})`;
    return await queryDatabase(query);
}

// Función para actualizar un producto existente
async function updateProduct(id, nombre, precio, descripcion, stock) {
    const query = `UPDATE productos SET nombre='${nombre}', precio=${precio}, descripcion='${descripcion}', stock=${stock} WHERE id=${id}`;
    return await queryDatabase(query);
}

// Función para eliminar un producto
async function deleteProduct(id) {
    const query = `DELETE FROM productos WHERE id=${id}`;
    return await queryDatabase(query);
}

// Ejemplo de uso:
async function main() {
    // Obtener todos los productos
    const productos = await getProducts();
    console.log('Productos:', productos);

    // Agregar un nuevo producto
    const nuevoProducto = await addProduct('Nuevo Producto', 19.99, 'Descripción del nuevo producto', 10);
    console.log('Producto añadido:', nuevoProducto);

    // Actualizar un producto existente
    const productoActualizado = await updateProduct(1, 'Producto Actualizado', 29.99, 'Descripción actualizada del producto', 5);
    console.log('Producto actualizado:', productoActualizado);

    // Eliminar un producto
    const productoEliminado = await deleteProduct(2);
    console.log('Producto eliminado:', productoEliminado);
}

// Ejecutar la función principal
main();
