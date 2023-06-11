const StockHistoriqueForm = (props) => {
    return(
        <>
            <div className="add-form" style={{whiteSpace: 'nowrap'}}>
                <table>
                    <thead>
                    <tr>
                        {props.stockColumnTitles.map(title => (
                            <th key={title} style={{border: '2px solid black'}}>{title}</th>
                        ))}
                        <th style={{border: '2px solid black'}}>
                            Action
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {props.stockData.map((item, index) => (
                        <tr key={index}>
                            {Object.values(props.stockColumnMappings).map(key => (
                                <td key={key} style={{border: '1px solid black'}}>{item[key]}</td>
                            ))}
                            <td style={{border: '1px solid black'}}>{props.actionRender(item)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
export default StockHistoriqueForm;