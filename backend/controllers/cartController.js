import Cart from "../models/cartModel";
import Product from "../models/productModel";


function calculateTotal(items) {
  return items.reduce((sum, item) => {
    return sum + (item.priceAtThatTime * item.quantity);
  }, 0);
}

export const addToCart = async(req,res)=>{
try {
    const userId = req.user._id;
    const { productId, quantity = 1 } = req.body;

    if (quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ 
        message: `Only ${product.stock} items available in stock` 
      });
    }

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [], totalPrice: 0 });
    }


    const itemIndex = cart.items.findIndex(item => 
      item.product.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;

      
      if (cart.items[itemIndex].quantity > product.stock) {
        return res.status(400).json({ 
          message: `Cannot add more — stock limit reached (${product.stock})` 
        });
      }
    } else {
      cart.items.push({
        product: productId,
        quantity,
        priceAtThatTime: product.price
      });
    }


    cart.totalPrice = calculateTotal(cart.items);

    await cart.save();

    await cart.populate('items.product', 'name price image stock');

    res.status(200).json({
      message: "Item added to cart",
      cart
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getCart = async (req, res) => {
  try {
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId })
      .populate('items.product', 'name price image stock slug');

    if (!cart) {
      return res.status(200).json({ items: [], totalPrice: 0 });
    }

    res.status(200).json(cart);

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const removeItem = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const initialLength = cart.items.length;

    cart.items = cart.items.filter(item => 
      item.product.toString() !== productId
    );

    if (cart.items.length === initialLength) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    cart.totalPrice = calculateTotal(cart.items);

    await cart.save();

    await cart.populate('items.product', 'name price image');

    res.status(200).json({
      message: "Item removed",
      cart
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};