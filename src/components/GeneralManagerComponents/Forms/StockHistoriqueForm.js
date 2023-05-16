const StockHistoriqueForm = (props) => {
    return(
        <>
            <div className="add-form">
                <table>
                    <thead>
                    <tr>
                        {props.stockColumnTitles.map(title => (
                            <th key={title}>{title}</th>
                        ))}
                        <th>
                            Action
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {props.stockData.map((item, index) => (
                        <tr key={index}>
                            {Object.values(props.stockColumnMappings).map(key => (
                                <td key={key}>{item[key]}</td>
                            ))}
                            <td>{props.actionRender(item)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
export default StockHistoriqueForm;