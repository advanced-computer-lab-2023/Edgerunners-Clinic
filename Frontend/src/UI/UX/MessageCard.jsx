function MessageCard(props){
     function deleteCard(){
        props.onClick();
     }
     function cancelhandeler(props){
        props.onCancel();
     }
    return (
        <div className={`  ${props.width} ${props.height} rounded-md shadow-md   block justify-center border border-black p-4  `}>
            <div className=" flex justify-center">
            <body className=" text-black  text-lg">Are You Sure You want to delete this card?</body>
            </div>
           
                        <div className=" flex justify-center">
                            <button onClick={deleteCard} className=" text-black  outline  w-36  h-9  rounded-md   mt-5 shadow  ml-9">Yes</button>
                            <button onClick={cancelhandeler} className="  text-black  outline  w-36  h-9  rounded-md   mt-5 shadow  ml-9">No</button>
                        </div>
           
        </div>
    )
}
export  default MessageCard;