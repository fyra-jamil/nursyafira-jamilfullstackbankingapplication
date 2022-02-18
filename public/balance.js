function Balance(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  

  return (
    <Card
      bgcolor="success"
      header="Balance"
      status={status}
      body={show ?
        <BalanceForm setShow={setShow} setStatus={setStatus}/> :
        <BalanceMsg setShow={setShow} setStatus={setStatus}/>}
    />
  )

}

function BalanceMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
        props.setShow(true);
        props.setStatus('');
      }}>
        Check balance again
    </button>
  </>);
}

function BalanceForm(props){
  const [email, setEmail]   = React.useState('');
  const [balance, setBalance] = React.useState('');  
  var EmailSess = localStorage.getItem('EmailUser');

  function handle(){
    fetch(`/account/findOne/${email}`)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            props.setStatus(text);
            props.setShow(false);
            setBalance(user.balance);
            console.log('JSON:', data);
        } catch(err) {
            props.setStatus(text)
            console.log('err:', text);
        }
    });
  }

  function cleardata(){
    localStorage.clear();
    window.location.replace("/");
  }

  
  var EmailSess = localStorage.getItem('EmailUser');
  if (EmailSess != null)
  {
  return (<>
  <img src="/public/image/WelcomeHeader.png" className="img-fluid" alt="Responsive image"/>
  <h2>Balance : ${localStorage.getItem('BalanceUser')}!</h2>
  <button type="submit" 
      className="btn btn-light" 
      onClick={cleardata}>Clear Data</button>
  </>);
  }
  else
  {
    return(<>
    <h1>Please login!</h1></>)
  }
}