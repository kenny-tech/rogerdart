import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

const Nav: NextPage = () => {

    const handleClose = () => {
        history.back();
    }

    return (
        <>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginLeft: '30px', marginRight: '30px', marginTop: '10px'}}>
                <Link href={'/'}>
                    <Image src='/uploads/logo.png' width={150} height={30} style={{cursor: 'pointer'}}/>
                </Link>
                <div className="text-danger" style={{cursor: 'pointer'}} onClick={() => handleClose()}>
                    x Close
                </div>
            </div>
        </>
    )
}
export default Nav