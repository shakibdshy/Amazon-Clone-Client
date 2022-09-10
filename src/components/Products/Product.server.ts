import axios from "axios"
import { ProductDocument } from "./Product.model"


const getProducts = async () => {
    const response = await axios.get<ProductDocument[]>(
        `${process.env.NEXT_PUBLIC_BASE_API}/products`
    )

    return response
};

const productService = { getProducts }

export default productService