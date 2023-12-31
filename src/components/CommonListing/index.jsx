'use client'

import { useRouter } from "next/navigation"
// import ProductButtons from "./ProductButtons"
// import ProductTile from "./ProductTile"
import { useEffect } from "react"
import Notification from "../Notification"
import dynamic from "next/dynamic"

const ProductTile = dynamic(() => import("@/components/CommonListing/ProductTile"), {ssr: false})
const ProductButtons = dynamic(() => import("@/components/CommonListing/ProductButtons"), {ssr: false})

export default function CommonListing({ data }) {
    const router = useRouter()

    useEffect(() => {
        router.refresh()
    }, [])

    return (
        <section className="bg-white rounded-lg mt-20 mb-10 ml-8 mr-8 sm:py-16 border border-gray-300">
            <div className="mx-8 my-24 px-4 sm:px-6">
                <div className="grid gap-6 sm:grid-cols-4 sm:gap-4">
                    {
                        data && data.length ?
                        data.map((item, i) => (
                            <>
                                <article 
                                    key={i}
                                    className="relative flex flex-col overflow-hidden border cursor-pointer rounded-lg"
                                >
                                    <ProductTile 
                                        item={item}
                                    />
                                    <ProductButtons item={item} />
                                </article> 
                            </>
                        )) : (
                            <h1 className="flex text-xl font-bold">No Data Found</h1>
                        )
                    }
                </div>
            </div>
            <Notification />
        </section>
    )
}