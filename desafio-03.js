const fs = require('fs');
const filename = './products.json';

class ProductManager{
    constructor(path){
        this.path = path;
        this.products = [];
    }

    createId = () => {
        const countProducts = this.products.length;
        if (countProducts === 0){
            return 1;
        }else{
            return (this.products[countProducts - 1].id) + 1;
        }
    }

    getProducts = () => {
        let products = [];
        (fs.existsSync(this.path)) ? products = fs.readFileSync(this.path, 'utf-8') : console.log('Error al leer el archivo');
        this.products = JSON.parse(products);
        return this.products;
    }

    getProductById = (id) => {
        const products = this.getProducts();
        return (products.find(product => product.id === id) || 'Not found');
    }

    addProducts = (title, description, price, thumbnail, code, stock) => {
        this.getProducts();
        if (!title || !description || !price || !thumbnail || !code || !stock){
            console.error(`No se puede agregar el producto ${title}. Faltan datos.`);
            return
        }else{
            if (this.products.find(product => product.code === code)){
                console.error(`No se puede agregar el producto ${title}. El código ya existe.`)
                return
            }else{
                const id = this.createId();
                this.products.push({
                    id,
                    title,
                    description,
                    price,
                    thumbnail,
                    code,
                    stock
                })
                fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
                console.log('¡Producto agregado!');
            }
        }
    }

    updateProduct = (updateProduct) => {
        this.products = this.getProducts();
        let index = this.products.indexOf(this.products.find((product)=>product.id == updateProduct.id));
        if (index == -1) {
            console.log('No se pudo actualizar el producto');
        }else{
            this.products[index] = updateProduct;
            fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
            console.log('Producto actualizado existosamente.');
        }
    }

    deleteProduct = (id) => {
        this.products = this.getProducts();
        let index = this.products.indexOf(this.products.find((product)=>product.id == id));
        if (index == -1){
            console.log('No se pudo eliminar el producto');
        }else{
            this.products.splice(index, 1);
            fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
            console.log('Producto eliminado existosamente');
        }
    }
}

//----Testing-----
//const productManager = new ProductManager(filename);
// console.log(productManager.getProducts());
// productManager.addProducts('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25);
// console.log(productManager.getProducts());
// console.log(productManager.getProductById(1));
// console.log(productManager.getProductById(80));