function WarningCard(props){
    function okHandeler(){
        props.onClick();
     }
    return(
        <div className= {`  ${props.width} ${props.height} rounded-md shadow-md  bg-sky-50 flex justify-center `}>
            <body>
                {props.children}
            </body>
            <button onClick={okHandeler} > OK</button>
        </div>
    )
}
export default WarningCard;