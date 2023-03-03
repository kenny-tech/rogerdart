import { EMPTYBOX, LOGOICON } from "@src/media/png"
import { ORDERS_PUBLIC_API_ROUTE, PUBLIC_BASE_URL } from "@src/services/routes"
import { listStyles } from "@src/styles"
import { storageController } from "@src/utils/storage"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import * as React from "react"
import * as Icon from "@heroicons/react/solid"
import { Currency } from "@src/hooks/currency"



const OrderList = () => {
    const [List, setList] = React.useState([])
    const [Errors, setErrors] = React.useState('')

    // // Filter data by categories
    // let filteredItem = []
    // if(List !== null){
    //     const updatedList = List.filter((x)=>x.id === selectedCategory);
    //     filteredItem = updatedList
    // }

    const _id = storageController.get('_uid')
    const token = storageController.get('access_token')
    axios.get(`${PUBLIC_BASE_URL}${ORDERS_PUBLIC_API_ROUTE}/${_id}`, {headers:{"Authorization":`Bearer ${token}`}})
        .then(res => {if(res.data.success === 1){setList(res.data.data)}})
        .catch(err => {setErrors(err.response.data.message)})

    return (
        <>
            <div className={listStyles.header}>
                <h2>Your recent orders</h2>
                {Errors && <p style={{color:"crimson"}}>{Errors}</p>}
            </div>
        {List.length !== 0 ?
        <div className={listStyles.grid}>
            {List.map(lists=> 
            <Link href={'/#'} passHref key={lists.id} >
                <a target={'_blank'} className={listStyles.gridItem} style={{backgroundImage:`url(${lists.image === "" ? LOGOICON : lists.image})`}}>
                    <div style={{display:"flex", flexDirection:"column", alignItems:"end"}}>
                        <h3>{lists.vendor_name}</h3>
                        <span style={{color:"#FFFFFF", margin:0, padding:0}}>
                            <p style={{margin:".06rem"}}>{lists.item_name}</p>
                            <p style={{margin:".06rem"}}>{Currency(lists.price)}</p>
                            <p style={{margin:".06rem"}}>{lists.delivery_time} mins</p>
                        </span>
                    </div>
                </a>
            </Link>
            )}
        </div>:
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", color:"grey" }}>
            <p>You have no order(s)!</p>
            <Image src={EMPTYBOX} alt="empty orders" width={80} height={80}/>
        </div>}
        </>
    )
}

export { OrderList }