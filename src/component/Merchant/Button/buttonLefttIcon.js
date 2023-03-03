import { orderStyles } from "@src/styles";
import * as Icon from "@heroicons/react/outline";

const ButtonLeftIcon  = () => {
    return (
        <div className={orderStyles.button}>
            <p className={orderStyles.buttonText}>Filter <Icon.FilterIcon className={orderStyles.icon}/></p>
        </div>
    )

}

export default ButtonLeftIcon;