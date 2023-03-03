import { categoryStyles, orderStyles, tagStyles, vendorlistStyles } from "@src/styles"
import * as React from "react"

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Image from "next/image";

interface LayoutProps {
    children?: React.ReactNode;
}

interface SliderProps {
    children?:React.ReactNode;
}


const VendorList = ({children}:LayoutProps) => {        
    return (
        <div className={vendorlistStyles.grid}>
            {children}
        </div>
    )
}
const OrderList = ({children}:LayoutProps) => {        

    return (
        <div className={orderStyles.grid}>
            {children}
        </div>
    )
}
const CategoryList = ({children}:LayoutProps) => {
    return (
        <div className={categoryStyles.container}>
            {children}
        </div>
    )
}
const Tags = ({children}:LayoutProps) => {
    return (
        <div className={tagStyles.container}>
            {children}
        </div>
    )
}

const BestSelling = ({ children }: LayoutProps) => {
    return (
        <div className={vendorlistStyles.grid}>
            {children}
        </div>
    )
}

const FeaturedRestaurant = ({ children }: LayoutProps) => {
    return (
        <div className={vendorlistStyles.grid}>
            {children}
        </div>
    )
}

const VendorSlider = ({ children }: LayoutProps) => {
    return (
        <div className={vendorlistStyles.sliderDiv}>
            {children}
        </div>
    )
}

export { VendorList, OrderList, CategoryList, Tags, BestSelling, FeaturedRestaurant, VendorSlider }