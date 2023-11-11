function ConfirmationCard(props) {
    function yesHandler() {
      props.onYes(); // Call onYes when the "Yes" button is clicked
    }
  
    function noHandler() {
      props.onNo(); // Call onNo when the "No" button is clicked
    }
  
    return (
      <div className={` ${props.width} ${props.height} rounded-md shadow-md bg-sky-50 flex justify-center`}>
        <body>{props.message}</body>
        <button onClick={yesHandler}>Yes</button>
        <button onClick={noHandler}>No</button>
      </div>
    );
  }
  
  export default ConfirmationCard;
  