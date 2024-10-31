import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    price: number;
    owner: mongoose.Schema.Types.ObjectId;
};

const productSchema = new Schema<IProduct>({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

const Product = mongoose.model<IProduct>('Product', productSchema);

export default Product;