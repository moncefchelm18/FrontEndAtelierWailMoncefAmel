import {Link} from "react-router-dom";


const AdminVerticalMenu = (props) => {
    return(
        <>
            <Link to="" className="menu-item">
                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 2.75111C0 2.02147 0.289848 1.32172 0.805782 0.805782C1.32172 0.289848 2.02147 0 2.75111 0H22.0089C22.7385 0 23.4383 0.289848 23.9542 0.805782C24.4702 1.32172 24.76 2.02147 24.76 2.75111V22.0089C24.76 22.7385 24.4702 23.4383 23.9542 23.9542C23.4383 24.4702 22.7385 24.76 22.0089 24.76H2.75111C2.02147 24.76 1.32172 24.4702 0.805782 23.9542C0.289848 23.4383 0 22.7385 0 22.0089V2.75111ZM22.0089 2.75111H2.75111V22.0089H22.0089V2.75111ZM12.38 5.50222C12.7448 5.50222 13.0947 5.64715 13.3527 5.90511C13.6106 6.16308 13.7556 6.51296 13.7556 6.87778V17.8822C13.7556 18.247 13.6106 18.5969 13.3527 18.8549C13.0947 19.1129 12.7448 19.2578 12.38 19.2578C12.0152 19.2578 11.6653 19.1129 11.4073 18.8549C11.1494 18.5969 11.0044 18.247 11.0044 17.8822V6.87778C11.0044 6.51296 11.1494 6.16308 11.4073 5.90511C11.6653 5.64715 12.0152 5.50222 12.38 5.50222ZM17.8822 8.25333C18.247 8.25333 18.5969 8.39826 18.8549 8.65622C19.1129 8.91419 19.2578 9.26407 19.2578 9.62889V17.8822C19.2578 18.247 19.1129 18.5969 18.8549 18.8549C18.5969 19.1129 18.247 19.2578 17.8822 19.2578C17.5174 19.2578 17.1675 19.1129 16.9096 18.8549C16.6516 18.5969 16.5067 18.247 16.5067 17.8822V9.62889C16.5067 9.26407 16.6516 8.91419 16.9096 8.65622C17.1675 8.39826 17.5174 8.25333 17.8822 8.25333ZM6.87778 11.0044C7.2426 11.0044 7.59248 11.1494 7.85044 11.4073C8.10841 11.6653 8.25333 12.0152 8.25333 12.38V17.8822C8.25333 18.247 8.10841 18.5969 7.85044 18.8549C7.59248 19.1129 7.2426 19.2578 6.87778 19.2578C6.51296 19.2578 6.16308 19.1129 5.90511 18.8549C5.64715 18.5969 5.50222 18.247 5.50222 17.8822V12.38C5.50222 12.0152 5.64715 11.6653 5.90511 11.4073C6.16308 11.1494 6.51296 11.0044 6.87778 11.0044Z" fill="white"/>
                </svg>
                Dashboard
            </Link>
            <Link to="inventory" className="menu-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.79897e-08 2.66667C1.79897e-08 1.95942 0.252856 1.28115 0.702944 0.781048C1.15303 0.280951 1.76348 0 2.4 0H21.6C22.2365 0 22.847 0.280951 23.2971 0.781048C23.7471 1.28115 24 1.95942 24 2.66667V5.33333C24.0001 5.80591 23.8871 6.27002 23.6726 6.67814C23.4582 7.08626 23.15 7.42373 22.7796 7.656C22.7928 7.768 22.8 7.88267 22.8 8V21.3333C22.8 22.0406 22.5471 22.7189 22.0971 23.219C21.647 23.719 21.0365 24 20.4 24H3.6C2.96348 24 2.35303 23.719 1.90294 23.219C1.45286 22.7189 1.2 22.0406 1.2 21.3333V8C1.2 7.884 1.2072 7.768 1.2204 7.656C0.849997 7.42373 0.5418 7.08626 0.327362 6.67814C0.112924 6.27002 -5.20503e-05 5.80591 1.79897e-08 5.33333V2.66667ZM21.6 5.33333V2.66667H2.4V5.33333H21.6ZM3.6 8V21.3333H20.4V8H3.6ZM7.2 12C7.2 11.6464 7.32643 11.3072 7.55147 11.0572C7.77652 10.8071 8.08174 10.6667 8.4 10.6667H15.6C15.9183 10.6667 16.2235 10.8071 16.4485 11.0572C16.6736 11.3072 16.8 11.6464 16.8 12C16.8 12.3536 16.6736 12.6928 16.4485 12.9428C16.2235 13.1929 15.9183 13.3333 15.6 13.3333H8.4C8.08174 13.3333 7.77652 13.1929 7.55147 12.9428C7.32643 12.6928 7.2 12.3536 7.2 12Z" fill="white"/>
                </svg>
                Inventory
            </Link>
            <Link to="categories" className="menu-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 2.66667C0 1.95942 0.280951 1.28115 0.781048 0.781048C1.28115 0.280951 1.95942 0 2.66667 0H8C8.70724 0 9.38552 0.280951 9.88562 0.781048C10.3857 1.28115 10.6667 1.95942 10.6667 2.66667V8C10.6667 8.70724 10.3857 9.38552 9.88562 9.88562C9.38552 10.3857 8.70724 10.6667 8 10.6667H2.66667C1.95942 10.6667 1.28115 10.3857 0.781048 9.88562C0.280951 9.38552 0 8.70724 0 8V2.66667ZM8 2.66667H2.66667V8H8V2.66667ZM13.3333 2.66667C13.3333 1.95942 13.6143 1.28115 14.1144 0.781048C14.6145 0.280951 15.2928 0 16 0H21.3333C22.0406 0 22.7189 0.280951 23.219 0.781048C23.719 1.28115 24 1.95942 24 2.66667V8C24 8.70724 23.719 9.38552 23.219 9.88562C22.7189 10.3857 22.0406 10.6667 21.3333 10.6667H16C15.2928 10.6667 14.6145 10.3857 14.1144 9.88562C13.6143 9.38552 13.3333 8.70724 13.3333 8V2.66667ZM21.3333 2.66667H16V8H21.3333V2.66667ZM0 16C0 15.2928 0.280951 14.6145 0.781048 14.1144C1.28115 13.6143 1.95942 13.3333 2.66667 13.3333H8C8.70724 13.3333 9.38552 13.6143 9.88562 14.1144C10.3857 14.6145 10.6667 15.2928 10.6667 16V21.3333C10.6667 22.0406 10.3857 22.7189 9.88562 23.219C9.38552 23.719 8.70724 24 8 24H2.66667C1.95942 24 1.28115 23.719 0.781048 23.219C0.280951 22.7189 0 22.0406 0 21.3333V16ZM8 16H2.66667V21.3333H8V16ZM13.3333 16C13.3333 15.2928 13.6143 14.6145 14.1144 14.1144C14.6145 13.6143 15.2928 13.3333 16 13.3333H21.3333C22.0406 13.3333 22.7189 13.6143 23.219 14.1144C23.719 14.6145 24 15.2928 24 16V21.3333C24 22.0406 23.719 22.7189 23.219 23.219C22.7189 23.719 22.0406 24 21.3333 24H16C15.2928 24 14.6145 23.719 14.1144 23.219C13.6143 22.7189 13.3333 22.0406 13.3333 21.3333V16ZM21.3333 16H16V21.3333H21.3333V16Z" fill="white"/>
                </svg>
                Categories
            </Link>
            <Link to="locations" className="menu-item">
                <svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.355 0.065469C8.61141 -0.021823 8.88859 -0.021823 9.145 0.065469L16.25 2.48666L21.7088 0.626367C22.0846 0.498203 22.4848 0.463164 22.8764 0.524137C23.2681 0.58511 23.64 0.74035 23.9614 0.977061C24.2828 1.21377 24.5446 1.52518 24.7252 1.88561C24.9058 2.24604 25 2.64517 25 3.05011V18.2455C25.0002 18.7818 24.8353 19.3047 24.5286 19.7399C24.2219 20.1752 23.789 20.5007 23.2912 20.6705L16.645 22.9345C16.3886 23.0218 16.1114 23.0218 15.855 22.9345L8.75 20.5121L3.29 22.3724C2.91427 22.5003 2.51418 22.5351 2.12269 22.474C1.73121 22.4129 1.35952 22.2576 1.03824 22.021C0.71697 21.7843 0.455303 21.473 0.274795 21.1127C0.0942868 20.7524 0.000102714 20.3534 7.25236e-08 19.9486V4.75325C-0.000126327 4.21672 0.164973 3.69376 0.471894 3.2585C0.778815 2.82324 1.21199 2.49777 1.71 2.32823L8.355 0.0641911V0.065469ZM10 18.2455L15 19.9499V4.75325L10 3.04883V18.2455ZM7.5 3.05011L2.5 4.75453V19.9486L7.5 18.2442V3.05011ZM17.5 4.75453V19.9486L22.5 18.2442V3.05011L17.5 4.75453Z" fill="white"/>
                </svg>
                Locations
            </Link>
            <Link to="managers" className="menu-item">
                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.4557 2.51194C9.18265 2.51194 7.96176 3.01765 7.06158 3.91783C6.16141 4.818 5.65569 6.0389 5.65569 7.31194C5.65569 8.58498 6.16141 9.80588 7.06158 10.7061C7.96176 11.6062 9.18265 12.1119 10.4557 12.1119C11.7287 12.1119 12.9496 11.6062 13.8498 10.7061C14.75 9.80588 15.2557 8.58498 15.2557 7.31194C15.2557 6.0389 14.75 4.818 13.8498 3.91783C12.9496 3.01765 11.7287 2.51194 10.4557 2.51194ZM3.25569 7.31194C3.25569 5.40238 4.01426 3.57103 5.36453 2.22077C6.71479 0.870508 8.54614 0.111938 10.4557 0.111938C12.3653 0.111938 14.1966 0.870508 15.5469 2.22077C16.8971 3.57103 17.6557 5.40238 17.6557 7.31194C17.6557 9.2215 16.8971 11.0528 15.5469 12.4031C14.1966 13.7534 12.3653 14.5119 10.4557 14.5119C8.54614 14.5119 6.71479 13.7534 5.36453 12.4031C4.01426 11.0528 3.25569 9.2215 3.25569 7.31194ZM18.6493 2.22034C18.7607 2.10877 18.8931 2.02026 19.0388 1.95987C19.1844 1.89948 19.3406 1.86839 19.4983 1.86839C19.656 1.86839 19.8121 1.89948 19.9578 1.95987C20.1035 2.02026 20.2358 2.10877 20.3473 2.22034C21.016 2.88894 21.5465 3.68271 21.9084 4.55634C22.2703 5.42996 22.4566 6.36632 22.4566 7.31194C22.4566 8.25756 22.2703 9.19392 21.9084 10.0675C21.5465 10.9412 21.016 11.7349 20.3473 12.4035C20.2358 12.515 20.1034 12.6035 19.9578 12.6638C19.8121 12.7242 19.656 12.7552 19.4983 12.7552C19.3406 12.7552 19.1845 12.7242 19.0388 12.6638C18.8931 12.6035 18.7608 12.515 18.6493 12.4035C18.5378 12.292 18.4494 12.1597 18.389 12.014C18.3287 11.8683 18.2976 11.7122 18.2976 11.5545C18.2976 11.3969 18.3287 11.2407 18.389 11.0951C18.4494 10.9494 18.5378 10.817 18.6493 10.7055C19.5492 9.80541 20.0547 8.58473 20.0547 7.31194C20.0547 6.03915 19.5492 4.81847 18.6493 3.91834C18.5377 3.80689 18.4492 3.67454 18.3888 3.52887C18.3284 3.38319 18.2974 3.22704 18.2974 3.06934C18.2974 2.91164 18.3284 2.75549 18.3888 2.60981C18.4492 2.46413 18.5377 2.33179 18.6493 2.22034ZM19.4917 17.8203C19.5691 17.5119 19.7657 17.2468 20.0384 17.0832C20.3111 16.9196 20.6376 16.871 20.9461 16.9479C22.5397 17.3463 23.5489 18.3639 24.1285 19.5255C24.6901 20.6475 24.8557 21.9015 24.8557 22.9119C24.8557 23.2302 24.7293 23.5354 24.5042 23.7605C24.2792 23.9855 23.974 24.1119 23.6557 24.1119C23.3374 24.1119 23.0322 23.9855 22.8072 23.7605C22.5821 23.5354 22.4557 23.2302 22.4557 22.9119C22.4557 22.1235 22.3213 21.2763 21.9829 20.5983C21.6625 19.9587 21.1705 19.4775 20.3641 19.2759C20.0557 19.1986 19.7905 19.002 19.6269 18.7293C19.4634 18.4566 19.4147 18.1289 19.4917 17.8203ZM6.25569 19.3119C4.74369 19.3119 3.25569 20.7675 3.25569 22.9119C3.25569 23.2302 3.12927 23.5354 2.90422 23.7605C2.67918 23.9855 2.37395 24.1119 2.05569 24.1119C1.73743 24.1119 1.43221 23.9855 1.20717 23.7605C0.982122 23.5354 0.855694 23.2302 0.855694 22.9119C0.855694 19.7535 3.12729 16.9119 6.25569 16.9119H14.6557C17.7841 16.9119 20.0557 19.7535 20.0557 22.9119C20.0557 23.2302 19.9293 23.5354 19.7042 23.7605C19.4792 23.9855 19.174 24.1119 18.8557 24.1119C18.5374 24.1119 18.2322 23.9855 18.0072 23.7605C17.7821 23.5354 17.6557 23.2302 17.6557 22.9119C17.6557 20.7675 16.1677 19.3119 14.6557 19.3119H6.25569Z" fill="white"/>
                </svg>
                Managers
            </Link>
            <Link to="myaccount" className="menu-item">
                <svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.8 2.4C9.52696 2.4 8.30606 2.90571 7.40589 3.80589C6.50571 4.70606 6 5.92696 6 7.2C6 8.47304 6.50571 9.69394 7.40589 10.5941C8.30606 11.4943 9.52696 12 10.8 12C12.073 12 13.2939 11.4943 14.1941 10.5941C15.0943 9.69394 15.6 8.47304 15.6 7.2C15.6 5.92696 15.0943 4.70606 14.1941 3.80589C13.2939 2.90571 12.073 2.4 10.8 2.4ZM3.6 7.2C3.6 5.29044 4.35857 3.45909 5.70883 2.10883C7.05909 0.758569 8.89044 0 10.8 0C12.7096 0 14.5409 0.758569 15.8912 2.10883C17.2414 3.45909 18 5.29044 18 7.2C18 9.10956 17.2414 10.9409 15.8912 12.2912C14.5409 13.6414 12.7096 14.4 10.8 14.4C8.89044 14.4 7.05909 13.6414 5.70883 12.2912C4.35857 10.9409 3.6 9.10956 3.6 7.2ZM6 19.2C5.04522 19.2 4.12955 19.5793 3.45442 20.2544C2.77928 20.9295 2.4 21.8452 2.4 22.8C2.4 23.1183 2.27357 23.4235 2.04853 23.6485C1.82348 23.8736 1.51826 24 1.2 24C0.88174 24 0.576515 23.8736 0.351472 23.6485C0.126428 23.4235 0 23.1183 0 22.8C0 21.2087 0.632141 19.6826 1.75736 18.5574C2.88258 17.4321 4.4087 16.8 6 16.8H15.6C17.1913 16.8 18.7174 17.4321 19.8426 18.5574C20.9679 19.6826 21.6 21.2087 21.6 22.8C21.6 23.1183 21.4736 23.4235 21.2485 23.6485C21.0235 23.8736 20.7183 24 20.4 24C20.0817 24 19.7765 23.8736 19.5515 23.6485C19.3264 23.4235 19.2 23.1183 19.2 22.8C19.2 21.8452 18.8207 20.9295 18.1456 20.2544C17.4705 19.5793 16.5548 19.2 15.6 19.2H6Z" fill="white"/>
                </svg>
                My Account
            </Link>
        </>
    );
}
export default AdminVerticalMenu;