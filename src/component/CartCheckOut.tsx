import React, { useContext, useState, useEffect } from 'react'
import Footer from './Footer'
import Header from './Header'
import { useNavigate } from 'react-router-dom'
import GsServerAPI from '@/api/GsServerAPI'
import { UsersContext } from './Context/UserDataContext'

type CartItem = {
    productID: string;
    name?: string;
    price: number;
    quantity: number;
    image?: string;
    [key: string]: any;
};

const CartCheckOut = () => {
    const navigate = useNavigate();
    const { accessToken } = useContext(UsersContext);
    
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [updating, setUpdating] = useState<string | null>(null); // track which item is updating

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await GsServerAPI.get('/cartItems', {
                headers: { Authorization: `Bearer ${accessToken}` },
                withCredentials: true
            });

            const data = response.data;
            console.log('Response data:', data);
            console.log('Fetched cart items:', JSON.stringify(data));
            setCartItems(data);
        } catch (err: any) {
            console.error('Fetch cart items failed:', err);
            setError(err?.response?.data?.message || 'Failed to load cart items');
        } finally {
            setLoading(false);
        }
    };

    const updateQuantity = async (itemId: string, newQuantity: number) => {
        if (newQuantity < 1) {
            deleteItem(itemId);
            return;
        }

        setUpdating(itemId);
        try {
            const response = await GsServerAPI.patch(
                `/cartItems/`,
                { productID: itemId, quantity: newQuantity },
                {
                    headers: { Authorization: `Bearer ${accessToken}` },
                    withCredentials: true
                }
            );

            if (response.status === 200) {
                // update local state
                setCartItems(prev =>
                    prev.map(item =>
                        item.productID === itemId ? { ...item, quantity: newQuantity } : item
                    )
                );
            }
        } catch (err: any) {
            console.error('Update quantity failed:', err);
            setError(err?.response?.data?.message || 'Failed to update quantity');
        } finally {
            setUpdating(null);
        }
    };

    const deleteItem = async (itemId: string) => {
        setUpdating(itemId);
        try {
            const response = await GsServerAPI.delete(
                `/cartItems/${itemId}`,
                {
                    headers: { Authorization: `Bearer ${accessToken}` },
                    withCredentials: true
                }
            );

            if (response.status === 200) {
                setCartItems(prev => prev.filter(item => item.productID !== itemId));
            }
        } catch (err: any) {
            console.error('Delete item failed:', err);
            setError(err?.response?.data?.message || 'Failed to delete item');
        } finally {
            setUpdating(null);
        }
    };

    const calculateTotal = () => {
        return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
    };

    const calculateSubtotal = () => {
        return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    };

    const shippingCost = cartItems.length > 0 ? 10 : 0;
    const tax = (calculateSubtotal() * 0.1).toFixed(2); // 10% tax
    const total = (calculateSubtotal() + shippingCost + parseFloat(tax)).toFixed(2);

    if (loading) {
        return (
            <div>
                <Header showNav={false} />
                <div className='min-h-screen flex flex-col justify-center items-center mt-8 mb-8'>
                    <div className='text-lg'>Loading cart...</div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div>
            <Header showNav={false} />
            <div className='min-h-screen flex flex-col mt-8 mb-8 px-4'>
                <div className='max-w-6xl mx-auto w-full'>
                    <h1 className='text-3xl font-bold mb-6'>Shopping Cart</h1>

                    {error && (
                        <div className='mb-4 p-3 bg-red-100 text-red-800 rounded'>{error}</div>
                    )}

                    {cartItems.length === 0 ? (
                        <div className='text-center py-12'>
                            <p className='text-lg text-gray-600 mb-4'>Your cart is empty</p>
                            <button
                                onClick={() => navigate('/store')}
                                className='px-6 py-2 bg-amber-500 text-white rounded hover:opacity-90'
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                            {/* Cart Items List */}
                            <div className='lg:col-span-2'>
                                <div className='bg-white dark:bg-gray-800 rounded-lg shadow'>
                                    {cartItems.map((item) => (
                                        <div key={item.productID} className='p-4 border-b dark:border-gray-700 flex gap-4'>
                                            {/* Product Image */}
                                            <div className='w-24 h-24 flex-shrink-0 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden'>
                                                {item.image ? (
                                                    <img src={item.image} alt={item.name ?? item.title} className='w-full h-full object-cover' />
                                                ) : (
                                                    <div className='w-full h-full flex items-center justify-center text-gray-400'>
                                                        {(item.name ?? item.title ?? 'P').slice(0, 1)}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Product Details */}
                                            <div className='flex-1'>
                                                <h3 className='font-medium text-lg text-gray-900 dark:text-gray-100 mb-1'>
                                                    {item.name ?? item.title}
                                                </h3>
                                                <p className='text-gray-600 dark:text-gray-400 mb-3'>
                                                    ${item.price?.toFixed(2) ?? item.price}
                                                </p>

                                                {/* Quantity Controls */}
                                                <div className='flex items-center gap-2'>
                                                    <button
                                                        onClick={() => updateQuantity(item.productID || '', item.quantity - 1)}
                                                        disabled={updating === item.productID}
                                                        className='px-2 py-1 border rounded bg-white dark:bg-gray-700 disabled:opacity-50'
                                                    >
                                                        −
                                                    </button>
                                                    <input
                                                        type='number'
                                                        value={item.quantity}
                                                        onChange={(e) => updateQuantity(item.productID || '', parseInt(e.target.value) || 1)}
                                                        className='w-12 text-center border rounded bg-white dark:bg-gray-700 px-2 py-1'
                                                    />
                                                    <button
                                                        onClick={() => updateQuantity(item.productID || '', item.quantity + 1)}
                                                        disabled={updating === item.productID}
                                                        className='px-2 py-1 border rounded bg-white dark:bg-gray-700 disabled:opacity-50'
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Item Total & Delete */}
                                            <div className='flex flex-col items-end gap-3'>
                                                <div className='text-lg font-semibold text-amber-600'>
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </div>
                                                <button
                                                    onClick={() => deleteItem(item.productID || '')}
                                                    disabled={updating === item.productID}
                                                    className='text-red-500 hover:text-red-700 disabled:opacity-50 text-sm'
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className='lg:col-span-1'>
                                <div className='bg-white dark:bg-gray-800 rounded-lg shadow p-6 sticky top-4'>
                                    <h2 className='text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100'>Order Summary</h2>

                                    <div className='space-y-3 mb-4 text-gray-600 dark:text-gray-300'>
                                        <div className='flex justify-between'>
                                            <span>Subtotal:</span>
                                            <span>${calculateSubtotal().toFixed(2)}</span>
                                        </div>
                                        <div className='flex justify-between'>
                                            <span>Shipping:</span>
                                            <span>${shippingCost.toFixed(2)}</span>
                                        </div>
                                        <div className='flex justify-between'>
                                            <span>Tax (10%):</span>
                                            <span>${tax}</span>
                                        </div>
                                    </div>

                                    <div className='border-t dark:border-gray-700 pt-3 mb-6'>
                                        <div className='flex justify-between text-lg font-semibold text-gray-900 dark:text-gray-100'>
                                            <span>Total:</span>
                                            <span>${total}</span>
                                        </div>
                                    </div>

                                    <button className='w-full px-4 py-2 bg-amber-500 text-white rounded hover:opacity-90 font-medium mb-2'>
                                        Proceed to Checkout
                                    </button>
                                    <button
                                        onClick={() => navigate('/store')}
                                        className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100'
                                    >
                                        Continue Shopping
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default CartCheckOut
