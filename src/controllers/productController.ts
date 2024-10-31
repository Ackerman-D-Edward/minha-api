import { AuthRequest } from '../middlewares/authMiddleware';
import { NextFunction, Request, Response } from 'express';
import Product from '../models/productModel';
 
// Criar um novo produto
export const createProduct = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  const { name, price } = req.body;
  try {
    const product = new Product({
      name,
      price,
      owner: req.user!.id  // Adiciona "!" para garantir que o req.user existe após o middleware
    });
    await product.save();
    res.status(201).json(product);  // Não retorna explicitamente o "res", apenas responde.
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar produto' });
  }
};

// Obter todos os produtos do usuário autenticado
export const getProducts = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const products = await Product.find({ owner: req.user!.id });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter produtos' });
  }
};

// Obter um produto específico pelo ID
export const getProductById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product || product.owner.toString() !== req.user!.id) {
      res.status(404).json({ message: 'Produto não encontrado' });
      return;
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter o produto' });
  }
};

// Atualizar um produto
export const updateProduct = async (req: AuthRequest, res: Response): Promise<void> => {
  const { name, price } = req.body;
  try {
    const product = await Product.findById(req.params.id);
    if (!product || product.owner.toString() !== req.user!.id) {
      res.status(404).json({ message: 'Produto não encontrado' });
      return;
    }
    product.name = name || product.name;
    product.price = price || product.price;
    await product.save();
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar o produto' });
  }
};

// Deletar um produto
export const deleteProduct = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product || product.owner.toString() !== req.user?.id) {
      res.status(404).json({ message: 'Produto não encontrado' });
      return;
    }

    // Usando deleteOne() para remover o produto
    await Product.deleteOne({ _id: req.params.id });

    res.status(200).json({ message: 'Produto removido com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover o produto' });
  }
};
