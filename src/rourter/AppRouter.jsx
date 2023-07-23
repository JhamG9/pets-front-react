import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ProductsPage } from '../client/product/pages/ProductsPage';
import { NavBarComponent } from '../components/NavBarComponent';
import { ProductDetails } from '../client/product/pages/ProductDetailPage';
import { CartPage } from '../client/cart/pages/CartPage';

const router = createBrowserRouter([
    {
        path: "/products",
        element: <ProductsPage />
    },
    {
        path: "/products/:id",
        element: <ProductDetails />
    },
    {
        path: '/cart',
        element: <CartPage />
    },
    {
        path: "/",
        element: <Navigate to={'products'} />
    },
]);

export const AppRouter = () => {



    return (
        <>
            <NavBarComponent />
            <div className='container pt-2'>
                <RouterProvider router={router} />
            </div>
        </>

    )
}
