import { Router } from 'express';
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct } from '../controllers/productController';

const router = Router();

// Criar produto
router.post('/createProduct', createProduct);

// Obter todos os produtos
router.get('/getProducts', getProducts);


// Obter um produto específico por ID
router.get('/getProductById/:id', getProductById);

// Atualizar um produto por ID
router.patch('/updateProduct/:id', updateProduct);

// Deletar um produto por ID
router.delete('/deleteProduct/:id', deleteProduct);

export default router;