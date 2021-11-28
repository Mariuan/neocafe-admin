import React from 'react'

const EditProduct = () => {
    const state = useSelector((state)=>state);
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [arrive, setArrive] = useState('');
    const [ category, setCategory] = useState(null);
    const [quantity, setQuantity] = useState(null);
    const [type, setType] = useState(null);
    const [limit, setLimit] = useState(null);

    useEffect(() => {
        fetchCategories().then((res)=>dispatch(setCategories(res)));
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://neocafe6.herokuapp.com/products', {
            name: name,
            unit: type,
            min: limit,
            // reserve:number,
            // date:string,
        }).catch((err)=>console.log(err)).then((res)=>{
            window.location = '/store';
        })
    }
    return (
        <div className="new-product-page">
            <div className="new-product-content">
                <h1 className="new-product-title">Новый товар</h1>
                <input type="text" 
                className="new-product-name" 
                placeholder="Наименование товара" 
                onChange={(e)=>{
                    setName(e.target.value);
                }}/>
                <input type="text" 
                className="new-product-arrive-date" 
                placeholder="Дата прихода"
                onChange={(e)=>{
                    setArrive(e.target.value);
                }}/>
                <select defaultValue={-1} className="new-product-category" onChange={(e)=>{
                    setCategory(parseInt(e.target.value));
                }}>
                    <option value={-1} disabled hidden>Категория</option>
                    {state.allProducts.categories.map((item, index)=>(
                        <option key={index} value={item.id}>{item.name}</option>
                    ))}
                </select>
                <input type="text" 
                className="new-product-quantity" 
                placeholder="Количество"
                onChange={(e)=>{
                    setQuantity(parseInt(e.target.value));
                }}/>
                <select className="new-product-type" defaultValue={-1} onChange={(e)=>{
                    if (e.target.value == 0) setType('Г');
                    else if (e.target.value == 1) setType('Мл');
                    else if (e.target.value == 2) setType('Шт');
                }}>
                    <option value={-1} disabled hidden>Г, Мл, Шт</option>
                    <option value={0}>Г</option>
                    <option value={1}>Мл</option>
                    <option value={2}>Шт</option>
                </select>
                <input type="text" 
                className="new-product-limit"
                placeholder="Лимит"
                onChange={(e)=>{
                    setLimit(parseInt(e.target.value));
                }}/>
                <br/>
                <button 
                type="submit"
                className="new-product-save-button"
                onClick={handleSubmit}>Сохранить</button>
                <button 
                type='button'
                className="new-product-cancel-button"
                onClick={()=>window.location='/store'}>Отменить</button>
            </div>
        </div>
    )
}

export default EditProduct
