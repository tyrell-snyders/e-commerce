'use client'

import { GlobalContext } from "@/context"
import { adminNavOptions, navOptions } from "@/utils"
import { Fragment, useContext, useEffect } from "react"
import CommonModal from "../CommonModal"
import Cookies from "js-cookie"
import { useRouter, usePathname } from "next/navigation"
import CartModal from "../CartModal"
import Link from "next/link"

const styles = {
    button: 'mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white rounded-3xl',
}

function NavItems({ isModalView = false, isAdminView, router }) {
    return (
        <div className={`items-center justify-between w-full md:flex md:w-auto ${isModalView ? "" : 'hidden'}`} id='nav-items'>
            <ul className={`flex flex-col p-4 md:p-0 mt-4 font-medium rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-white ${
                isModalView ? "border-none": 'border border-gray-100'
                }`}
            >
                {
                    isAdminView ? adminNavOptions.map(item => (
                        <li 
                            className='cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0' 
                            key={item.id}
                            onClick={() => router.push(item.path)}
                        >
                            {item.label}
                        </li>
                    )) : navOptions.map(item => (
                        <li 
                            className='cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0' 
                            key={item.id}
                            onClick={() => router.push(item.path)}
                        >
                            {item.label}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default function Navbar() {
    const {showNavModal, setShowNavModal} = useContext(GlobalContext)
    const {
        user, isAuth, 
        setIsAuth, setUser,
        currentUProduct, setCurrentUProduct,
        showCartModel, setShowCartModel
    }  = useContext(GlobalContext)

    const pathName = usePathname()
    const router = useRouter()

    useEffect(() => {
        if (pathName !== '/admin-view/add-product' && currentUProduct !== null) {
            setCurrentUProduct(null)
        }
    }, [pathName])

    const handleLogout = () => {
        setIsAuth(false)
        setUser(null)
        Cookies.remove('token')
        localStorage.clear()
        router.push('/')
    }

    const isAdminView = pathName.includes('/admin-view')

    return (
        <>
            <nav className='bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200'>
                <div className=" flex flex-wrap items-center justify-between p-2 lg:p-6 w-full">
                    <div
                        onClick={() => router.push('/')} 
                        className="flex items-center cursor-pointer"
                    >
                        <span className="slef-center text-xl lg:text-2xl font-semibold whitespace-nowrap">
                            OompieStore
                        </span>
                    </div>
                    <div className="flex md:order-2 gap-4">
                        {
                            !isAdminView && isAuth ? (
                                <Fragment>
                                    <Link href="/account">Account</Link>
                                    <Link href="#" onClick={() => setShowCartModel(true)}>Cart</Link>
                                </Fragment>
                            ) : null
                        }

                        {
                            user?.role == 'admin' ? (
                                isAdminView ? (
                                    <button 
                                        className={styles.button}
                                        onClick={() => router.push('/')}
                                    >
                                        Client View
                                    </button>
                                ) : (
                                    <button 
                                        onClick={() => router.push('/admin-view')}
                                        className={styles.button}
                                    >
                                        Admin View
                                    </button>
                                )
                            )  : null
                        }

                        {
                            isAuth ? (
                                <Link href="#" onClick={handleLogout}>
                                    LogOut
                                </Link>
                            
                            ) : (
                                <Link href="/login">
                                    LogIn
                                </Link>
                            )
                        }
                    </div>
                    <button data-collapse-toggle='navbar-sticky' type="button"
                            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100
                            focus:outline-none focus:cursor-pointer"
                            aria-controls="navbar-sticky"
                            aria-expanded='false'
                            onClick={() => setShowNavModal(prv => !prv)}
                    >
                        <span className="sr-only">Open Main Menu</span>
                        <svg 
                            className="w-6 h-6"
                            aria-hidden='true'
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path 
                                fillRule='evenodd'
                                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </button>
                    <NavItems isAdminView={isAdminView} router={router} />
                </div>
            </nav>
            <CommonModal 
                showModalTitle={false}
                mainContent={<NavItems isModalView={true} router={router} isAdminView={isAdminView} />}
                show={showNavModal} setShow={setShowNavModal} 
            />
            {
                showCartModel &&
                <CartModal />
            }
        </>
    )
}