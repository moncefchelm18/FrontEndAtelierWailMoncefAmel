import React from "react";

const InventoryTotalOverview = ({equipmentData}) => {
    return(
        <>
            <div className="inventory-overall-container">
                <h2>Total Overview</h2>
                <div className="overview-grids">
                    <div className="overview-item">
                        <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" width="30" height="30" rx="4" fill="#FFEEDB"/>
                            <path d="M6.90297 2.90021C6.33647 2.90021 5.76854 3.18245 5.4506 3.65814L2.89024 7.23069L2.88563 7.23713L2.88208 7.24422C2.8809 7.24658 2.87969 7.249 2.87845 7.25147C2.85149 7.3052 2.81211 7.38369 2.81211 7.4676V24.9799C2.81211 25.8987 3.54182 26.6287 4.46087 26.6287H26.3513C27.2713 26.6287 28 25.8678 28 24.9799L27.9998 7.48752C28.012 7.45306 28.0141 7.41949 28.0106 7.38873H28.0649L27.9515 7.23048L25.3902 3.65659L25.3895 3.6557C25.0443 3.18502 24.5088 2.9 23.9388 2.9L17.7439 2.90021H6.90297ZM18.2993 7.51111V12.7522L15.4686 11.2214L15.4206 11.1955L15.3728 11.2218L12.5429 12.781V7.54104L13.6498 3.69576H17.2217L18.2993 7.51111ZM6.09107 4.10054L6.09107 4.10055L6.09161 4.09977C6.27927 3.83174 6.57426 3.69576 6.90323 3.69576H12.8169L11.861 7.06965H3.9704L6.09107 4.10054ZM18.7366 13.4862L18.7451 13.4825L18.7527 13.4775C18.9568 13.3415 19.0952 13.1029 19.0952 12.8582L19.0948 7.86528H27.234L27.2342 24.9798C27.2342 25.4585 26.8343 25.8329 26.3811 25.8329H4.46088C3.98212 25.8329 3.60772 25.433 3.60772 24.9798V7.86528H11.7469V12.8582C11.7469 13.1353 11.8874 13.3431 12.0894 13.4775C12.1989 13.5505 12.3387 13.5836 12.4725 13.5836C12.5779 13.5836 12.7147 13.5501 12.8217 13.4801L15.421 12.0783L18.0232 13.4817C18.2695 13.6217 18.5134 13.5818 18.7366 13.4862ZM23.939 3.69576C24.2621 3.69576 24.561 3.85729 24.7524 4.10227L26.8719 7.06967H19.0111L18.0552 3.69578L23.939 3.69576Z" fill="#DBA362" stroke="#DBA362" strokeWidth="0.2"/>
                            <path d="M13.0381 7.06943H12.9381V7.16943V7.76504V7.86504H13.0381H17.8034H17.9034V7.76504V7.16943V7.06943H17.8034H13.0381Z" fill="#DBA362" stroke="#DBA362" strokeWidth="0.2"/>
                        </svg>
                        <p>{equipmentData.length}</p>
                        <p>Total Equipment</p>
                    </div>
                    <div className="overview-item">
                        <img src="/playground_assets/icons/good-condition.png" style={{width:"30px", height: "30px"}}/>
                        <p>{equipmentData.filter(e => e.condition === "good").length}</p>
                        <p>Good Condition</p>
                    </div>
                    <div className="overview-item">
                        <img src="/playground_assets/icons/medium-condition.png" style={{width:"30px", height: "30px"}}/>
                        <p>{equipmentData.filter(e => e.condition === "meduim").length}</p>
                        <p>Fair Condition</p>
                    </div>
                    <div className="overview-item">
                        <img src="/playground_assets/icons/poor-condition.png" style={{width:"30px", height: "30px"}}/>
                        <p>{equipmentData.filter(e => e.condition === "poor").length}</p>
                        <p>Poor Condition</p>
                    </div>
                    <div className="overview-item">
                        <img src="/playground_assets/icons/stolen-condition.png" style={{width:"30px", height: "30px"}}/>
                        <p>{equipmentData.filter(e => e.condition === "stolen").length}</p>
                        <p>Equipments Stolen!</p>
                    </div>
                    <div className="overview-item">
                        <img src="/playground_assets/icons/reserved-condition.png" style={{width:"30px", height: "30px"}}/>
                        <p>{equipmentData.filter(e => e.is_reserved === true).length}</p>
                        <p>Equipments Reserved</p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default InventoryTotalOverview