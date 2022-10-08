import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as filledStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Product({ img, title, price, rating, instock, sold }) {
    const ratingStars = ['', '', '', '', ''];
    let filledStars = rating;

    return (
        <tr className="border-b border-[#e9e9ef]">
            <td className="p-3">
                <div className="w-[50px]">
                    <img src={img} alt="" />
                </div>
            </td>
            <td className="p-3">
                <div>
                    <h5 className="text-[15px] font-medium text-dark-600 leading-[18px] mb-2">{title}</h5>
                    <span>{price.toFixed(2)}</span>
                </div>
            </td>
            <td className="p-3">
                {instock ? (
                    <>
                        <p className="mb-2">Available</p>
                        <span>{instock}</span>
                    </>
                ) : (
                    <>
                        <p className="mb-2">Out of Stock</p>
                        <span>0</span>
                    </>
                )}
            </td>
            <td className="p-3">
                <ul className="flex gap-1 text-[#ffcc5a] mb-2">
                    {ratingStars.map(() => {
                        if (filledStars) {
                            filledStars--;

                            return (
                                <li key={Math.random() * Math.random()}>
                                    <FontAwesomeIcon icon={filledStar} />
                                </li>
                            );
                        }

                        return (
                            <li key={Math.random() * Math.random()}>
                                <FontAwesomeIcon icon={emptyStar} />
                            </li>
                        );
                    })}
                </ul>
                <span>{sold} sales</span>
            </td>
        </tr>
    );
}

export default Product;
